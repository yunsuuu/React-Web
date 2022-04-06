import logo from './logo.svg';
import './App.css';

function Header(){
  return (
    <header>
      <h1><a href="/">WEB</a></h1>
    </header>
  )
}

function Nav(){
  return (
    <nav>
      <ol>
        <li><a href="/read/1">html</a></li>
        <li><a href="/read/2">css</a></li>
        <li><a href="/read/3">js</a></li>
      </ol>
    </nav>
  )
}

function Article(){
  return (
    <article>
      <h3>Welcome</h3>
      <p>Hello, WEB!</p>
    </article>
  )
}

function App() {
  return (
    <div>
      <Header />
      <Nav />
      <Article />
    </div>
  );
}

export default App;