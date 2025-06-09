import React, { useState } from 'react';


function HeaderSection(){
  return(
    <>
      <i className="fas fa-leaf" style={{ fontSize: '90px', color: 'green' }}></i>
    </>
  )
}




export default function AuthModal({showSuccessModal, loginSubmit, SignupSubmit, updateLogged, username, password, email, setInputTextUsername, setInputTextPassword, setInputTextEmail}) {

const [authForm,setAuthForm] = useState('login')
const [showCheck,setShowCheck] = useState('login')

const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

const modalAuthMode = (text) => {
  setAuthForm(text)
}
  
  return (
        <div className="modal-container">
          <div className='auth-modal'>
            <HeaderSection />
            {authForm === 'login' ? (
              <LoginSection
              showSuccessModal={showSuccessModal}
              loginSubmit={loginSubmit} 
              modalAuthMode={modalAuthMode}
              handleInputChange={handleInputChange} 
              username={username}
              password={password}
              setInputTextUsername={setInputTextUsername}
              setInputTextPassword={setInputTextPassword}
              />
              ) : (
              <SignUpSection
              showSuccessModal={showSuccessModal}
              SignupSubmit={SignupSubmit}
              modalAuthMode={modalAuthMode}
              handleInputChange={handleInputChange}
              username={username}
              email={email}
              password={password}
              setInputTextUsername={setInputTextUsername}
              setInputTextPassword={setInputTextPassword}
              setInputTextEmail={setInputTextEmail}
              />) }
          </div>
        </div>
  );

}


function SuccessMark() {

  return (
      <>
        <h1>Success!</h1>

        <i className="fas fa-check-circle" style={{ padding:'20px',fontSize: '120px', color: 'green' }}></i>
      </>
  );

}

function ErrMark() {

  return (
      <>
        <h1>E R R 0 R !</h1> 
        <i class="fa-solid fa-circle-exclamation" style={{ padding:'20px',fontSize: '120px', color: '#e62e00' }}></i>
      </>
  );

}

function LoginSection({showSuccessModal, loginSubmit, modalAuthMode, handleInputChange, username, password, setInputTextUsername, setInputTextPassword }) {

  return (
      <div className='auth-modal-form'>
        { showSuccessModal === true ? (
          <>
            <SuccessMark />
          </>
          ) :
          showSuccessModal === 'err' ? (
          <>
            < ErrMark />
          </>
        ) : (
            <>
              <h1>Log In</h1>
              <input 
                type="text" 
                name="username" 
                placeholder="username"       
                required 
                id="usernameInput"
                className="dashboard-input"
                value={username}
                onChange={(e) => handleInputChange(e, setInputTextUsername)}
                autoComplete="off"
              />
              <input 
                type="password" 
                name="password" 
                placeholder="password" 
                required 
                id="passwordInput"
                className="dashboard-input"
                value={password}
                onChange={(e) => handleInputChange(e, setInputTextPassword)}
                autoComplete="off"
              />      
              <button className="greenbuttonauth" type="submit" onClick={() => loginSubmit(username, password)}>SUBMIT</button>
              <h1>or</h1>
              <button className="greenbuttonauth" type="button" onClick={() => modalAuthMode('signup')}>SIGN UP</button>
            </>
        )}
      </div>
  );
}



function SignUpSection({showSuccessModal, SignupSubmit, modalAuthMode, handleInputChange, username, password, email,  setInputTextUsername, setInputTextPassword, setInputTextEmail }){

    const toSignIn=()=>{
      setTimeout(() => modalAuthMode('login'), 1000);
    }


    return(
      <div className='auth-modal-form'>
        { showSuccessModal === true ? (
          <>
            <SuccessMark />
          </>
          ) :
          showSuccessModal === 'err' ? (
          <>
            < ErrMark />
          </>
        ) : (
          <>
          <h1>Sign Up</h1>
          <input 
            type="text" 
            name="username" 
            placeholder="username"       
            required 
            className="dashboard-input"
            value={username}
            onChange={(e) => handleInputChange(e, setInputTextUsername)}
            autoComplete="off"
          />
          <input 
            type="email" 
            name="email" 
            placeholder="email" 
            required 
            className="dashboard-input"
            value={email}
            onChange={(e) => handleInputChange(e, setInputTextEmail)}
            autoComplete="off"
          /> 
          <input 
            type="password" 
            name="password" 
            placeholder="password" 
            required 
            className="dashboard-input"
            value={password}
            onChange={(e) => handleInputChange(e, setInputTextPassword)}
            autoComplete="off"

          /> 
          <button className="greenbuttonsmall" type="submit"  onClick={() => SignupSubmit(username, email, password,)}>SUBMIT</button>
          <h1>or</h1>
          <button className="greenbuttonauth" type="button" onClick={() => modalAuthMode('login')}>SIGN IN</button>
          </>
        )}
      </div>
    )
}

