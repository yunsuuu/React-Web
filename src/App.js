import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  return (
    <header>
      <h1><a href="/" onClick={(e) => {
        e.preventDefault();
        props.onClickMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    const t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a id={t.id} href={`/read/${t.id}`} onClick={(e) => {
          e.preventDefault();
          props.onClickMode(Number(e.target.id));
        }}>{t.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Article(props) {
  return (
    <article>
      <h3>{props.title}</h3>
      <p>{props.body}</p>
    </article>
  )
}
function Create() {
  return <article>
    <h2>Create</h2>
    <form>
      <p><input type="text" name="title" placeholder="title"></input></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
    </form>
    <button type="submit">Create</button>
  </article>
}
function App() {
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null); // 초기값x
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." }
  ]
  let content = null;
  if (mode === "Welcome") {
    content = <Article title="Welcome" body="Click Web"></Article>
  } else if (mode === "Read") {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if (mode === "Create") {
    content = <Create />
  }
  return (
    <div>
      <Header title="WEB" onClickMode={() => {
        setMode("Welcome");
      }} />
      <Nav topics={topics} onClickMode={(_id) => { // _id=e.target.id
        setMode("Read");
        setId(_id); // id=_id
      }} />
      {content}
      <a href="/create" onClick={(e) => {
        e.preventDefault();
        setMode("Create");
      }}>Create</a>
    </div>
  );
}

export default App;