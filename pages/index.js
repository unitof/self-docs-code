import { getPieceBySlug, getAllSlugs } from '../lib/api'
import Head from 'next/head'

export default function TableOfContents({ pieces }) {
  return (
    <section>
      <Head>
        <title>Documentation of Jacob Ford</title>
      </Head>
      <h1 className="site-title">Documentation of <a href="//jacobford.com">Jacob Ford</a></h1>
      <h2 className="site-subtitle">All substance, little style</h2>
      <p>An <a href="https://github.com/unitof/self-docs-code/">unfinished</a> non-chronological blogging engine, which had to start somewhere</p>
      <ul>
      {pieces.map(piece =>
        <li><a href={`/pieces/${piece.slug}`}>{piece.title}</a></li>
      )}
      </ul>
    </section>
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
