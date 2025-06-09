export const createCustomerTicket = async (data) => {

    try {
      const response = await fetch('http://127.0.0.1:8000/ticket/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "subject": data.subject,
            "email": data.email,
            "customer_id_ref": data.id,
            "ticket_details": data.message,
            "customer_username": data.username

        })
      });

      if (response.ok) {
            const responseData = await response.json();
            console.log("Response:", responseData);
            return true
        }

       return false;
    } catch (err) {
        console.log("Customer Ticket Error:", err);
        return "err";
    }
};
  