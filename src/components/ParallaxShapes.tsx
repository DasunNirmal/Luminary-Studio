import { motion, useScroll, useTransform } from 'framer-motion'

interface ShapeLayerProps {
    sectionRef: React.RefObject<HTMLDivElement | null>
}

export default function ParallaxShapes({ sectionRef }: ShapeLayerProps) {
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    // Each shape moves at a different speed — creates depth
    const y1 = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
    const y2 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])
    const y3 = useTransform(scrollYProgress, [0, 1], ['-35%', '35%'])
    const y4 = useTransform(scrollYProgress, [0, 1], ['10%', '-30%'])
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180])
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120])
    const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

            {/* Large slow circle — back layer */}
            <motion.div
                style={{ y: y1, rotate: rotate1 }}
                className="absolute -right-32 top-10 w-[500px] h-[500px] rounded-full border border-violet-500/8"
            />
            <motion.div
                style={{ y: y1 }}
                className="absolute -right-48 top-20 w-[600px] h-[600px] rounded-full border border-violet-500/5"
            />

            {/* Medium circle — mid layer */}
            <motion.div
                style={{ y: y2, scale: scale1 }}
                className="absolute -left-24 bottom-20 w-80 h-80 rounded-full border border-indigo-500/10"
            />

            {/* Small fast circle — front layer */}
            <motion.div
                style={{ y: y3 }}
                className="absolute right-1/4 top-1/3 w-24 h-24 rounded-full border border-violet-400/15"
            />

            {/* Rotating square */}
            <motion.div
                style={{ y: y4, rotate: rotate2 }}
                className="absolute left-1/3 bottom-1/4 w-16 h-16 border border-violet-500/15"
            />

            {/* Horizontal line accents */}
            <motion.div
                style={{ y: y2 }}
                className="absolute left-0 top-1/3 w-32 h-px bg-gradient-to-r from-violet-500/20 to-transparent"
            />
            <motion.div
                style={{ y: y3 }}
                className="absolute right-0 bottom-1/3 w-48 h-px bg-gradient-to-l from-violet-500/20 to-transparent"
            />

            {/* Dot cluster */}
            <motion.div style={{ y: y1 }} className="absolute right-12 bottom-1/3 flex flex-col gap-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-2">
                        {[...Array(5)].map((_, j) => (
                            <div key={j} className="w-1 h-1 rounded-full bg-violet-500/20" />
                        ))}
                    </div>
                ))}
            </motion.div>

            {/* Large gradient orb — glows and moves */}
            <motion.div
                style={{ y: y2 }}
                className="absolute -left-40 top-1/2 w-96 h-96 rounded-full bg-violet-600/5 blur-3xl"
            />
            <motion.div
                style={{ y: y3 }}
                className="absolute -right-40 top-1/4 w-80 h-80 rounded-full bg-indigo-600/5 blur-3xl"
            />
        </div>
    )
}