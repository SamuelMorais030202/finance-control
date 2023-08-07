import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import './index.css';

export const Header = ({ text, headerDashboard }) => {
  const navigate = useNavigate();

  return (
    <header>
      <h1 className={ text }>
        { text }
      </h1>
      {
        headerDashboard
        ? <p onClick={ () => navigate('/edit-profile') }>
          <span><FaUser size={20} color="#5AB7EA" /></span>
          Profile
          </p>
        : null
      }
    </header>
  )
}