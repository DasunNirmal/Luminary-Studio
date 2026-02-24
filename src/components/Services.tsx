import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Layers, Zap, Globe, Cpu } from 'lucide-react'
import ParallaxShapes from './ParallaxShapes'
import { useRef } from 'react'

const services = [
    { icon: Layers, title: 'Brand Identity', num: '01', description: 'We craft memorable brand identities that resonate with your audience and set you apart in a noisy world.' },
    { icon: Zap, title: 'Motion Design', num: '02', description: 'From micro-interactions to full animations, we bring interfaces to life with purposeful, beautiful motion.' },
    { icon: Globe, title: 'Web Development', num: '03', description: 'Blazing fast, beautifully crafted websites and applications built with the most modern technologies available.' },
    { icon: Cpu, title: 'AI Integration', num: '04', description: 'We integrate intelligent AI solutions that automate workflows and create smarter, more human products.' },
]

export default function Services() {
    const { ref, isInView } = useScrollAnimation()
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
    const bgTextY = useTransform(scrollYProgress, [0, 1], ['5%', '-15%'])

    return (
        <section id="services" ref={sectionRef} className="bg-black/85 py-40 px-8 border-t border-white/5 relative">
            {/* Floating geometric shapes */}
            <ParallaxShapes sectionRef={sectionRef} />

            {/* Ghost background word — OUTSIDE the content div, positioned absolute */}
            <motion.div
                style={{ y: bgTextY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            >
                <span className="text-[18vw] font-black uppercase tracking-widest whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.07)' }}>SERVICES</span>
            </motion.div>

            {/* Actual content */}
            <div className="max-w-6xl mx-auto relative z-10" ref={ref}>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-4"
                >
                    <span className="text-violet-400 tracking-[0.5em] text-xs uppercase">What We Do</span>
                </motion.div>

                <div className="overflow-hidden text-center mb-20">
                    <motion.h2
                        initial={{ y: 80 }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-7xl font-black text-white"
                    >
                        Our Services
                    </motion.h2>
                </div>

                <div className="flex flex-col">
                    {services.map((service, i) => {
                        const Icon = service.icon
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                                whileHover={{ x: 12 }}
                                className="group border-t border-white/10 py-8 flex items-center justify-between gap-8 cursor-none transition-all duration-300 last:border-b last:border-white/10"
                            >
                                <div className="flex items-center gap-8">
                                    <span className="text-white/20 text-sm font-mono w-6">{service.num}</span>
                                    <div className="w-10 h-10 rounded-lg bg-violet-600/15 flex items-center justify-center group-hover:bg-violet-600/30 transition-colors">
                                        <Icon className="text-violet-400" size={18} />
                                    </div>
                                    <h3 className="text-white text-xl md:text-2xl font-bold">{service.title}</h3>
                                </div>
                                <div className="flex items-center gap-8">
                                    <p className="text-white/30 text-sm max-w-sm hidden md:block">{service.description}</p>
                                    <motion.span
                                        whileHover={{ x: 4 }}
                                        className="text-violet-400 text-xs tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Read More →
                                    </motion.span>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}