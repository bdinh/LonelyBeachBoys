import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { Homepage } from './pages/Homepage/Homepage';
import { Exploration } from './pages/Exploration/Exploration';
import { InteractiveModel } from './pages/InteractiveModel/InteractiveModel';
import { Results } from './pages/Results/Results';
import {DataPreparation} from "./pages/DataPreparation/DataPreparation";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/" id="brand">Hops 'n Props</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem eventKey={1} componentClass='span'><Link className="nav-links" to="/">Homepage</Link></NavItem>
                  <NavItem eventKey={2} componentClass='span'><Link className="nav-links" to="/explore">Data Preparation</Link></NavItem>
                  <NavItem eventKey={3} componentClass='span'><Link className="nav-links" to="/explore">Exploration</Link></NavItem>
                  <NavItem eventKey={4} componentClass='span'><Link className="nav-links" to="/interact">Interactive Model</Link></NavItem>
                  <NavItem eventKey={5} componentClass='span'><Link className="nav-links" to="/results">Results</Link></NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>

          <main>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/explore" component={DataPreparation} />
              <Route path="/explore" component={Exploration} />
              <Route path="/interact" component={InteractiveModel} />
              <Route path="/results" component={Results} />
            </Switch>
          </main>

          <footer className="footer">
            <div className="manual-container">
              <span className="footer-text">This is a footer</span>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
