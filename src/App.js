import React, { useState, useEffect, useRef } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [list, setList] = useState(getLocalStorage());
  const [grocery, setGrocery] = useState("");
  const [editId, setEditId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const input = useRef();

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    // Moving cursor to the end
    input.current.selectionStart = input.current.value.length;
    input.current.selectionEnd = input.current.value.length;
  }, [grocery]);

  useEffect(() => {
    input.current.focus();
  });

  useEffect(() => {
    let alertTimer = setTimeout(() => {
      setAlert({ ...alertTimer, show: false });
    }, 1500);

    return () => {
      clearTimeout(alertTimer);
    };
  }, [alert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setAlert({
        show: true,
        message: "Item has been updated",
        type: "success",
      });
      setList((prevList) => {
        const newList = prevList.map((item) => {
          if (item.id === editId) {
            return { ...item, title: grocery };
          }
          return item;
        });
        return newList;
      });
      setIsEditing(false);
    } else {
      setAlert({
        show: true,
        message: "Item has been added",
        type: "success",
      });
      setList([
        { id: new Date().getTime().toString(), title: grocery },
        ...list,
      ]);
    }
    setGrocery("");
  };

  const handleChange = (e) => {
    setGrocery(e.target.value);
  };

  const handleDelete = (id) => {
    setAlert({
      show: true,
      message: "Item has been removed",
      type: "danger",
    });
    setList([...list.filter((item) => item.id !== id)]);
  };

  const handleEdit = (id) => {
    setIsEditing(true);
    setEditId(id);
    list.map((item) => {
      if (item.id === id) {
        setGrocery(item.title);
      }
    });
  };

  return (
    <main>
      <section className=" section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert alert={alert} isEditing={isEditing} />}
          <h3>Grocery List Tracker</h3>
          <div className="form-control">
            <input
              ref={input}
              type="text"
              className="grocery"
              placeholder="e.g. eggs"
              value={grocery}
              onChange={handleChange}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List
              items={list}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
        )}
        {list.length > 0 && (
          <button
            className="clear-btn"
            onClick={() => {
              setAlert({
                show: true,
                message: "List has been cleared",
                type: "danger",
              });
              setList([]);
            }}
          >
            Clear
          </button>
        )}
      </section>
    </main>
  );
}

export default App;
