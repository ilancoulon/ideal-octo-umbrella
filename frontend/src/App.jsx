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
      <h1>Meeting scheduling tool</h1>
      <div className="card">
        {!isScheduled && (
          <>
            <p>Select a time range to schedule a meeting</p>
            <DayPilotCalendar
              viewType={"Week"}
              startDate={new Date().setDate(new Date().getDate() + 7)} // next week
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
          </>
        )}

        {event.start && !isScheduled && (
          <>
            <label>Topic:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                calendar.events.find("zoomid").text = e.target.value;
              }}
            />
            <br />
            Start date: {event.start.toLocaleString()}
            <br />
            End date: {event.end.toLocaleString()}
            <br />
            <button onClick={scheduleMeeting}>Schedule that meeting!</button>
          </>
        )}
        {isScheduled && <p>Meeting scheduled!</p>}
      </div>
    </>
  );
}

export default App;
