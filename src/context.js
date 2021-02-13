/** @format */

import React, { useState, useContext, useEffect } from "react";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
      return JSON.parse(localStorage.getItem("list"));
    } else {
      return [];
    }
  };
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [entry, setEntry] = useState({
    task: "",
    date: "",
    details: {
      time: "",
      about: "",
    },
  });
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [inCourse, setInCourse] = useState(false);
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const activo = () => {
    setInCourse(true);
  };
  const setTask = (e) => {
    setEntry({ ...entry, task: e });
  };
  const setDate = (e) => {
    setEntry({ ...entry, date: e });
  };

  const setTime = (e) => {
    setEntry({ ...entry, details: { ...entry.details, time: e } });
  };
  const setAbout = (e) => {
    setEntry({ ...entry, details: { ...entry.details, about: e } });
  };

  const setLista = (newItem) => {
    setList([...list, newItem]);
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);

    setEntry({
      task: specificItem.task,
      date: specificItem.date,
      details: {
        time: specificItem.hour,
        about: specificItem.about,
      },
    });
  };
  const removeItem = (id) => {
    showAlert(true, "Item removed", "danger");
    setList(list.filter((item) => item.id !== id));
  };
  const yoquese = () => {
    setList(
      list.map((item) => {
        if (item.id === editId) {
          return {
            task: entry.task,
            date: entry.date,
            hour: entry.details.time,
            about: entry.details.about,
          };
        }
        return item;
      })
    );
    setEntry({ task: "", date: "", details: { hour: "", about: "" } });
    setEditId("");
    setIsEditing(false);
  };

  function cleanUp() {
    setEntry({ task: "", date: "", details: { hour: "", about: "" } });
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <AppContext.Provider
      value={{
        showAlert,
        alert,
        entry,
        list,
        setTask,
        isEditing,
        setDate,
        setLista,
        cleanUp,
        setTime,
        setAbout,
        editItem,
        yoquese,
        removeItem,
        activo,
      }}>
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
