import { useState } from 'react';

export default function AuthModal({ showCheck, showAuthModal, loginSubmit, SignupSubmit, updateLogged, username, password, email, contactNum, setInputTextUsername, setInputTextContactNum, setInputTextPassword, setInputTextEmail }) {

  const [authForm, setAuthForm] = useState('login');
  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };



  return (
    <div className="cs-auth-modal">
      {authForm === 'login' ? (
        <LoginSection
          showCheck={showCheck}
          loginSubmit={loginSubmit}
          setAuthForm={setAuthForm}
          handleInputChange={handleInputChange}
          username={username}
          password={password}
          setInputTextUsername={setInputTextUsername}
          setInputTextPassword={setInputTextPassword}
        />
      ) : (
        <SignUpSection
          showCheck={showCheck}
          SignupSubmit={SignupSubmit}
          setAuthForm={setAuthForm}
          handleInputChange={handleInputChange}
          username={username}
          email={email}
          password={password}
          contactNum={contactNum}
          setInputTextUsername={setInputTextUsername}
          setInputTextPassword={setInputTextPassword}
          setInputTextContactNum={setInputTextContactNum}
          setInputTextEmail={setInputTextEmail}
        />
      )}
    </div>
  );
}



function SuccessMark() {
  return (
    <>
      <h1>Success!</h1>
      <i className="fas fa-check-circle" style={{ padding: '20px', fontSize: '120px', color: 'green' }}></i>
    </>
  );
}

function ErrMark() {
  return (
    <>
      <h1>Error!</h1>
      <i className="fa-solid fa-circle-exclamation" style={{ padding: '20px', fontSize: '120px', color: '#e62e00' }}></i>
    </>
  );
}

function LoginSection({ showCheck, loginSubmit, setAuthForm, handleInputChange, username, password, setInputTextUsername, setInputTextPassword }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    loginSubmit(username, password);
  };

  return (
    <div className="cs-auth-modal-card">
      <i className="fa-solid fa-leaf"></i>

      {showCheck === true ? (
        <SuccessMark />
      ) : showCheck === 'err' ? (
        <ErrMark />
      ) : (
        <form onSubmit={handleSubmit}  className="cs-auth-form">
          <h1>Log In</h1>
          <p>Log in to purchase!</p>
          <input 
            type="text" 
            name="username" 
            placeholder="Username"       
            required 
            className="dashboard-input"
            value={username}
            onChange={(e) => handleInputChange(e, setInputTextUsername)}
            autoComplete="off"
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            className="dashboard-input"
            value={password}
            onChange={(e) => handleInputChange(e, setInputTextPassword)}
            autoComplete="off"
          />      
          <button className="greenbuttonauth" type="submit">SUBMIT</button>
          <p>or</p>
          <button className="greenbuttonauth" type="button" onClick={() => setAuthForm('signup')}>SIGN UP</button>
        </form>
      )}
    </div>
  );
}

function SignUpSection({ showCheck, SignupSubmit, setAuthForm, handleInputChange, username, password, contactNum, email, setInputTextUsername, setInputTextPassword, setInputTextContactNum, setInputTextEmail }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    SignupSubmit(username, email, password, contactNum);
  };

  return (
    <div className="cs-auth-modal-card">
    <i class="fa-solid fa-leaf"></i>

    {showCheck === true ? (
      <SuccessMark />
    ) : showCheck === 'err' ? (
      <ErrMark />
    ) : (
    <form onSubmit={handleSubmit} className="cs-auth-form">
      <h1>Sign Up</h1>
      <input 
        type="text" 
        name="username" 
        placeholder="Username"       
        required 
        className="dashboard-input"
        value={username}
        onChange={(e) => handleInputChange(e, setInputTextUsername)}
        autoComplete="off"
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        required 
        className="dashboard-input"
        value={email}
        onChange={(e) => handleInputChange(e, setInputTextEmail)}
        autoComplete="off"
      /> 
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        required 
        className="dashboard-input"
        value={password}
        onChange={(e) => handleInputChange(e, setInputTextPassword)}
        autoComplete="off"
      />
      <input 
        type="tel" 
        name="contactNum" 
        placeholder="Contact No." 
        required 
        className="dashboard-input"
        value={contactNum}
        onChange={(e) => handleInputChange(e, setInputTextContactNum)}
        autoComplete="off"
      />
      <button className="greenbuttonauth" type="submit">SUBMIT</button>
           <p>or</p>
      <button className="greenbuttonauth" type="button" onClick={() => setAuthForm('login')}>SIGN IN</button>
    </form>
  )}
  
    
</div>
  );
}
