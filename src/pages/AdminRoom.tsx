import {useHistory, useParams} from 'react-router-dom'
import logo from '../images/logo.svg'
import {Button} from '../components/Button'
import RoomCode from './RoomCode'
// import { useAth } from '../Hooks/useAuth'
import { database } from '../services/firebase'
import Questions from './Questions'
import { useRoom } from '../Hooks/useRoom'
import deleteImg from '../images/delete.svg'
import checkImg from '../images/check.svg'
import answerImg from '../images/answer.svg'

import '../styles/Room.scss'

type RoomsParams={
    id: string
}

export default function AdminRoom(){
    const history = useHistory()
    const params = useParams<RoomsParams>()
    const roomId = params.id

    const {questions, title} = useRoom(roomId)

    // const {user} = useAth()

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Você deseja deletar mesmo essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleEndQuestion(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }

    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndQuestion}>Encerrar</Button>
                    </div>
                </div>
            </header>
        
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return(
                            <Questions
                            key={question.id}
                            content={question.content} 
                            author={question.author}
                            isAnswered={question.isAnswered}
                            isHighlighted={question.isHighlighted} 
                            >
                                {!question.isAnswered &&
                                <>
                                    <button onClick={() => handleCheckQuestionAsAnswered(question.id)} >
                                        <img src={checkImg} alt="Botão de marcar como resolvido" />
                                    </button>
                                    <button onClick={() => handleHighlightQuestion(question.id)} >
                                        <img src={answerImg} alt="Botão de dar destaque a pergunta" />
                                    </button>
                                </>
                                }
                                <button onClick={() => handleDeleteQuestion(question.id)} >
                                    <img src={deleteImg} alt="Botão de deletar Pergunta" />
                                </button>
                            </Questions>
                        )
                    })}
                </div>
            </main>
        </div>

    )
}
