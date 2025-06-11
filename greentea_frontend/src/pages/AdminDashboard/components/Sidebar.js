import { useState } from 'react';


export default function Sidebar({logged, updateContentPage, logoutSubmit }) {
  
  const[minimize, setMinimize] = useState(false)

  return (
    <>
  { !minimize ? 
    <div className='sidebar-container'>
      <div className='sidebar-head'>
        <i  className="fas fa-leaf leaf" onClick={() => setMinimize(true)}></i>
      </div>
      {logged ? (<SidebarLogged updateContentPage={updateContentPage} logoutSubmit={logoutSubmit}/>) : null}
    </div> 
  :
    <div className='sidebar-container-minimized'>  
      <div className='sidebar-head-minimized'>
        <i  className="fas fa-leaf leaf-min" onClick={() => setMinimize(false)}></i>
      </div>
    </div>
  }
</>

  );
}


function SidebarLogged({updateContentPage, logoutSubmit={logoutSubmit}}) {

  return(
    <div className='sidebar-content-container'>
      <div className='sidebar-content'>
        <p className='sidebar-tabs-header' >Inventory Management</p>    
        <p className='sidebar-tabs' onClick={() => updateContentPage('inventory')}>Update Inventory</p>  

        <p className='sidebar-tabs-header'>Order Management</p>
        <p className='sidebar-tabs' onClick={() => updateContentPage('orders')}>Update Orders</p>
        <p className='sidebar-tabs' onClick={() => updateContentPage('orders_archive')}>Archive</p>  

        <p className='sidebar-tabs-header'>Customer Relations</p>
        <p className='sidebar-tabs' onClick={() => updateContentPage('db')}>Customer List</p>
        <p className='sidebar-tabs' onClick={() => updateContentPage('tickets')}>Concern Tickets</p>
        <p className='sidebar-tabs' onClick={() => updateContentPage('tickets_archive')}>Tickets Archive</p>

        

        <button className="logoffbutton" onClick={()=> logoutSubmit()}>LOG OFF</button>
      </div>
    </div>
  )
}