import { useState, useEffect  } from 'react';  

export const useCSMRequests = () => {
  const [customerData, setCustomerData] = useState([]);
  const [ticketsData, setTicketsData] = useState([]);

  const fetchData = async() => {
    try {
      const [ticketsResponse, customersResponse] = await Promise.all([
        fetch('http://127.0.0.1:8000/admin/tickets/all'),
        fetch('http://127.0.0.1:8000/admin/user/all')
        //
      ]);

      const [ticketsData, customerData] = await Promise.all([
          ticketsResponse.json(),
          customersResponse.json()
        ]);

      setTicketsData(ticketsData);
      setCustomerData(customerData);
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  };

  useEffect(() => {
    fetchData();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const updateTicketsRequest = async ( ticketID, type, data ) => {
    
    const fetchMap ={
      status:'http://127.0.0.1:8000/admin/tickets/update/status',
      admin_notes:'http://127.0.0.1:8000/admin/tickets/update/notes'
    }


    try {
      const request = await fetch( 
        fetchMap[type],
        {
          method: "PATCH",
          headers:  {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ 
        "ticket_id_ref": ticketID,
        [type]: data
        }), 
      });

        
      if (!request.ok) {
        throw new Error(`HTTP error! Status: ${request.status}`);
      }
      
      const backendResponse = await request.json();
      setTicketsData(prevState => ({
                ...prevState,
                ticket_queue: prevState.ticket_queue.map(ticket => 
                    ticket.ticket_id === backendResponse.ticket_id
                        ? { ...ticket, type: backendResponse[type] }
                        : ticket
                )
            }));
        } catch(error) {
            console.error("Update error:", error);
        }
    };
 

  return {
    customerData,
    ticketsData,
    fetchData,
    updateTicketsRequest
  };
}
  


  