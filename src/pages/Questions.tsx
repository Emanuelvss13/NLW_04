import { ReactNode } from 'react'
import '../styles/Questions.scss'


type QuestionsProps = {
    content: string
    author:{
        name: string
        avatar: string
    }
    children?: ReactNode
}



function Questions({content, author, children}: QuestionsProps) {
    return (
        <div>
            <div className="question">
                <p>{content}</p>
                <footer>
                    <div className="user-info">
                        <img src={author.avatar} alt={author.name} />
                        <span>{author.name}</span>
                    </div>
                    <div>
                        {children}
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Questions
