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

  useEffect(() => {
    if (entries.length === 0) return
    const observers: IntersectionObserver[] = []
    entries.forEach((_, i) => {
      const el = itemRefs.current[i]
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
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

  function fmtDate(dateStr: string) {
    // "2026年04月21日—04月28日" → "2026-04-21"
    const m = dateStr.match(/(\d{4})年(\d{2})月(\d{2})日/)
    if (m) return `${m[1]}-${m[2]}-${m[3]}`
    return dateStr.split('—')[0].replace('年', '-').replace('月', '-').replace('日', '')
  }

  return (
    <div css={css`position: relative;`}>
      {/* ── 右侧时间轴 ── */}
      <div
        css={css`
          position: fixed;
          right: 2.5rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          @media (max-width: 1100px) {
            display: none;
          }
        `}
      >
        {/* 竖线 */}
        <div css={css`
          position: absolute;
          left: 5px;
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
              align-items: center;
              gap: 0.6rem;
              background: none;
              border: none;
              cursor: pointer;
              padding: 0.7rem 0;
            `}
          >
            {/* 圆点 */}
            <div css={css`
              width: 10px;
              height: 10px;
              border-radius: 50%;
              flex-shrink: 0;
              background: ${i === activeIndex ? 'var(--color-primary)' : 'var(--color-bg)'};
              border: 2px solid ${i === activeIndex ? 'var(--color-primary)' : 'var(--color-border)'};
              transition: all 0.3s ease;
              box-shadow: ${i === activeIndex ? `0 0 0 3px rgba(240,120,32,0.15), 0 0 8px rgba(240,120,32,0.3)` : 'none'};
              &:hover { border-color: var(--color-primary); transform: scale(1.3); }
            `}/>
            {/* 日期标签（右侧，横向） */}
            <span css={css`
              font-family: var(--font-mono);
              font-size: 0.62rem;
              color: ${i === activeIndex ? 'var(--color-primary)' : 'var(--color-text-muted)'};
              letter-spacing: 0.06em;
              white-space: nowrap;
              transition: color 0.3s;
              opacity: ${i === activeIndex ? 1 : 0.6};
              &:hover { opacity: 1; color: var(--color-primary); }
            `}>
              {fmtDate(entry.date)}
            </span>
          </button>
        ))}
      </div>

      {/* ── 页面内容 ── */}
      <div css={css`
        background: var(--color-bg);
        color: var(--color-text);
        transition: background 0.4s ease;
      `}>
        {/* 页头 */}
        <div css={css`
          max-width: 820px;
          margin: 0 auto;
          padding: 5rem 2rem 2rem;
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

        {/* 列表 */}
        <div css={css`
          max-width: 820px;
          margin: 0 auto;
          padding: 1rem 2rem 6rem;
        `}>
          {loading ? (
            <LoadingSkeleton />
          ) : entries.length === 0 ? (
            <EmptyState />
          ) : entries.map((entry, i) => (
            <DreamItem
              key={entry.weekOf}
              entry={entry}
              ref={el => { itemRefs.current[i] = el }}
              isLast={i === entries.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function fmtDate(dateStr: string) {
  const m = dateStr.match(/(\d{4})年(\d{2})月(\d{2})日/)
  if (m) return `${m[1]}-${m[2]}-${m[3]}`
  return dateStr.split('—')[0].replace('年', '-').replace('月', '-').replace('日', '')
}

const DreamItem = (
  { entry, ref, isLast }: { entry: DreamEntry; ref: React.Ref<HTMLDivElement>; isLast: boolean }
) => (
  <div
    ref={ref}
    css={css`
      position: relative;
      padding-bottom: 4rem;
    `}
  >
    {/* 分隔装饰 */}
    {!isLast && (
      <div css={css`
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 3.5rem;
      `}>
        <div css={css`flex: 1; height: 1px; background: linear-gradient(to right, var(--color-border), transparent);`}/>
        <div css={css`
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--color-text-muted);
          letter-spacing: 0.2em;
          opacity: 0.4;
          user-select: none;
        `}>
          · · ·
        </div>
        <div css={css`flex: 1; height: 1px; background: linear-gradient(to left, var(--color-border), transparent);`}/>
      </div>
    )}

    {/* 内容卡片 */}
    <div css={css`
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      overflow: hidden;
      transition: border-color 0.3s;
      &:hover { border-color: rgba(240,120,32,0.3); }
    `}>
      {/* 顶部色条 */}
      <div css={css`
        height: 3px;
        background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
      `}/>

      {/* 图片 */}
      <div css={css`
        width: 100%;
        height: 340px;
        overflow: hidden;
        background: var(--color-surface-2);
        @media (max-width: 600px) {
          height: 220px;
        }
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
            &:hover { transform: scale(1.04); }
          `}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>

      {/* 文字 */}
      <div css={css`padding: 2rem 2.5rem;`}>
        {/* 周标签 */}
        <div css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
        `}>
          <div css={css`
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--color-primary);
            letter-spacing: 0.12em;
            text-transform: uppercase;
          `}>
            {entry.weekOf}
          </div>
          <div css={css`
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--color-text-muted);
            letter-spacing: 0.06em;
          `}>
            {fmtDate(entry.date)}
          </div>
        </div>

        {/* 碎碎念 */}
        <div css={css`
          font-family: var(--font-sans);
          font-size: clamp(0.95rem, 1.8vw, 1.05rem);
          line-height: 2.3;
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

function LoadingSkeleton() {
  return (
    <div css={css`display: flex; flex-direction: column; gap: 3rem; padding-top: 1rem;`}>
      {[0, 1].map(i => (
        <div key={i} css={css`
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          overflow: hidden;
          animation: pulse 2s ease-in-out infinite ${i * 0.2}s;
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        `}>
          <div css={css`height: 3px; background: linear-gradient(to right, var(--color-primary), var(--color-secondary));`}/>
          <div css={css`height: 340px; background: var(--color-surface-2);`}/>
          <div css={css`padding: 2rem;`}>
            <div css={css`height: 10px; width: 30%; background: var(--color-surface-2); border-radius: 4px; margin-bottom: 1.2rem;`}/>
            {[90, 80, 85, 72].map((w, j) => (
              <div key={j} css={css`height: 15px; width: ${w}%; background: var(--color-surface-2); border-radius: 4px; margin-bottom: 0.6rem;`}/>
            ))}
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
