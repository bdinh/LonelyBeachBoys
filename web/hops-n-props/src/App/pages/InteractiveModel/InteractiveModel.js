import React, { Component } from 'react';
import './InteractiveModel.css';
import { Form, Button, ButtonToolbar, FormGroup, ControlLabel, FormControl, Row, Col, Jumbotron, Grid } from 'react-bootstrap';

const featTextForms = [[{ id: "abv-form", name: "abv", label: "Alcohol by Volume (ABV)" }, { id: "ibu-form", name: "ibu", label: "International Bittering Units (IBU)" }], [{ id: "grav-dif-form", name: "gravDif", label: "Gravity Difference" }, { id: "boil-form", name: "boil", label: "Boil Time" }], [{ id: "efficiency-form", name: "efficiency", label: "Efficiency" }, { id: "ferm-weight-form", name: "totalFerm", label: "Total Fermentable Weight (lb.)" }], [{ id: "malt-form", name: "baseMalt", label: "Base Malt Weight (lb.)" }, { id: "crystal-weight-form", name: "crystalMalt", label: "Crystal Malt Weight (lb.)" }], [{ id: "roasted-weight-form", name: "roastedMalt", label: "Roasted Malt Weight (lb.)" }, { id: "other-weight-form", name: "otherFerm", label: "Other Fermentables Weight (lb.)" }], [{ id: "extract-weight-form", name: "extract", label: "Extract Weight (lb.)" }, { id: "sugar-weight-form", name: "sugars", label: "Sugars Weight (lb.)" }], [{ id: "raw-weight-form", name: "rawFerm", label: "Raw Fermentables Weight (lb.)" }, { id: "accidulated-weight-form", name: "accidulatedMalt", label: "Accidulated Malt Weight (lb.)" }], [{ id: "fruit-weight-form", name: "fruitFerm", label: "Fruit Fermentables Weight (lb.)" }, { id: "gluten-free-weight-form", name: "glutenFreeMalt", label: "Gluten-free Malt Weight (lb.)" }], [{ id: "pellet-weight-form", name: "pelletHops", label: "Pellet Hops Weight (lb.)" }, { id: "whole-weight-form", name: "wholeHops", label: "Whole Hops Weight (lb.)" }], [{ id: "plug-weight-form", name: "plugHops", label: "Plug Hops Weight (lb.)" }, { id: "attenuation-form", name: "attenRate", label: "Attenuation Rate" }], [{ id: "flocculation-form", name: "floccRate", label: "Flocculation Rate" }, { id: "none", name: "", label: "" }]]
const featSelectForms = [[{ id: "spice-form", name: "containSpice", label: "Contains Spices", options: "default" }, { id: "water-form", name: "containWater", label: "Contains Water Agents", options: "default" }], [{ id: "other-ingredients-form", name: "containOther", label: "Contains Other (non-standard) Ingredients", options: "default" }, { id: "fining-form", name: "containFinings", label: "Contains Added Finings", options: "default" }], [{ id: "added-flavors-form", name: "containFlavors", label: "Contains Added Flavors", options: "default" }, { id: "added-herbs-form", name: "containHerbs", label: "Contains Added Herbs", options: "default" }], [{ id: "yeast-form", name: "yeastType", label: "Yeast Type", options: [{ value: "liquid", display: "Liquid" }, { value: "dry", display: "Dry" }] }, { id: "method-form", name: "method", label: "Method", options: [{ value: "need", display: "Need" }, { value: "to", display: "To" }, { value: "find", display: "Find" }, { value: "values", display: "Values" }] }]]

export class InteractiveModel extends Component {

    componentWillMount() {
        featTextForms.forEach((group) => { 
            group.forEach((item) => { 
                this.setState({ [item.name]: "" });
            })
        })

        featSelectForms.forEach((group) => { 
            group.forEach((item) => { 
                if (item.options === "default") {
                    this.setState({ [item.name]: "yes" });
                } else {
                    this.setState({ [item.name]: item.options[0].value });
                }
            })
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleButton = () => {
        console.log(this.state);
    };

    render() {

        let textGroup = (entry) => {
            return (
                <FormGroup controlId={entry.id}>
                    <ControlLabel>{entry.label}</ControlLabel>
                    <FormControl type='text' name={entry.name} placeholder='Enter text' defaultValue={this.state[entry.name]} onChange={this.handleChange} />
                </FormGroup>
            )
        };

        let selectGroup = (entry) => {
            return (
                <FormGroup controlId={entry.id}>
                    <ControlLabel>{entry.label}</ControlLabel>
                    <FormControl componentClass="select" name={entry.name} onChange={this.handleChange}>
                        {(entry.options !== "default") && entry.options.map((option) => { return (<option key={option.value} value={option.value}>{option.display}</option>) })}
                        {(entry.options === "default") && <option value="yes">Yes</option>}
                        {(entry.options === "default") && <option value="no">No</option>}
                    </FormControl>
                </FormGroup>
            )
        };

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
                    {
                        featTextForms.map((group, index) => {
                            return (
                                <Row key={"text-row-" + index}>
                                    {
                                        group.map((entry) => {
                                            return (
                                                <Col xs={6} key={entry.name}>
                                                    {(entry.id !== "none") && textGroup(entry)}
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>

                            )
                        })
                    }

                    {
                        featSelectForms.map((group, index) => {
                            return (
                                <Row key={"select-row-" + index}>
                                    {
                                        group.map((entry) => {
                                            return (
                                                <Col xs={6} key={entry.name}>
                                                    {(entry.id !== "none") && selectGroup(entry)}
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>

                            )
                        })
                    }
                </Form>

                <ButtonToolbar>
                    <Button bsStyle="primary" bsSize="large" onClick={this.handleButton} >
                        Run Thing
                    </Button>
                </ButtonToolbar>
            </div>
        );
    }
}