import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, editInActive, updateTodo } from "../features/todo/todoSlice";


function Form() {
  const [todoName, setName] = useState("");
  const [status, setStatus] = useState("");
  const [editMode, setEditMode] = useState(false);
  const reset = ()=>{
    setName('');
    setStatus('');
  }
  const dispatch = useDispatch();
  const {token} = useSelector((state)=> state.login.user.data);
  const {editing, isLoading} = useSelector((state) => state.todo);
  useEffect(()=> {
    const {todoId, todoName, status} = editing || {};
    if(todoId){
      setEditMode(true);
      setName(todoName);
      setStatus(status);
    }else{
      setEditMode(false);
      reset();
    }
  }, [editing]);
  const handleCreate = (e) => {
    e.preventDefault();
    const body = {
      todoName,
      status
    }
    dispatch(createTodo({token, body}));
    reset();
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTodo({
      token,
      data: {
        todoName,
        status,
        todoId: editing?.todoId
      }
    }))
    reset();
    setEditMode(false);
  }
  const handleCancel = () => {
    setEditMode(false);
    reset();
    dispatch(editInActive())
  }
  return (
    <div className="form">
      <h3>Add New Todo</h3>
      <form onSubmit={editMode ? handleUpdate : handleCreate
      }>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Todo Name"
            onChange={(e) => setName(e.target.value)}
            value={todoName}
          />
        </div>

        <div className="form-group radio">
          <label>Status</label>
          <div className="radio_group">
            <input
              type="radio"
              value="active"
              name="status"
              checked={status === "active"}
              onChange={() => setStatus("active")}
            />
            <label>Active</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="done"
              name="status"
              placeholder="Done"
              checked={status === "done"}
              onChange={() => setStatus("done")}
            />
            <label>Done</label>
          </div>
        </div>

        <button disabled={isLoading} className="btn" type="submit">
          {editMode? "Update Todo" : "Add Todo"}
        </button>
      </form>
      {editMode && <button onClick={handleCancel} className="btn cancel_edit">Cancel Edit</button>}
    </div>
  );
}

export default Form;
