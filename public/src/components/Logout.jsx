import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from "react-icons/bi";
import '../styles/logout.css'

export default function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate('/login')
    }

    return (
        <button className="logout" onClick={handleClick}>
            <BiPowerOff/>
        </button>
    )
}
