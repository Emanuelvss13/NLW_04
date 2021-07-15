import { ReactNode } from 'react'
import '../styles/Questions.scss'


type QuestionsProps = {
    content: string
    author:{
        name: string
        avatar: string
    }
    children?: ReactNode
    isAnswered?: boolean
    isHighlighted?: boolean
}



function Questions(
    {
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false
    }: QuestionsProps) {
    return (
        <div>
            <div className={`question ${isAnswered ? 'answered': ''} ${isHighlighted && !isAnswered ? 'highlighted': ''}`}>
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
