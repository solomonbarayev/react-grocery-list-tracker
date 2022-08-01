import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, handleDelete, handleEdit }) => {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id} className="grocery-item">
            <p className="title">{item.title}</p>
            <div className="button-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => handleEdit(item.id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
