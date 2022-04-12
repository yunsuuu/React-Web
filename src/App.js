// 상태를 만들 때 데이터가 PRIMITIVE(원시데이터타입)일 때 기존 방식대로 작업
// const [value, setValue] = useState()
// 예> string, number, boolean (+bigint, undefined, symbol, null)

// 상태를 만들 때 데이터가 범객체(객체, 배열)일 때 기존 데이터를 복제해야함
// const [value, setValue] = useState()
// 예> object, array
// 1) newValue = {...value} - 기존 데이터(value)를 새로운 값에 복제
// 2) newValue를 변경 - 기존 데이터 바꾸지 말고 복제본을 변경
// 3) setValue(newValue)

// prop과 state 차이점
// prop - 컴포넌트를 사용하는 외부자를 위한 데이터
// state - 컴포넌트를 만드는 내부자를 위한 데이터

import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <hr />
      <h2>Update</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p>
          <input type="text" name="title" placeholder="title" value={title} onChange={(e) => {
            setTitle(e.target.value);
          }}></input>
        </p>
        <p>
          <textarea name="body" placeholder="body" value={body} onChange={(e) => {
            setBody(e.target.value);
          }}></textarea>
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  )
}

function Create(props) {
  return (
    <article>
      <hr />
      <h2>Create</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onCreate(title, body);
      }}>
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  )
}

function Article(props) {
  return (
    <article>
      <hr />
      <h2>{props.title}</h2>
      <p>{props.body}</p>
    </article>
  )
}

function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    const t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a id={t.id} href={`/read/${t.id}`} onClick={(e) => {
          e.preventDefault();
          props.onChangeMode(Number(e.target.id));
        }}>{t.title}</a>
      </li>
    )
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Header(props) {
  return (
    <header>
      <h1><a href='/' onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function App() {
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." }
  ]);
  let content = null;
  let contextControl = null;
  if (mode === "Welcome") {
    content = <Article title="Welcome" body="Hello, WEB!" />;
  } else if (mode === "Read") {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />
    contextControl = <>
      <li><a href={`/update/${id}`} onClick={(e) => {
        e.preventDefault();
        setMode("Update");
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={() => {
        const newTopics = [];
        for(let i = 0; i < topics.length; i++){
          if(topics[i].id !== id){
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode("Welcome");
      }}></input></li>
    </>
  } else if (mode === "Create") {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body };
      const newTopics = [...topics]; // 기존 배열 데이터(topics)를 복제
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode("Read");
      setId(nextId);
      setNextId(nextId + 1);
    }} />
  } else if (mode === "Update") {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(_title, _body) => {
      const updatedTopic = { id: id, title: _title, body: _body };
      const newTopics = [...topics];
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode("Read");
    }} />
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode("Welcome");
      }} />
      <Nav topics={topics} onChangeMode={(_id) => { // _id = e.target.id
        setMode("Read");
        setId(_id);
      }} />
      {content}
      <ul>
        <li>
          <a href='/create' onClick={(e) => {
            e.preventDefault();
            setMode("Create");
          }}>Create</a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;