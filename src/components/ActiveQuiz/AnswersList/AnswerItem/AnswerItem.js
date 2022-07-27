import React from "react";
import './AnswerItem.css'

const AnswerItem = props => {
    return (
        <li className={"AnswerItem " + props.state}
        onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem