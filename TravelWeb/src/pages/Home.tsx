

import Contactus from '../components/Contactus'
import Features from '../components/Features'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Footer/navbar'
import { Hero } from '../components/Hero'
import { PackageSlider } from './PackageSlider'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <PackageSlider/>
    <Features/>
    <Contactus/>

        <Footer/>
        </>
  )
}

export default Home