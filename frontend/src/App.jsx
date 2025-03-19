import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

function scheduleMeeting() {
  fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic: "Meeting test technique2",
    }),
  })
    .then((response) => response.json())
    .then(console.log)
    .catch((error) => {
      console.error(error);
    });
}

function App() {
  const [event, setEvent] = useState({ start: null, end: null });

  const [calendar, setCalendar] = useState();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <DayPilotCalendar
          viewType={"Week"}
          controlRef={setCalendar}
          onEventMove={(args) => {
            setEvent({
              start: args.newStart.value,
              end: args.newEnd.value,
            });
          }}
          onEventResize={(args) => {
            setEvent({
              start: args.newStart.value,
              end: args.newEnd.value,
            });
          }}
          onTimeRangeSelect={(args) => {
            setEvent({
              start: args.start.value,
              end: args.end.value,
            });
            calendar.events.add({
              start: args.start,
              end: args.end,
              id: "zoomid",
              text: "Zoom meeting",
            });

            calendar.clearSelection();
          }}
        />
        <button onClick={scheduleMeeting}>count is {event.start}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
