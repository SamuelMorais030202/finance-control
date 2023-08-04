import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { requestData, setToken, requestLogin } from '../../services/request';
import { useFinance } from '../../hooks/useFinance';
import { Finances } from '../../components/Finance';
import { Form } from '../../components/Form';
import { Table } from '../../components/Table';
import { Header } from '../../components/Header';

export const DashBoard = () => {
  const {
    finances,
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

  const fetchFinances = async () => {
    const token = localStorage.getItem('token') || '';

    if (!token) {
      navigate('/login');
    } else {
      setToken(token);
    }
    
    const response = await requestData(endpoint);
    setFinances(response);
  }

  useEffect(() => {
    (async() => {
      const token = localStorage.getItem('token') || '';

      if (!token) {
        navigate('/login');
      } else {
        setToken(token);
      }

      const responseGain = await requestData('/finances/gain');
      setGain(responseGain.total);
  
      const responseSpent = await requestData('/finances/spent');
      setSpent(responseSpent.total);
      setTotal(responseGain.total - responseSpent.total);
    })()
  }, [finances, navigate, setSpent, setGain, setTotal])

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

  useEffect(() => {
    fetchFinances();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('teste');

  return (
    <div className='dashboard-page'>
      <Header text={ 'Controle Financeiro' } />
      <Finances />
      <Form addFinances={ addFinances } />
      <Table deleteFinances={ deleteFinances } />
    </div>
  )
}