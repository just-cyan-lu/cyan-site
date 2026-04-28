import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  // 初始化：从 localStorage 读，不存在则按时间判断
  useEffect(() => {
    const saved = localStorage.getItem('cyan-theme') as Theme | null
    if (saved) {
      setTheme(saved)
      document.documentElement.dataset.theme = saved
      return
    }
    // 默认：8:00-20:00 为亮色
    const hour = new Date().getHours()
    const auto = hour >= 8 && hour < 20 ? 'light' : 'dark'
    setTheme(auto)
    document.documentElement.dataset.theme = auto
  }, [])

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem('cyan-theme', next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
