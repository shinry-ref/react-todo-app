import { useState } from "react";
import { CompleteTodos } from "./components/CompleteTodos";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { InputTodo } from "./components/InputTodo";
import "./styles.css";

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText == "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompliteTodos = [...incompleteTodos];
    newIncompliteTodos.splice(index, 1);

    const newCompliteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompliteTodos);
    setCompleteTodos(newCompliteTodos);
  };

  const onClickBack = (index) => {
    const newCompliteTodos = [...completeTodos];
    newCompliteTodos.splice(index, 1);

    const newIncompliteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompliteTodos);
    setIncompleteTodos(newIncompliteTodos);
  };
  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTodos}
      />
      {isMaxLimitIncompleteTodos && (
        <p style={{ color: "red" }}>登録できるTODOは5個までです！</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
