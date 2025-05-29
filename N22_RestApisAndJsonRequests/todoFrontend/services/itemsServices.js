// yha hmne server aur client ke beech link wali cheeze dali jaise addItemToServer ka kam h ki jo hm yha add kare data wo server pe bhi add ho jaye, ab hmne kya kiya ek async function bnaya jisme api ke through hmne ek route ko hit kiya jaise yha api/todo isse method post ke sath createTodoItem call hoga aur hmne body:JSON.stringify({task,date}) ap ye data server pe us function ke liye jaega aur wo bhi json data ke form me fir wha se as usual hmne database me cheeze add karli fir us data ko access karne ke liye hm response.json() ka use kar skye h agar client side pe chahiye to, aur aise hi aur sare methods bhi bne 
// aur server aur client side data mismatch life variable aur keys ke nam alag ho skte h to uske luye hmne mapServerItemToClientItem neeche bnaya h jo sabn methods me use ho rha h.......

export const addItemToServer = async (task, date) => {
    const response = await fetch("http://localhost:3000/api/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, date }),
    });
    const data = await response.json();
    return mapServerItemToClientItem(data.todoItem);

}

export const getAllItemsFromServer = async () => {
    const response = await fetch("http://localhost:3000/api/todo", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        

    })
    
    const data = await response.json();
    console.log("Data from server:", data);
    var dataTodoItems = data.todoItems.map(mapServerItemToClientItem);
    return dataTodoItems;
}

export const deleteItemFromServer = async (id) => {
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete item");
    }
    return id; // Return the ID of the deleted item
}

export const markItemAsCompleteOnServer = async (id) => {
    const response = await fetch(`http://localhost:3000/api/todo/${id}/complete`, {
        method: "PUT",
    });
    if (!response.ok) {
        throw new Error("Failed to mark item as complete");
    }
    const data = await response.json();
    return mapServerItemToClientItem(data.todoItem);
}

const mapServerItemToClientItem = (serverItem) => {
    return {
        id: serverItem._id,
        name: serverItem.task,
        dueDate: serverItem.date,
        completed: serverItem.completed,
        createdAt: serverItem.createdAt,
        updatedAt: serverItem.updatedAt,

    };
}