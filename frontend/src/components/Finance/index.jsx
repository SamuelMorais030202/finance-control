import { FaMoneyBillAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useFinance } from '../../hooks/useFinance';

export const Finances = () => {
  const {
    gain,
    spent,
    total,
  } = useFinance();

  return (
    <section className='finances'>
      <div>
        <h3>Prohibited</h3>
        <span><FaMoneyBillAlt size={20} color="#00cc00" /></span>
        <p>{ `${gain} R$` }</p>
      </div>
      <div>
        <h3>Exit</h3>
        <span><FaMoneyBillAlt size={20} color="red" style={{ transform: 'rotate(180deg)' }} /></span>
        <p>{ `${spent} R$` }</p>
      </div>
      <div>
        <h3>Total</h3>
        <span><FaMoneyBillWave size={20} color="green" /></span>
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