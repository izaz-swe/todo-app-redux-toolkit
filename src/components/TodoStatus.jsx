import React from "react";
import { useSelector } from "react-redux";


function TodoStatus() {
  const {todos} = useSelector((state)=> state.todo);
  const completed = todos.filter((todo) => todo.status === "done").length;
  const pending = todos.length - completed;
  return (
    <div className="top_card">
      <div>
          <p>Pending:</p>
          <h3>{pending}</h3>
      </div>
      <div>
          <p>Completed:</p>
          <h3>{completed}</h3>
      </div>
    </div>
  );
}

export default TodoStatus;
