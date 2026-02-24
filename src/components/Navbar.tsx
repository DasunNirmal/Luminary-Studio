import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = ['About', 'Services', 'Work', 'Contact']

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id: string) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center transition-all duration-500 ${
                scrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
            }`}
        >
            <motion.span
                className="text-white font-bold text-xl tracking-widest cursor-pointer"
                whileHover={{ scale: 1.05 }}
            >
                LUMINARY
            </motion.span>

            <ul className="flex gap-8">
                {links.map((link, i) => (
                    <motion.li
                        key={link}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i + 0.5 }}
                        onClick={() => scrollTo(link)}
                        className="text-white/70 hover:text-white text-sm tracking-widest cursor-pointer transition-colors duration-300 uppercase"
                        whileHover={{ y: -2 }}
                    >
                        {link}
                    </motion.li>
                ))}
            </ul>
        </motion.nav>
    )
}