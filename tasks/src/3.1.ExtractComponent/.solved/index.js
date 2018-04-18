import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';

function Post(props) {
  return (
    <div className="post">
      <div className="postHeader">
        <span className="postAuthor">{props.author}</span>
        <br />
        <span className="postTime">{props.time}</span>
      </div>
      <div className="postMessage">{props.children}</div>
    </div>
  );
}

Post.propTypes = {
  author: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  children: PropTypes.node
};

Post.defaultProps = {
  author: '<Неизвестный автор>'
};

ReactDom.render(
  <div className="page">
    <div className="posts">
      <Post time="3 часа назад">
        Можно использовать для выпекания чизкейков :)
      </Post>
    </div>
  </div>,
  document.getElementById('app')
);
