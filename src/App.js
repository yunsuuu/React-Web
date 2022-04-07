// 상태를 만들 때 데이터가 PRIMITIVE(원시데이터타입)일 때 기존 방식대로 작업
// const [value, setValue] = useState()
// 예> string, number, boolean (+bigint, undefined, symbol, null)

// 상태를 만들 때 데이터가 범객체(객체, 배열)일 때 기존 데이터를 복제해야함
// const [value, setValue] = useState()
// 예> object, array
// 1) newValue = {...value} - 기존 데이터를 새로운 값에 복제
// 2) newValue를 변경 - 기존 데이터 바꾸지 말고 복제본을 변경
// 3) setValue(newValue)

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

function Create(props) {
  return (
    <article>
      <h3>Create</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="create"></input></p>
      </form>
    </article>
  )
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h3>Update</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" value={title} onChange={(e) => {
          setTitle(e.target.value);
        }} /></p>
        <p><textarea name="body" placeholder="body" value={body} onChange={(e) => {
          setBody(e.target.value);
        }}></textarea></p>
        <p><input type="submit" value="update"></input></p>
      </form>
    </article>
  )
}

function App() {
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null); // 초기값x
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." }
  ]);
  let content = null;
  let contextControl = null;
  if (mode === "Welcome") {
    content = <Article title="Welcome" body="Hello, WEB!"></Article>
  } else if (mode === "Read") {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    // 리액트에서 태그를 다룰 때는 하나의 태그 안에 들어있어야함
    // 복수의 태그를 그루핑하기 위해 <></> 빈 제목의 태그를 사용
    contextControl =
    <>
      <li>
        <a href={`/update/${id}`} onClick={(e) => {
          e.preventDefault();
          setMode("Update");
        }}>Update
        </a>
      </li>
      <li>
        <input type="button" value="Delete" onClick={() => {
          const newTopics = [];
          for(let i = 0; i < topics.length; i++){
            if(topics[i].id !== id){
              newTopics.push(topics[i]);
            }
          }
          setTopics(newTopics);
          setMode("Welcome");
        }}></input>
      </li>
    </>
  } else if (mode === "Create") {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body }
      const newTopics = [...topics]
      // 범객체 데이터의 상태를 변경할 경우 기존 데이터를 새로운 변수에 복제해줘야함
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
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      const updatedTopic = { id: id, title: title, body: body };
      const newTopics = [...topics];
      for(let i = 0; i < newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break; // 반복문 닫기
        } 
      }
      setTopics(newTopics);
      setMode("Read");
    }}/>
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
      <ul>
        <li>
          <a href="/create" onClick={(e) => {
            e.preventDefault();
            setMode("Create");
          }}>Create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;