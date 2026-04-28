/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/* ─── 全局 keyframes ─────────────────────────── */
const globalStyles = css`
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-20px) rotate(3deg); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.5); opacity: 0; }
  }
`

/* ─── 通用样式 ───────────────────────────────── */
const sectionCss = css`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
`

const sectionTitleCss = css`
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--color-text);
  letter-spacing: -0.02em;
  span { color: var(--color-primary); }
`

/* ─── 背景装饰几何体 ───────────────────────────── */
const DecoShapes = () => (
  <div
    css={css`
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    `}
  >
    {/* 大圆形 — 左上 */}
    <div
      css={css`
        position: absolute;
        top: -15%;
        left: -10%;
        width: 50vw;
        height: 50vw;
        border-radius: 50%;
        border: 1px solid rgba(232,197,71,0.08);
        animation: float 12s ease-in-out infinite;
      `}
    />
    <div
      css={css`
        position: absolute;
        top: -5%;
        left: -5%;
        width: 35vw;
        height: 35vw;
        border-radius: 50%;
        border: 1px solid rgba(78,205,196,0.06);
        animation: float 16s ease-in-out infinite reverse;
      `}
    />
    {/* 方形 — 右下 */}
    <div
      css={css`
        position: absolute;
        bottom: -10%;
        right: -8%;
        width: 40vw;
        height: 40vw;
        border-radius: 24px;
        border: 1px solid rgba(232,197,71,0.06);
        transform: rotate(15deg);
        animation: float 14s ease-in-out infinite 2s;
      `}
    />
    {/* 旋转线条 */}
    <div
      css={css`
        position: absolute;
        top: 20%;
        right: 8%;
        width: 1px;
        height: 200px;
        background: linear-gradient(to bottom, transparent, rgba(78,205,196,0.3), transparent);
        animation: spin-slow 20s linear infinite;
        transform-origin: top center;
      `}
    />
    {/* 亮点 */}
    <div
      css={css`
        position: absolute;
        top: 30%;
        left: 15%;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--color-primary);
        box-shadow: 0 0 12px 4px rgba(232,197,71,0.3);
        animation: pulse-ring 3s ease-out infinite;
      `}
    />
  </div>
)

/* ─── 导航栏 ─────────────────────────────────── */
const Nav = () => (
  <motion.nav
    initial={{ y: -60, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    css={css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 1.2rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      backdrop-filter: blur(16px);
      background: rgba(17,17,24,0.7);
      border-bottom: 1px solid rgba(255,255,255,0.04);
    `}
  >
    <div
      css={css`
        font-family: var(--font-mono);
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 0.05em;
        color: var(--color-text);
      `}
    >
      Cyan<span css={css`color: var(--color-primary)`}>.lu</span>
    </div>
    <div
      css={css`
        display: flex;
        gap: 2rem;
        font-size: 0.875rem;
        color: var(--color-text-muted);
        font-family: var(--font-mono);
      `}
    >
      {['About', 'Photography', 'Contact'].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          css={css`
            transition: color 0.2s;
            &:hover { color: var(--color-text); }
          `}
        >
          {item}
        </a>
      ))}
    </div>
  </motion.nav>
)

/* ─── Hero ───────────────────────────────────── */
const Hero = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y   = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={ref}
      css={css`
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      `}
    >
      <motion.div
        style={{ y, opacity }}
        css={css`
          text-align: center;
          z-index: 1;
          padding: 0 1.5rem;
        `}
      >
        {/* 标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          css={css`
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--color-secondary);
            margin-bottom: 1.5rem;
            padding: 0.4rem 1rem;
            border: 1px solid rgba(78,205,196,0.25);
            border-radius: 100px;
          `}
        >
          <span
            css={css`
              width: 6px; height: 6px;
              border-radius: 50%;
              background: var(--color-secondary);
              box-shadow: 0 0 8px var(--color-secondary);
            `}
          />
          摄影师 · 前端探索者 · ENFP
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          css={css`
            font-family: var(--font-serif);
            font-size: clamp(3rem, 10vw, 7rem);
            font-weight: 700;
            line-height: 1.05;
            letter-spacing: -0.03em;
            color: var(--color-text);
            margin-bottom: 1.2rem;
          `}
        >
          浮光<span css={css`color: var(--color-primary)`}>.lu</span>
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          css={css`
            font-family: var(--font-sans);
            font-size: clamp(1rem, 2.5vw, 1.25rem);
            color: var(--color-text-muted);
            max-width: 480px;
            margin: 0 auto 2.5rem;
            font-weight: 300;
          `}
        >
          用镜头收藏日常，<br />
          用代码编织想法。
        </motion.p>

        {/* CTA 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          css={css`
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
          `}
        >
          <a
            href="#photography"
            css={css`
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.75rem 2rem;
              background: var(--color-primary);
              color: #000;
              font-family: var(--font-mono);
              font-size: 0.875rem;
              font-weight: 500;
              border-radius: var(--radius-sm);
              transition: transform 0.2s, box-shadow 0.2s;
              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(232,197,71,0.3);
              }
            `}
          >
            看看作品 →
          </a>
          <a
            href="#about"
            css={css`
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.75rem 2rem;
              border: 1px solid var(--color-border);
              color: var(--color-text-muted);
              font-family: var(--font-mono);
              font-size: 0.875rem;
              border-radius: var(--radius-sm);
              transition: border-color 0.2s, color 0.2s;
              &:hover {
                border-color: var(--color-text-muted);
                color: var(--color-text);
              }
            `}
          >
            了解更多
          </a>
        </motion.div>
      </motion.div>

      {/* 向下滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        css={css`
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-muted);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          animation: float 2.5s ease-in-out infinite;
        `}
      >
        <span>SCROLL</span>
        <div
          css={css`
            width: 1px;
            height: 40px;
            background: linear-gradient(to bottom, var(--color-text-muted), transparent);
          `}
        />
      </motion.div>
    </section>
  )
}

/* ─── About ─────────────────────────────────── */
const About = () => (
  <section
    id="about"
    css={css`
      ${sectionCss}
      padding: 8rem 2rem;
      position: relative;
      z-index: 1;
    `}
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      css={css`
        display: grid;
        grid-template-columns: 1fr 1.4fr;
        gap: 5rem;
        align-items: center;
        @media (max-width: 700px) {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
      `}
    >
      {/* 左侧标签 */}
      <div>
        <h2 css={sectionTitleCss}>关于<span>我</span></h2>
        <div
          css={css`
            width: 48px;
            height: 3px;
            background: var(--color-primary);
            border-radius: 2px;
            margin-top: -1rem;
            margin-bottom: 1.5rem;
          `}
        />
        <p
          css={css`
            font-size: 0.875rem;
            color: var(--color-text-muted);
            font-family: var(--font-mono);
            line-height: 1.8;
          `}
        >
          ENFP · 19岁 · 南方<br />
          扫街 / 人像 / 代码<br />
          追求「日常里的光」
        </p>
      </div>

      {/* 右侧正文 */}
      <div>
        <p
          css={css`
            font-size: clamp(1rem, 2vw, 1.15rem);
            line-height: 2;
            color: var(--color-text);
            margin-bottom: 1.5rem;
            font-weight: 300;
          `}
        >
          嗨，我是陆思源，圈内叫我 <strong css={css`color: var(--color-primary); font-weight: 500;`}>Cyan</strong>。
        </p>
        <p
          css={css`
            font-size: clamp(1rem, 2vw, 1.15rem);
            line-height: 2;
            color: var(--color-text-muted);
            margin-bottom: 1.5rem;
            font-weight: 300;
          `}
        >
          我喜欢拿着相机在城市里游走，寻找那些让人想停留的光影和表情。拍照这件事对我来说，是把日常里的某个瞬间收藏起来，回头看的时候还能想起那天的心情。
        </p>
        <p
          css={css`
            font-size: clamp(1rem, 2vw, 1.15rem);
            line-height: 2;
            color: var(--color-text-muted);
            font-weight: 300;
          `}
        >
          同时我也是前端萌新，正在用 React 和各种创意工具把脑海里的想法变成现实。代码和摄影对我而言是同一种事——<em css={css`font-style: normal; color: var(--color-text);`}>捕捉，创造，记录。</em>
        </p>

        {/* 标签列表 */}
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 2rem;
          `}
        >
          {['扫街', '人像', 'React', 'Vite', 'Framer Motion', 'ENFP', '胶片感', '日常'].map((tag) => (
            <span
              key={tag}
              css={css`
                padding: 0.3rem 0.85rem;
                border: 1px solid var(--color-border);
                border-radius: 100px;
                font-size: 0.78rem;
                font-family: var(--font-mono);
                color: var(--color-text-muted);
                transition: border-color 0.2s, color 0.2s;
                &:hover {
                  border-color: var(--color-primary);
                  color: var(--color-primary);
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
)

/* ─── Photography ───────────────────────────── */
const Photography = () => {
  const works = [
    {
      title: '城市黄昏',
      desc: '广州天河，傍晚六点的过街天桥',
      tag: '扫街',
      year: '2025',
      color: '#e8c547',
    },
    {
      title: '下午三点的光',
      desc: '地铁站里一个女孩望向远方的瞬间',
      tag: '人像',
      year: '2025',
      color: '#4ecdc4',
    },
    {
      title: '光',
      desc: '午后阳光穿过老骑楼的光影',
      tag: '扫街',
      year: '2025',
      color: '#e8c547',
    },
  ]

  return (
    <section
      id="photography"
      css={css`
        ${sectionCss}
        padding: 6rem 2rem 8rem;
        position: relative;
        z-index: 1;
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <h2 css={sectionTitleCss}>摄影<span>作品</span></h2>

        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
          `}
        >
          {works.map((work, i) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -6 }}
              css={css`
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius);
                overflow: hidden;
                cursor: pointer;
                transition: border-color 0.3s;
                &:hover { border-color: ${work.color}40; }
              `}
            >
              {/* 占位图 */}
              <div
                css={css`
                  height: 200px;
                  background: linear-gradient(135deg, var(--color-surface-2), var(--color-bg));
                  position: relative;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                `}
              >
                {/* 装饰方块 */}
                <div
                  css={css`
                    position: absolute;
                    top: 1rem; right: 1rem;
                    bottom: 1rem; left: 1rem;
                    border: 1px solid ${work.color}20;
                    border-radius: 8px;
                  `}
                />
                <div
                  css={css`
                    font-family: var(--font-mono);
                    font-size: 4rem;
                    font-weight: 700;
                    color: ${work.color}15;
                    user-select: none;
                    letter-spacing: -0.05em;
                  `}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* 标签角标 */}
                <div
                  css={css`
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                    padding: 0.25rem 0.65rem;
                    background: ${work.color}15;
                    border: 1px solid ${work.color}40;
                    border-radius: 100px;
                    font-size: 0.7rem;
                    font-family: var(--font-mono);
                    color: ${work.color};
                    letter-spacing: 0.05em;
                  `}
                >
                  {work.tag}
                </div>
              </div>

              {/* 文字 */}
              <div css={css`padding: 1.25rem;`}>
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    margin-bottom: 0.4rem;
                  `}
                >
                  <h3
                    css={css`
                      font-family: var(--font-serif);
                      font-size: 1.1rem;
                      font-weight: 700;
                      color: var(--color-text);
                    `}
                  >
                    {work.title}
                  </h3>
                  <span
                    css={css`
                      font-family: var(--font-mono);
                      font-size: 0.7rem;
                      color: var(--color-text-muted);
                    `}
                  >
                    {work.year}
                  </span>
                </div>
                <p
                  css={css`
                    font-size: 0.85rem;
                    color: var(--color-text-muted);
                    font-weight: 300;
                  `}
                >
                  {work.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          css={css`
            text-align: center;
            margin-top: 3rem;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--color-text-muted);
          `}
        >
          更多作品整理中，敬请期待 📸
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─── Contact ───────────────────────────────── */
const Contact = () => (
  <section
    id="contact"
    css={css`
      ${sectionCss}
      padding: 6rem 2rem 8rem;
      position: relative;
      z-index: 1;
    `}
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      css={css`
        text-align: center;
        max-width: 560px;
        margin: 0 auto;
      `}
    >
      <h2 css={sectionTitleCss}>联系<span>我</span></h2>
      <p
        css={css`
          font-size: 1rem;
          color: var(--color-text-muted);
          line-height: 1.9;
          margin-bottom: 2.5rem;
          font-weight: 300;
        `}
      >
        摄影、代码、创意合作，或者只是想聊聊，都可以。<br />
        我通常会在 24 小时内回复。
      </p>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        `}
      >
        {[
          { label: 'Email', value: 'just.cyan.lu @gmail.com', href: 'mailto:just.cyan.lu@gmail.com' },
          { label: 'GitHub', value: 'just-cyan-lu', href: 'https://github.com/just-cyan-lu' },
          { label: '微信', value: '私信获取', href: '#' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            css={css`
              display: flex;
              align-items: center;
              gap: 0.75rem;
              padding: 0.85rem 1.75rem;
              background: var(--color-surface);
              border: 1px solid var(--color-border);
              border-radius: var(--radius);
              width: 100%;
              max-width: 340px;
              transition: border-color 0.2s, transform 0.2s;
              &:hover {
                border-color: var(--color-primary);
                transform: translateX(4px);
              }
            `}
          >
            <span
              css={css`
                font-family: var(--font-mono);
                font-size: 0.7rem;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: var(--color-primary);
                min-width: 52px;
              `}
            >
              {item.label}
            </span>
            <span
              css={css`
                font-size: 0.9rem;
                color: var(--color-text);
              `}
            >
              {item.value}
            </span>
          </a>
        ))}
      </div>
    </motion.div>
  </section>
)

/* ─── Footer ────────────────────────────────── */
const Footer = () => (
  <footer
    css={css`
      ${sectionCss}
      padding: 2rem;
      border-top: 1px solid var(--color-border);
      position: relative;
      z-index: 1;
    `}
  >
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--color-text-muted);
        @media (max-width: 600px) {
          flex-direction: column;
          gap: 0.5rem;
          text-align: center;
        }
      `}
    >
      <span>
        © {new Date().getFullYear()} 陆思源 <span css={css`color: var(--color-primary)`}>Cyan</span>
      </span>
      <span css={css`letter-spacing: 0.05em;`}>
        用快门记录，用代码创造
      </span>
    </div>
  </footer>
)

/* ─── 导出主页 ───────────────────────────────── */
export default function Home() {
  return (
    <>
      <Global styles={globalStyles} />
      <DecoShapes />
      <Nav />
      <Hero />
      <About />
      <Photography />
      <Contact />
      <Footer />
    </>
  )
}
