import React, { Component } from 'react';
import './InteractiveModel.css';
import { Form, Button, ButtonToolbar, FormGroup, ControlLabel, FormControl, Row, Col, Jumbotron, Grid } from 'react-bootstrap';

const featTextForms = [[{ id: "abv-form", name: "abv", label: "Alcohol by Volume (ABV)" }, { id: "ibu-form", name: "ibu", label: "International Bittering Units (IBU)" }], [{ id: "grav-dif-form", name: "diff_g", label: "Gravity Difference" }, { id: "boil-form", name: "boil_time", label: "Boil Time" }], [{ id: "efficiency-form", name: "efficiency", label: "Efficiency" }, { id: "ferm-weight-form", name: "ferm_total_weight", label: "Total Fermentable Weight (lb.)" }], [{ id: "malt-form", name: "ferm_type_base_malt", label: "Base Malt Weight (lb.)" }, { id: "crystal-weight-form", name: "ferm_type_crystal_malt", label: "Crystal Malt Weight (lb.)" }], [{ id: "roasted-weight-form", name: "ferm_type_roasted_malt", label: "Roasted Malt Weight (lb.)" }, { id: "other-weight-form", name: "ferm_type_other", label: "Other Fermentables Weight (lb.)" }], [{ id: "extract-weight-form", name: "ferm_type_extract", label: "Extract Weight (lb.)" }, { id: "sugar-weight-form", name: "ferm_type_sugar", label: "Sugars Weight (lb.)" }], [{ id: "raw-weight-form", name: "ferm_type_raw", label: "Raw Fermentables Weight (lb.)" }, { id: "accidulated-weight-form", name: "ferm_type_acidulated_malt", label: "Accidulated Malt Weight (lb.)" }], [{ id: "fruit-weight-form", name: "ferm_type_fruit", label: "Fruit Fermentables Weight (lb.)" }, { id: "gluten-free-weight-form", name: "ferm_type_gluten_free_malt", label: "Gluten-free Malt Weight (lb.)" }], [{ id: "pellet-weight-form", name: "hops_type_pellet", label: "Pellet Hops Weight (lb.)" }, { id: "whole-weight-form", name: "hops_type_leaf_whole", label: "Whole Hops Weight (lb.)" }], [{ id: "plug-weight-form", name: "hops_type_plug", label: "Plug Hops Weight (lb.)" }, { id: "attenuation-form", name: "yeast_attenuation", label: "Attenuation Rate" }]]
const featSelectForms = [[{ id: "spice-form", name: "containSpice", label: "Contains Spices", options: "default" }, { id: "water-form", name: "containWater", label: "Contains Water Agents", options: "default" }], [{ id: "other-ingredients-form", name: "containOther", label: "Contains Other (non-standard) Ingredients", options: "default" }, { id: "fining-form", name: "containFinings", label: "Contains Added Finings", options: "default" }], [{ id: "added-flavors-form", name: "containFlavors", label: "Contains Added Flavors", options: "default" }, { id: "added-herbs-form", name: "containHerbs", label: "Contains Added Herbs", options: "default" }], [{ id: "yeast-form", name: "yeastType", label: "Yeast Type", options: [{ value: "liquid", display: "Liquid" }, { value: "dry", display: "Dry" }] }, { id: "method-form", name: "method", label: "Method", options: [{ value: "allGrain", display: "All Grain" }, { value: "biab", display: "BIAB" }, { value: "extract", display: "Extract" }, { value: "partialMash", display: "Partial Mash" }] }], [{ id: "flocculation-form", name: "floccRate", label: "Flocculation Rate", options: [{ value: "low", display: "Low" }, { value: "medium", display: "Medium" }, { value: "high", display: "High" }] }, { id: "none", name: "", label: "" }]]

export class InteractiveModel extends Component {

    componentWillMount() {
        featTextForms.forEach((group) => {
            group.forEach((item) => {
                if (item.id !== "none") this.setState({ [item.name]: "" });
            })
        })

        featSelectForms.forEach((group) => {
            group.forEach((item) => {
                if (item.options === "default") {
                    this.setState({ [item.name]: "yes" });
                } else if (item.id !== "none") {
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

    getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    getRandomIntInclusive = (max) => {
        return Math.floor(Math.random() * (Math.floor(max) - 1));
    }

    // generates random values around the mean per feature
    generateRandomValues = () => {

        this.setState({
            abv: "" + this.getRandomArbitrary(1, 20),
            ibu: "" + this.getRandomArbitrary(10, 80),
            diff_g: "" + this.getRandomArbitrary(.01, 2),
            boil_time: "" + this.getRandomArbitrary(30, 90),
            efficiency: "" + this.getRandomArbitrary(60, 70),
            ferm_total_weight: "" + this.getRandomArbitrary(5, 20),
            ferm_type_base_malt: "" + this.getRandomArbitrary(4, 20),
            ferm_type_crystal_malt: "0",
            ferm_type_roasted_malt: "0",
            ferm_type_other: "0",
            ferm_type_extract: "0",
            ferm_type_sugar: "0",
            ferm_type_raw: "0",
            ferm_type_acidulated_malt: "0",
            ferm_type_fruit: "0",
            ferm_type_gluten_free_malt: "0",
            hops_type_pellet: "" + this.getRandomArbitrary(3, 20),
            hops_type_leaf_whole: "0",
            hops_type_plug: "0",
            yeast_attenuation: "" + this.getRandomArbitrary(72, 83),
        });

        // featSelectForms.forEach((group) => {
        //     group.forEach((item) => {
        //         if (item.options === "default") {
        //             let array = ["yes", "no"];
        //             let option = array[this.getRandomIntInclusive(1)];
        //             this.setState({ [item.name]: option });
        //         } else if (item.id !== "none") {
        //             let option = item.options[this.getRandomIntInclusive(item.options.length - 1)].value;
        //             this.setState({ [item.name]: option });
        //         }
        //     })
        // })
    }

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
                                <h1>Predictions:</h1>
                            </Col>
                            <Col xs={12} md={6}>
                                <p className="jumbotron-para">
                                    Try the model out for yourself!
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

                <ButtonToolbar className="forms-buttons">
                    <Button bsStyle="warning" bsSize="large" className="run-button" onClick={this.generateRandomValues} > Randomize </Button>
                    <Button bsStyle="primary" bsSize="large" className="run-button" onClick={this.handleButton} > Run </Button>
                </ButtonToolbar>
            </div>
        );
    }
}