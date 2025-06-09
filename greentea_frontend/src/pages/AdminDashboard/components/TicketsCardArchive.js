export function TicketsCardArchive({ ticketInfo }) {
  return (
    <div className="tickets-card fr">
      <div className="tickets-card-id">
        <h3>TICKET ID: {ticketInfo.ticket_id}</h3>
      </div>
      <div className="tickets-card-details">
        <div className="tickets-card-process-details">
          <h3>Status:</h3> 
          <span>
          <h6 className='tickets-card-process-highlight'>{ticketInfo.status}</h6>
           </span> 
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
         <h6>{ticketInfo.admin_notes}</h6>
      </div>
    </div>
  );
}