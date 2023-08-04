import './App.css';
import { FinanceProvider } from './context/FinancesContext';
import { Routes } from './routes';

function App() {
  return (
    <FinanceProvider>
      <Routes />
    </FinanceProvider>
  );
}

export default App;
