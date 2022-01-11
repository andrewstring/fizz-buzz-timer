import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Timer.css";

const Timer = () => {
  //Get fizz and buzz from url query and use as state
  const useQuery = () => {
    const { search } = useLocation();

    return useMemo(() => {
      return new URLSearchParams(search);
    }, [search]);
  };
  const query = useQuery();
  const fizz = parseInt(query.get("fizz"));
  const buzz = parseInt(query.get("buzz"));
  const [fizzBuzz, setFizzBuzz] = useState("");

  const [seconds, setSeconds] = useState(0);
  const [timeDisplay, setTimeDisplay] = useState("0:00:00");
  const [active, setActive] = useState(false);
  const [intervalID, setIntervalID] = useState(null);

  const reset = () => {
    setSeconds(0);
    setActive(false);
    setTimeDisplay("0:00:00");
  };
  const start = () => {
    setActive(true);
  };
  const stop = () => {
    if (active) {
      setActive(false);
    } else {
      reset();
    }
  };
  const increment = () => {
    setSeconds((seconds) => seconds + 1);
  };
  useEffect(() => {
    if (active) {
      setIntervalID(
        setInterval(() => {
          increment();
        }, 1000)
      );
    } else {
      clearInterval(intervalID);
    }
  }, [active]);

  useEffect(() => {
    const hoursNum = Math.floor(seconds / 3600);
    const hoursDisplay = hoursNum.toString();
    const minutesNum = Math.floor((seconds % 3600) / 60);
    const minutesDisplay =
      minutesNum.toString().length === 1
        ? `0${minutesNum.toString()}`
        : minutesNum.toString();
    const secondsNum = (seconds % 60) % 60;
    const secondsDisplay =
      secondsNum.toString().length === 1
        ? `0${secondsNum.toString()}`
        : secondsNum.toString();
    setTimeDisplay(`${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`);

    if (seconds !== 0) {
      if (!(seconds % fizz || seconds % buzz)) {
        if (fizzBuzz !== "Fizz Buzz") {
          setFizzBuzz("Fizz Buzz");
        }
      } else if (!(seconds % fizz)) {
        if (fizzBuzz !== "Fizz") {
          setFizzBuzz("Fizz");
        }
      } else if (!(seconds % buzz)) {
        if (fizzBuzz !== "Buzz") {
          setFizzBuzz("Buzz");
        }
      } else {
        if (fizzBuzz) {
          setFizzBuzz("");
        }
      }
    } else {
      setFizzBuzz("");
    }
  }, [seconds]);

  return (
    <div className="outer-container">
      <div className="timer-top-left">
        <Link to="/">
          <button className="button-link">&lt; Set Times</button>
        </Link>
      </div>
      <div className="main-container timer-main">
        <h1>Time Elapsed</h1>
        <div className="timer-counter-container">
          <p>{timeDisplay}</p>
        </div>
        <div className="timer-button">
          <button onClick={start} className="start">
            Start
          </button>
          <button onClick={stop} className="stop-reset">
            Stop/Reset
          </button>
        </div>
        <div className="timer-fizzbuzz">{fizzBuzz}</div>
      </div>
    </div>
  );
};

export default Timer;
