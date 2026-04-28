/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

interface DreamData {
  text: string
  imageUrl: string
  date: string
  weekOf: string
}

const sectionCss = css`
  max-width: 680px;
  margin: 0 auto;
  padding: 0 2rem;
`

export default function Dream() {
  const [data, setData] = useState<DreamData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/dream.json')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div
      css={css`
        min-height: 100vh;
        background: var(--color-bg);
        color: var(--color-text);
        padding-top: 5rem;
        padding-bottom: 6rem;
        transition: background 0.4s ease;
      `}
    >
      {/* 标题 */}
      <div css={css`${sectionCss}; padding-top: 4rem;`}>
        <div
          css={css`
            font-family: var(--font-serif);
            font-size: clamp(2rem, 6vw, 3.5rem);
            font-weight: 700;
            letter-spacing: -0.02em;
            color: var(--color-text);
            margin-bottom: 0.3rem;
          `}
        >
          三千凡梦
        </div>
        <div
          css={css`
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--color-text-muted);
            letter-spacing: 0.1em;
          `}
        >
          {data ? `第 ${data.weekOf} 周` : '每周日 10:10 自动生成'}
        </div>
      </div>

      {/* 内容区 */}
      <div css={sectionCss} style={{ marginTop: '3rem' }}>
        {loading ? (
          <LoadingSkeleton />
        ) : data ? (
          <>
            {/* AI 图 */}
            <div
              css={css`
                width: 100%;
                border-radius: var(--radius);
                overflow: hidden;
                margin-bottom: 2.5rem;
                border: 1px solid var(--color-border);
              `}
            >
              <img
                src={data.imageUrl}
                alt="本周梦境"
                css={css`
                  width: 100%;
                  height: auto;
                  display: block;
                  object-fit: cover;
                `}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>

            {/* 碎碎念文字 */}
            <div
              css={css`
                font-family: var(--font-sans);
                font-size: clamp(1rem, 2vw, 1.1rem);
                line-height: 2.2;
                color: var(--color-text);
                font-weight: 300;
                white-space: pre-wrap;
              `}
            >
              {data.text}
            </div>

            {/* 日期 */}
            <div
              css={css`
                margin-top: 3rem;
                font-family: var(--font-mono);
                font-size: 0.7rem;
                color: var(--color-text-muted);
                letter-spacing: 0.08em;
              `}
            >
              {data.date}
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div css={css`display: flex; flex-direction: column; gap: 1rem;`}>
      <div
        css={css`
          width: 100%;
          height: 380px;
          background: var(--color-surface);
          border-radius: var(--radius);
          animation: pulse 2s ease-in-out infinite;
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      />
      {[1, 2, 3].map(i => (
        <div
          key={i}
          css={css`
            height: 16px;
            background: var(--color-surface);
            border-radius: 4px;
            width: ${80 + i * 5}%;
            animation: pulse 2s ease-in-out infinite ${i * 0.15}s;
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        />
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div
      css={css`
        text-align: center;
        padding: 4rem 0;
        color: var(--color-text-muted);
        font-family: var(--font-mono);
        font-size: 0.85rem;
        line-height: 2;
      `}
    >
      <div css={css`font-size: 2rem; margin-bottom: 1rem; opacity: 0.3;`}>🌙</div>
      <div>本周梦尚未生成</div>
      <div css={css`margin-top: 0.5rem; font-size: 0.75rem; opacity: 0.6;`}>
        每周日 10:10 CST 自动更新
      </div>
    </div>
  )
}
