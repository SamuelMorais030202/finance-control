import { useFinance } from '../../hooks/useFinance';
import { FaTrashAlt } from 'react-icons/fa';

import './index.css';

export const Table = ({ deleteFinances }) => {
  const { finances } = useFinance();

  return (
    <section className='finances-table'>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Value</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {
            finances.map((finance) => (
              <tr key={ finance.id }>
                <td>{ finance.description }</td>
                <td className={ finance.type === 'gain' ? 'gain-value' : 'spent-value' }>{ finance.value }</td>
                <td>{ finance.type }</td>
                <td onClick={ () => deleteFinances(finance.id) }><FaTrashAlt size={13} color="red" /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  )
}

// eslint-disable-next-line no-lone-blocks
{/* <section className='finances-table'>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Value</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {
              finances.map((finance) => (
                <tr key={ finance.id }>
                  <td>{ finance.description }</td>
                  <td>{ finance.value }</td>
                  <td>{ finance.type }</td>
                  <td onClick={ () => deleteFinances(finance.id) }><FaTrashAlt size={13} color="red" /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section> */}