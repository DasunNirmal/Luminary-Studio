import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useLenis } from './hooks/useLenis'
import Process from "./components/Process.tsx";
import StarField from "./components/StarField.tsx";

function App() {
    useLenis()

    return (
        <main className="bg-transparent">
            <Cursor />
            <StarField />
            <Navbar />
            <Hero />
            <Marquee />
            <About />
            <Services />
            <Process />
            <Work />
            <Contact />
            <Footer />
        </main>
    )
}

export default App