import { motion, useScroll, useTransform } from 'framer-motion'

interface ShapeLayerProps {
    sectionRef: React.RefObject<HTMLDivElement | null>
}

export default function ParallaxShapes({ sectionRef }: ShapeLayerProps) {
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    const y1 = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
    const y2 = useTransform(scrollYProgress, [0, 1], ['15%', '-15%'])
    const y3 = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])
    const y4 = useTransform(scrollYProgress, [0, 1], ['10%', '-25%'])
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180])
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120])
    const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9])

    return (
        <div className="absolute inset-0 pointer-events-none">

            {/* Large slow ring — right side, clearly visible */}
            <motion.div
                style={{ y: y1, rotate: rotate1 }}
                className="absolute -right-20 top-10 w-[460px] h-[460px] rounded-full border border-violet-500/30"
            />
            {/* Second outer ring */}
            <motion.div
                style={{ y: y1 }}
                className="absolute -right-36 top-0 w-[580px] h-[580px] rounded-full border border-violet-400/15"
            />

            {/* Left side ring */}
            <motion.div
                style={{ y: y2, scale: scale1 }}
                className="absolute -left-20 bottom-10 w-72 h-72 rounded-full border border-indigo-400/25"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute -left-32 bottom-0 w-96 h-96 rounded-full border border-indigo-400/12"
            />

            {/* Small floating circle — mid page */}
            <motion.div
                style={{ y: y3 }}
                className="absolute right-1/4 top-1/4 w-20 h-20 rounded-full border border-violet-400/30"
            />

            {/* Rotating square */}
            <motion.div
                style={{ y: y4, rotate: rotate2 }}
                className="absolute left-1/4 bottom-1/3 w-14 h-14 border border-violet-400/25"
            />

            {/* Another small square top-left */}
            <motion.div
                style={{ y: y3, rotate: rotate1 }}
                className="absolute left-16 top-1/4 w-8 h-8 border border-violet-300/20"
            />

            {/* Horizontal line accents — left */}
            <motion.div
                style={{ y: y2 }}
                className="absolute left-0 top-1/3 w-40 h-px bg-gradient-to-r from-violet-500/40 to-transparent"
            />
            {/* Horizontal line accents — right */}
            <motion.div
                style={{ y: y3 }}
                className="absolute right-0 bottom-1/3 w-56 h-px bg-gradient-to-l from-violet-500/40 to-transparent"
            />
            {/* Vertical line */}
            <motion.div
                style={{ y: y1 }}
                className="absolute right-1/3 top-0 w-px h-32 bg-gradient-to-b from-transparent via-violet-500/30 to-transparent"
            />

            {/* Dot grid — bottom right */}
            <motion.div style={{ y: y1 }} className="absolute right-12 bottom-1/4 flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                        {[...Array(5)].map((_, j) => (
                            <div key={j} className="w-1.5 h-1.5 rounded-full bg-violet-400/35" />
                        ))}
                    </div>
                ))}
            </motion.div>

            {/* Dot grid — top left */}
            <motion.div style={{ y: y2 }} className="absolute left-12 top-1/4 flex flex-col gap-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                        {[...Array(4)].map((_, j) => (
                            <div key={j} className="w-1.5 h-1.5 rounded-full bg-indigo-400/25" />
                        ))}
                    </div>
                ))}
            </motion.div>

            {/* Glowing orbs — more visible now */}
            <motion.div
                style={{ y: y2 }}
                className="absolute -left-20 top-1/2 w-72 h-72 rounded-full bg-violet-600/12 blur-3xl"
            />
            <motion.div
                style={{ y: y3 }}
                className="absolute -right-20 top-1/4 w-64 h-64 rounded-full bg-indigo-600/12 blur-3xl"
            />
            <motion.div
                style={{ y: y4 }}
                className="absolute left-1/2 bottom-0 w-48 h-48 rounded-full bg-violet-500/8 blur-2xl"
            />
        </div>
    )
}