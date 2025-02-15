import React from 'react'
import { message } from 'antd';
import axios from 'axios';
import { HideLoading, ShowLoading } from '../../redux/rootSlice';
import { useDispatch } from 'react-redux';
function  Login() {
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    });
const dispatch = useDispatch();
const login = async () => {

    try {
        dispatch(ShowLoading())
        const response = await axios.post('/api/portfolio/admin-login', user);
        dispatch(HideLoading())
        if(response.data.success) {
            message.success(response.data.message)
            localStorage.setItem('token', JSON.stringify(response.data));
            window.location.href = '/admin';
            } else {
                message.error(response.data.message);
            }
    } catch (error) {
        message.error(error.message)
        dispatch(HideLoading())

    }
}

    return (
        <div className='flex justify-center items-center h-screen bg-orange'>
            <div className='w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col bg-white'>
            <h1 className='text-2xl justify-center'>PortFolio - Admin Login</h1>
            <hr />
            <input className='rounded-lg' type='text' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder='User Name' />
            <input className='rounded-lg' type='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Password' />
            <button className='bg-orange text-white p-2 rounded-full' onClick={login}>Login</button>
        </div>
        </div>
    )
}

export default  Login
