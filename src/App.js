import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
                route.element
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
