import "@fortawesome/fontawesome-free/css/all.min.css";
import "./CSS/stylesCTG.css";
import "./CSS/fonts.css"
import "./CSS/buttonCTG.css"
import "./CSS/animations.css"

import { useState, useEffect} from 'react';
import { useLocation, useSearchParams  } from "react-router-dom";
import { customerLoginRequest, customerCheckAuth,  customerSignupRequest, customerLogoutRequest} from './logics/CustomerAuthRequests.js';
import { useInventoryRequests } from'../AdminDashboard/logics/CatalogueStateManagement'
import { CustomerAuthState }from './logics/CustomerDashboardStateManagement'
import Header from './components/CatalogueHeader'
import ProductPage from './components/ProductPage'
import AuthModal from './Modals/AuthModal'
import Shop from './components/Shop'
import Profile from './components/Profile'
import CheckOut from './components/CheckOut'
import Help from './components/Help'


export default function CustomerDashboard(props) {
  
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const productParams = searchParams.get('page');
  

  const { 
    jasmineT,
    lemonT,
    peachT,
    whiteT,
    appleT,
    japaneseT,
    englishT,
    earlGreyT,
    ladyGreyT,
    oolongT,
    pineappleT,
    strawberryT,
    bukoT,
    durianT,
    mangoT,
    sampaguitaT
    } = useInventoryRequests ()

  const inventoryData = [
    jasmineT, lemonT, peachT, whiteT,
    appleT, japaneseT, englishT, earlGreyT,
    ladyGreyT, oolongT, pineappleT, strawberryT,
    bukoT, durianT, mangoT, sampaguitaT
  ];

  const  {
    logged, 
    username, 
    password, 
    email,
    contactNum,
    showCheck,
    updateLogged,
    setShowCheck,
    setInputTextUsername,
    setInputTextPassword,
    setInputTextEmail,
    setInputTextContactNum,

  } = CustomerAuthState();



  useEffect(() => {
    const verifyAuth = async () => {
      const result = await customerCheckAuth()
      if (result !== 'err') {
        updateLogged(true);
        setCustomer(result);
        setCustomerId(result['data']);
      } 
    };



  verifyAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [customer, setCustomer] = useState('')
  const [customerId, setCustomerId] = useState('')

  const LogOutSubmit = async () => {                    
    const result = await customerLogoutRequest();              
      if (result === true) {
        sessionStorage.removeItem("cs_authToken");
        setCustomerContent('shop')
        updateLogged(false)       
      }
  };

  const loginSubmit = async (username, password) => {
    const result = await customerLoginRequest(username, password);


    if (result['message'] === 'Login successful') {

      setShowCheck(true)
      setCustomerId(result['customer_id'])
      setTimeout(() => updateLogged(true), 1000);
      setTimeout(() =>  setShowCheck(false), 900);
      setTimeout(() => showAuthInModal(), 900);
      setCustomer(result)

    }

    if (result === 'err') {
      setShowCheck('err')
      setTimeout(() => setShowCheck(false), 1100); 
    }
  };


  const SignupSubmit = async (username, email, password,contact_number) => {
    const result = await customerSignupRequest(username, email, password, contact_number);
    if (result === 'success') {
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1000);
    }

    if (result === 'err') {
      setShowCheck('err')
      setTimeout(() => setShowCheck(false), 1100); 
    }
  };

  const [showCart, setShowCart] = useState(false)
  const [customerContent, setCustomerContent] = useState("shop");
  const [showAuthIn, setShowAuthIn ] = useState(false)
  const [productIndex, setProductIndex] = useState({});
  const [pageIndex, setPageIndex] = useState(null);
  
  

  const activateCart = () =>{
    setShowCart(prev => !prev);
  }

  const showAuthInModal = () =>{
    setShowAuthIn(prev => !prev);
  }


  const switchContent = (cnt) =>{
    setCustomerContent(cnt)
  }

  const productSetter = (cnt, status, series, img, price, id) =>{
    setCustomerContent('product')
    setProductIndex({
      'index': cnt,
      'status': status,
      'series': series,
      'image': img,
      'price':price,
      'id':id,
    })
    
  }

  const tags = ['Jasmine', 'Lemon', 'Peach', 'White',
              'Apple','Sencha', 'EB', 'EG',  'LG',
              'Oolong','Pineapple','Strawberry','BK','DRN','MNG','SG']

  

  useEffect(()=>{

      setPageIndex(Number(productParams))

    if (productParams  && inventoryData.every(item => item !== undefined && item !== null) && inventoryData[pageIndex]) {
      
      productSetter(pageIndex, inventoryData[pageIndex]['on_sale'], inventoryData[pageIndex]['product_type'], tags[pageIndex], inventoryData[pageIndex]['price'], inventoryData[pageIndex]['product_id']);
      setSearchParams({})
    }

    },[productParams, inventoryData])

  
  useEffect(() => {
      if (location.state?.open) {
        setCustomerContent(location.state.open);
      }
  }, [location.state]);

  return (
    <div className='catalogue-page-container'>
      <Header show={showCart} activateCart={activateCart} showAuthInModal={showAuthInModal} logged={logged} switchContent={switchContent}  />
       {showAuthIn ? (
        <AuthModal showCheck={showCheck}
                setShowCheck={setShowCheck}
                SignupSubmit={SignupSubmit}
                loginSubmit={loginSubmit}
                updateLogged={updateLogged}
                username={username}
                password={password}
                contactNum={contactNum}
                email={email}
                setInputTextContactNum={setInputTextContactNum}
                setInputTextUsername={setInputTextUsername}
                setInputTextPassword={setInputTextPassword}
                setInputTextEmail={setInputTextEmail} />
      ) : null}
      {   customerContent === 'shop' && <Shop  inventoryData={inventoryData} logged={logged} showAuthInModal={showAuthInModal} productSetter={productSetter} tags={tags}/> }
      {   customerContent === 'profile' && <Profile customer={customer}  id={customerId} LogOutSubmit={LogOutSubmit} /> }
      {   customerContent === 'help'  && <Help id={customerId}/> }
      {   customerContent === 'checkout' && <CheckOut id={customerId} switchContent={switchContent}  /> }
      {   customerContent === 'product' && <ProductPage productIndex={productIndex} logged={logged} showAuthInModal={showAuthInModal} customer_id={customerId}  inventoryData={inventoryData} tags={tags} />}
    </div>
  );
}


