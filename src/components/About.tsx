import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ParallaxShapes from './ParallaxShapes'

const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '120+', label: 'Projects Delivered' },
    { value: '40+', label: 'Happy Clients' },
    { value: '12', label: 'Team Members' },
]

export default function About() {
    const { ref, isInView } = useScrollAnimation()
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
    const bgTextY = useTransform(scrollYProgress, [0, 1], ['5%', '-15%'])

    return (
        <section id="about" ref={sectionRef} className="bg-black py-40 px-8 overflow-hidden relative border-t border-white/5">
            <ParallaxShapes sectionRef={sectionRef} />

            {/* Ghost background text */}
            <motion.div
                style={{ y: bgTextY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            >
                <span className="text-[20vw] font-black text-white/[0.025] uppercase tracking-widest">ABOUT</span>
            </motion.div>

            <div className="max-w-6xl mx-auto relative" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-violet-400 tracking-[0.5em] text-xs uppercase">About Us</span>
                </motion.div>

                <div className="text-center mb-20 overflow-hidden">
                    {['We push the limits', 'of digital design.'].map((line, li) => (
                        <div key={li} className="overflow-hidden">
                            <motion.h2
                                initial={{ y: 80 }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{ duration: 0.9, delay: li * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl md:text-7xl font-black text-white leading-tight"
                            >
                                {line.includes('digital') ? (
                                    <>of <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">digital design.</span></>
                                ) : line}
                            </motion.h2>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid md:grid-cols-2 gap-12 mb-24 max-w-4xl mx-auto"
                >
                    <p className="text-white/40 text-base leading-relaxed">
                        Luminary Studio is a forward-thinking creative agency specializing in immersive digital experiences that captivate audiences worldwide.
                    </p>
                    <p className="text-white/40 text-base leading-relaxed">
                        We blend cutting-edge technology with bold artistic vision to build brands that don't just look beautiful — they perform.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.08 + 0.5 }}
                            whileHover={{ backgroundColor: 'rgba(139,92,246,0.08)' }}
                            className="p-8 text-center bg-black transition-colors duration-300"
                        >
                            <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</p>
                            <p className="text-white/30 text-xs tracking-[0.2em] uppercase">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}