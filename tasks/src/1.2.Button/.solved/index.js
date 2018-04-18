import React from 'react';
import ReactDom from 'react-dom';
import '../styles.css';

ReactDom.render(
  <div className="root">
    <div className="form">
      <div style={{ marginBottom: '10px' }}>Нажми отправить</div>
      <input
        type="button"
        className="button"
        value="Отправить"
        onClick={() => alert('Отправлено')}
      />
    </div>
  </div>,
  document.getElementById('app')
);
