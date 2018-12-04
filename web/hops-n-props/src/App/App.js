import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { Homepage } from './pages/Homepage/Homepage';
import { Exploration } from './pages/Exploration/Exploration';
import { InteractiveModel } from './pages/InteractiveModel/InteractiveModel';
import { Results } from './pages/Results/Results';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">Hops 'n Props</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem eventKey={1} componentClass='span'><Link to="/">Homepage</Link></NavItem>
                  <NavItem eventKey={2} componentClass='span'><Link to="/explore">Exploration</Link></NavItem>
                  <NavItem eventKey={3} componentClass='span'><Link to="/interact">Interactive Model</Link></NavItem>
                  <NavItem eventKey={4} componentClass='span'><Link to="/results">Results</Link></NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>

          <main>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/explore" component={Exploration} />
              <Route path="/interact" component={InteractiveModel} />
              <Route path="/results" component={Results} />
            </Switch>
          </main>

          <footer>
            <div>This is a footer</div>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
