import { createContext, useState, useMemo } from 'react';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [finances, setFinances] = useState([]);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(undefined);
  const [type, setType] = useState('');
  const [gain, setGain] = useState();
  const [spent, setSpent] = useState();
  const [total, setTotal] = useState();

  const context = useMemo(() => ({
    finances,
    setFinances,
    description,
    setDescription,
    value,
    setValue,
    type,
    setType,
    gain,
    setGain,
    spent,
    setSpent,
    total,
    setTotal,
  }),
  [
    finances,
    description,
    value,
    type,
    gain,
    spent,
    total,
  ]);

  return (
    <FinanceContext.Provider value={ context }>
      { children }
    </FinanceContext.Provider>
  )
}