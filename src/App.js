import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import AddNewLocation from "./components/AddNewLocation";
import LocationList from "./components/LocationList";

import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <header className="App-header">
          <h1>The Jules Journal</h1>
          <p>Adventure is Out There!!</p>
        </header>
        <AddNewLocation/>
        <Router>
          <LocationList/>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
