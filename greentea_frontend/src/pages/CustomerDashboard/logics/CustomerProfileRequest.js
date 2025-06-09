export const sendTicketConcern = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/ticket/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });

      if (response.ok) {
            const data = await response.json();
            
        }

        return 'err';
    } catch (err) {
        console.log('Login error:', err);
        return 'err';
    }
};

  
export const ticketHistoryRequest = async (ID) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/ticket/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'id': ID })
      });

      if (response.ok) {
            const data = await response.json();
        }

        return data;
    } catch (err) {
        console.log('Login error:', err);
        return 'err';
    }
};

export const cancelTicketRequest = async (ticket_id) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/ticket/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket_id })
      });

      if (response.ok) {
            const data = await response.json();
        }

        return 'confirmed';
    } catch (err) {
        console.log('Login error:', err);
        return 'err';
    }
};
