import {Link} from 'react-router-dom'
import illustration from "../images/illustration.svg";
import logo from "../images/logo.svg";
import { useAth } from '../Hooks/useAuth';
import { Button } from "../components/Button";
import '../styles/Home.scss'

export const NewRoom = () => {
  
  const {user} = useAth()

  return (
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="Ilustração de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content" >
          <h2>{user?.name}</h2>
          <img src={logo} alt="LetMeAsk" />
          <h2>Criar uma nova sala</h2>
          <form >
            <input 
            type="text" 
            placeholder="Digite o código da sala"
            />
            <Button>Entrar na sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/" >clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
};
