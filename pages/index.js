import { getPieceBySlug, getAllSlugs } from '../lib/api'

export default function TableOfContents() {
  return (
    <article>
      <h1 className="site-title">Documentation of Jacob Ford</h1>
      <h2 className="site-subtitle">All substance, no style</h2>
      <ul>
      {getAllSlugs().forEach(pieceSlug => {
        const piece = getPieceBySlug(pieceSlug)
        return <li><a href="/pieces/{piece.slug}">{piece.title}</a></li>
      })}
      </ul>
    </article>
  )
}
