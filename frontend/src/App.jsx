import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

function App() {
  const [event, setEvent] = useState({ start: null, end: null });
  const [topic, setTopic] = useState("Zoom meeting");

  const [isScheduled, setIsScheduled] = useState(false);

  const [calendar, setCalendar] = useState();

  function scheduleMeeting() {
    fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        start: event.start,
        end: event.end,
      }),
    })
      .then((response) => {
        setIsScheduled(true);
      })

      .catch((error) => {
        console.error(error);
      });
  }

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
            if (calendar.events.find("zoomid")) {
              calendar.events.remove("zoomid");
            }
            calendar.events.add({
              start: args.start,
              end: args.end,
              id: "zoomid",
              text: "Meeting",
            });
          }}
        />
        {event.start && !isScheduled && (
          <>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                calendar.events.find("zoomid").text = e.target.value;
              }}
            />
            <button onClick={scheduleMeeting}>Schedule that meeting!</button>
          </>
        )}
        {isScheduled && <p>Meeting scheduled!</p>}
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
