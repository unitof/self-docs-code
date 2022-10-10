import Head from 'next/head'
import { getPieceBySlug, getAllSlugs } from '../../lib/api'
import mdToHtml from '../../lib/mdToHtml'

export default function Piece({ piece }) {
  return (
    <article>
      <Head>
        <title>{piece.title}, by Jacob Ford</title>
      </Head>
      <header>
        <nav>
          <a className="back" href="/">Return to Table of Contents</a>
        </nav>
        <h1 className="piece-title">{piece.title}</h1>
        <h2 className="piece-subtitle">{piece.subtitle}</h2>
        <h3 className="piece-metadata">
          Written on a {piece.date_firstPublished}
        </h3>
      </header>
      <section
        className="piece-body"
        dangerouslySetInnerHTML={{ __html: piece.body_html }}
      />
    </article>
  )
}

export async function getStaticProps(context) {
  const piece = await getPieceBySlug(context.params.slug, [
    'title',
    'subtitle',
    'body_md',
    'date_firstPublished',
    'date_lastUpdated',
  ])
  piece.body_html = await mdToHtml(piece.body_md || '')
  return {
    props: {
      piece: {...piece},
    },
  }
}

export async function getStaticPaths() {
  const pieces = getAllSlugs()

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
