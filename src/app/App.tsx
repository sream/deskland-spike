import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { MainScene } from '../game/scenes/MainScene'
import './App.css'

const getBackingScale = () => Math.max(1, window.devicePixelRatio || 1)

export function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const getCanvasSize = () => {
      const backingScale = getBackingScale()

      return {
        width: Math.round(container.clientWidth * backingScale),
        height: Math.round(container.clientHeight * backingScale),
      }
    }

    const { width, height } = getCanvasSize()

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      width,
      height,
      scene: [MainScene],
    })

    const syncGameSize = () => {
      const { width: nextWidth, height: nextHeight } = getCanvasSize()

      if (nextWidth > 0 && nextHeight > 0) {
        game.scale.resize(nextWidth, nextHeight)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      syncGameSize()
    })

    resizeObserver.observe(container)
    window.addEventListener('resize', syncGameSize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', syncGameSize)
      game.destroy(true)
    }
  }, [])

  return (
    <main className="app">
      <section className="game-shell">
        <h1 className="game-title">Deskland Spike</h1>
        <div ref={containerRef} className="game-container" />
      </section>
    </main>
  )
}
