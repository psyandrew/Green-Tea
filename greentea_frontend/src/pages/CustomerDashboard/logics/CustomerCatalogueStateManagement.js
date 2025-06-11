import { useState, useEffect  } from 'react';  

export const useInventoryRequests = () => {
  const [inventoryData, setInventoryData] = useState('');

  //product states
  const [jasmineT, setJasmineT] = useState('');
  const [lemonT, setLemonT] = useState('');
  const [peachT, setPeachT] = useState('');
  const [whiteT, setWhiteT] = useState('');
  const [appleT, setAppleT] = useState('');
  const [japaneseT, setJapaneseT] = useState('');
  const [englishT, setEnglishT] = useState('');
  const [earlGreyT, setEarlGreyT] = useState('');
  const [ladyGreyT, setLadyGreyT] = useState('');
  const [oolongT, setOolongT] = useState('');
  const [pineappleT, setPineappleT] = useState('');
  const [strawberryT, setStrawberryT] = useState('');
  const [bukoT, setBukoT] = useState('');
  const [durianT, setDurianT] = useState('');
  const [mangoT, setMangoT] = useState('');
  const [sampaguitaT, setSampaguitaT] = useState('');

  const updaterMap = {
        'm8g5pC':setJasmineT,
        'ZN5D8Z':setLemonT,
        'klmYun':setPeachT,
        'yZEG5q':setWhiteT,
        'mcfLhE':setAppleT,
        'tdsmhr':setJapaneseT,
        'hqGL43':setEnglishT,
        'Ss320v':setEarlGreyT,
        'QS8Pd6':setLadyGreyT,
        'orHe1g':setOolongT,
        'ODtlfX':setPineappleT,
        'XvBI3S':setStrawberryT,
        'Gpzfz5':setBukoT,
        'maqsea':setDurianT,
        'pSCZrx':setMangoT,
        'vqbZKd':setSampaguitaT,
        }

  useEffect(() => {
    const fetchInventory = async() => {

      try { 

        const response = await fetch('https://green-tea-production.up.railway.app/products/all')
        const data = await response.json();
        setInventoryData(data.products);

        data.products.forEach((item) => {
          item.price = parseFloat(item.price);
          const setState = updaterMap[item.product_id];
          if (setState) {
            setState(item); 
          }
        })


      } catch(error) {
        console.log(error.message)
        } 
      }
    fetchInventory();
    
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


  const updateRequestInventory = async ( type, productID, data ) => {
    
    const requestMap = {
      "inventory": {
        "fetchString":'https://green-tea-production.up.railway.app/admin/products/update/stock',
        "requestKey": 'inventory_stock'
      },
      "price": {
        "fetchString":'https://green-tea-production.up.railway.app/admin/products/update/price',
        "requestKey": 'price'
      },
      "on_sale": {
        "fetchString":'https://green-tea-production.up.railway.app/admin/products/update/status',
        "requestKey": 'on_sale'
      }
    }

    try {

      const response = await fetch( requestMap[type]["fetchString"],
        {
          method: "PATCH",
          headers:  {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ 
        "product_id": productID,
        [requestMap[type]["requestKey"]]: data
        }), 
      });

        
      if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const backendResponse = await response.json();

      updaterMap[productID](backendResponse)
    } catch(error) {
        console.error("Error:", error);
      }
    }

  return {
    inventoryData,
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
  };
} 