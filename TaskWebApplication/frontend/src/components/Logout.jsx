import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
const Logout = () => {
    const {logout}=useContext(AuthContext);

    const handlelogout =()=>{
        logout();
    }
  return (
    <div>
      <h1 onClick={handlelogout}>Logout</h1>
    </div>
  )
}

export default Logout
