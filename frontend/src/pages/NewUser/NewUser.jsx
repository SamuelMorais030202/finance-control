import { useState } from "react"
import { Navigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { requestLogin } from "../../services/request";

export const NewUser = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [responseApi, setResponseApi] = useState(null);
  const [userCreated, setUserCreated] = useState(false);

  const newUser = async (event) => {
    event.preventDefault();
    
    try {
      await requestLogin('/user', {
        fullName,
        email,
        password,
        phone,
      });

      setUserCreated(true);
      
    } catch ({ response: { data } }) {
      setResponseApi(data.message);
    }
  }

  if (userCreated) return <Navigate to="/login" />
  
  return (
    <div className="new-user-page">
      <h1>Crie sua conta</h1>
      <section className="new-user">
        <form>
          <Input
            type="FullName"
            value={ fullName }
            setValue={ setFullName }
          />
          <Input
            type="email"
            value={ email }
            setValue={ setEmail }
          />
          <Input
            type="password"
            value={ password }
            setValue={ setPassword }
          />
          <Input
            type="phone"
            value={ phone }
            setValue={ setPhone }
          />
          {
            responseApi === null
              ? null
              : <p>{ `${responseApi}` }</p>
          }
          <button
            type="submit"
            onClick={ (event) => newUser(event) }
          >
            Cadastar
          </button>
        </form>
      </section>
    </div>
  )
}