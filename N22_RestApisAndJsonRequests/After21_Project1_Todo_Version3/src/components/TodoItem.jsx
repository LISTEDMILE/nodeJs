import { MdDelete } from "react-icons/md";

function TodoItem({ todoName, todoDate, handleDeleteItem }) {
  return (
    <div className="container thisContainer">
      <div className="row thisRow">
        <div className="col-6">{todoName}</div>
        <div className="col-4">{todoDate}</div>
        <div className="col-2">
          <button type="button"
            className="btn btn-danger thisButton"
            onClick={() => handleDeleteItem(todoName)}
          >
            <MdDelete/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
