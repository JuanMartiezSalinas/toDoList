/** @format */

import React, { useState } from "react";
import { useGlobalContext } from "./context";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const List = ({ id, task, about, hour, date }) => {
  const { list, editItem, removeItem, activo, inCourse } = useGlobalContext();
  const [isOver, setIsOver] = useState(false);

  return (
    <article key={id} className="list-item">
      <h3 onClick={() => setIsOver(!isOver)}>{task}</h3>
      <div className="btn-container">
        {!isOver && (
          <button className=" edit-btn" onClick={() => editItem(id)}>
            <FaEdit />
          </button>
        )}
        {!isOver && (
          <button className=" delete-btn" onClick={() => removeItem(id)}>
            <TiDelete />
          </button>
        )}
      </div>
      {isOver && (
        <div className="item-info">
          <p>{about}</p>
          <p className="important">{date}</p>
          <p style={{ color: "orange", textAlign: "center" }}>{hour}</p>
        </div>
      )}
    </article>
  );
};
export default List;
