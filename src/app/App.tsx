import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { MainScene } from '../game/scenes/MainScene'
import './App.css'

export function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      width: container.clientWidth,
      height: container.clientHeight,
      scene: [MainScene],
    })

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) {
        game.scale.resize(width, height)
      }
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
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
