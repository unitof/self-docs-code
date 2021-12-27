import { getPieceBySlug, getAllSlugs } from '../lib/api'
import Head from 'next/head'

export default function TableOfContents({ pieces }) {
  return (
    <article>
      <Head>
        <title>Documentation of Jacob Ford</title>
      </Head>
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

  // console.log(allPieces) //debug

  return {
    props: {
      pieces: allPieces
    },
  }
}
