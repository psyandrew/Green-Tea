export const sendTicketConcern = async (data) => {
    try {
      const response = await fetch('https://green-tea-production.up.railway.app/ticket/create', {
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
      const response = await fetch('https://green-tea-production.up.railway.app/ticket/history', {
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
      const response = await fetch('https://green-tea-production.up.railway.app/ticket/cancel', {
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
