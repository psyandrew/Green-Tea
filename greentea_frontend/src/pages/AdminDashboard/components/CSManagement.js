import { useCSMRequests } from '../logics/CSMStateManagement'
import {  TicketsCardActive } from './TicketsCardActive'
import {  TicketsCardArchive } from './TicketsCardArchive'
import {  CustomerCard } from './CustomerCard'

export default function CSManagement( prop ) {
	const { ticketsData } = useCSMRequests()

	return(
    <div className='content-page-container'>
      <div className='content-page-header'>
        { prop.prop === 'tickets_archive' ? <h3>TICKET ARCHIVE</h3> : prop.prop === 'tickets' ? <h3>TICKET MANAGEMENT</h3> : <h3>CUSTOMER LIST</h3>}
      </div>

      { prop.prop === 'tickets_archive' ? < TicketsArchive archiveList ={ticketsData} /> : prop.prop === 'tickets' ? < TicketsQueue queueList={ticketsData} /> : < CustomerDatabase customerList={ticketsData} />}
    </div>
  )
}

function TicketsArchive({archiveList ={ ticket_queue: [] }}) {

  return (
    <div className="tickets-container">
      { !archiveList?.ticket_queue?.length 
      ? <div>Loading tickets...</div> 
      : archiveList.ticket_queue.filter(tickets => tickets.status === 'ARCHIVE' ).map((tickets, i) => <TicketsCardArchive key={i} ticketInfo={tickets} />) 
    }
    </div>
  );
}

function TicketsQueue({ queueList = { ticket_queue: [] } }) {
  const { updateTicketsRequest } = useCSMRequests()

  return (
    <div className="tickets-container">
      { !queueList?.ticket_queue?.length ? <div>Loading tickets...</div> 
        : queueList.ticket_queue.filter(tickets => tickets.status !== 'ARCHIVE' ).map((tickets, i) => <TicketsCardActive key={i} ticketInfo={tickets} updateTicketsRequest={updateTicketsRequest} />) 
      }
    </div>
  );
}
      

function CustomerDatabase({customerList ={ database: [] }}) {
  const { customerData } = useCSMRequests()

  return (
    <div className="database-container">
      <table className="database-table">
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
        </colgroup>
        <thead>
          <tr className="cell-center">
            <th>No.</th>
            <th className="cell-username">Username</th>
            <th className="cell-id">ID</th>
            <th className="cell-contact-number">Contact</th>
            <th className="cell-email">Email</th>
            <th className="cell-total">Total Price</th>
            <th className="cell-pm">Payment Method</th>
          </tr>
        </thead>
          { !customerData?.database?.length 
            ? <div>Loading Customers...</div> 
            : customerData.database.map((customer, i) => <CustomerCard index={i} customerInfo={customer} />) 
          }
      </table>
    </div>
  );
}
