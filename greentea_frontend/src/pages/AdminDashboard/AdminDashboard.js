import { adminLoginRequest, adminCheckAuth,  adminSignupRequest, adminLogoutRequest } from './logics/AdminAuthRequests.js';
import { useAuthState } from './logics/DashboardStateManagement.js';
import AuthModal from './modals/AuthModal.js';
import Sidebar from './components/Sidebar.js';
import PageContent from './components/PageContent.js';

import {  useEffect} from 'react';

import "./CSS/stylesAD.css";
import "./CSS/fonts.css"
import "./CSS/buttonAD.css"
import "./CSS/animations.css"


export default function AdminDashboard() {
  const { 
    logged,
    updateLogged, 
    contentPage, 
    updateContentPage, 
    showSuccessModal, 
    setShowSuccessModal,
    username, 
    password, 
    email,
    setInputTextUsername,
    setInputTextPassword,
    setInputTextEmail 
  } = useAuthState();

  
  useEffect(() => {
  const verifyAuth = async () => {
    const result = await adminCheckAuth();
    if (result === "success") {
      updateLogged(true);
    }
  };

  verifyAuth();
  }, []);


  const loginSubmit = async (username, password) => {
    const result = await adminLoginRequest(username, password);
    if (result === 'success') {
      setShowSuccessModal(true)
      setTimeout(() => updateLogged(true), 1000);;
      setTimeout(() => setShowSuccessModal(false), 1100); 
    }

    if (result === 'err') {
      setShowSuccessModal('err')
      setTimeout(() => setShowSuccessModal(false), 1100); 
    }
  };

  const SignupSubmit = async (username, email, password) => {
    const result = await adminSignupRequest(username, email, password);
    if (result === 'success') {
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 1000);
    }

    if (result === 'err') {
      setShowSuccessModal('err')
      setTimeout(() => setShowSuccessModal(false), 1100); 
    }
  };

  const logoutSubmit = async () => {
    const result = await adminLogoutRequest();
    if (result) {
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 1000)
      setTimeout(() => updateLogged(false), false);
    }

    if (result === 'err') {
      setShowSuccessModal('err')
      setTimeout(() => setShowSuccessModal(false), 1100); 
    }
  };

  return (
    <div className='dashboardbg'>
      {logged === false ? (     
      <AuthModal
        showSuccessModal={showSuccessModal}
        SignupSubmit={SignupSubmit}
        setShowSuccessModal={setShowSuccessModal}
        loginSubmit={loginSubmit}
        updateLogged={updateLogged}
        username={username}
        password={password}
        email={email}
        setInputTextUsername={setInputTextUsername}
        setInputTextPassword={setInputTextPassword}
        setInputTextEmail={setInputTextEmail}
        />
      ) : logged === true ? (
      <>
        <Sidebar logged={logged} updateContentPage={updateContentPage} logoutSubmit={logoutSubmit}/>
        <PageContent logged={logged} contentPage={contentPage} />
      </>
      ) : null}

    </div>
  );
}