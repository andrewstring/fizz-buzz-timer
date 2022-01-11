import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import "./Config.css";

const Config = () => {
  const [fizz, setFizz] = useState("");
  const [buzz, setBuzz] = useState("");
  const [valid, setValid] = useState(false);
  const [timerLink, setTimerLink] = useState("/timer");

  //Sets up parameters for timer route
  useEffect(() => {
    if (fizz >= 2 && fizz <= 10 && buzz >= 2 && buzz <= 10) {
      setValid(true);
      setTimerLink(`/timer?fizz=${fizz}&buzz=${buzz}`);
    } else {
      setTimerLink("/timer");
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

  //Prevent link out when fizz and buzz dont satisfy requirements
  const preventLink = (event) => {
    event.preventDefault();
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
            data-testid="fizz-input"
          ></input>
          <label>Buzz: </label>
          <input
            value={buzz}
            onChange={handleChange("buzz")}
            className="config-buzz"
            data-testid="buzz-input"
          ></input>
          {
            //No link if invalid fizz buzz, if valid, generates route with parameters
            valid && (
              <Link to={timerLink} data-testid="link">
                <button type="submit" className="button-link config-submit">
                  Go to Timer &gt;
                </button>
              </Link>
            )
          }
          {!valid && (
            <button
              type="submit"
              onClick={preventLink}
              className="button-link config-submit"
              data-testid="no-link"
            >
              Go to Timer &gt;
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Config;
