import S from "./styles.module.css";

export function Button(props) {
  return (
    <button onClick={props.onClick} className={S.container}>
      {props.children}
    </button>
  );
}
