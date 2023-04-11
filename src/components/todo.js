import React, { useState , useEffect } from 'react';
import './style.css';

const getLocalData = () => {
    const list = localStorage.getItem("todolist")

    if(list){
        return JSON.parse(list)
    }
    else{
        return []
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [editedItemId, seteditedItemID] = useState("")
    const [toggleBtn, setToggelBtn] = useState(false)

    const addItem = () => {
        if(!inputData){
            alert("Please fill the data");
        }
        else if(inputData && toggleBtn){
            setItems(
                items.map((ele) => {
                    if(ele.id === editedItemId){
                        return {...ele, name:inputData}
                    }
                    return ele
                })
            )
            setInputData("")
            seteditedItemID(null)
            setToggelBtn(false)
        }
        else{
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, newInputData]); 
            setInputData("");
        }
    }

    const editItem = (idx) => {
        const editedItem = items.find((ele) => {
            return ele.id === idx
        })
        setInputData(editedItem.name)
        seteditedItemID(idx)
        setToggelBtn(true)
    }

    const deleteItem = (idx) => {
        const updatedItem = items.filter((ele) => {
            return ele.id !== idx;
        })
        setItems(updatedItem)
    }

    const removeAll = () => {
        setItems([])
    }

    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(items))
    },[items])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/todo.svg" alt="todoLogo" />
                <figcaption>Add your list here 👇</figcaption>
            </figure>

            <div className="addItems">
                <input type="text" placeholder="✍️ Add Item" className="form-control" value={inputData} onChange={(event) => setInputData(event.target.value)} />
                {toggleBtn ? <i className="far fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>}
                
            </div>

            <div className="showItems">
                {items.map((ele) => {
                    return(
                        <div className="eachItem" key={ele.id}>
                            <h3>{ele.name}</h3>
                            <div className="todo-btn">
                                <i className="far fa-edit add-btn" onClick={() => editItem(ele.id)}></i>
                                <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(ele.id)}></i>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo
