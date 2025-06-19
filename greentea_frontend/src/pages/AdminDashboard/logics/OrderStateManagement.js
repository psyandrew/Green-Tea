import { useState, useEffect  } from 'react';  

export const useOrderRequests = () => {
  const [ordersData, setOrdersData] = useState([]);

  const fetchOrders = async() => {
      try {
        const response = await fetch( 'https://green-tea.onrender.com/admin/orders/all')
        const data = await response.json();
        setOrdersData(data);
      } catch(error) {
        console.log(error.message)
      }
    }

  useEffect(() => {
    fetchOrders();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  const updateOrdersRequest = async ( orderID, data ) => {
    
    try {
      const request = await fetch( 
        'https://green-tea.onrender.com/admin/orders/update/status',
        {
          method: "PATCH",
          headers:  {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ 
        "orderbundle_id": orderID,
        "order_status_update": data
        }), 
      });

        
      if (!request.ok) {
        throw new Error(`HTTP error! Status: ${request.status}`);
      }
      
      const backendResponse = await request.json();
      setOrdersData(prevState => ({
                ...prevState,
                order_queue: prevState.order_queue.map(order => 
                    order.orderbundle_id === backendResponse.orderbundle_id
                        ? { ...order, status: backendResponse.status }
                        : order
                )
            }));
        } catch(error) {
            console.error("Update error:", error);
        }
    };

  return {
    ordersData,
    fetchOrders,
    updateOrdersRequest
  };
} 