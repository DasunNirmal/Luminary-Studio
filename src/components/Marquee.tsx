import { motion } from 'framer-motion'

const items = [
    'Brand Identity', '✦', 'Motion Design', '✦', 'Web Development',
    '✦', 'AI Integration', '✦', 'UI/UX Design', '✦', '3D Experiences',
    '✦', 'Creative Direction', '✦',
]

export default function Marquee() {
    return (
        <div className="bg-violet-600 py-4 overflow-hidden border-y border-violet-500/50">
            <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                className="flex whitespace-nowrap"
            >
                {[...items, ...items].map((item, i) => (
                    <span
                        key={i}
                        className="text-white text-sm tracking-[0.2em] uppercase font-semibold mx-4"
                    >
            {item}
          </span>
                ))}
            </motion.div>
        </div>
    )
}