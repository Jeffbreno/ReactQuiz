import S from "./styles.module.css";

export function QuestionAnswer(props) {
  return (
    <button
      className={S.container}
      onClick={(event) =>
        props.handleAnswersQuestion(event, props.question, props.answer)
      }
    >
      {props.answer}
    </button>
  );
}
