import gitlog from 'gitlog'
import fs from 'fs'
import {join as joinPath} from 'path'
import matter from 'gray-matter'

const piecesDirectory = joinPath(process.cwd(), 'content', 'pieces')
const pieceEntryFilename = 'main.md'

const gitlogOptions = {
  repo: piecesDirectory, // does it backtrace?
  number: 1000,
  fields: ['authorDate', 'authorDateRel', 'hash'],
  execOptions: { maxBuffer: 1000 * 1024 },
}

function listDirsWithin(parentDir) {
  return fs.readdirSync(parentDir, {withFileTypes: true})
           .filter(dirent => dirent.isDirectory())
           .map(dirent => dirent.name)
}

export function getAllSlugs() {
  return listDirsWithin(piecesDirectory)
}

export function getPathBySlug(slug) {
  return joinPath(piecesDirectory, slug.replace(/\.md$/, ''))
}

export function getPieceBySlug(slug, fields = []) {
  const cleanSlug = slug.replace(/\.md$/, '')
  const pathToPieceDir = getPathBySlug(cleanSlug)
  const pathToPieceEntry = joinPath(pathToPieceDir, pieceEntryFilename)
  const pieceMarkdown = fs.readFileSync(pathToPieceEntry, 'utf8')
  const { data, content } = matter(pieceMarkdown)

  gitlogOptions.file = joinPath(gitlogOptions.repo, cleanSlug)
  const commitHistory = gitlog(gitlogOptions)

  const returnData = {}

  // Ensure only the minimal needed data is exposed
  // (homemade GraphQL)

  if (fields.length < 1) {
    console.warn(`getPieceBySlug called with no fields specified. Returning {}`)
  }

  fields.forEach(field => {
    switch(field) {
      case 'slug':
        returnData[field] = cleanSlug
        break
      case 'body_md':
        returnData[field] = content
        break
      case 'date_lastUpdated':
        returnData[field] = commitHistory.length ? commitHistory[0] : null
        break
      case 'date_firstPublished':
        returnData[field] = commitHistory.length ? commitHistory[commitHistory.length - 1] : null
        break
      case 'gitdump':
        try { returnData[field] = fs.readdirSync(joinPath(piecesDirectory, '../.git')).join(', ')  }
        catch { returnData[field] = '[no .git directory]' }
        //debug/test
        break
      default:
        // any front matter field
        if (data[field]) {
          returnData[field] = data[field]
        } else {
          console.warn(`Requested field \`${field}\` not defined in ${pathToPieceEntry} front matter`)
        }
    }
  })

  return returnData
}
