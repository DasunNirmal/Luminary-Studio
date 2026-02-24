import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Contact() {
    const { ref, isInView } = useScrollAnimation()

    return (
        <section id="contact" className="bg-black py-32 px-8 border-t border-white/5">
            <div className="max-w-3xl mx-auto text-center" ref={ref}>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-violet-400 tracking-[0.4em] text-sm uppercase mb-4"
                >
                    Get In Touch
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
                >
                    Let's build something
                    <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent"> great</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white/40 text-lg mb-10"
                >
                    Ready to start your next project? Drop us a message and we'll get back to you within 24 hours.
                </motion.p>

                <motion.a
                    href="mailto:hello@luminarystudio.com"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(139,92,246,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block px-12 py-4 bg-violet-600 text-white rounded-full text-sm tracking-widest uppercase font-semibold"
                >
                    Start a Project
                </motion.a>
            </div>
        </section>
    )
}