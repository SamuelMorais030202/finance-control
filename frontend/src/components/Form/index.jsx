import { useFinance } from "../../hooks/useFinance";

export const Form = ({ addFinances }) => {
  const {
    description,
    setDescription,
    value,
    setValue,
    type,
    setType,
  } = useFinance();

  return (
    <section className='add-finances'>
      <label htmlFor="input-description">
        <span>Description</span>
        <input
          type="text"
          value={ description }
          onChange={ ({ target }) => setDescription(target.value) }
        />
      </label>
      <label htmlFor="input-value">
        <span>Value</span>
        <input
          type="number"
          name="value"
          value={ value }
          onChange={ ({ target }) => setValue(Number(target.value)) }
        />
      </label>
      <label htmlFor="input-type">
        <input
          type="radio"
          name="type"
          value="gain"
          checked={ type === 'gain' }
          onChange={ ({ target }) => setType(target.value) }
        /> <span>gain</span>
        <input
          type="radio"
          name="type"
          value="spent"
          checked={ type === 'spent' }
          onChange={ ({ target }) => setType(target.value) }
        /> <span>spent</span>
      </label>
      <button
        type='button'
        onClick={ () => addFinances() }
      >
        Adicionar
      </button>
    </section>
  )
}

// eslint-disable-next-line no-lone-blocks
{/* <section className='add-finances'>
        <label htmlFor="input-description">
          <span>Description</span>
          <input
            type="text"
            value={ description }
            onChange={ ({ target }) => setDescription(target.value) }
          />
        </label>
        <label htmlFor="input-value">
          <span>Value</span>
          <input
            type="number"
            name="value"
            value={ value }
            onChange={ ({ target }) => setValue(Number(target.value)) }
          />
        </label>
        <label htmlFor="input-type">
          <input
            type="radio"
            name="type"
            value="gain"
            checked={ type === 'gain' }
            onChange={ ({ target }) => setType(target.value) }
          /> <span>gain</span>
          <input
            type="radio"
            name="type"
            value="spent"
            checked={ type === 'spent' }
            onChange={ ({ target }) => setType(target.value) }
          /> <span>spent</span>
        </label>
        <button
          type='button'
          onClick={ () => addFinances() }
        >
          Adicionar
        </button>
      </section> */}