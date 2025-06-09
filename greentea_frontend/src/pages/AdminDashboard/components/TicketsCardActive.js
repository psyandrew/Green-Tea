import { useState, useEffect } from 'react';


export function TicketsCardActive({ ticketInfo, updateTicketsRequest }) {

  const [ticketStatus, setticketStatus]= useState(ticketInfo.status)
  const [adminTicketLogs, setAdminTicketLogs]= useState(ticketInfo.admin_notes)

  const statusOptions = ["RESOLVED", "UNRESOLVED", "PROCESSING", "ARCHIVE"];

   const statusChange = (direction) => { 


        const currentIndex = statusOptions.indexOf(ticketStatus);
        let nextIndex;

        if (direction === 'up') {
            nextIndex = (currentIndex + 1) % statusOptions.length; 
        } else {
            nextIndex = (currentIndex - 1 + statusOptions.length) % statusOptions.length; 
        }

        setticketStatus(statusOptions[nextIndex]);
    };

  const updateHandles = (id, type, data) => {
    console.log(id, type, data)
    updateTicketsRequest( id, type, data);

  };

  return (
    <div className="tickets-card fr">
      <div className="tickets-card-id">
        <h3>TICKET ID: {ticketInfo.ticket_id}</h3>
      </div>
      <div className="tickets-card-details">
        <div className="tickets-card-process-details">
          <h3>Status:</h3> 
          <span>
          <button onClick={() => statusChange('up')} className='greenbuttonsmallround'>&lsaquo;</button>
          <h6 className='tickets-card-process-highlight'>{ticketStatus}</h6>
          <button onClick={() => statusChange('down')} className='greenbuttonsmallround'>&rsaquo;</button>
           </span> 
          <button className="greenbuttonupdate" onClick={()=> updateHandles(ticketInfo.ticket_id,'status', ticketStatus)} >UPDATE</button>
        </div>
        <div className="tickets-card-customer-details">
          <h6>Customer: {ticketInfo.customer_username}</h6>
          <h6>ID: {ticketInfo.customer_id}</h6>
        </div>
      </div>
      <div className="tickets-card-load customer-concerns">
        <div className="tickets-card-summary ">
          <h6>CONCERN:</h6> 
        </div>
        {<h6>{ticketInfo.ticket_details}</h6>}    
      </div>
      <div className="tickets-card-load admin-load">
        <div className="tickets-card-summary-admin">
          <h6>ADMIN LOGS:</h6> 
        </div>
         <textarea  value={adminTicketLogs} onChange={(e) => setAdminTicketLogs(e.target.value)}/>
      </div>
      <button className="greenbuttonupdate" onClick={()=> updateHandles(ticketInfo.ticket_id, 'admin_notes', adminTicketLogs)} >UPDATE</button>
    </div>
  );
}

