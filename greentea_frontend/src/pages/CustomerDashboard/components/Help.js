import ContactUsForm from './ContactForm.js'

export default function Help({id=''}) {

  return (
    <div className='help-container'>
      <Faq />
      <Policy/>
      <ContactUsForm id={id}/>
    </div>
  );
}

function Faq() {


  return (
    <div className='faq-container'>
      <h1>FAQ</h1>
      <ol>
        <li>How do I place an order?</li>
        <p>Simply browse our selection, add your favorite teas to your cart, and proceed to checkout. You’ll receive an order confirmation via text.</p>
        <li>What payment methods do you accept?</li>
        <p>We accept cash only.</p>
        <li>Can I modify or cancel my order?</li>
        <p>Orders can only be modified or canceled within 24 hours of placing them. Please contact our team as soon as possible.</p>
        <li>Do you offer international shipping?</li>
        <p>Currently, we ship within Greater Manila area only, but we are working on expanding nationally soon!</p>
        <li>How do I track my order?</li>
        <p>Once your order ships, you’ll receive a tracking number via text message. Use this to track your package in real time</p>
        <li>My order arrived damaged. What should I do?</li>
        <p>If your package arrives damaged, please contact us within 48 hours with photos of the issue, and we’ll assist with a replacement or refund.</p>
      </ol>     
    </div>
  );
}

function Policy() {


  return (
    <div className='policy-container'>
      <h1>Store Policy</h1>
        <h3>Order Process</h3>
        <ul>        
          <li>Orders are processed within 1-2 business days.</li>
          <li>You will be notified once your order is ready to be picked up.</li>
        </ul>
        <h3>Returns & Refunds</h3>
        <ul>
          <li>Unopened tea packages can be returned within 1 day for a full refund.</li>
          <li>Due to food safety regulations, opened tea packages cannot be returned.</li>
          <li>Refunds are processed within 2 weeks after approval.</li>
        </ul> 
        <h3>Quality Guarantee</h3>
        <ul>
          <li>Our teas are sourced from our own tea plantations.</li>
          <li>If you’re unsatisfied with your order, reach out, and we’ll make it right!</li>
          <li>How do I place an order?</li>
        </ul>
    </div>
  );
}





