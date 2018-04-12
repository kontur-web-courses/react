import React from 'react';
import ReactDom from 'react-dom';
import '../styles.css';


function renderLot() {
  return (
    <div className="lot">
      <div className="lotName">Форма для выпекания</div>
      <div className="lotDescription">Идеальна для приготовления десертов!</div>
    </div>
  );
}

function renderPost(author, time, message) {
  return (
    <div className="post">
      <div className="postHeader">
        <span className="postAuthor">{author}</span><br />
        <span className="postTime">{time}</span>
      </div>
      <div className="postMessage">{message}</div>
    </div>
  )
}


ReactDom.render(
  <div className="page">
    {renderLot()}
    <div className="posts">
      {renderPost('Парень не промах', '2 часа назад', 'Попробую с удовольствием ;)')}
      {renderPost('Милая девушка', '3 часа назад', 'Можно использовать для выпекания чизкейков :)')}
    </div>
  </div>,
  document.getElementById('app'));
