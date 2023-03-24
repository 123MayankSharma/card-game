import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserInfo = () => {
  const [userName,setUserName]=useState(null)
  const navigate=useNavigate()

  const handleSubmit=()=>{
    if(userName===null){
      alert("please enter a username")
    }else{
    navigate("/game",{state:{username:userName}}) 
    }
  }
  return (
    <div style={{display:"grid",placeItems:"center",color:"black"}}>
      <h2>Enter Your Username:</h2>
      <input 
        type='text' 
        placeholder='username'
        value={userName}
        onChange={(e)=>{setUserName(e.target.value)}}
        style={{border:"2px solid grey"}}
      />
      <button onClick={handleSubmit}>Start Game</button>

    </div>

  )
}

export default UserInfo
