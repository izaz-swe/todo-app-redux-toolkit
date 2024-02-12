import React, { useEffect } from "react";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../features/todo/todoSlice";

function Todos() {
  const dispatch = useDispatch();
  const { todos, isLoading, isError, error } = useSelector(
    (state) => state.todo
  );
  const { token } = useSelector((state) => state.login.user.data);
  useEffect(() => {
    dispatch(fetchTodos(token, todos));
  }, [dispatch]);
  const items = todos.slice().sort((todo1, todo2) => {
    if (todo1.status === "active" && todo2.status === "done") {
      return -1;
    } else if (todo1.status === "done" && todo2.status === "active") {
      return 1;
    } else {
      return 0;
    }
  });;
  let content = null;
  if (isLoading) content = <p> Loading ...</p>;
  if (!isLoading && isError) content = <p>{error}</p>;
  if (!isLoading && !isError && items?.length > 0) {
    content = items.map((item) => <Todo key={item.todoId} item={item} />);
  }
  if (!isLoading && !isError && items?.length === 0) {
    content = <p>No Todo Found.</p>;
  }
  return (
    <>
      <p className="second_heading">Todo List:</p>
      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
}

export default Todos;
