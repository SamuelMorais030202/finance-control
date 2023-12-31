import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { requestData, setToken, requestLogin } from '../../services/request';
import { useFinance } from '../../hooks/useFinance';
import { Finances } from '../../components/Finance';
import { Form } from '../../components/Form';
import { Table } from '../../components/Table';
import { Header } from '../../components/Header';

import './index.css';

export const DashBoard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    setFinances,
    description,
    setDescription,
    value,
    setValue,
    type,
    setType,
    setGain,
    setSpent,
    setTotal,
  } = useFinance();

  const navigate = useNavigate();
  const endpoint = '/finances';

  const deleteFinances = async (id) => {
    await api.delete(`/finances/${id}`);
    fetchFinances();
  }
 
  const fetchFinances = useCallback(async () => {
    const token = localStorage.getItem('token') || '';

    if (!token) {
      navigate('/login');
    } else {
      setToken(token);
    }
    
    const response = await requestData(endpoint);
    setFinances(response);

    const responseGain = await requestData('/finances/gain');
    setGain(responseGain.total);

    const responseSpent = await requestData('/finances/spent');
    setSpent(responseSpent.total);
    setTotal(responseGain.total - responseSpent.total);
  },[navigate, setFinances, setGain, setSpent, setTotal]);

  useEffect(() => {
    (async() => {
      const token = localStorage.getItem('token') || '';

      if (!token) {
        navigate('/login');
      } else {
        setToken(token);
  
        try {
          await requestData('/login/authenticated');
          setIsAuthenticated(true);
        } catch (error) {
          navigate('/login');
          return;
        }
      }

      fetchFinances();
    })()
  }, [navigate, setSpent, setGain, setTotal, fetchFinances]);

  const addFinances = async () => {
    try {
      setDescription('');
      setValue('');
      setType('');
      await requestLogin(endpoint, { description, value, type });
      await fetchFinances();
    } catch (error) {
      console.log(error);
    }
  }

  if (!isAuthenticated) return <div><h1>Loading...</h1></div>

  return (
    <div className='dashboard-page'>
      <Header text={ 'Controle Financeiro' } headerDashboard={ true } />
      <Finances />
      <Form addFinances={ addFinances } />
      <Table deleteFinances={ deleteFinances } />
    </div>
  )
}