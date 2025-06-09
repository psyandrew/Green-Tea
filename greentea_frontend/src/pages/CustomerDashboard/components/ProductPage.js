import {useState} from 'react';
import { customerAddCart } from '../logics/CustomerBuyRequest.js'
import RequestResultModal  from '../Modals/RequestResultModal.js'
import productMap from './ProductText.js'

export default function ProductPage({productIndex, logged, showAuthInModal, customer_id, inventoryData, tags}) {

  const [ingBar, setIngBar]=useState({'text': false, 'symbol':true })
  const [brewBar, setBrewBar ]=useState({'text': false, 'symbol':true })
  const [snackBar, setSnackBar ]=useState({'text': false, 'symbol':true })
  const [itemToCart, setItemToCart]=useState({'price': 0, 'quantity':0})
  const [showModal,setShowModal] = useState(false)
  const [result,setResult] = useState(false)
  const [modalText,setModalText] = useState("cart")

  const toggleBar = (set) => {
    set(prev => ({
    text: !prev.text,
    symbol: !prev.symbol
    }));
  }

  function addToCartRequest(data){
    const success = customerAddCart(data);
    setModalText("cart")
    setShowModal(true);  
    setResult(success);  

    setTimeout(() => {
      setShowModal(false)
      setItemToCart({'price': 0, 'quantity':0});
    }, 1000);
  }

  function lockedCart(str){
    setModalText(str)
    setShowModal(true);  
    setResult(false);  

    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  }

  const updateItemToCart = (change) => {
    if (change === 'inc') {
    setItemToCart(prev => ({
      price: prev.price + productIndex.price,
      quantity: prev.quantity + 1
    }));
    } else if (change === 'dec' && itemToCart['quantity'] > 0) {
    setItemToCart(prev => ({
      price: prev.price - productIndex.price,
      quantity: prev.quantity - 1
    }));
    }
  };

  const BuyInterface=()=>{
    return(
    <div className='buy-interface'>
            <div className='buy-interface-quant'>
              <button onClick={() => updateItemToCart('dec')}className='greenbuttonsmallround'>&lsaquo;</button>
              <p>{itemToCart['quantity']}</p>
              <button onClick={() => updateItemToCart('inc')} className='greenbuttonsmallround'>&rsaquo;</button>
            </div>
            <button className="greenbutton-ctg go"
                disabled={itemToCart['quantity'] === 0}
                onClick={() => addToCartRequest(
                        {
                          "items":[
                            {
                              "product_id": productIndex['id'],
                              "product_name": productMap[productIndex['index']]['name'],
                              "quantity":itemToCart['quantity'],
                              "sum_price": itemToCart['price']
                            }
                          ],
                          "customer_id": customer_id
                        })
              }>  
              <i className="fas fa-basket-shopping"> </i>
            </button>
    </div>
    )
  }

  const LockedInterface=({mode})=>{
    return(
    <div className='buy-interface'>
            {mode === 'need login' && <button className="greenbutton-ctg lock" onClick={() => showAuthInModal()}><i className="fas fa-basket-shopping"></i></button>}
            {mode === 'no stock' && (<button className="greenbutton-ctg lock" onClick={() => lockedCart('no stock')}><i className="fas fa-basket-shopping" ></i></button>)}
    </div>
    )
  }

  return(
    <div className='product-page-container'>
      <RequestResultModal show={showModal} res={result} type={modalText} />
      <div className='product-showcase-container'>
      <div className={`product-showcase-card-1 ${productIndex['image']}`}>
      </div>
      <div className={`product-showcase-card-2 ${productIndex['series'] === 'Classic' ? 'classic-pack' : 'premium-pack'}`} >
      </div>
      </div>
      <div className='product-details-container'>
        <div className='product-text-main'>
          <h1>{ productMap[productIndex['index']]['name'] }</h1>
          <p>{ productMap[productIndex['index']]['profile'] }</p>
          <h5>₱{productIndex['price']}.00</h5>          
          <h4>Description</h4>
          <p> {productMap[productIndex['index']]['description']} </p>
        </div>
        <div className='detail-dropdown-container'>
          <div className='click-bar' onClick={()=> toggleBar(setIngBar)}>
            <h5>Ingredients</h5>
            {ingBar['symbol'] ? <i className="fa-solid fa-plus" ></i> : <i className="fa-solid fa-minus" ></i>}
          </div>
          <div className='click-bar-txt'>
            {ingBar['text'] ? <p> {productMap[productIndex['index']]['ingredients']} </p> : null}
          </div>
        </div>
        <div className='detail-dropdown-container'>
          <div className='click-bar'  onClick={()=> toggleBar(setBrewBar)}> 
            <h5>Brew Method</h5>
            {brewBar['symbol'] ? <i className="fa-solid fa-plus" ></i> : <i className="fa-solid fa-minus" ></i>}
          </div>
          <div className='click-bar-txt'>
            {brewBar['text'] ? <p> {productMap[productIndex['index']]['brew']} </p> : null}
          </div>
        </div>
        <div className='detail-dropdown-container'>
          <div className='click-bar' onClick={()=> toggleBar(setSnackBar)}>
            <h5>Snack Pairing</h5>
            {snackBar['symbol'] ? <i className="fa-solid fa-plus" ></i> : <i className="fa-solid fa-minus" ></i>}
          </div>
          <div className='click-bar-txt'>
           {snackBar['text']  ? <p> {productMap[productIndex['index']]['snack_pairings']} </p> : null}
          </div>
        </div>
        {(logged && productIndex['status']) ? ( <BuyInterface />) :
        !logged ? (<LockedInterface mode="need login" />) : 
        (<LockedInterface mode="no stock" />)}
      </div>
    </div>
  );
}

