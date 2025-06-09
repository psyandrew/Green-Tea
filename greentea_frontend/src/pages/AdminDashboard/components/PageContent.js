import InventoryManagement from './InventoryManagement.js';
import OrderManagement from './OrderManagement.js';
import CSManagement from './CSManagement.js';


export default function PageContent({logged, contentPage}) {
  return (
    <>
      { logged === true && contentPage === 'inventory'  ?  < InventoryManagement /> : logged === false ? null : null }
      { logged === true && contentPage === 'orders'  ?  < OrderManagement /> : logged === false ? null : null }
      { logged === true && contentPage === 'orders_archive'  ?  < OrderManagement prop={'orders_archive'} /> : logged === false ? null : null }
      { logged === true && contentPage === 'tickets'  ?  < CSManagement prop={'tickets'}  /> : logged === false ? null : null }
      { logged === true && contentPage === 'tickets_archive'  ?  < CSManagement prop={'tickets_archive'} /> : logged === false ? null : null }
      { logged === true && contentPage === 'db'  ?  < CSManagement prop={'db'} /> : logged === false ? null : null }
    </>
  );
}