export const Input = ({ type, value, setValue }) => (
  <label htmlFor={ `${type}-input` }>
    <input
      type="text"
      placeholder={ type }
      value={ value }
      onChange={ ({ target }) => setValue(target.value) }
    />
  </label>
)