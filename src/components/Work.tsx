import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const projects = [
    {
        id: 1,
        title: 'Nebula App',
        category: 'UI/UX Design',
        year: '2025',
        bg: 'from-violet-900 via-purple-900 to-black',
        accent: '#8b5cf6',
    },
    {
        id: 2,
        title: 'Pulse Brand',
        category: 'Brand Identity',
        year: '2025',
        bg: 'from-rose-900 via-pink-900 to-black',
        accent: '#f43f5e',
    },
    {
        id: 3,
        title: 'Echo Platform',
        category: 'Web Development',
        year: '2024',
        bg: 'from-cyan-900 via-blue-900 to-black',
        accent: '#06b6d4',
    },
    {
        id: 4,
        title: 'Prism Studio',
        category: 'Motion Design',
        year: '2024',
        bg: 'from-amber-900 via-orange-900 to-black',
        accent: '#f59e0b',
    },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            className={`relative flex-shrink-0 w-[420px] h-[520px] rounded-3xl overflow-hidden bg-gradient-to-br ${project.bg} border border-white/10 cursor-none group`}
        >
            {/* Grid texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />

            {/* Glow on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"
                style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}30, transparent 70%)` }}
            />

            {/* 3D-ish decorative circle */}
            <div
                className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/5 group-hover:scale-110 transition-transform duration-700"
                style={{ background: `radial-gradient(circle, ${project.accent}20, transparent)` }}
            />
            <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border border-white/5" />

            {/* Number */}
            <div className="absolute top-8 right-8 text-white/10 text-8xl font-black leading-none">
                0{project.id}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-2">{project.category}</p>
                <h3 className="text-white text-3xl font-black mb-1">{project.title}</h3>
                <p className="text-white/30 text-sm mb-6">{project.year}</p>

                <motion.div
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-2 text-xs tracking-widest uppercase"
                    style={{ color: project.accent }}
                >
                    <span>View Project</span>
                    <span>→</span>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default function Work() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    // As you scroll the container, move the inner track horizontally
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])

    return (
        // Tall container to give room for pin effect
        <section id="work" ref={containerRef} className="relative bg-black/85" style={{ height: '300vh' }}>
            {/* Sticky wrapper */}
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-black/85">
                {/* Header */}
                <div className="px-8 md:px-16 mb-12 flex items-end justify-between">
                    <div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-violet-400 tracking-[0.4em] text-xs uppercase mb-3"
                        >
                            Portfolio
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white"
                        >
                            Selected Work
                        </motion.h2>
                    </div>
                    <p className="text-white/30 text-sm hidden md:block">
                        — scroll to explore
                    </p>
                </div>

                {/* Horizontally scrolling track */}
                <div className="overflow-visible">
                    <motion.div
                        style={{ x }}
                        className="flex gap-6 pl-8 md:pl-16"
                    >
                        {projects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}