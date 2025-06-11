export const adminLoginRequest = async (username, password) => {
    try {
        const response = await fetch('https://green-tea-production.up.railway.app/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('authToken', token);
            return 'success';
        }

        return 'err';
    } catch (err) {
        console.log('Login error:', err);
        return 'err';
    }
};


export const adminCheckAuth = async () => {
    const token = localStorage.getItem('authToken');
    const user_type = 'admin'
    if (!token) {
        console.log("No token");
        return 'err';
    }

    try {
        const response = await fetch('https://green-tea-production.up.railway.app/admin/check-auth', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_type })
        });
  
        if (response.ok) {
            return 'success';
        } 
    } catch (err) {
        console.log("Session check error:", err);
        return 'err';
    }
};


export const adminSignupRequest = async (username, email, password) => {
  try {
      const response = await fetch('https://green-tea-production.up.railway.app/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'username':username,
          'email':email, 
          'password':password
        })
  });

  if (response.ok) {
    return 'success'
      } 
    } catch (err) {
      return 'err'
  }
};

export const adminLogoutRequest = async () => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await fetch('https://green-tea-production.up.railway.app/admin/logout', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,           
      },
      body: JSON.stringify({user_type: 'admin'})
    });

    if (response.ok) {
      localStorage.removeItem('authToken');
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