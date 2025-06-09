import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./components/Footer.js"
import Banner from './components/Banner.js'
import Selection from './components/Selection.js'
import Team from './components/Team.js'
import Premium from './components/Premium.js'
import TeaGuide from './components/TeaGuide.js'
import Testimonial from './components/Testimonial.js'
import ContactUs from './components/ContactUs.js'

import "./CSS/styles.css";
import "./CSS/fonts.css"
import "./CSS/button.css"

export default function HomePage() {

  return (
    <div className='homebg'>
      <Banner />
      <Selection/>
      <Premium/>
      <TeaGuide/>
      <Team/>
      <Testimonial/>
      <ContactUs/>
      <Footer />
    </div>
  );
}