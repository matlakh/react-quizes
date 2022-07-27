import React, { Component } from 'react'
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Prize from '../../components/Prize/Prize'

export default class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        showPrize: false,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета будет дерьмо негра, если он съест расиста?',
                rightAnswerId: 2,
                answers: [
                    {
                        id: 1,
                        text: 'Крастное от крови негра'
                    },
                    {
                        id: 2,
                        text: 'Белое от цвета кожи расиста'
                    },
                    {
                        id: 3,
                        text: 'Обычного цвета'
                    },
                    {
                        id: 4,
                        text: 'Black Lives Matter!!!'
                    }
                ]
            },
            {
                id: 2,
                question: 'Два гея пошли на свидание. Кто должен платить за ужин?',
                rightAnswerId: 1,
                answers: [
                    {
                        id: 1,
                        text: 'У кого больше писюн'
                    },
                    {
                        id: 2,
                        text: 'Тот, кто актив'
                    },
                    {
                        id: 3,
                        text: 'Кого ебут в жопу'
                    },
                    {
                        id: 4,
                        text: 'Gay Lives Matter!!!'
                    }
                ]
            },
            {
                id: 3,
                question: 'Кто придумал доить коров, чтобы получать молоко?',
                rightAnswerId: 3,
                answers: [
                    {
                        id: 1,
                        text: 'Я'
                    },
                    {
                        id: 2,
                        text: 'Человек с длительным воздержанием'
                    },
                    {
                        id: 3,
                        text: 'Растлитель-зоофил'
                    },
                    {
                        id: 4,
                        text: 'Cows Lives Matter!!!'
                    }
                ]
            },
            {
                id: 4,
                question: 'Задача. Если Владик уволится с работы, то через сколько времени его с Наташей выгонят с квартиры?',
                rightAnswerId: 2,
                answers: [
                    {
                        id: 1,
                        text: 'Не выгонят'
                    },
                    {
                        id: 2,
                        text: 'Мы спрячемся и будем жить сдесь в тайне'
                    },
                    {
                        id: 3,
                        text: 'Сами уйдём'
                    },
                    {
                        id: 4,
                        text: 'Work Live Matter!!!'
                    }
                ]
            },
            {
                id: 5,
                question: 'Представим ситуацию, что твои года жизни зависят от кого, сколько кусков крастной рыбы ты съеш. Так сколько тебе останется жить?',
                rightAnswerId: 4,
                answers: [
                    {
                        id: 1,
                        text: '0'
                    },
                    {
                        id: 2,
                        text: '2'
                    },
                    {
                        id: 3,
                        text: '4'
                    },
                    {
                        id: 4,
                        text: 'Vladislav Live Matter!!!'
                    }
                ]
            }

        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: { [answerId]: 'success' }
            })

            const timout = window.setTimeout(() => {

                if (this.isQuizFinished()) {

                    this.setState({
                        isFinished: true
                    })
                } else {

                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })

                }

                window.clearTimeout(timout)

            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: { [answerId]: 'error' },
                results
            })
        }

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            results: {},
            isFinished: false,
            answerState: null,
            showPrize: false
        })
    }

    showPrizeHandler = () => {
        this.setState({
            showPrize: true
        })
    }

    render() {
        return (
            <div className="Quiz">

                <div className="QuizWrapper">
                    <h1>Вопросы</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                                showPrize={this.showPrizeHandler}
                            ></FinishedQuiz>
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            ></ActiveQuiz>
                    }
                    {
                        this.state.showPrize ? <Prize></Prize> : null
                    }

                </div>
            </div>
        )
    }
}