import { useInventoryRequests} from '../logics/CatalogueStateManagement'
import React, { useState, useEffect } from 'react';

export default function InventoryManagement() {



  return(
    <div className='content-page-container'>
      <div className='content-page-header'>
        <h3>INVENTORY MANAGEMENT</h3>
      </div>
      < Catalogue />
    </div>
  )
}

function Catalogue() {

  const { 
    updateRequestInventory,
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

  return(
    <div className='catalogue-container'>
      < ProductCard data={jasmineT}   updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={lemonT}   updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={peachT}   updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={whiteT}   updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={appleT}   updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={japaneseT}  updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={englishT}  updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={earlGreyT}  updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={ladyGreyT}  updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={oolongT}  updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={pineappleT}  updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={strawberryT}  updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={bukoT}  updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={durianT}  updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={sampaguitaT}  updateRequestInventory={updateRequestInventory}/>
      < ProductCard data={mangoT}  updateRequestInventory={updateRequestInventory}/>
    </div>
  )
}


function ProductCard({data=null, updateRequestInventory}){
  const [stockInput, setStockInput] = useState(0);
  const [priceInput, setPriceInput] = useState(0);

  const [priceValue, setPriceValue] = useState(0)
  const [stockPieces, setStockPieces] = useState(0)
  const [saleStatus, setSaleStatus] = useState(0)

  const LoadingDots = () => (
  <div className='bouncing-dots'>
    <p>Loading</p>
    <div className='dot'></div>
    <div className='dot dot2'></div>
    <div className='dot dot3'></div>
  </div>
);

  useEffect(() => {
    //console.log(data)
    setPriceValue(data.price)
    setStockPieces(data.inventory)
    setSaleStatus(data.on_sale)
  }, [data]);

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  return(
      <div className='product-card'>
          <div className='product-card-container'>
            <div className='product-card-logo-container'> 
              <div className='product-card-logo'>  
                <i className="fas fa-leaf" style={{ fontSize: '75px', color: 'green' }}></i>
              </div>
              <div className='product-card-id-container'>
                { !data ? <LoadingDots/>  : <p>ID: {data.product_id}</p>}
                { !data === true ? <LoadingDots/>   : <p>{data.name}</p>}

              </div>
            </div>
            <div className='product-card-interface-container'>
                <div className='product-card-interface-container-row-1'>
                  { !data === true ? <LoadingDots/>   : <p>Stock: {stockPieces}</p>}
                  <input 
                  type="number" 
                  name="placeholder" 
                  placeholder='0' 
                  className="product-card-input"
                  id="StockInput"
                  value={stockInput}
                  onChange={(e) => handleInputChange(e, setStockInput)}
                  min="0"
                  step="1"
                  />
                  <button className="greenbuttonupdate" type="submit" onClick={()=>updateRequestInventory("inventory",data.product_id, stockInput )} >UPDATE</button>
                </div>

                <div className='product-card-interface-container-row-1'>
                  { !data === true ?  <LoadingDots/>  : <p>Price: {priceValue}</p>}
                  <input 
                  type="number"
                  min="0"
                  step="1"
                  name="placeholder" 
                  placeholder={priceValue}
                  className="product-card-input"
                  id="PriceInput"
                  value={priceInput}
                  onChange={(e) => handleInputChange(e, setPriceInput)}
                  />
                  <button className="greenbuttonupdate" type="submit" onClick={()=> updateRequestInventory("price",data.product_id, priceInput )} >UPDATE</button>
                </div>

                <div className='product-card-interface-container-row-2'>
                  <p>On Sale:</p>
                  { !data ? <LoadingDots/>   : <h6>{saleStatus === true ? 'ACTIVE' : 'INACTIVE'}</h6>}
                  <button className="greenbuttonupdate" type="submit" onClick={ ()=> saleStatus === true ?  updateRequestInventory("on_sale",data.product_id, false) : updateRequestInventory("on_sale", data.product_id, true) }>CHANGE</button>
                                                                                                             
                </div>
            </div>
          </div>
      </div>
  )
}
