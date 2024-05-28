import './App.css';
import WebGLCanvas from './components/WebGLCanvas';
import Overlay from './components/Overlay';

function App() {
  return (
    <div className="App">
      <WebGLCanvas />
      <Overlay />
    </div>
  );
}

export default App;
