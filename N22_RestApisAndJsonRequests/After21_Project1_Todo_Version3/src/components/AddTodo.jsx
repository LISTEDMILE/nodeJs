import { useState } from "react";
import { MdAddCard } from "react-icons/md";

function AddTodo({ onNewItem }) {
  
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleNameChange = (e) => {
    setTodoName(e.target.value);
  }
  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  }
  const handleAddButtonClicked = () => {
    if (todoName === "" | dueDate === "") {
      alert("Empty Input Fields");
    }
    else {
      onNewItem(todoName, dueDate);
      setDueDate("");
      setTodoName("");
    }
  }
  return (
    <div className="container thisContainer">
      <div className="row thisRow">
        <div className="col-6">
          <input type="text"
            placeholder="Enter Todo"
            onChange={handleNameChange}
            value={todoName} 
          />
        </div>
        <div className="col-4">
          <input
            type="date"
            onChange={handleDateChange}
            value={dueDate}/>
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-success thisButton"
            onClick={handleAddButtonClicked}
          >
            <MdAddCard/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
