import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import AddNewLocation from "./components/AddNewLocation";
import LocationList from "./components/LocationList";
import ActivityDetails from './components/ActivityDetails';

import './App.css';

function App() {
  const [reloadList, setReloadList] = useState(false);

  const handleReload = (status) => {
      setReloadList(status);
  };

  return (
  <div className="App">
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
          <AddNewLocation handleReload={handleReload}/>
          <LocationList reload={reloadList}/>
        </Route>
        <Route path="/location">
          <LocationList reload={reloadList}/>
        </Route>
        <Route path="/activity/:id">
          <ActivityDetails reload={reloadList}/>
        </Route>
      </Switch>
    </Router>
  </div>
  );
};

export default App;