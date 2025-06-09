
export default function Header({ logged, showAuthInModal,  switchContent}) {

  return (
    <header className='header-catalogue font-montserrat-bold'>
      <div className='logo'>
      <i className="fa-solid fa-leaf" onClick={()=> switchContent('shop')}></i>
      <h1>TAGAYTAY TEA</h1>
      </div>
      <div className='header-buttons'>
        
        
        {!logged && (<i className="fas fa-user" onClick={()=> showAuthInModal()}></i>)}
        {logged && (<i className="fa-solid fa-address-card" onClick={()=> switchContent('profile')}></i>)}
        {logged && (<i className="fas fa-cart-shopping" onClick={() => switchContent('checkout')}></i>)}
        <i className="fas fa-shop" onClick={()=> switchContent('shop')}></i>
        <i className="fas fa-circle-info" onClick={()=> switchContent('help')}></i>

      </div>
    </header>
  );
}