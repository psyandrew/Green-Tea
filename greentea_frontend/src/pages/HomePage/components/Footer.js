import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {

	const navigate = useNavigate();

	function openPage(openLink) {
  		return function() {
    		window.open(openLink, '_blank');
  		};
	}


	return(
		<div className='footerbg font-montserrat'>
			<div className='footerQ font-playfair'>
				<p>"I sat at my desk, drank hot green tea, and let my mind wander."<br/><br/>-Haruki Murakami, "Norwegian Wood"</p>
			</div>
			<div className='footerColumns'>
				<div className='shop'>
					<h1>SHOP</h1>
					<p onClick={() => navigate('/catalogue')}>
						<FontAwesomeIcon icon={faCartShopping} size="lg" style={{ color: "#b89600" }}/> CATALOGUE
					</p>
					<p onClick={() => navigate('/catalogue', { state: { open: 'help' } })}>
  						<FontAwesomeIcon icon={faCircleQuestion} size="lg" style={{ color: "#b89600" }} /> FAQ
					</p>
				</div>
				<div className='socials'>
					<h1>SOCIAL</h1>
					<span className='socialsrow'>
					<FontAwesomeIcon onClick={openPage('https://www.facebook.com')}icon={faSquareFacebook} size="lg" style={{ color: "#b89600" }}/>
					<FontAwesomeIcon onClick={openPage('https://www.instagram.com')}icon={faInstagram} size="lg" style={{ color: "#b89600" }}/>
					<FontAwesomeIcon onClick={openPage('https://www.youtube.com' )}icon={faYoutube} size="lg" style={{ color: "#b89600" }}/>
					</span>
				</div>
			</div>
		</div>
	);
}

