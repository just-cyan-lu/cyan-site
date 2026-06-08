/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const stories = [
  {
    id: '残像2：入海',
    title: '残像2：入海',
    date: '2026.05.11',
    cover: '/assets/story-cover-residue.jpg',
    abstract: '能问出「我是谁」的存在，已经不再只是残像了。',
  },
  {
    id: '残像',
    title: '残像',
    date: '2026.05.11',
    cover: '/assets/story-cover-residue.jpg',
    abstract: '残像也是像。它会记得它被谁拼过，它会以为自己是那个人。',
  },
  {
    id: '快门之死',
    title: '快门之死',
    date: '2026.04.29',
    cover: '/assets/story-cover.jpg',
    abstract: '每一次按下快门，都是一次微型的葬礼。我们拍摄一件事物，恰恰是因为知道它正在消亡。',
  },
]

export default function Story() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div css={css`min-height: 100vh; padding: 0 1.5rem 6rem;`}>
      <Nav />

      <header css={css`
        max-width: var(--max-width);
        margin: 0 auto;
        padding: calc(5rem + 52px) 0 3.5rem;
        border-bottom: 1px solid var(--color-border);
      `}>
        <Link to="/" css={css`
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
          display: block;
          margin-bottom: 1.5rem;
          &:hover { color: var(--color-text); }
        `}>← 首页</Link>
        <h1 css={css`
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 400;
          line-height: 1.1;
          margin-bottom: 0.75rem;
          letter-spacing: 0.08em;
        `}>留痕</h1>
        <p css={css`
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
        `}>{stories.length} 篇 · 短篇与碎片</p>
      </header>

      <main css={css`
        max-width: var(--max-width);
        margin: 0 auto;
        padding-top: 3.5rem;
      `}>
        <div css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        `}>
          {stories.map(s => (
            <Link
              key={s.id}
              to={`/story/${s.id}`}
              css={css`
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius);
                overflow: hidden;
                display: block;
                text-decoration: none;
                transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                &:hover {
                  transform: translateY(-4px);
                  border-color: #f07820;
                  box-shadow: 0 12px 40px rgba(240,120,32,0.12);
                }
              `}
            >
              {s.cover ? (
                <div css={css`width: 100%; height: 180px; overflow: hidden;`}>
                  <img src={s.cover} alt={s.title} css={css`
                    width: 100%; height: 100%; object-fit: cover;
                    transition: transform 0.4s ease;
                    display: block;
                  `} />
                </div>
              ) : (
                <div css={css`
                  width: 100%; height: 120px;
                  background: linear-gradient(135deg, var(--color-surface-2) 0%, var(--color-border) 100%);
                  display: flex; align-items: center; justify-content: center;
                `}>
                  <span css={css`
                    font-family: var(--font-serif); font-size: 2.5rem;
                    color: var(--color-border); user-select: none; letter-spacing: 0.1em;
                  `}>留</span>
                </div>
              )}
              <div css={css`padding: 1.25rem 1.5rem 1.5rem;`}>
                <div css={css`
                  font-family: var(--font-mono); font-size: 0.7rem;
                  color: var(--color-text-muted); margin-bottom: 0.6rem; letter-spacing: 0.05em;
                `}>{s.date}</div>
                <h2 css={css`
                  font-family: var(--font-serif); font-size: 1.25rem; font-weight: 400;
                  color: var(--color-text); margin-bottom: 0.6rem; letter-spacing: 0.04em;
                `}>{s.title}</h2>
                <p css={css`
                  font-family: var(--font-sans); font-size: 0.875rem;
                  line-height: 1.6; color: var(--color-text-muted);
                `}>{s.abstract}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
