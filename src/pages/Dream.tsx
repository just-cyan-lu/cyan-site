/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

interface DreamEntry {
  text: string
  imageUrl: string
  date: string
  weekOf: string
}

export default function Dream() {
  const [entries, setEntries] = useState<DreamEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/dream.json')
      .then(r => r.json())
      .then(d => {
        const data = Array.isArray(d) ? d : [d]
        setEntries(data)
        setLoading(false)
      })
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
      <div css={css`
        max-width: 720px;
        margin: 0 auto;
        padding: 4rem 2rem 3rem;
      `}>
        <div css={css`
          font-family: var(--font-serif);
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-text);
          margin-bottom: 0.3rem;
        `}>
          三千凡梦
        </div>
        <div css={css`
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-text-muted);
          letter-spacing: 0.1em;
        `}>
          {loading ? '加载中...' : `${entries.length} 期`}
        </div>
      </div>

      {/* 时间线 */}
      <div css={css`
        max-width: 720px;
        margin: 0 auto;
        padding: 0 2rem;
        position: relative;
      `}>
        {/* 竖线 */}
        <div css={css`
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--color-border);
          transform: translateX(-50%);
          @media (max-width: 600px) {
            left: 20px;
          }
        `}/>

        {loading ? (
          <TimelineSkeleton />
        ) : entries.length === 0 ? (
          <EmptyState />
        ) : (
          entries.map((entry, i) => (
            <TimelineItem key={entry.weekOf} entry={entry} index={i} />
          ))
        )}
      </div>
    </div>
  )
}

function TimelineItem({ entry, index }: { entry: DreamEntry; index: number }) {
  const isLeft = index % 2 === 0
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100 + index * 150)
    return () => clearTimeout(t)
  }, [index])

  return (
    <div
      css={css`
        display: flex;
        align-items: flex-start;
        margin-bottom: 4rem;
        opacity: ${visible ? 1 : 0};
        transform: translateY(${visible ? '0' : '24px'});
        transition: opacity 0.6s ease, transform 0.6s ease;
        @media (max-width: 600px) {
          flex-direction: row !important;
          margin-left: 40px !important;
          margin-right: 0 !important;
        }
      `}
      style={{
        flexDirection: isLeft ? 'row' : 'row-reverse',
        marginLeft: isLeft ? '0' : '50%',
        marginRight: isLeft ? '50%' : '0',
        paddingLeft: isLeft ? '2.5rem' : '0',
        paddingRight: isLeft ? '0' : '2.5rem',
      }}
    >
      {/* 中间节点 */}
      <div css={css`
        position: absolute;
        left: 50%;
        top: 1.5rem;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--color-primary);
        transform: translateX(-50%);
        box-shadow: 0 0 12px var(--color-primary);
        @media (max-width: 600px) {
          left: 20px;
        }
      `}/>

      {/* 内容卡片 */}
      <div
        css={css`
          width: 100%;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: border-color 0.3s;
          &:hover { border-color: var(--color-primary); }
        `}
      >
        {/* 图片 */}
        <div css={css`
          width: 100%;
          height: 240px;
          overflow: hidden;
          background: var(--color-surface-2);
        `}>
          <img
            src={entry.imageUrl}
            alt={entry.weekOf}
            css={css`
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: transform 0.5s ease;
              &:hover { transform: scale(1.03); }
            `}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>

        {/* 文字 */}
        <div css={css`padding: 1.5rem;`}>
          {/* 日期 */}
          <div css={css`
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--color-text-muted);
            letter-spacing: 0.08em;
            margin-bottom: 1rem;
          `}>
            {entry.weekOf} · {entry.date}
          </div>

          {/* 碎碎念 */}
          <div css={css`
            font-family: var(--font-sans);
            font-size: clamp(0.9rem, 1.8vw, 1rem);
            line-height: 2.1;
            color: var(--color-text);
            font-weight: 300;
            white-space: pre-wrap;
          `}>
            {entry.text}
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelineSkeleton() {
  return (
    <div css={css`display: flex; flex-direction: column; gap: 4rem;`}>
      {[0, 1].map(i => (
        <div key={i} css={css`margin-left: ${i % 2 === 0 ? 0 : '50%'};`}>
          <div css={css`
            background: var(--color-surface);
            border-radius: var(--radius);
            overflow: hidden;
            animation: pulse 2s ease-in-out infinite ${i * 0.2}s;
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.4; }
            }
          `}>
            <div css={css`height: 240px; background: var(--color-surface-2);`}/>
            <div css={css`padding: 1.5rem;`}>
              <div css={css`height: 12px; width: 40%; background: var(--color-surface-2); border-radius: 4px; margin-bottom: 1rem;`}/>
              {[90, 75, 85].map((w, j) => (
                <div key={j} css={css`
                  height: 14px; width: ${w}%; background: var(--color-surface-2);
                  border-radius: 4px; margin-bottom: 0.5rem;
                  animation: pulse 2s ease-in-out infinite ${i * 0.2 + j * 0.1}s;
                  @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                  }
                `}/>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div css={css`
      text-align: center;
      padding: 4rem 0;
      color: var(--color-text-muted);
      font-family: var(--font-mono);
      font-size: 0.85rem;
    `}>
      <div css={css`font-size: 2rem; margin-bottom: 1rem; opacity: 0.3;`}>梦</div>
      <div>尚未生成</div>
    </div>
  )
}
