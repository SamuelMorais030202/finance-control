import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { requestLogin, setToken } from '../../services/request';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedLogin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();

    try {
      const { token } = await requestLogin('/login', { email, password });

      setToken(token);

      localStorage.setItem('token', token);

      setIsLogged(true);
    } catch (error) {
      setFailedLogin(true);
    }
  }

  useEffect(() => {
    setFailedLogin(false);
  }, [email, password]);

  if (isLogged) return <Navigate to="/dashboard" />

  return (
    <div className='login-page'>
      <Header text={ 'Login' } />
      <section className='user-login'>
        <form>
          <Input type="Email" value={ email } setValue={ setEmail } />
          <Input type="Password" value={ password } setValue={ setPassword } />
          {
            failedLogin
              ? (
                <p>
                  {
                    `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                  }
                </p>
              )
              : null
          }
          <button
            type='submit'
            onClick={ (event) => login(event) }
          >
            Login
          </button>
          <p onClick={ () => navigate('/new-profile') }>Crie uma conta</p>
        </form>
      </section>
    </div>
  )
}