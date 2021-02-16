import { getPieceBySlug } from '../../lib/api'
import mdToHtml from '../../lib/mdToHtml'

export default function Piece({ piece }) {
  return (
    <article>
      <h1 className="piece-title">{piece.title}</h1>
      <div
        className="piece-body"
        dangerouslySetInnerHTML={{ __html: piece.body_html }}
      />
    </article>
  )
}

export async function getStaticProps(context) {
  console.log('context', context) //debug
  const piece = await getPieceBySlug(context.params.slug, [
    'title',
    'body_md',
  ])
  piece.body_html = await mdToHtml(piece.body_md || '')
  return {
    props: {
      piece: {...piece},
    },
  }
}

export async function getStaticPaths() {
  const pieces = ['phone-art'] // TODO: hardcoded test

  return {
    paths: pieces.map((piece) => {
      return {
        params: {
          slug: piece,
        },
      }
    }),
    fallback: false,
  }
}
