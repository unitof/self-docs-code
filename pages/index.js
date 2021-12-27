import { getPieceBySlug, getAllSlugs } from '../lib/api'

export default function TableOfContents({ pieces }) {
  return (
    <article>
      <h1 className="site-title">Documentation of Jacob Ford</h1>
      <h2 className="site-subtitle">All substance, no style</h2>
      <ul>
      {pieces.map(piece =>
        <li><a href={`/pieces/${piece.slug}`}>{piece.title}</a></li>
      )}
      </ul>
    </article>
  )
}

export async function getStaticProps(context) {
  const allSlugs = await getAllSlugs()
  const fields = ['title', 'slug']
  const allPieces = allSlugs.map(pieceSlug => getPieceBySlug(pieceSlug, fields))

  console.log(allPieces)

  return {
    props: {
      pieces: allPieces
    },
  }
}
