import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import "./App.css";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage"
import { useState } from "react";

function App() {
  // hm cheezo ko components ki tarah use kar skte hai jaise yha components me tod liya....
  // hm ek element ko do className bhi de skte h space lgake...

  // we can use react icon steps on website....
    

  const [todoItems, setTodoItems] = useState([]);
  
  const onNewItem = (itemName, itemDueDate) => {
    const newTodoItems = [...todoItems,
      { name: itemName, dueDate: itemDueDate }];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = (name) => {
    const newDeletedItems = todoItems.filter((item) => item.name!== name);
    setTodoItems(newDeletedItems);
  };

  return (
    <center className="todo-container">
      <AppName />
     
      <AddTodo onNewItem={onNewItem} />
      {todoItems.length === 0 && <WelcomeMessage />}
      <TodoItems todoItems={todoItems} handleDeleteItem={handleDeleteItem} />
    </center>
  );
}

export default App;
