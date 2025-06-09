import { useNavigate } from 'react-router-dom';

export default function TeaGuide() {

  const navigate = useNavigate();


  return (
    <div className='teaguidebg'>
        <div className='teaguide font-montserrat'>
          <p>If you're new to the tea hobby you might feel a bit overwhelmed with the variety of blends we offer, don't worry!</p>
          <p>Each blend has information available from snack pairings, temperature recommendations, caffeine levels, to aromatic profiles.</p>
          <p>These guides are carefully crafted by our team of tea aficionados to make sure you enjoy every cup from steep to sip.</p>
        </div>
        <div className='guidelink'>
          <button onClick={() => navigate('/catalogue')} className='greenbutton font-montserrat'>TEA CATALOGUE</button>
        </div>
    </div>
  );
}