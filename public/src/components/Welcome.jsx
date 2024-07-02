import React from 'react'
import robot from '../assets/robot.gif'
import '../styles/welcome.css'

export default function Welcone({currentUser}) {
  return (
    <div className='welcomne-container'>
      <img src={robot} alt="robo" />
      <h1>
        Welcome, <span>{currentUser.username}</span>
      </h1>
      <h3>Please select a chat to Start Messaging</h3>
    </div>
  )
}
