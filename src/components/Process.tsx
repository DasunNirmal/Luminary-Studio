import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ParallaxShapes from './ParallaxShapes'

const steps = [
    { num: '01', title: 'Discover', desc: 'We dive deep into your brand, audience, and goals to understand what makes you truly unique.' },
    { num: '02', title: 'Strategize', desc: 'Armed with insights, we craft a clear creative strategy that maps the path from vision to reality.' },
    { num: '03', title: 'Create', desc: 'Our team brings the strategy to life — designing, building, and animating with obsessive attention to detail.' },
    { num: '04', title: 'Launch', desc: 'We deploy, test, and optimize — ensuring every interaction is smooth, fast, and flawless from day one.' },
]

export default function Process() {
    const { ref, isInView } = useScrollAnimation()
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
    const bgTextY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
    const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

    return (
        <section ref={sectionRef} className="bg-black/85 py-40 px-8 border-t border-white/5 relative">
            <ParallaxShapes sectionRef={sectionRef} />

            {/* Ghost BG text */}
            <motion.div
                style={{ y: bgTextY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            >
                <span className="text-[16vw] font-black uppercase tracking-widest whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.07)' }}>PROCESS</span>
            </motion.div>

            <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-6"
                >
                    <span className="text-violet-400 tracking-[0.5em] text-xs uppercase">How We Work</span>
                </motion.div>

                <div className="overflow-hidden text-center mb-20">
                    <motion.h2
                        initial={{ y: 80 }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-7xl font-black text-white"
                    >
                        Our Process
                    </motion.h2>
                </div>

                {/* Timeline with scroll-linked connecting line */}
                <div className="relative">
                    {/* Vertical line that draws as you scroll */}
                    <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-[19px] md:left-1/2 top-0 w-px bg-gradient-to-b from-violet-500 to-indigo-500 origin-top hidden md:block"
                    />

                    <div className="flex flex-col gap-0">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className={`relative flex items-center gap-8 py-12 ${
                                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                            >
                                {/* Content */}
                                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="inline-block border border-white/8 rounded-2xl p-8 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 cursor-none text-left"
                                    >
                                        <span className="text-violet-400/50 text-xs font-mono tracking-widest">{step.num}</span>
                                        <h3 className="text-white text-2xl font-black mt-2 mb-3">{step.title}</h3>
                                        <p className="text-white/35 text-sm leading-relaxed">{step.desc}</p>
                                    </motion.div>
                                </div>

                                {/* Center dot */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-violet-500/40 bg-black items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-violet-400" />
                                </div>

                                {/* Empty spacer for alternating layout */}
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}