import React, { Component } from 'react';
import { Panel, Row, Col } from 'react-bootstrap';

export class TeamCard extends Component {
    render() {
        return (
            <Col xs={6} md={3}>
                <Panel className="team-intro">
                    <Panel.Body>
                        <Row>
                            <Col xs={12}>
                                <img className="rounded-circle" src={this.props.member.img} alt={this.props.member.alt} />
                            </Col>
                            <Col xs={12}>
                                <h3 className="team-names">{this.props.member.name}</h3>
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel>
            </Col>
        )
    };

}