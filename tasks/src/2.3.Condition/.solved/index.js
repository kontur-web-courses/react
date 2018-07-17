import React from 'react';
import ReactDom from 'react-dom';
import '../styles.css';

function renderPosts(posts) {
  if (posts.length === 0) {
    return <div className="emptyPosts">Нет откликов</div>;
  }
  if (posts.length === 1) {
    return <div className="singlePost">Единственный отклик</div>;
  }
  return <div className="posts">Отклики в количестве {posts.length}</div>;
}

function renderLot(name, description, tags) {
  return (
    <div className="lot">
      <div className="lotName">{name || '<Неизвестный предмет>'}</div>
      {description && <div className="lotDescription">{description}</div>}
      {renderTags(tags)}
    </div>
  );
}

function renderTags(tags) {
  if (!tags || tags.length === 0) return null;
  const content = tags.join(', ');
  return <div className="lotTags">{content}</div>;
}

ReactDom.render(
  <div className="page">
    {renderLot('', '', [])}
    {renderPosts([])}
  </div>,
  document.getElementById('app')
);
