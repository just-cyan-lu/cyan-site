/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

export default function Nav() {
  const { theme, toggle } = useTheme()
  return (
    <div css={css`
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      backdrop-filter: blur(12px);
      background: var(--color-nav-bg);
      border-bottom: 1px solid var(--color-border);
      transition: background 0.4s ease;
    `}>
      {/* 左侧 logo */}
      <Link to="/" css={css`
        font-family: var(--font-mono);
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--color-text);
        text-decoration: none;
        letter-spacing: 0.04em;
      `}>
        浮光<span css={css`color: var(--color-primary)`}></span>
      </Link>

      {/* 右侧：导航链接 + 主题切换 */}
      <div css={css`display: flex; align-items: center; gap: 1.5rem;`}>
        <nav css={css`display: flex; gap: 1.5rem; align-items: center;`}>
          <Link to="/about" css={css`
            font-family: var(--font-mono); font-size: 0.875rem;
            color: var(--color-text-muted); letter-spacing: 0.06em; transition: color 0.2s;
            &:hover { color: var(--color-primary); }
          `}>出厂设置</Link>
          <Link to="/story" css={css`
            font-family: var(--font-mono); font-size: 0.875rem;
            color: #f07820; font-weight: 500; letter-spacing: 0.06em; transition: opacity 0.2s;
            &:hover { opacity: 0.75; }
          `}>留痕</Link>
          <Link to="/dream" css={css`
            font-family: var(--font-mono); font-size: 0.875rem;
            color: #38b6ff; font-weight: 500; letter-spacing: 0.06em; transition: opacity 0.2s;
            &:hover { opacity: 0.75; }
          `}>梦</Link>
        </nav>

        <button onClick={toggle} aria-label="切换主题" css={css`
          display: flex; align-items: center; justify-content: center;
          width: 30px; height: 30px;
          border: 1px solid var(--color-border);
          border-radius: 50%;
          background: var(--color-surface);
          color: var(--color-text-muted);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          &:hover { border-color: var(--color-primary); color: var(--color-primary); }
        `}>
          {theme === 'light' ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
