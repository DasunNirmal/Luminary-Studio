import { useEffect, useRef } from 'react'

interface Star {
    x: number
    y: number
    size: number
    opacity: number
    speed: number
    twinkleSpeed: number
    twinkleOffset: number
}

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!
        let animId: number
        let time = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Generate stars
        const stars: Star[] = Array.from({ length: 180 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 1.4 + 0.2,
            opacity: Math.random() * 0.6 + 0.1,
            speed: Math.random() * 0.015 + 0.005,   // very slow vertical drift
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinkleOffset: Math.random() * Math.PI * 2,
        }))

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time += 0.016

            stars.forEach((star) => {
                // Twinkle — each star pulses at its own speed
                const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset)
                const opacity = star.opacity * (0.5 + 0.5 * twinkle)

                // Slow drift upward, wrap around
                star.y -= star.speed
                if (star.y < 0) {
                    star.y = canvas.height
                    star.x = Math.random() * canvas.width
                }

                // Draw star
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
                ctx.fill()

                // Add a subtle glow to slightly bigger stars
                if (star.size > 1.1) {
                    ctx.beginPath()
                    ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2)
                    const gradient = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.size * 2.5
                    )
                    gradient.addColorStop(0, `rgba(167, 139, 250, ${opacity * 0.4})`)
                    gradient.addColorStop(1, 'rgba(0,0,0,0)')
                    ctx.fillStyle = gradient
                    ctx.fill()
                }
            })

            animId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    )
}