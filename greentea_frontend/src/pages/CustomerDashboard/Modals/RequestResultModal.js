export default function RequestResultModal({ show, res, type}) {


  return (
    <div className={`${show ? 'modal-show' : 'modal-hide'}`}>
        <div className="ctg-modal-card">
          <h1> {  type === 'no stock' ? "SOLD OUT :(("  
                  : type === 'concern' ? 'Concern Received'
                  : type === 'cart' ? "Item Added"
                  : type === 'clear' ? "Cart Empty!"
                  : type === 'needlogin' ? "Log in to buy"
                  : res ? 'Order in Queue'
                  :  'E R R 0 R !' 

                }</h1>
          {res ? (
            <i className="fas fa-check-circle" style={{ padding: '20px', fontSize: '120px', color: 'green' }}></i>
          ) : (
            <i className="fa-solid fa-circle-exclamation" style={{ padding: '20px', fontSize: '120px', color: '#e62e00' }}></i>
          )}
        </div>
    </div>
  );
}

