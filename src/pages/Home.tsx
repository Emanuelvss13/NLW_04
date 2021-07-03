import { useContext } from 'react';
import {useHistory} from 'react-router-dom'
import illustration from "../images/illustration.svg";
import logo from "../images/logo.svg";
import googleIcon from "../images/google-icon.svg";
import { Button } from "../components/Button";
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Home.scss'

export const Home = () => {
  const history = useHistory()

  const {user, singInWithGoogle} = useContext(AuthContext)

  async function handleCreateRoom(){
    if(!user){
      await singInWithGoogle()
    } else {
      history.push('/rooms/new')
    }
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="Ilustração de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content" >
          <img src={logo} alt="LetMeAsk" />
          <button onClick={handleCreateRoom} className="create-room" >
            <img src={googleIcon} alt="logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator" >Ou entre em uma sala</div>
          <form>
            <input 
            type="text" 
            placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
