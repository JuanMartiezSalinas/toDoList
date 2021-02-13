/** @format */

import React from "react";
import { useGlobalContext } from "./context";
import Alert from "./Alert";
import List from "./List";
import { FaBookOpen } from "react-icons/fa";

const App = () => {
  function uniqueID() {
    return Math.floor(Math.random() * Date.now());
  }

  const {
    entry,
    alert,
    list,
    setTask,
    showAlert,
    isEditing,
    setDate,
    setLista,
    cleanUp,
    setTime,
    setAbout,
    yoquese,
    activo,
  } = useGlobalContext();
  function normalToUTC(date, hour) {
    let array = [];
    var actualDate;
    const newDate = date.split("-");
    const newHour = hour.split(":");

    array = newDate.concat(newHour);
    for (let i = 0; i < array.length; i++) {
      array[i] = parseInt(array[i]);
      console.log(array[i]);
    }
    const dateEntered = Date.parse(
      new Date(array[0], array[1] - 1, array[2], array[3], array[4])
    );

    return dateEntered;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry.task || !entry.date) {
      if (!entry.task) {
        showAlert(true, "Please enter a value", "danger");
      } else if (!entry.date) {
        showAlert(true, "Please enter a date", "danger");
      }
    } else if (
      normalToUTC(
        entry.date,
        entry.details.time ? entry.details.time : "00:00"
      ) < Date.parse(new Date())
    ) {
      showAlert(true, "Please enter a valid date", "danger");
    } else if (entry && isEditing) {
      yoquese();
      list.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
      showAlert(true, "Item changed", "success");
    } else {
      const newItem = {
        id: uniqueID(),
        task: entry.task,
        date: entry.date,
        hour: entry.details.time,
        about: entry.details.about,
      };
      setLista(newItem);
      list.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
      cleanUp();
      showAlert(
        true,
        `Task succesfully added!
      ${entry.task} on ${entry.date} 
      `,
        "success"
      );
    }
  };

  return (
    <>
      <header className="header">
        <h1>Personal Agenda</h1>
      </header>
      <section className="section-center">
        {alert.show && <Alert />}
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="box-container">
            <input
              type="text"
              id="entryTask"
              name="entryTask"
              placeholder="e.g Company meeting"
              value={entry.task}
              onChange={(e) => setTask(e.target.value)}></input>
            <input
              id="entryDate"
              name="entryDate"
              type="date"
              value={entry.date}
              onChange={(e) => setDate(e.target.value)}></input>
          </div>

          <div className="box-container">
            {entry.task && (
              <input
                id="entryTime"
                name="entryTime"
                type="time"
                value={entry.details.time}
                onChange={(e) => setTime(e.target.value)}></input>
            )}
            {entry.task && (
              <textarea
                id="about"
                name="entryAbout"
                type="text"
                value={entry.details.about}
                onChange={(e) => setAbout(e.target.value)}></textarea>
            )}
          </div>

          <button className="btn add-btn">
            {isEditing ? "Save changes" : "Add item"}
          </button>
        </form>
        <div className="list-container">
          {list.map((item) => {
            return <List key={item.id} {...item} />;
          })}
        </div>
      </section>
    </>
  );
};
export default App;
