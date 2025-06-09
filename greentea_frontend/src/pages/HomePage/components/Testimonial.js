import '../CSS/fonts.css'
import '../CSS/styles.css'
import { useState } from 'react';

export default function Testimonial() {
	const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
	const totalTestimonialSlides = 5;

	function nextSlide(){
		setCurrentTestimonialSlide(currentTestimonialSlide === totalTestimonialSlides - 1 ? 0 : currentTestimonialSlide + 1);
	}

	function prevSlide() {
		setCurrentTestimonialSlide(currentTestimonialSlide === 0 ? totalTestimonialSlides - 1 : currentTestimonialSlide - 1);
	}


return (
	<div className='testimonialbg'>
		<div className='testimonialheader'>
			<h1 className='font-montserrat'>TESTIMONIALS</h1>
			<p className='font-montserrat-bold'>What loyal customers say about us?</p>
		</div>
		<div className='slidebg'>
			<div className='testimonialslides' style= {{transform: `translateX(-${currentTestimonialSlide * 100}%)`}}>
			<div className='testimonialslide font-playfair'><p>"Napakaganda ng kalidad. Gustong-gusto ng customer ko <br/>ang sariwa at local na lasa ng tsaa!" <br/>(Sanjo, Nigeria)</p></div>
				<div className='testimonialslide font-playfair'><p >"I’m very pleased that each product is described in so many details.<br/> it's a big help for beginners like me in what to expect in the taste. <br/>Great job also in how you inform us about the brewing process."</ p ></div>	
				<div className='testimonialslide font-playfair'><p >"Tagaytay Tea quickly became a staple in our shop.<br/> People love knowing it’s locally grown and super fresh." <br/>(Andy, Manila)</p></div>
				<div className='testimonialslide font-playfair'><p >"feels like I'm travelling every morning… <br/>like being back in Japan every time I enjoy a cup of your Sencha !"<br/>(V., Pangasinan)</p></div>
				<div className='testimonialslide font-playfair'><p >"Tagaytay Tea quickly became a staple in our shop.<br/> People love knowing it’s locally grown and super fresh."</p></div>
			</div>
			<button className='slideL' onClick={prevSlide}>  &#10094;</button>
			<button className='slideR' onClick={nextSlide}>  &#10095;</button>
		</div>
		<div className='dots'>
			<span className={`dot ${currentTestimonialSlide === 0 ? 'activeDot' : 'inactiveDot'}`} onClick={() => setCurrentTestimonialSlide(0)}></span>
			<span className={`dot ${currentTestimonialSlide === 1 ? 'activeDot' : 'inactiveDot'}`} onClick={() => setCurrentTestimonialSlide(1)}></span>
			<span className={`dot ${currentTestimonialSlide === 2 ? 'activeDot' : 'inactiveDot'}`} onClick={() => setCurrentTestimonialSlide(2)}></span>
			<span className={`dot ${currentTestimonialSlide === 3 ? 'activeDot' : 'inactiveDot'}`} onClick={() => setCurrentTestimonialSlide(3)}></span>
			<span className={`dot ${currentTestimonialSlide === 4 ? 'activeDot' : 'inactiveDot'}`} onClick={() => setCurrentTestimonialSlide(4)}></span>
		</div>
	</div>
	);
}
