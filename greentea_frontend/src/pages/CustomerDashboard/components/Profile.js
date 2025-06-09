import { useEffect} from 'react';


export default function Profile({customer={}, id, LogOutSubmit }) {


  return (
    <div className='profile-container'>
      <UserDetails userData={customer['Customer']} id={customer['data']} LogOutSubmit={LogOutSubmit}/>
      <OrderHistory orderData={customer['order_history']}/>
      <TicketHistory ticketData={customer['ticket_history']}/>
    </div>
  );
}

function UserDetails({userData={}, id, LogOutSubmit={}}) {
    
  return (
    <div className='details-card-container'>
      <h1>Profile</h1>
      <div className='details-card'>
        <div className='avatar'>
          <i className="fa-solid fa-user"></i>
        </div>
        <p><i className="fa-solid fa-user"></i> username: {userData['customer_username']}</p>
        <p><i className="fa-solid fa-id-badge"></i> ID: {id} </p>   
        <p><i className="fa-solid fa-phone"></i> contact number: {userData['contact_number']}</p>     
        <p><i className="fa-solid fa-envelope"></i> email: {userData['email']}</p>
          <button className='logout-btn-cs' onClick={()=>LogOutSubmit()}><i className="fa-solid fa-right-from-bracket"></i> LOGOUT </button>
      </div>

    </div>
  );
}  

function OrderHistory({orderData={}}) {

  

  return (
    <div className='history-card-container'>
      <h1>Order History</h1>
      <div className='history-card'>
        {orderData.length > 0 ? (
          <>
          {[...orderData]
  .sort((a, b) =>  b.status.localeCompare(a.status))
  .map((e, indexE) => (
    <div key={indexE} className='order-bundles'>
      <p>Order ID: {e['orderbundle_id']}</p>
      <p>Items:</p>
      {e['items'].map((x, indexX) => (
        <div key={indexX} className='order-bundle-items'>
          <p>{x['product_name']}</p>
          <p>{x['quantity']}</p>
          <p>₱{x['sum_price']}</p>
        </div>
      ))}
      <div className='order-bundle-details'>
        <p>Total Amount due: <span>₱{e['price']}</span></p>
        <p>Payment via: {e['payment_method']}</p>
        <p>{e['status']}</p>
      </div>
    </div>
))}
          </>
        ) :<h1>No Orders</h1>}
      </div>
    </div>
  );
}  

function TicketHistory({ticketData}) {

  const formatDate =(timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear());
    return `${day}-${month}-${year}`;
  }

  useEffect(()=>{
    console.log(ticketData)
  },[ticketData])

  return (
    <div className='history-card-container'>
      <h1>Ticket History</h1>
      <div className='history-card'>
        {ticketData.length > 0 ? (
          <>
          {ticketData.map((e, indexE) =>
            <div key={indexE} className='ticket-card'>
              <p>Ticket Id: {e['ticket_id']}</p>
              <p>Concern: <span>{e['subject']}</span></p>
              <div><p>{e['ticket_details']}</p></div>
              <span>{e['status'] === 'PROCESSING' ? <p>UNDER REVIEW</p> : <p>{e['status']}</p>}</span>
              <p>Date: {formatDate(e['created_on'])}</p>
            </div>
          )}
          </>
            ) : <h1>No concerns</h1>
        }
      </div>
    </div>
  );
} 

