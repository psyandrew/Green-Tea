export default function Shop({inventoryData, logged, id , showAuthInModal, productSetter, tags}) {
  
  

  
  if (inventoryData.some(item => !item)) {return <><h1>L O A D I N G . . . </h1></>}

  return (
    <div className='customer-catalogue-container'>
      {inventoryData.map((product, index) => (
        <ProductCard key={index} productInfo={product} img={tags[index]} logged={logged}  productSetter={productSetter} index={index}/>
      ))}
    </div>
  );


  function ProductCard({productInfo, img , logged, productSetter, index}) {

    return (
      <div className="customer-product-card-container" onClick={ ()=> productSetter( index, productInfo.on_sale, productInfo.product_type, img, productInfo.price, productInfo.product_id) }>
        <div className="customer-product-card-backdrop"></div>
        <div className="customer-product-card-content">
          <div className={`circle ${img} ctgimg`}></div>
          <div className="txt">
            <h5>{productInfo.name}</h5>
            <h6>{productInfo.product_type}</h6>
            <p>₱{productInfo.price}.00</p>
            {!productInfo.on_sale ? <p>out of stock</p> : <p>in season</p>}
            
          </div>
        </div>
      </div>
    );
  }
}
