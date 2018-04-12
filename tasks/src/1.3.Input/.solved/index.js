import React from "react";
import ReactDom from "react-dom";
import "./../styles.css";


let userName = "По умолчанию";

ReactDom.render(
  <div className="root">
    <div className="form">
      <div style={{ paddingRight: "10px", display: "inline-block" }}>
        <label htmlFor="name">Имя</label>
      </div>
      <input
        id="name"
        type="text"
        size="39"
        onChange={event => {
          userName = event.target.value;
        }}
        onBlur={() => alert(`userName: ${userName}`)}
      />
    </div>
  </div>,
  document.getElementById("app")
);
