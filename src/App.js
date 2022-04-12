// 상태를 만들 때 데이터가 PRIMITIVE(원시데이터타입)일 때 기존 방식대로 작업
// const [value, setValue] = useState()
// 예> string, number, boolean (+bigint, undefined, symbol, null)

// 상태를 만들 때 데이터가 범객체(객체, 배열)일 때 기존 데이터를 복제해야함
// const [value, setValue] = useState()
// 예> object, array
// 1) newValue = {...value} - 기존 데이터를 새로운 값에 복제
// 2) newValue를 변경 - 기존 데이터 바꾸지 말고 복제본을 변경
// 3) setValue(newValue)

// prop과 state 차이점
// prop - 컴포넌트를 사용하는 외부자를 위한 데이터
// state - 컴포넌트를 만드는 내부자를 위한 데이터

import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function Article(props) {
  return (
    <article>
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
          props.onChangeMode(e.target.id);
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
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "js is ..." }
  ]
  let content = null;
  if(mode === "Welcome"){
    content = <Article title="Welcome" body="Hello, WEB!" />;
  } else if(mode === "Read"){
    content = <Article title="Read" body="Read Mode" />
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode("Welcome");
      }} />
      <Nav topics={topics} onChangeMode={(id) => {
        setMode("Read");
      }}/>
      {content}
    </div>
  );
}

export default App;