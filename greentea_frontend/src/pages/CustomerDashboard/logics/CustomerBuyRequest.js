export const customerAddCart = async ({items, customer_id} ) => {
    try {
      const response = await fetch('https://green-tea.onrender.com/cart/add-to-cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            customer_id,
            items
        })
      });

      if (response.ok) {
            const responseData = await response.json();
            console.log("Response:", responseData);
            return true;
        }

       return false;
    } catch (err) {
        console.log("Customer Ticket Error:", err);
        return false;
    }
};

export const customerGetCart = async ( customer_id) => {
    try {
      const response = await fetch('https://green-tea.onrender.com/cart/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "customer_id":customer_id
        })
      });

      if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData; // Return response instead of logging
        }

       return "Error: Response not OK";
    } catch (err) {
        console.log("Customer Ticket Error:", err);
        return "err";
    }
};
  
export const createOrderFetch = async ({customer_id, payment_method}) => {
    console.log(customer_id, payment_method)
    try {
      const response = await fetch('https://green-tea.onrender.com/order/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        "customer_id":customer_id, 
        "payment_method":payment_method
        })
      });

      if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return true;
        }

        return false;
    } catch (err) {
        console.log('payment Request error:', err);
        return false;
    }
};

export const emptyCartRequest = async ({customer_id}) => {
    console.log(customer_id)
    try {
      const response = await fetch('https://green-tea.onrender.com/cart/empty', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        "customer_id":customer_id
        })
      });

      if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return true;
        }

        return false;
    } catch (err) {
        console.log('payment Request error:', err);
        return false;
    }
};