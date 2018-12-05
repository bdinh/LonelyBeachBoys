import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import { Homepage } from './pages/Homepage/Homepage';
import { InteractiveModel } from './pages/InteractiveModel/InteractiveModel';
import { Results } from './pages/Results/Results';
import { DataPreparation } from "./pages/DataPreparation/DataPreparation";

class App extends Component {
  render() {
    return (
      <Router >
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
                  <NavItem eventKey={1} componentClass='span'><Link className="nav-links" to="/">Home</Link></NavItem>
                  <NavItem eventKey={2} componentClass='span'><Link className="nav-links" to="/explore">Data</Link></NavItem>
                  <NavItem eventKey={4} componentClass='span'><Link className="nav-links" to="/interact">Interact</Link></NavItem>
                  <NavItem eventKey={5} componentClass='span'><Link className="nav-links" to="/results">Results</Link></NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>

          <main>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/explore" component={DataPreparation} />
              <Route path="/interact" component={InteractiveModel} />
              <Route path="/results" component={Results} />
            </Switch>
          </main>

          <footer className="footer">
            <div className="manual-container">
              <span className="footer-text">
                <Grid>
                  <Row>
                    <Col xs={6}>
                      <p className="normal-para">Project by the Lonely Beach Boys</p>
                      <Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star" />
                    </Col>
                    <Col xs={6}>
                      <ul id="footer-ul">
                        <li className="normal-para"><Link className="nav-links" to="/">Home</Link></li>
                        <li className="normal-para"><Link className="nav-links" to="/explore">Data</Link></li>
                        <li className="normal-para"><Link className="nav-links" to="/interact">Interact</Link></li>
                        <li className="normal-para"><Link className="nav-links" to="/results">Results</Link></li>
                      </ul>
                      <p className="normal-para" id="footer-links">Quick Links</p>
                    </Col>
                  </Row>
                </Grid>
              </span>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
