import { FaMoneyBillAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useFinance } from '../../hooks/useFinance';

import './index.css';

export const Finances = () => {
  const {
    gain,
    spent,
    total,
  } = useFinance();

  return (
    <section className='finances'>
      <div className='card card-prodhibited'>
        <h3>
          Prohibited
          <span><FaMoneyBillAlt size={20} color="#00cc00" /></span>
        </h3>
        <p>{ `${gain} R$` }</p>
      </div>
      <div className='card card-exit'>
        <h3>
          Exit
          <span><FaMoneyBillAlt size={20} color="red" style={{ transform: 'rotate(180deg)' }} /></span>
        </h3>
        <p>{ `${spent} R$` }</p>
      </div>
      <div className='card card-total'>
        <h3>
          Total
          <span><FaMoneyBillWave size={20} color="green" /></span>
        </h3>
        <p>{ `${total} R$` }</p>
      </div>
    </section>
  )
}

// eslint-disable-next-line no-lone-blocks
{/* <section className='finances'>
        <div>
          <h3>Entradas</h3>
          <span><FaMoneyBillAlt size={20} color="#00cc00" /></span>
          <p>
            { `${gain} R$` }
          </p>
        </div>
        <div>
          <h3>Saidas</h3>
          <span><FaMoneyBillAlt size={20} color="red" style={{ transform: 'rotate(180deg)' }} /></span>
          <p>{ `${spent} R$` }</p>
        </div>
        <div>
          <h3>Total</h3>
          <span><FaMoneyBillWave size={20} color="green" /></span>
          <p>{ `${total} R$` }</p>
        </div>
      </section> */}