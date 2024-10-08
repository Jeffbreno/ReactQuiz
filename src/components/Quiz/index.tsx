import { MouseEvent, useState } from "react";
import { QuestionAnswer } from "../QuestionAnswer";
import { Button } from "../Button";
import S from "./styles.module.css";
import { Result } from "../Result";
import { ProgressBar } from "../ProgressBar";

export interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Qual é o meu nome?",
    answers: ["Jefferson", "Belmir", "Luiz", "Tony"],
    correctAnswer: "Belmir",
  },
  {
    id: 2,
    question: "Qual é o minha idade?",
    answers: ["12", "38", "58", "86"],
    correctAnswer: "86",
  },
  {
    id: 3,
    question: "O que eu sou??",
    answers: ["Mãe", "Pai", "Tio", "Neto"],
    correctAnswer: "Pai",
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
    correctAnswer: "Melhor pai que uma pessoa pode ter",
  },
];

export function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState<boolean>(false);
  const [isTakingQuiz, setIsTakingQuiz] = useState<boolean>(true);
  const currentQuestionNumber = currentQuestionIndex + 1;

  const quizSize = QUESTIONS.length;

  const handleAnswerQuestion = (
    event: MouseEvent<HTMLButtonElement>,
    question: Question,
    answer: string
  ) => {
    if (isCurrentQuestionAnswered) {
      return;
    }

    const isCorrectAnswer = question.correctAnswer === answer;
    const resultClassName = isCorrectAnswer ? S.correct : S.incorrect;
    event.currentTarget.classList.toggle(resultClassName);

    if (isCorrectAnswer) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    setIsCurrentQuestionAnswered(true);
  };

  const handleNextQueston = () => {
    if (currentQuestionIndex + 1 < quizSize) {
      setCurrentQuestionIndex((index) => index + 1);
    } else {
      setIsTakingQuiz(false);
    }

    setIsCurrentQuestionAnswered(false);
  };

  const handleTryAgain = () => {
    setIsTakingQuiz(true);
    setCorrectAnswersCount(0);
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const navigationButtonText =
    currentQuestionIndex + 1 === quizSize
      ? "Ver Resultado"
      : "Próxima Pergunta";
  return (
    <div className={S.container}>
      <div className={S.card}>
        {isTakingQuiz ? (
          <div className={S.quiz}>
            <ProgressBar size={quizSize} currentStep={currentQuestionNumber} />
            <header className={S.quizHeader}>
              <span className={S.questionCount}>
                Pergunta {currentQuestionNumber}/{quizSize}
              </span>
              <p className={S.question}>{currentQuestion.question}</p>
            </header>
            <ul className={S.answers}>
              {currentQuestion.answers.map((answer) => (
                <li key={answer} className={S.answersItem}>
                  <QuestionAnswer
                    answer={answer}
                    question={currentQuestion}
                    handleAnswerQuestion={handleAnswerQuestion}
                  />
                </li>
              ))}
            </ul>
            {isCurrentQuestionAnswered && (
              <Button onClick={handleNextQueston}>
                {navigationButtonText}
              </Button>
            )}
          </div>
        ) : (
          <Result
            correctAnswersCount={correctAnswersCount}
            quizSize={quizSize}
            handleTryAgain={handleTryAgain}
          />
        )}
      </div>
    </div>
  );
}
