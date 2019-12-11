import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import "./styles.css";

const App = () => {
  const [blockIds, setBlockIds] = useState([]);
  const lastBlockId = useRef(0);

  const addNewElement = useCallback(() => {
    lastBlockId.current++;
    setBlockIds(blockIds => [...blockIds, lastBlockId.current]);
  }, []);

  const removeLastElement = useCallback(() => {
    setBlockIds(blockIds => blockIds.slice(0, blockIds.length - 1));
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
        {blockIds.map(blockId => (
          <CounterBlock key={blockId} />
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
