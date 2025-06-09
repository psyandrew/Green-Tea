export default function OrdersCardArchive({ orderInfo }) {
  
  return (
    <div className="orders-card fr">
      <div className="orders-card-id">
        <h3>ORDER ID: {orderInfo.orderbundle_id}</h3>
      </div>
      <div className="orders-card-details">
        <div className="orders-card-process-details">
          <h3>Status:</h3> 
          <span>
          <h6 className='order-card-process-highlight'>{orderInfo.status}</h6>
           </span> 
        </div>
        <div className="orders-card-customer-details">
          <h6>Customer: {orderInfo.customer_username}</h6>
          <h6>ID: {orderInfo.customer_id}</h6>
          <h6>Payment Method: {orderInfo.payment_method}</h6>
        </div>
      </div>
      <div className="order-card-load">
        <div className="order-card-summary">
          <h6>Item count: {orderInfo.items.length}</h6>
          <h6>Total Price: {orderInfo.price}</h6>
        </div>
        {orderInfo.items.map(order =>
            <div className="order-card-breakdown">
              <h6>{order.product_name}</h6>
              <h6>{order.product_id}</h6>
              <h6>{order.quantity}</h6>
              <h6>{order.sum_price}.00</h6>
            </div>
        )}
      </div>
    </div>
  );
}


