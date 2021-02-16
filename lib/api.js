import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const piecesDirectory = join(process.cwd(), 'content', 'pieces')
const pieceEntryFilename = 'main.md'

export function getPieceBySlug(slug, fields = []) {
  const cleanSlug = slug.replace(/\.md$/, '')
  const pathToPieceDir = join(piecesDirectory, cleanSlug)
  const pathToPieceEntry = join(pathToPieceDir, pieceEntryFilename)
  const pieceMarkdown = fs.readFileSync(pathToPieceEntry, 'utf8')
  const { data, content } = matter(pieceMarkdown)

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
