import {Link, useHistory} from 'react-router-dom'
import illustration from "../images/illustration.svg";
import logo from "../images/logo.svg";
import { useAth } from '../Hooks/useAuth';
import { Button } from "../components/Button";
import { useState, FormEvent } from 'react';
import {database} from '../services/firebase'
import '../styles/Home.scss'

export const NewRoom = () => {
  
  const history = useHistory()

  const {user} = useAth()

  const [newRoom, setNewRoom] = useState<string>()

  async function handleCreateRoom(e: FormEvent){
    e.preventDefault()

    if(newRoom?.trim() === ''){
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
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
          <h2>{user?.name}</h2>
          <img src={logo} alt="LetMeAsk" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom} >
            <input 
            type="text" 
            placeholder="Digite o código da sala"
            onChange={({target}) => setNewRoom(target.value)}
            />
            <Button>Entrar na sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/" >clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
};
