import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import "./App.css";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage"
import { useEffect, useState } from "react";
import { addItemToServer, getAllItemsFromServer, deleteItemFromServer, } from "../services/itemsServices";

function App() {
  // hm cheezo ko components ki tarah use kar skte hai jaise yha components me tod liya....
  // hm ek element ko do className bhi de skte h space lgake...

  // we can use react icon steps on website....
    

  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getAllItemsFromServer().then((items) => {
      setTodoItems(items);
    }).catch((error) => {
      console.error("Error fetching todo items:", error);
    });
    
  }, []);
  
  const onNewItem = async (itemName, itemDueDate) => {
    const serverItem = await addItemToServer(itemName, itemDueDate);
    const newTodoItems = [serverItem,...todoItems];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    console.log(id);
    const deletedItemId = await deleteItemFromServer(id);
    console
    const newDeletedItems = todoItems.filter((item) => item.id !== deletedItemId);
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
