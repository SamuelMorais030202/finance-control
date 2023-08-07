import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/request';
import { setToken } from '../../services/request';

import { FaUser } from "react-icons/fa";
import './index.css';

export const EditProfile = () => {
  const [user, setUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const fetchUser = async () => {
    const { data } = await api.get('/user');
    setUser(data);
    setFullName(data.fullName);
    setEmail(data.email);
    setPhone(data.phone);
  }

  const editProfile = async () => {
    try {
      if (user.password !== password) {
        return alert('Senha incorreta');
      }

      const updateProfile = await api.put('user', {
        fullName,
        email,
        phone,
        password,
      });

      if (updateProfile.status === 200) alert('Update user');

      setIsEdit(false);
    } catch ({ response: { data } }) {
      alert(data.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token') || '';

    if (!token) {
      navigate('/login');
    } else {
      setToken(token);
    }
  
    fetchUser();
  }, [navigate])

  return (
    <div className='page-edit-profile'>
      <h1>Edit profile</h1>
      <FaUser size={68} color="gray" />
      {
        !isEdit
        ? <section className='profile'>
            <p><span>Name:</span> {' '} { fullName }</p>
            <p><span>Email:</span> {' '} { email }</p>
            <p><span>Phone:</span> {' '} { phone }</p>
            <button onClick={ () => setIsEdit(true) } className="button">Edit Profile</button>
          </section>
        : <section className='profile-edit'>
            <label htmlFor="fullName">
              <input type="text" value={ fullName } onChange={ ({ target }) => setFullName(target.value) } />
            </label>
            <label htmlFor="email">
              <input type="text" value={ email } onChange={ ({ target }) => setEmail(target.value) } />
            </label>
            <label htmlFor="phone">
              <input type="text" value={ phone } onChange={ ({ target }) => setPhone(target.value) } />
            </label>
            <label htmlFor="password">
              <input type="password" placeholder='enter the password' onChange={ ({ target }) => setPassword(target.value) } />
            </label>
            <button onClick={ () => editProfile() } className="button">
              Edit
            </button>
          </section>
      }
    </div>
  )
}