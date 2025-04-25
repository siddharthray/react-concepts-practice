import "./App.css";
import NavBar from "./components/Layout/NavBar";
import TodoApp from "./features/TodoApp";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="main-container">
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
