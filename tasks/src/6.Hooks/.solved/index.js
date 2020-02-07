import React, { useState, useRef, useEffect } from "react";
import ReactDom from "react-dom";
import "./styles.css";

const App = () => {
  const lastBlockIdRef = useRef(0);
  const [blockIds, setBlockIds] = useState([]);

  const addNew = () => {
    setBlockIds(ids => [...ids, lastBlockIdRef.current++]);
  };

  const removeLast = () => {
    setBlockIds(ids => ids.slice(0, ids.length - 1));
  };

  return (
    <div className="page">
      <div className="controlPanel">
        <button type="button" onClick={removeLast} className="actionButton">
          -
        </button>
        <button type="button" onClick={addNew} className="actionButton">
          +
        </button>
      </div>
      <div className="container">
        {blockIds.map(blockId => (
          <CounterBlock key={blockId} />
        ))}
      </div>
    </div>
  );
};

const CounterBlock = () => {
  const [value, setValue] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(setValue, 1000, v => v + 1);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return <div className="block">{value}</div>;
};

ReactDom.render(<App />, document.getElementById("app"));
