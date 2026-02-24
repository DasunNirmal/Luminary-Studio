import { useEffect, useRef } from 'react'

interface Star {
    x: number
    y: number
    size: number
    opacity: number
    twinkleSpeed: number
    twinkleOffset: number
    vy: number  // current velocity
}

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!
        let animId: number
        let time = 0

        // Scroll velocity tracking
        let lastScrollY = window.scrollY
        let scrollVelocity = 0
        let targetVelocity = 0

        const onScroll = () => {
            const currentScrollY = window.scrollY
            targetVelocity = (currentScrollY - lastScrollY) * 0.3
            lastScrollY = currentScrollY
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const VIRTUAL_HEIGHT_MULTIPLIER = 6

        const stars: Star[] = Array.from({ length: 900 }, () => ({
            x: Math.random(),
            y: Math.random() * VIRTUAL_HEIGHT_MULTIPLIER,
            size: Math.random() * 1.4 + 0.2,
            opacity: Math.random() * 0.7 + 0.15,
            twinkleSpeed: Math.random() * 0.8 + 0.3,
            twinkleOffset: Math.random() * Math.PI * 2,
            vy: 0,
        }))

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time += 0.016

            // Smooth velocity — lerp toward target then decay
            scrollVelocity += (targetVelocity - scrollVelocity) * 0.15
            targetVelocity *= 0.85  // decay

            const scrollFraction = window.scrollY / Math.max(
                document.body.scrollHeight - window.innerHeight, 1
            )
            const viewTop = scrollFraction * (VIRTUAL_HEIGHT_MULTIPLIER - 1)
            const viewBottom = viewTop + 1

            stars.forEach((star) => {
                if (star.y < viewTop - 0.05 || star.y > viewBottom + 0.05) return

                const screenY = ((star.y - viewTop) / 1) * canvas.height
                const screenX = star.x * canvas.width

                // Twinkle dampens when scrolling fast — stars streak instead
                const speed = Math.abs(scrollVelocity)
                const twinkle = Math.sin(time * star.twinkleSpeed * 3 + star.twinkleOffset)
                const opacity = star.opacity * (0.5 + 0.5 * twinkle)

                // Streak length proportional to scroll speed
                const streakLength = Math.min(speed * 4, 40)

                if (streakLength > 2) {
                    // Draw as a streak/line when scrolling
                    const gradient = ctx.createLinearGradient(
                        screenX, screenY,
                        screenX, screenY - streakLength
                    )
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
                    gradient.addColorStop(0.5, `rgba(167, 139, 250, ${opacity * 0.6})`)
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

                    ctx.beginPath()
                    ctx.strokeStyle = gradient
                    ctx.lineWidth = star.size * 0.8
                    ctx.moveTo(screenX, screenY)
                    ctx.lineTo(screenX, screenY - streakLength)
                    ctx.stroke()
                } else {
                    // Draw as normal dot when still
                    ctx.beginPath()
                    ctx.arc(screenX, screenY, star.size, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
                    ctx.fill()
                }

                // Purple glow for bigger stars
                if (star.size > 1.1) {
                    const gradient = ctx.createRadialGradient(
                        screenX, screenY, 0,
                        screenX, screenY, star.size * 3
                    )
                    gradient.addColorStop(0, `rgba(167, 139, 250, ${opacity * 0.5})`)
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
                    ctx.beginPath()
                    ctx.arc(screenX, screenY, star.size * 3, 0, Math.PI * 2)
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
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="star-canvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 10,
            }}
        />
    )
}