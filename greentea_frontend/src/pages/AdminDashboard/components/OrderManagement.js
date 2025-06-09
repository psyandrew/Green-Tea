import { useOrderRequests } from '../logics/OrderStateManagement'
import OrdersCardActive from './OrderCardActive'
import OrdersCardArchive from './OrderCardArchive'
import { useEffect  } from 'react';  


export default function OrderManagement( prop ) {
  const { ordersData } = useOrderRequests()
  
	return(
    <div className='content-page-container'>
      <div className='content-page-header'>
        { prop.prop === 'orders_archive' ? <h3>ORDERS ARCHIVE</h3> : <h3>ORDERS MANAGEMENT</h3>}
      </div>

       { prop.prop === 'orders_archive' ? < OrdersArchive archiveList={ordersData} /> : < OrdersQueue queueList={ordersData} />}
      
    </div>
  )
}

function OrdersArchive({archiveList ={ order_queue: [] }}) {

  return (
    <div className="orders-container">
      { !archiveList?.order_queue?.length ? <div>Loading orders...</div> 
        : archiveList.order_queue.filter(order => order.status === 'ARCHIVE' ).sort((a, b) => b.status.localeCompare(a.status)).map((order, i) => <OrdersCardArchive key={i} orderInfo={order} />) 
      }
    </div>
  );
}

function OrdersQueue({ queueList ={ order_queue: [] } }) {
  const { updateOrdersRequest } = useOrderRequests()
  
  return (
    <div className="orders-container">
      { !queueList?.order_queue?.length ? <div>Loading orders...</div> 
      : queueList.order_queue.filter(order => order.status !== 'ARCHIVE' ).map((order, i) => <OrdersCardActive key={i} orderInfo={order} updateOrdersRequest={updateOrdersRequest} />) 
      }
    </div>
  );
}


