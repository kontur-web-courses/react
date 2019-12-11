import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import "./styles.css";

const App = () => {
  const [array, setArray] = useState([]);
  const sequence = useRef(0);

  const addNewElement = useCallback(() => {
    sequence.current++;
    setArray(array => [...array, sequence.current]);
  }, []);

  const removeLastElement = useCallback(() => {
    setArray(array => array.slice(0, array.length - 1));
  }, []);

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={removeLastElement}
          className="actionButton"
        >
          -
        </button>
        <button type="button" onClick={addNewElement} className="actionButton">
          +
        </button>
      </div>
      <div className="container">
        {array.map(value => (
          <CounterBlock key={value} />
        ))}
      </div>
    </div>
  );
};

const CounterBlock = () => {
  const [value, setValue] = useState(0);
  const timer = useRef(0);

  useEffect(() => {
    timer.current = setInterval(setValue, 1000, v => v + 1);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return <div className="block">{value}</div>;
};

ReactDom.render(<App />, document.getElementById("app"));
