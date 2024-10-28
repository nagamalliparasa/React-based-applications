import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(); //creating user context

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email,setEmail]=useState(null);
  const [loginError,setLoginError]=useState(null);
  const [registerError,setRegisterError]=useState(null);


  const navigate=useNavigate();

  const login = async(email, password) => {

    try {
        const response = await fetch('http://127.0.0.1:8000/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',  // Ensure JSON content type
          },
          body: JSON.stringify({ 
            email: email,
            password: password 
          }),
        });
    
        const data = await response.json();
        if(data.error){
            setLoginError(data.error);
        }
        else if(data.message){
            setUser(data.username);
            setEmail(email);
            navigate('/tasks');
        }
        console.log(data);  // Handle success

    
      } catch (error) {
        setLoginError(error);
      }

    // console.log("User email",user);
    // console.log(JSON.stringify({email,password}));
  };

  const register = async (username, email, password) => {

    try {
        const response = await fetch('http://127.0.0.1:8000/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',  // Ensure JSON content type
          },
          body: JSON.stringify({ 
            username: username,
            email: email,
            password: password 
          }),
        });
    
        const data = await response.json();
        if(data.error){
            setRegisterError(data.error);
        }
        else{
            setUser(username);
            setEmail(email);
            navigate('/tasks');
        }
    
      } catch (error) {
        setRegisterError(error);
      }

    // console.log(user);
    // console.log(JSON.stringify({email,password,username}));
    
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user,email, login, register, logout,loginError,registerError }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
