import { useState, useEffect} from 'react';
import { createCustomerTicket } from '../logics/CustomerContactUsRequest.js'
import RequestResultModal  from '../Modals/RequestResultModal.js'

export default function ContactUsForm({id}) {

   useEffect(()=>{
    console.log(id)
  },[id])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [showModal,setShowModal] = useState(false)
  const [result,setResult] = useState(false)
  
  const formData = {
      name,
      email,
      subject,
      message,
      id
    };

  async function ticketRequest(data){
    const success = await  createCustomerTicket(data);
    setShowModal(true);  
    setResult(success);  

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  }


  return (
    <>
    <RequestResultModal show={showModal} res={result} type={"concern"} />
    <div className='faq-form-container'>
      <h1>Contact Us</h1>
        <p>Need further assistance? Contact our support team at <i className="fa-solid fa-envelope"></i> dummy@bmail.com or call <i className="fa-solid fa-phone"></i> 1236454789 during business hours.</p>
      <div className='forminput whitefont font-playfair'>
              {id === '' && (
              <>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name"  value={name}  onChange={(e) => setName(e.target.value)} className="inputfieldgrey whitefont" />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email}  onChange={(e) => setEmail(e.target.value)} className="inputfieldgrey whitefont" />
              </>
              )}

              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" value={subject}  onChange={(e) => setSubject(e.target.value)} className="inputfieldgrey whitefont"/>
      
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" value={message}  onChange={(e) => setMessage(e.target.value)} className=" textboxprops inputfieldgrey whitefont"></textarea>
              <button className='greenbutton font-montserrat' onClick={()=> ticketRequest(formData)} >SUBMIT</button>
       </div>
    </div>
    </>
    )
}



