import React, { Component } from 'react';
import './InteractiveModel.css';
import { Form, Button, ButtonToolbar, FormGroup, ControlLabel, FormControl, Row, Col, Jumbotron, Grid } from 'react-bootstrap';

const featTextForms =
    [[{ id: "abv-form", name: "abv", label: "Alcohol by Volume (ABV)" }, { id: "ibu-form", name: "ibu", label: "International Bittering Units (IBU)" }],
    [{ id: "og-form", name: "og", label: "Original Gravity" }, { id: "fg-form", name: "fg", label: "Final Gravity" }],
    [{ id: "efficiency-form", name: "efficiency", label: "Efficiency" }, { id: "ferm-weight-form", name: "totalFerm", label: "Total Fermentable Weight (lb.)" }],
        [{ id: "malt-form", name: "baseMalt", label: "Base Malt Weight (lb.)" }, { id: "crystal-weight-form", name: "crystalMalt", label: "Crystal Malt Weight (lb.)" }],
        [{ id: "roasted-weight-form", name: "roastedMalt", label: "Roasted Malt Weight (lb.)" }, { id: "other-weight-form", name: "otherFerm", label: "Other Fermentables Weight (lb.)" }],
        [{ id: "extract-weight-form", name: "extract", label: "Extract Weight (lb.)" }, { id: "sugar-weight-form", name: "sugars", label: "Sugars Weight (lb.)" }],
        [{ id: "raw-weight-form", name: "rawFerm", label: "Raw Fermentables Weight (lb.)" }, { id: "accidulated-weight-form", name: "accidulatedMalt", label: "Accidulated Malt Weight (lb.)" }],
        [{ id: "fruit-weight-form", name: "fruitFerm", label: "Fruit Fermentables Weight (lb.)" }, { id: "gluten-free-weight-form", name: "glutenFreeMalt", label: "Gluten-free Malt Weight (lb.)" }],
        [{ id: "pellet-weight-form", name: "pelletHops", label: "Pellet Hops Weight (lb.)" }, { id: "whole-weight-form", name: "wholeHops", label: "Whole Hops Weight (lb.)" }],
        [{ id: "plug-weight-form", name: "plugHops", label: "Plug Hops Weight (lb.)" }, { id: "attenuation-form", name: "attenRate", label: "Attenuation Rate" }],
        [{ id: "boil-form", name: "boil", label: "Boil Time (Minutes)" }, {id: "none", name: "", label: ""}]]
const featSelectForms = [[{ id: "flocculation", name: "flocculation", label: "Flocculation Rate", options: [{ value: "low", display: "Low" }, { value: "medium", display: "Medium" }, { value: "high", display: "High" }]}, { id: "method-form", name: "method", label: "Method", options: [{ value: "all_grain", display: "All Grain" }, { value: "extract", display: "Extract" }, { value: "biab", display: "BIAB" }, { value: "partial_mash", display: "Partial Mash" }] }],
    [{ id: "spice-form", name: "containSpice", label: "Contains Spices", options: "default" }, { id: "water-form", name: "containWater", label: "Contains Water Agents", options: "default" }],
    [{ id: "other-ingredients-form", name: "containOther", label: "Contains Other (non-standard) Ingredients", options: "default" }, { id: "fining-form", name: "containFinings", label: "Contains Added Finings", options: "default" }],
    [{ id: "added-flavors-form", name: "containFlavors", label: "Contains Added Flavors", options: "default" }, { id: "added-herbs-form", name: "containHerbs", label: "Contains Added Herbs", options: "default" }],
    [{ id: "yeast-form", name: "yeastType", label: "Yeast Type", options: [{ value: "liquid", display: "Liquid" }, { value: "dry", display: "Dry" }] }, { id: "none", name: "", label: "", options: "default" }]]

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

        let test = {
                "abv": 5.92,
                "boil_time": 60,
                "diff_g": 0.045,
                "efficiency": 61.0,
                "ferm_total_weight": 13.5,
                "ferm_type_acidulated_malt": 0,
                "ferm_type_base_malt": 11.0,
                "ferm_type_crystal_malt": 1.0,
                "ferm_type_extract": 0,
                "ferm_type_fruit": 0,
                "ferm_type_gluten_free_malt": 0,
                "ferm_type_other": 0.75,
                "ferm_type_raw": 0,
                "ferm_type_roasted_malt": 0,
                "ferm_type_sugar": 0,
                "hops_type_leaf_whole": 0,
                "hops_type_pellet": 0.25,
                "hops_type_plug": 0,
                "ibu": 38.66,
                "method_all_grain": 1,
                "method_biab": 0,
                "method_extract": 0,
                "method_partial_mash": 0,
                "other_type_fining": 0,
                "other_type_flavor": 0,
                "other_type_herb": 0,
                "other_type_other": 1,
                "other_type_spice": 0,
                "other_type_water_agt": 0,
                "yeast_attenuation": 77.0,
                "yeast_flocculation_high": 1,
                "yeast_flocculation_low": 0,
                "yeast_flocculation_medium": 0,
                "yeast_form_dry": 1,
                "yeast_form_liquid": 0
        }

        let beerJSON = {};
        // Add ternary checks for all features
        beerJSON.abv = parseFloat(this.state.abv);
        beerJSON.ibu = parseFloat(this.state.ibu);
        beerJSON.diff_g = parseFloat(this.state.og) - parseFloat(this.state.fg);
        beerJSON.boil_time = parseFloat(this.state.boil);
        beerJSON.efficiency = parseFloat(this.state.efficiency);
        beerJSON.ferm_total_weight = parseFloat(this.state.totalFerm);
        beerJSON.ferm_type_base_malt = parseFloat(this.state.baseMalt);
        beerJSON.ferm_type_crystal_malt = parseFloat(this.state.crystalMalt);
        beerJSON.ferm_type_roasted_malt = parseFloat(this.state.roastedMalt);
        beerJSON.ferm_type_other = parseFloat(this.state.otherFerm);
        beerJSON.ferm_type_extract = parseFloat(this.state.extract);
        beerJSON.ferm_type_sugar = parseFloat(this.state.sugars);
        beerJSON.ferm_type_raw = parseFloat(this.state.rawFerm);
        beerJSON.ferm_type_acidulated_malt = parseFloat(this.state.accidulatedMalt);
        beerJSON.ferm_type_fruit = parseFloat(this.state.fruitFerm);
        beerJSON.ferm_type_gluten_free_malt = parseFloat(this.state.glutenFreeMalt);
        beerJSON.hops_type_pellet = parseFloat(this.state.pelletHops);
        beerJSON.hops_type_leaf_whole = parseFloat(this.state.wholeHops);
        beerJSON.hops_type_plug = parseFloat(this.state.plugHops);
        beerJSON.other_type_spice = this.state.containSpice == "yes" ? 1 : 0;
        beerJSON.other_type_water_agt = this.state.containOther == "yes" ? 1 : 0;
        beerJSON.other_type_other = this.state.containOther == "yes" ? 1 : 0;
        beerJSON.other_type_fining = this.state.containFinings == "yes" ? 1 : 0;
        beerJSON.other_type_flavor = this.state.containFlavors == "yes" ? 1 : 0;
        beerJSON.other_type_herb = this.state.containHerbs == "yes" ? 1 : 0;
        beerJSON.yeast_attenuation = parseFloat(this.state.attenRate);
        beerJSON.method_all_grain = this.state.method == "all_grain" ? 1 : 0;
        beerJSON.method_biab = this.state.method == "biab" ? 1 : 0;
        beerJSON.method_extract = this.state.method == "extract" ? 1 : 0;
        beerJSON.method_partial_mash = this.state.method == "partial_mash" ? 1 : 0;
        beerJSON.yeast_form_dry = this.state.yeastType == "dry" ? 1 : 0;
        beerJSON.yeast_form_liquid = this.state.yeastType == "liquid" ? 1 : 0;
        beerJSON.yeast_flocculation_high = this.state.flocculation == "high" ? 1 : 0;
        beerJSON.yeast_flocculation_low = this.state.flocculation == "low" ? 1 : 0;
        beerJSON.yeast_flocculation_medium = this.state.flocculation == "medium" ? 1 : 0;
        // console.log(this.state);

        fetch("https://api.bdinh.me/v1/beer", {
            method: "POST",
            headers: new Headers({
                'Content-Type':'application/json',
            }),
            body: JSON.stringify(test)
        })
        .then(response => {
            if (!response.ok) throw response;
            return response.json()
        })
        .then(result => {
            this.setState({"predictedScore": result.predicted_popularity})
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })
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
                                    {this.state.predictedScore ? "Popularity rating of " + this.state.predictedScore + " out of 5!" : "Recipe Not Filled"}
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