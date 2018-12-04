import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import './Homepage.css';
import { TeamCard } from './components/TeamCard';

const team = [{name: "Sam Otto", img:"./img/me_1.jpg", alt:"Sam standing by tree"}, {name: "Fergus", img:"./img/fergus_1.png", alt:"Fergus looking dapper"}, {name: "Fergus Two: Electric Boogaloo", img:"./img/fergus_1.png", alt:"Fergus looking dapper"}, {name: "Fergus Three", img:"./img/fergus_1.png", alt:"Fergus looking dapper"}];

export class Homepage extends Component {

    render() {
        return (
            <div>
                <Jumbotron>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={6}>
                                <h1>Question:</h1>
                            </Col>
                            <Col xs={12} md={6}>
                                <p className="jumbotron-para">
                                    What are the factors that go into making a popular homebrew?
                                </p>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>

                <Grid>
                    <Row className="show-grid">
                        <Col xs={12}>
                            <h2>Overview</h2>
                            <p>What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.</p>
                        </Col>
                        <Col xs={12}>
                            <h2>Source</h2>
                            <p>What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.</p>
                        </Col>
                        <Col xs={12}>
                            <h2>Needed for project:</h2>
                            <p>The purpose of the project, source of the data, and any pertinent information about the topic area are introduced. You may also want to include links to the code, or information about the team.</p>
                        </Col>
                    </Row>
                </Grid>

                <div className="div-panel">
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12}>
                                <h1 className="panel-heading">Meet the Team</h1>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            { team.map((member, index) => { return <TeamCard key={"member" + index} member={member} /> }) }
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

