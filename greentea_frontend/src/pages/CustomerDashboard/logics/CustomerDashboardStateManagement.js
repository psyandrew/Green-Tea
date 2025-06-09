import { useState } from 'react';  

export const CustomerAuthState = () => {
  const [logged, setLogged] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [email, setEmail] = useState('');

  // Setters for the locked content
  const updateLogged = (bool) => setLogged(bool);

  // Setters for the auth values
  const setInputTextUsername = (text) => setUsername(text);
  const setInputTextPassword = (text) => setPassword(text);
  const setInputTextContactNum = (text) => setContactNum(text);
  const setInputTextEmail = (text) => setEmail(text);

  return {
    logged, 
    showCheck,
    username, 
    password, 
    email,
    contactNum,
    updateLogged,
    setInputTextUsername,
    setInputTextPassword,
    setInputTextEmail,
    setInputTextContactNum,
    setShowCheck
  };
};