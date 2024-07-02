import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loader from '../assets/loader.gif'
import { ToastContainer, toast } from 'react-toastify';
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';
import '../styles/setAvatar.css'

function SetAvatar(props) {
    const [avatars, setAvatars] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const api = "https://api.multiavatar.com/1822945"
    const navigate = useNavigate();

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: 'dark'
    }
    useEffect(() => {
        if (!localStorage.getItem('userDetails')) {
            navigate('/login');
        }else {
            const user = JSON.parse(localStorage.getItem('userDetails'));
            if(user.avatarImage){
                navigate('/')
            }
        }
        
    }, [navigate])

    useEffect(() => {
        (async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setLoading(false);
        })();
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("userDetails"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                avatarImage: avatars[selectedAvatar]
            })

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.avatarImage;
                localStorage.setItem("userDetails", JSON.stringify(user));
                navigate('/');
            } else {
                toast.error("Error setting avatar. Please try again", toastOptions)
            }
        }
    }

    return (
        <>
            <div className='container'>
                {
                    loading ? (
                        <img src={loader} alt="my-gif" className='loader' />
                    ) : (
                        <>
                            <div className='title-container'>
                                <h1>Pick an avatar as your profile picture</h1>
                            </div>
                            <div className='avatars'>
                                {avatars &&
                                    avatars.map((avatar, index) => {
                                        return (
                                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
                        </>

                    )
                }
            </div>
            <ToastContainer />
        </>
    );
}

export default SetAvatar;