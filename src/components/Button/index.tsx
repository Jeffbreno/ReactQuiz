import { ButtonHTMLAttributes } from "react";
import S from "./styles.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return (
    <button {...props} className={S.container}>
      {props.children}
    </button>
  );
}
