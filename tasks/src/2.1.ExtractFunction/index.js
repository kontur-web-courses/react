import React from "react";
import ReactDom from "react-dom";
import "./styles.css";


/**
     Выдели метод отрисовки лота (renderLot), метод отрисовки поста (renderPost) и используй их.
    
     Подсказки:
     - Чтобы вставить какое-то значение из JavaScript в верстку используй фигурные скобки:
       <div className={required ? 'star' : ''}>{surname + ' ' + name}</div>
     - Воспринимай тэг верстки как литерал, описывающий значение некоторого типа данных.
         - Это значение можно положить в переменную или вернуть:
           const label = <span>Надпись</span>;
         - Из эстетических соображений возвращаемый тэг часто оборачивается в круглые скобки:
           return (
             <span>Надпись</span>
           );
 */

ReactDom.render(
  <div className="page">
    <div className="lot">
      <div className="lotName">Форма для выпекания</div>
      <div className="lotDescription">Идеальна для приготовления десертов!</div>
    </div>
    <div className="posts">
      <div className="post">
        <div className="postHeader">
          <span className="postAuthor">Парень не промах</span><br />
          <span className="postTime">2 часа назад</span>
        </div>
        <div className="postMessage">
          Попробую с удовольствием ;)
        </div>
      </div>
      <div className="post">
        <div className="postHeader">
          <span className="postAuthor">Милая девушка</span><br />
          <span className="postTime">3 часа назад</span>
        </div>
        <div className="postMessage">
          Можно использовать для выпекания чизкейков :)
        </div>
      </div>
    </div>
  </div>,
  document.getElementById("app"));
