import { useEffect } from 'react';


export function CustomerCard({index, customerInfo }) {

  useEffect(() => {
    console.log(customerInfo)
  }, [customerInfo])

  if (!customerInfo) {
    return <div>Loading...</div>;
  }

  return (
    <tbody className="customer-card-container">
      <tr className="customer-row">
        <td className="cell-center">{index + 1}</td>
        <td>{customerInfo.customer_username}</td> 
        <td className="cell-center">{customerInfo.customer_id}</td>
        <td className="cell-center">{customerInfo.contact_number}</td>
        <td className="cell-center">{customerInfo.email}</td>
        <td className="cell-center">${customerInfo.cart.total_cart_price}</td>
        <td className="cell-center">{customerInfo.cart.payment_method === "Empty" ? null : customerInfo.cart.payment_method}</td>
      </tr>
      <tr>
        <td colSpan="7">
          <div className="cart-container">
            <h5>Cart:</h5>
            {customerInfo.cart.in_cart.length > 0 ? (
              <table className="cart-table">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "30%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan="2" className="cell-center">Item</th>
                    <th className="cell-center">Quantity</th>
                    <th className="cell-center">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {customerInfo.cart.in_cart.map((item, i) => (
                    <tr key={i}>
                      <td className="cell-center">{item.product_name}</td>
                      <td className="cell-center">{item.product_id}</td>
                      <td className="cell-center">{item.quantity}</td>
                      <td className="cell-center">${item.sum_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h5>Empty</h5>
            )}
          </div>
        </td>
    </tr>
    </tbody>
  );
}

