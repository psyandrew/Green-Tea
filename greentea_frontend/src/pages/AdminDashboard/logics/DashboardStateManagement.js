import { useState } from 'react';  

export const useAuthState = () => {
  const [logged, setLogged] = useState(false);
  const [contentPage, setContentPage] = useState('inventory');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Setters for the locked content
  const updateContentPage = (page) => setContentPage(page);
  const updateLogged = (bool) => setLogged(bool);

  // Setters for the auth values
  const setInputTextUsername = (text) => setUsername(text);
  const setInputTextPassword = (text) => setPassword(text);
  const setInputTextEmail = (text) => setEmail(text);

  return {
    logged, 
    contentPage, 
    showSuccessModal,
    username, 
    password, 
    email,
    updateContentPage,
    updateLogged,
    setInputTextUsername,
    setInputTextPassword,
    setInputTextEmail,
    setShowSuccessModal
  };
};