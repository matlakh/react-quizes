import React from 'react';
import "./ActiveQuiz.css"
import AnswersList from './AnswersList/AnswersList';
const ActiveQuiz = props => (

    <div className="ActiveQuiz">
        <p className="Question">
            <span>
                <strong>{props.answerNumber}. </strong>
                {props.question}
          </span>

            <small>{props.answerNumber} / {props.quizLength}</small>
        </p>

       <AnswersList answers={props.answers}
       onAnswerClick={props.onAnswerClick}
       state={props.state}></AnswersList>

    </div>

)

export default ActiveQuiz;