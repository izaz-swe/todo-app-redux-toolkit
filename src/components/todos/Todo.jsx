import React from "react";
import editImage from '../../assets/images/edit.svg';
import deleteImage from '../../assets/images/delete.svg';
import { useDispatch, useSelector } from "react-redux";
import { editActive, removeTodo } from "../../features/todo/todoSlice";

function Todo({item}) {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login.user.data);
  const {todoId} = item || {};
  const handleUpdate = () => {
    dispatch(editActive(item));
  }
  const handleDelete = () =>{
    dispatch(removeTodo({token, todoId}))
  }
  return (
    <li className={`transaction ${item.status === 'done' ? 'income' : 'expense'}`}>
      <p>{item.todoName}</p>
      <div className="right">
        <p>{item.status}</p>
        <button onClick={handleUpdate} className="link">
          <img className="icon" src={editImage} />
        </button>
        <button onClick={handleDelete} className="link" >
          <img className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}

export default Todo;
