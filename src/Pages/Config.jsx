import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import "./Config.css";

const Config = () => {
  const [fizz, setFizz] = useState("");
  const [buzz, setBuzz] = useState("");
  const [timerLink, setTimerLink] = useState("");

  useEffect(() => {
    if (fizz >= 2 && fizz <= 10 && buzz >= 2 && buzz <= 10) {
      setTimerLink(`/timer?fizz=${fizz}&buzz=${buzz}`);
    } else {
      setTimerLink("");
    }
  }, [fizz, buzz]);

  const handleChange = (type) => {
    return type === "fizz"
      ? (e) => {
          setFizz(e.target.value);
        }
      : (e) => {
          setBuzz(e.target.value);
        };
  };
  return (
    <div className="outer-container">
      <div className="main-container config-main">
        <h1>
          Please enter a fizz and buzz time in seconds.{" "}
          <strong>Values should be 2 to 10, inclusive.</strong>
        </h1>
        <form>
          <label>Fizz: </label>
          <input
            value={fizz}
            onChange={handleChange("fizz")}
            className="config-fizz"
          ></input>
          <label>Buzz: </label>
          <input
            value={buzz}
            onChange={handleChange("buzz")}
            className="config-buzz"
          ></input>
          <Link to={timerLink}>
            <button type="submit" className="button-link config-submit">
              Go to Timer &gt;
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Config;
