import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import * as THREE from 'three'

function AnimatedBlob() {
    const meshRef = useRef<THREE.Mesh>(null)
    useFrame((state) => {
        if (!meshRef.current) return
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    })
    return (
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
            <mesh ref={meshRef} scale={2.2}>
                <icosahedronGeometry args={[1, 4]} />
                <MeshDistortMaterial color="#6d28d9" distort={0.5} speed={2} roughness={0.1} metalness={0.8} />
            </mesh>
        </Float>
    )
}

function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
    const ref = useRef<THREE.Mesh>(null)
    useFrame((state) => {
        if (!ref.current) return
        ref.current.rotation.x = state.clock.elapsedTime * speed
        ref.current.rotation.y = state.clock.elapsedTime * speed * 0.7
    })
    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, 0.015, 16, 100]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.7} />
        </mesh>
    )
}

function FloatingParticles() {
    const count = 120
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
        return pos
    }, [])
    const ref = useRef<THREE.Points>(null)
    useFrame((state) => {
        if (!ref.current) return
        ref.current.rotation.y = state.clock.elapsedTime * 0.03
    })
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#a78bfa" transparent opacity={0.6} />
        </points>
    )
}

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Scroll parallax
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

    // Mouse parallax
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 })

    useEffect(() => {
        const move = (e: MouseEvent) => {
            mouseX.set((e.clientX / window.innerWidth - 0.5) * 30)
            mouseY.set((e.clientY / window.innerHeight - 0.5) * 30)
        }
        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove', move)
    }, [])

    // Slower mouse parallax for far layer
    const mouseXSlow = useTransform(mouseX, v => v * 0.4)
    const mouseYSlow = useTransform(mouseY, v => v * 0.4)
    const mouseXFast = useTransform(mouseX, v => v * 1.4)
    const mouseYFast = useTransform(mouseY, v => v * 1.4)

    const letters = 'LUMINARY'.split('')

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">

            {/* 3D canvas — scales on scroll for zoom effect */}
            <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
                <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
                    <pointLight position={[-10, -10, -5]} intensity={0.8} color="#6366f1" />
                    <Stars radius={80} depth={50} count={3000} factor={4} fade speed={0.5} />
                    <FloatingParticles />
                    <AnimatedBlob />
                    <OrbitRing radius={3.2} speed={0.3} color="#8b5cf6" />
                    <OrbitRing radius={4} speed={-0.2} color="#6366f1" />
                    <OrbitRing radius={4.8} speed={0.15} color="#a78bfa" />
                </Canvas>
            </motion.div>

            <div className="absolute inset-0 bg-black/35" />

            {/* Far parallax layer — moves least with mouse */}
            <motion.div
                style={{ x: mouseXSlow, y: mouseYSlow }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-16 left-16 w-64 h-64 rounded-full border border-violet-500/5" />
                <div className="absolute bottom-24 right-16 w-48 h-48 rounded-full border border-indigo-500/8" />
            </motion.div>

            {/* Near parallax layer — moves most with mouse */}
            <motion.div
                style={{ x: mouseXFast, y: mouseYFast }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-1/3 right-24 w-3 h-3 rounded-full bg-violet-400/30" />
                <div className="absolute bottom-1/3 left-24 w-2 h-2 rounded-full bg-indigo-400/30" />
                <div className="absolute top-24 right-1/3 w-1 h-20 bg-gradient-to-b from-violet-500/20 to-transparent" />
            </motion.div>

            {/* Hero content — scrolls up on exit */}
            <motion.div style={{ y, opacity }} className="relative z-10 text-center w-full px-4">

                <motion.p
                    initial={{ opacity: 0, letterSpacing: '0.1em' }}
                    animate={{ opacity: 1, letterSpacing: '0.6em' }}
                    transition={{ duration: 1.4, delay: 0.3 }}
                    className="text-violet-400 text-xs uppercase mb-10"
                >
                    Creative Digital Studio
                </motion.p>

                {/* Giant title with line slicing through */}
                <div className="relative inline-block">
                    <h1 className="text-[clamp(4rem,14vw,14rem)] font-black leading-none tracking-tight flex justify-center overflow-hidden">
                        {letters.map((letter, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 160, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: i * 0.06 + 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="inline-block"
                                style={{
                                    background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.35) 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Horizontal line threading through letters */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 right-0 h-px"
                        style={{
                            top: '52%',
                            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8) 20%, rgba(167,139,250,1) 50%, rgba(139,92,246,0.8) 80%, transparent)',
                        }}
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="text-white/35 text-base md:text-lg tracking-[0.3em] uppercase font-light mt-6 mb-12"
                >
                    Where Ideas Become Experiences
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="flex gap-5 justify-center"
                >
                    <motion.button
                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(139,92,246,0.5)' }}
                        whileTap={{ scale: 0.96 }}
                        data-magnetic
                        className="px-8 py-3 bg-violet-600 text-white rounded-full text-xs tracking-[0.3em] uppercase font-bold cursor-none"
                    >
                        Explore
                    </motion.button>
                    <motion.button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        data-magnetic
                        className="px-8 py-3 border border-white/20 text-white/60 rounded-full text-xs tracking-[0.3em] uppercase font-bold hover:border-violet-500/50 hover:text-white transition-all cursor-none"
                    >
                        Our Work
                    </motion.button>
                </motion.div>

                {/* Editorial side labels */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
                            className="absolute bottom-[-120px] left-8 text-left hidden md:block">
                    <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Est. 2019</p>
                    <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Colombo, LK</p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
                            className="absolute bottom-[-120px] right-8 text-right hidden md:block">
                    <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">↓ Scroll to discover</p>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-none z-20"
            >
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="text-white/30 text-[9px] tracking-[0.5em] uppercase"
                >
                    Scroll
                </motion.span>
                <div className="w-px h-12 bg-gradient-to-b from-violet-400/80 to-transparent" />
            </motion.div>
        </section>
    )
}