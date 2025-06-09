export const customerLoginRequest = async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
            const data = await response.json();
            localStorage.setItem('cs_authToken', data.token);
            return data
        }

        return 'err';
    } catch (err) {
        console.log('Login error:', err);
        return 'err';
    }
};

  

export const customerSignupRequest = async (username, email, password, contact_number) => {
  try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'username':username,
          'email':email, 
          'password':password,
          'contact_number':contact_number
        })
  });

  if (response.ok) {
    return 'success'
      } 
    } catch (err) {
      return 'err'
  }
};

export const customerCheckAuth = async () => {
    const token = localStorage.getItem('cs_authToken');
    const user_type = 'customer'
    if (!token) {
        return 'err';
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/check-auth', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_type })
        });
  
        if (response.ok) {
            const data = await response.json();
            return data;
        } 
    } catch (err) {
        console.log("Session check error:", err);
        return 'err';
    }
};

export const fetchCustomerData = async (customer_id) => {

    try {
        const response = await fetch('http://127.0.0.1:8000/profile', {
            method: 'GET',
            headers:  {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({customer_id})
        });
  
        if (response.ok) {
            console.log(response)
            return response;
        } 
    } catch (err) {
        console.log("Session check error:", err);
        return 'err';
    }
};


export const customerLogoutRequest = async () => {
  const token = localStorage.getItem('cs_authToken');

  try {
    const response = await fetch('http://127.0.0.1:8000/logout', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,           
      },
      body: JSON.stringify({user_type: 'customer'})
    });

    if (response.ok) {
      localStorage.removeItem('cs_authToken');
      return true;
    } else {
      console.log("Logout failed", response.status);
      return false;
    }
  } catch (err) {
    console.log("Session log out error:", err);
    return 'err';
  }
};

