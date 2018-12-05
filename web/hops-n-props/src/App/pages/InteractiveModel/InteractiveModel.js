import React, { Component } from 'react';
import './InteractiveModel.css';
import { Form, FormGroup, ControlLabel, FormControl, Row, Col } from 'react-bootstrap';

export class InteractiveModel extends Component {

    render() {
        return (
            <div>
                <Form horizontal>
                    <Row className="show-grid">
                        <Col xs={6}>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={6}>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>

                </Form>
            </div>
        );
    }
}