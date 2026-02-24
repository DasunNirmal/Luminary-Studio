import { useEffect, useRef } from 'react'

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const followerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cursor = cursorRef.current!
        const follower = followerRef.current!

        let fx = 0, fy = 0
        let mx = 0, my = 0

        const onMove = (e: MouseEvent) => {
            mx = e.clientX
            my = e.clientY
            cursor.style.left = mx + 'px'
            cursor.style.top = my + 'px'
        }

        const animate = () => {
            fx += (mx - fx) * 0.12
            fy += (my - fy) * 0.12
            follower.style.left = fx + 'px'
            follower.style.top = fy + 'px'
            requestAnimationFrame(animate)
        }
        animate()

        const onEnter = () => {
            cursor.classList.add('cursor-grow')
            follower.classList.add('follower-grow')
        }
        const onLeave = () => {
            cursor.classList.remove('cursor-grow')
            follower.classList.remove('follower-grow')
        }

        document.addEventListener('mousemove', onMove)
        document.querySelectorAll('a, button, [data-magnetic]').forEach((el) => {
            el.addEventListener('mouseenter', onEnter)
            el.addEventListener('mouseleave', onLeave)
        })

        return () => document.removeEventListener('mousemove', onMove)
    }, [])

    return (
        <>
            <div ref={cursorRef} className="cursor" />
            <div ref={followerRef} className="cursor-follower" />
        </>
    )
}