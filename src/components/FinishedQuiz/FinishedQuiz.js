import React from 'react'
import './FinishedQuiz.css'
import Button from '../UI/Button/Button'

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)
    return (
        <div className="FinishedQuiz">
            <ul>
                {props.quiz.map((quizItem, index) => {
                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            <p>{quizItem.question}</p>
                            <i className={props.results[quizItem.id] === 'error' ? 'fa ' + 'fa-times ' + 'error-i' : 'fa ' + 'fa-check ' + 'success-i'}></i>
                        </li>
                    )
                })}
            </ul>
            <p className="success__count" >Правильно: {successCount} с {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type="primary">Повторить</Button>
                {
                    successCount === props.quiz.length ? <Button onClick={props.showPrize} type="success">Получить награду</Button> : null
                }
            </div>
        </div>

    )
}
export default FinishedQuiz