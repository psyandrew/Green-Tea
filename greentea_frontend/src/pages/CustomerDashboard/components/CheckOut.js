
import RequestResultModal  from '../Modals/RequestResultModal.js'
import { customerGetCart,createOrderFetch, emptyCartRequest } from '../logics/CustomerBuyRequest.js'
import { useState, useEffect} from 'react';

export default function CheckOut({ id, switchContent }) {

  const [cartData, setCartData] =useState(null)
  const paymentMethods = ["Cash", "Credit Card", "e-Cash"];
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [showModal,setShowModal] = useState(false)
  const [result,setResult] = useState(false)
  const [modalText,setModalText] = useState("checkout")

  async function fetchCart() {
    const data = await customerGetCart(id); 
    if (data && typeof data === 'object') { // Added check to ensure valid object
      setCartData(data);
    } else {
      setCartData(null); // In case of fetch error
    }
  }

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  async function clearCart(data) {
    const success = await emptyCartRequest(data);
    
    setShowModal(true);  
    setResult(success);
    setModalText('clear')  

    setTimeout(() => {
      setShowModal(false);
      switchContent('shop')
    }, 1000);
    if (success) {
      await fetchCart();
    }
  }
  
  async function finalizeOrderRequest(data) {
    const success = await createOrderFetch(data);

    setShowModal(true);  
    setResult(success);
    setModalText('checkout') 

    setTimeout(() => {
      setShowModal(false);
      switchContent('shop')
    }, 1000);
  }

  if (!cartData || !cartData.cart) {

    return (
      <div className='checkout-container'>
        <h1>Loading...</h1>
      </div> 
    );
  }

  const cart = cartData.cart?.[0]; 

  if (cart.items.length === 0) {
    return (
      <div className='checkout-container'>
        <div className="checkout-card-empty">
          <h1>Your cart is empty.</h1>
          <button className="greenbutton-checkout" onClick={() => switchContent('shop')}>
            RETURN
          </button>

        </div> 
      </div> 
    );
  }

  return (
    <div className="checkout-container">
      <RequestResultModal show={showModal} res={result} type={modalText} />
      <div className="checkout-card">
        <h1>Cart:</h1> 
        <div className="cart-items-container">
          {cart.items.map((x) => (
            <div className="cart-items" key={x.product_id}>
              <p>{x.product_name}</p>
              <p>x</p>
              <p>{x.quantity} bags</p>
              <p>${x.sum_price}</p>

            </div>
          ))}
          <p>Total Price: <strong>${cart.total_cart_price}</strong></p>
          <button className="greenbutton-checkout" onClick={() => clearCart({customer_id:id})}>
            CLEAR CART
          </button>
        </div>

        {/* Payment Method Dropdown */}
        <div className="checkout-card-details">
          <label htmlFor="payment-method">Payment Method:</label>
          <select
            id="payment-method"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="payment-dropdown"
          >
            {paymentMethods.map((x, index) => (
              <option key={index} value={x}>
                {x}
              </option>
            ))}
          </select>
          <button
            className="greenbutton-checkout"
            type="button"
            onClick={() => finalizeOrderRequest({customer_id:id, "payment_method":selectedMethod})}
          >
            CHECKOUT
          </button>
        </div>
         <button className="greenbutton-checkout return" onClick={() => switchContent('shop')}>
            RETURN
        </button>
      </div>
     
    </div>
  );
}
