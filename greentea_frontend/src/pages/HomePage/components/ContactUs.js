import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function ContactUs() {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')

function handleSubmit(event) {
	event.preventDefault();

	const formData = {
      name,
      email,
      subject,
      message,
    };

}

return (
	<div className='contactformbg' id='contact'>
		<div className='contactform' >
			<div className='forminfo whitefont font-playfair'>
				<h1>CONTACT US</h1>
				<FontAwesomeIcon icon={faEnvelope} size="lg"  className="whitefont" />
				<h2>Email:</h2>
				<p> contactus@example.ph</p>
				<FontAwesomeIcon icon={faPhone} size="lg"  className="whitefont" />
				<h2>Phone:</h2>
				<p> +63 912 345 6789</p>
				<FontAwesomeIcon icon={faHouse} size="lg"  className="whitefont" />
				<h2>Address:</h2>
				<p> 1234 Makati Ave., Makati City, Philippines</p>
			</div>
			<div className='formcontainer'>
				<div className='forminput whitefont font-playfair'>
					<label htmlFor="name" >Name:</label>
	      			<input type="text" id="name" name="name"  value={name}  onChange={(e) => setName(e.target.value)}className="inputfieldgrey whitefont" />
	      	
	      			<label htmlFor="email">Email:</label>
	      			<input type="email" id="email" name="email" className="inputfieldgrey whitefont" />
	      			
      				<label htmlFor="subject">Subject</label>
      				<input type="text" id="subject" name="subject" className="inputfieldgrey whitefont"/>
      
      				<label htmlFor="message">Message:</label>
      				<textarea id="message" name="message" className=" textboxprops inputfieldgrey whitefont"></textarea>
      				<button className='greenbutton font-montserrat' >SUBMIT</button>
				</div>
			</div>
		</div>
	</div>
	);
}
