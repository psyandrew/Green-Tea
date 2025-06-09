import { useNavigate } from 'react-router-dom';


export default function Selection() {

  const navigate = useNavigate();

  function SelectionComponent({ imgKey, label, index }) {
  const navigate = useNavigate();

  return (
    <span className='selection' onClick={() => navigate(`/catalogue?page=${index}`)}>
      <h1 className='seltag font-montserrat'>{label}</h1>
      <span className={`selimg ${imgKey}`}></span>
    </span>
  );
}

  return (
    <div className='selectionbg' id='selection'>
      <div className='selectionHeaders'>
        <h1 className='font-montserrat'>CLASSIC SELECTION</h1>
        <h2 className='font-montserrat'>Green Tea Collection</h2>
      </div>
      <div className='selectionItems'>
                <SelectionComponent imgKey="Jasmine" label="Jasmine Green Tea" index={0} />
                <SelectionComponent imgKey="Lemon" label="Lemon Green Tea" index={1} />
                <SelectionComponent imgKey="Peach" label="Peach Green Tea" index={2} />
                <SelectionComponent imgKey="White" label="White Tea" index={3} />
                <SelectionComponent imgKey="Apple" label="Apple Green Tea" index={4} />
                <SelectionComponent imgKey="Sencha" label="Japanese Sencha" index={5} />
      </div>
      <div className='selectionHeaders'>
        <h2 className='font-montserrat'>Black Tea Collection</h2>
      </div>
      <div className='selectionItems'>
              <SelectionComponent imgKey="EB" label="English Breakfast" index={6} />
              <SelectionComponent imgKey="EG" label="Earl Grey" index={7} />
              <SelectionComponent imgKey="LG" label="Lady Grey" index={8} />
              <SelectionComponent imgKey="Oolong" label="Oolong" index={9} />
              <SelectionComponent imgKey="Pineapple" label="Pineapple Black" index={10} />
              <SelectionComponent imgKey="Strawberry" label="Strawberry Black" index={11} />
      </div>
    </div>
  );
}
