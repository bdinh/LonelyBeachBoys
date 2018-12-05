import React, { Component } from 'react';
import './InteractiveModel.css';
import { Form, Button, ButtonToolbar, FormGroup, ControlLabel, HelpBlock, FormControl, Row, Col, Jumbotron, Grid } from 'react-bootstrap';

export class InteractiveModel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spice: "",
            abv: ""
        };
    }

    // handleChange = (event) => {
    //     let field = event.target.name;
    //     let value = event.target.value;
    //     newPost[field] = value;
    // }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleButton = () => {
        console.log(this.state.spice);
        console.log(this.state.abv);
    };

    render() {

        function FieldGroup({ id, label, help, ...props }) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
        }

        return (
            <div>
                <Jumbotron>
                    <Grid>
                        <Row>
                            <Col xs={12} md={6}>
                                <h1>Filler:</h1>
                            </Col>
                            <Col xs={12} md={6}>
                                <p className="jumbotron-para">
                                    Something will likely go here.
                                </p>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>

                <Form horizontal>
                    <Row>
                        <Col xs={6}>
                            <FormGroup controlId="abv-form">
                                <ControlLabel>Alcohol by Volume (ABV)</ControlLabel>
                                <FormControl componentClass="text" placeholder="Enter text" value={this.state.abv} onChange={this.handleChange} />
                            </FormGroup>

                            {/* <FieldGroup id="abv-form" type="text" label="Alcohol by Volume (ABV)" placeholder="Enter text" /> */}
                        </Col>
                        <Col xs={6}>
                            <FieldGroup id="ibu-form" type="text" label="International Bittering Units (IBU)" placeholder="Enter text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FieldGroup id="grav-dif-form" type="text" label="Gravity Difference" placeholder="Enter text" />
                        </Col>
                        <Col xs={6}>
                            <FieldGroup id="method-form" type="text" label="Method" placeholder="Enter text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FieldGroup id="boil-form" type="text" label="Boil Time" placeholder="Enter text" />
                        </Col>
                        <Col xs={6}>
                            <FieldGroup id="efficiency-form" type="text" label="Efficiency" placeholder="Enter text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FieldGroup id="ferm-weight-form" type="text" label="Total Fermentable Weight (lb.)" placeholder="Enter text" />
                        </Col>
                        <Col xs={6}>
                            <FieldGroup id="malt-form" type="text" label="Base Malt Weight (lb.)" placeholder="Enter text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FieldGroup id="crystal-weight-form" type="text" label="Crystal Malt Weight (lb.)" placeholder="Enter text" />
                        </Col>
                        <Col xs={6}>
                            <FieldGroup id="roasted-weight-form" type="text" label="Roasted Malt Weight (lb.)" placeholder="Enter text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FieldGroup id="other-weight-form" type="text" label="Other Fermentables Weight (lb.)" placeholder="Enter text" />
                        </Col>
                        <Col xs={6}>
                            <FieldGroup id="extract-weight-form" type="text" label="Extract Weight (lb.)" placeholder="Enter text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FieldGroup id="sugar-weight-form" type="text" label="Sugars Weight (lb.)" placeholder="Enter text" />
                        </Col>
                        <Col xs={6}>
                            <FieldGroup id="raw-weight-form" type="text" label="Raw Fermentables Weight (lb.)" placeholder="Enter text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FieldGroup id="accidulated-weight-form" type="text" label="Accidulated Malt Weight (lb.)" placeholder="Enter text" />
                        </Col>
                        <Col xs={6}>
                            <FieldGroup id="fruit-weight-form" type="text" label="Fruit Fermentables Weight (lb.)" placeholder="Enter text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FieldGroup id="gluten-free-weight-form" type="text" label="Gluten-free Malt Weight (lb.)" placeholder="Enter text" />
                        </Col>
                        <Col xs={6}>
                            <FieldGroup id="pellet-weight-form" type="text" label="Pellet Hops Weight (lb.)" placeholder="Enter text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FieldGroup id="whole-weight-form" type="text" label="Whole Hops Weight (lb.)" placeholder="Enter text" />
                        </Col>
                        <Col xs={6}>
                            <FieldGroup id="plug-weight-form" type="text" label="Plug Hops Weight (lb.)" placeholder="Enter text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FormGroup controlId="spice-form">
                                <ControlLabel>Contains Spices</ControlLabel>
                                <FormControl componentClass="select" placeholder="select" name="spice" onChange={this.handleChange}>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup controlId="water-form">
                                <ControlLabel>Contains Water Agents</ControlLabel>
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FormGroup controlId="other-ingredients-form">
                                <ControlLabel>Contains Other (non-standard) Ingredients</ControlLabel>
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup controlId="fining-form">
                                <ControlLabel>Contains Added Finings</ControlLabel>
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FormGroup controlId="added-flavors-form">
                                <ControlLabel>Contains Added Flavors</ControlLabel>
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup controlId="added-herbs-form">
                                <ControlLabel>Contains Added Herbs</ControlLabel>
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FormGroup controlId="yeast-form">
                                <ControlLabel>Yeast Type</ControlLabel>
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="liquid">Liquid</option>
                                    <option value="dry">Dry</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FieldGroup id="attenuation-form" type="text" label="Attenuation Rate" placeholder="Enter text" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <FieldGroup id="flocculation-form" type="text" label="Flocculation Rate" placeholder="Enter text" />
                        </Col>
                        <Col xs={6}>
                            <div></div>
                        </Col>
                    </Row>

                </Form>
                <ButtonToolbar>
                    <Button bsStyle="primary" bsSize="large" onClick={this.handleButton} >
                        Run Thing
                    </Button>
                </ButtonToolbar>;
            </div>
        );
    }
}