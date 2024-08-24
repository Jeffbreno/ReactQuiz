import { useState } from "react";
import { QuestionAnswer } from "../QuestionAnswer";
import S from "./styles.module.css";

const QUESTIONS = [
  {
    id: 1,
    question: "Qual é o meu nome?",
    answers: ["Jefferson", "Belmir", "Luiz", "Tony"],
    correctAnswers: "Belmir",
  },
  {
    id: 2,
    question: "Qual é o minha idade?",
    answers: ["12", "38", "58", "86"],
    correctAnswers: "86",
  },
  {
    id: 3,
    question: "O que eu sou??",
    answers: ["Mãe", "Pai", "Tio", "Neto"],
    correctAnswers: "Pai",
  },
  {
    id: 4,
    question: "Quem é Belmir?",
    answers: [
      "Super fiel",
      "Melhor amigo",
      "Um assassino",
      "Melhor pai que uma pessoa pode ter",
    ],
    correctAnswers: "Melhor pai que uma pessoa pode ter",
  },
];

export function Quiz() {
  const currentQuestion = QUESTIONS[0];
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] =
    useState(false);

  const handleAnswersQuestion = (event, question, answer) => {
    if (isCurrentQuestionAnswered) {
      return;
    }

    const isCorrectAnswer = question.correctAnswers === answer;
    const resultClassName = isCorrectAnswer ? S.correct : S.incorrect;
    event.currentTarget.classList.toggle(resultClassName);

    if (isCorrectAnswer) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    setIsCurrentQuestionAnswered(true);
  };
  return (
    <div className={S.container}>
      <div className={S.card}>
        <div className={S.quiz}>
          <header className={S.quizHeader}>
            <span className={S.questionCount}>Pergunta 1/3</span>
            <p className={S.question}>{currentQuestion.question}</p>
          </header>
          <ul className={S.answers}>
            {currentQuestion.answers.map((answer) => (
              <li key={answer} className={S.answersItem}>
                <QuestionAnswer
                  answer={answer}
                  question={currentQuestion}
                  handleAnswersQuestion={handleAnswersQuestion}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
