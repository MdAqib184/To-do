import React, { useState } from 'react';
import './Todo.css';

const Todo = () => {
  const [txt, setTxt] = useState("");
  const [item, setItem] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  function click(e) {
    setTxt(e.target.value);
  }

  function add() {
    if (txt.trim() !== "") {
      setItem((prevItem) => {
        return [...prevItem, txt];
      });
    }
    setTxt("");
  }

  function startEdit(index) {
    setEditIndex(index);
    setEditText(item[index]);
  }

  function saveEdit(index) {
    if (editText.trim() !== "") {
      setItem((prevItem) => {
        const updatedItem = [...prevItem];
        updatedItem[index] = editText;
        return updatedItem;
      });
    }
    setEditIndex(null);
  }

  function cancelEdit() {
    setEditIndex(null);
  }

  function deleteItem(index) {
    setItem((prevItem) => {
      const updatedItem = [...prevItem];
      updatedItem.splice(index, 1);
      return updatedItem;
    });
  }

  return (
    <div className='container'>
      <div className="head">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={click} type="text" value={txt} placeholder="Add here" />
        <button onClick={add}>Add</button>
      </div>
      <div className="list">
      <ul>
          {item.map((x, index) => (
            <li key={index} className={editIndex === index ? "editing" : ""}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="input-style"
                  />
                  <button onClick={() => saveEdit(index)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  {x}
                  <button onClick={() => startEdit(index)} className="edit-button">Edit</button>
                  <button onClick={() => deleteItem(index)} className="delete-button">Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
