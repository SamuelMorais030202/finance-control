import { useNavigate } from "react-router-dom"

export const Header = ({ text }) => {
  const navigate = useNavigate();

  return (
    <header>
      <h1>
        { text }
      </h1>
      <p onClick={ () => navigate('/edit-profile') }>Profile</p>
    </header>
  )
}