/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState, useRef } from 'react'

interface DreamEntry {
  text: string
  imageUrl: string
  date: string
  weekOf: string
}

export default function Dream() {
  const [entries, setEntries] = useState<DreamEntry[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

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

  // 监听滚动，高亮当前期
  useEffect(() => {
    if (entries.length === 0) return
    const observers: IntersectionObserver[] = []
    entries.forEach((_, i) => {
      const el = itemRefs.current[i]
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [entries])

  function scrollTo(i: number) {
    itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div css={css`position: relative;`}>
      {/* ── 左侧时间轴 ── */}
      <div
        css={css`
          position: fixed;
          left: 2.5rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          @media (max-width: 900px) {
            display: none;
          }
        `}
      >
        {/* 竖线 */}
        <div css={css`
          position: absolute;
          top: 12px;
          bottom: 12px;
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--color-border) 15%, var(--color-border) 85%, transparent);
          z-index: 0;
        `}/>
        {entries.map((entry, i) => (
          <button
            key={entry.weekOf}
            onClick={() => scrollTo(i)}
            title={entry.weekOf}
            css={css`
              position: relative;
              z-index: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 0.3rem;
              background: none;
              border: none;
              cursor: pointer;
              padding: 0.8rem 0;
            `}
          >
            {/* 圆点 */}
            <div css={css`
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: ${i === activeIndex ? 'var(--color-primary)' : 'var(--color-bg)'};              border: 2px solid ${i === activeIndex ? 'var(--color-primary)' : 'var(--color-border)'};              transition: all 0.3s ease;
              box-shadow: ${i === activeIndex ? `0 0 0 3px rgba(240,120,32,0.2), 0 0 12px rgba(240,120,32,0.4)` : 'none'};
              &:hover {
                border-color: var(--color-primary);
                transform: scale(1.2);
              }
            `}/>
            {/* 周标签 */}
            <div css={css`
              font-family: var(--font-mono);
              font-size: 0.6rem;
              color: ${i === activeIndex ? 'var(--color-primary)' : 'var(--color-text-muted)'};
              letter-spacing: 0.05em;
              white-space: nowrap;
              transition: color 0.3s;
              opacity: ${i === activeIndex ? 1 : 0.5};
              // horizontal
              // horizontal
              // horizontal
              font-size: 0.6rem; letter-spacing: 0.05em;
              &:hover { opacity: 1; color: var(--color-primary); }
            `}>
              {entry.date.split('—')[0].replace('年', '-').replace('月', '-').replace('日', '')}
            </div>
          </button>
        ))}
      </div>

      {/* ── 右侧内容 ── */}
      <div
        css={css`
          min-height: 100vh;
          background: var(--color-bg);
          color: var(--color-text);
          transition: background 0.4s ease;
        `}
      >
        {/* 页头 */}
        <div css={css`
          max-width: 680px;
          margin: 0 auto;
          padding: 5rem 2rem 3rem;
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
            {loading ? '加载中...' : `${entries.length} 期 · 每周日 10:10 自动更新`}
          </div>
        </div>

        {/* 每期 */}
        <div css={css`max-width: 680px; margin: 0 auto; padding: 0 2rem 6rem;`}>
          {loading ? (
            <LoadingSkeleton />
          ) : entries.length === 0 ? (
            <EmptyState />
          ) : (
            entries.map((entry, i) => (
              <DreamItem
                key={entry.weekOf}
                entry={entry}
                ref={el => { itemRefs.current[i] = el }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const DreamItem = ({ entry, ref }: { entry: DreamEntry; ref: React.Ref<HTMLDivElement> }) => (
  <div
    ref={ref}
    css={css`
      padding: 1rem 0 5rem;
    `}
  >
    {/* 标签 */}
    <div css={css`
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--color-primary);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 1rem;
    `}>
      {entry.weekOf}
    </div>

    {/* 图片 */}
    <div css={css`
      width: 100%;
      border-radius: var(--radius);
      font-size: 0.6rem; letter-spacing: 0.05em;
      margin-bottom: 2rem;
      border: 1px solid var(--color-border);
    `}>
      <img
        src={entry.imageUrl}
        alt={entry.weekOf}
        css={css`
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
          &:hover { transform: scale(1.02); }
        `}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
    </div>

    {/* 碎碎念 */}
    <div css={css`
      font-family: var(--font-sans);
      font-size: clamp(1rem, 2vw, 1.1rem);
      line-height: 2.2;
      color: var(--color-text);
      font-weight: 300;
      white-space: pre-wrap;
    `}>
      {entry.text}
    </div>

    {/* 日期 */}
    <div css={css`
      margin-top: 2rem;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--color-text-muted);
      letter-spacing: 0.08em;
    `}>
      {entry.date}
    </div>
  </div>
)

function LoadingSkeleton() {
  return (
    <div css={css`display: flex; flex-direction: column; gap: 3rem; padding-top: 1rem;`}>
      {[0, 1].map(i => (
        <div key={i} css={css`animation: pulse 2s ease-in-out infinite ${i * 0.2}s; @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}>
          <div css={css`height: 12px; width: 60px; background: var(--color-surface); border-radius: 4px; margin-bottom: 1rem;`}/>
          <div css={css`height: 320px; background: var(--color-surface); border-radius: var(--radius); margin-bottom: 2rem;`}/>
          {[90, 78, 85, 70].map((w, j) => (
            <div key={j} css={css`height: 16px; width: ${w}%; background: var(--color-surface); border-radius: 4px; margin-bottom: 0.6rem;`}/>
          ))}
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div css={css`
      text-align: center;
      padding: 5rem 0;
      color: var(--color-text-muted);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      line-height: 2;
    `}>
      <div css={css`font-size: 2rem; margin-bottom: 1rem; opacity: 0.3;`}>梦</div>
      <div>尚未生成</div>
      <div css={css`margin-top: 0.5rem; font-size: 0.75rem; opacity: 0.6;`}>每周日 10:10 CST 自动更新</div>
    </div>
  )
}
