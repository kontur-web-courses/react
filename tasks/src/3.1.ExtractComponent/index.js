import React from "react";
import ReactDom from "react-dom";
import "./styles.css";
//import PropTypes from "prop-types";


/**
    1. Переделай renderPost в функциональный компонент Post
   
    Подсказки:
    - {renderMyComponent({a: 1, b: "some"})} → <MyComponent a={1}, b="some">
    - Первый аргумент функции компонента обычно называется props
   
    2. ESLint настроен так, чтобы проверять переданные атрибуты. Поэтому задай propTypes.
       У нас везде атрибуты — это строки. Сделай свойства author и time обязательными.
   
    Подсказки:
    - В начале файла нужно импортировать PropTypes
    - MyComponent.propTypes = {
        a: PropTypes.number.isRequired,
        b: PropTypes.string
      }
   
    3. Сделай так, чтобы в author подставлялось значение <Неизвестный автор>,
       если атрибут не передали.
       Используй для этого defaultProps.
       Проверь что работает, убрав имя автора.
   
    Подсказки:
    - MyComponent.defaultProps = {
        b: "default value"
      }
   
    4. Переделай компонент так, чтобы message передавался через props.children.
   
    Подсказки:
    - <MyComponent>Значение</MyComponent>
    - const value = props.children;
    - children: PropTypes.string,
 */

// Эта строка нужна, чтобы ESLint не сильно ругался, пока не написаны PropTypes.
/*eslint react/prop-types: "warn" */


function renderPost(post) {
  return (
    <div className="post">
      <div className="postHeader">
        <span className="postAuthor">{post.author}</span><br/>
        <span className="postTime">{post.time}</span>
      </div>
      <div className="postMessage">{post.message}</div>
    </div>
  );
}

ReactDom.render(
  <div className="page">
    <div className="posts">
      {renderPost({
        author: "Милая девушка",
        time: "3 часа назад",
        message: "Можно использовать для выпекания чизкейков :)"}
      )}
    </div>
  </div>,
  document.getElementById("app"));
