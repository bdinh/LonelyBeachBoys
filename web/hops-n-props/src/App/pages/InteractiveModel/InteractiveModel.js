import React, { Component } from 'react';
import './InteractiveModel.css';
import { Form, Button, ButtonToolbar, ButtonGroup, FormGroup, ControlLabel, FormControl, Row, Col, Jumbotron, Grid, Glyphicon } from 'react-bootstrap';

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
    [{ id: "boil-form", name: "boil", label: "Boil Time (Minutes)" }, { id: "none", name: "", label: "" }]]

const featSelectForms = [[{ id: "flocculation", name: "flocculation", label: "Flocculation Rate", options: [{ value: "low", display: "Low" }, { value: "medium", display: "Medium" }, { value: "high", display: "High" }] }, { id: "method-form", name: "method", label: "Method", options: [{ value: "all_grain", display: "All Grain" }, { value: "extract", display: "Extract" }, { value: "biab", display: "BIAB" }, { value: "partial_mash", display: "Partial Mash" }] }],
[{ id: "spice-form", name: "containSpice", label: "Contains Spices", options: "default" }, { id: "water-form", name: "containWater", label: "Contains Water Agents", options: "default" }],
[{ id: "other-ingredients-form", name: "containOther", label: "Contains Other (non-standard) Ingredients", options: "default" }, { id: "fining-form", name: "containFinings", label: "Contains Added Finings", options: "default" }],
[{ id: "added-flavors-form", name: "containFlavors", label: "Contains Added Flavors", options: "default" }, { id: "added-herbs-form", name: "containHerbs", label: "Contains Added Herbs", options: "default" }],
[{ id: "yeast-form", name: "yeastType", label: "Yeast Type", options: [{ value: "liquid", display: "Liquid" }, { value: "dry", display: "Dry" }] }, { id: "none", name: "", label: "", options: "default" }]]

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
        beerJSON.other_type_spice = this.state.containSpice === "yes" ? 1 : 0;
        beerJSON.other_type_water_agt = this.state.containOther === "yes" ? 1 : 0;
        beerJSON.other_type_other = this.state.containOther === "yes" ? 1 : 0;
        beerJSON.other_type_fining = this.state.containFinings === "yes" ? 1 : 0;
        beerJSON.other_type_flavor = this.state.containFlavors === "yes" ? 1 : 0;
        beerJSON.other_type_herb = this.state.containHerbs === "yes" ? 1 : 0;
        beerJSON.yeast_attenuation = parseFloat(this.state.attenRate);
        beerJSON.method_all_grain = this.state.method === "all_grain" ? 1 : 0;
        beerJSON.method_biab = this.state.method === "biab" ? 1 : 0;
        beerJSON.method_extract = this.state.method === "extract" ? 1 : 0;
        beerJSON.method_partial_mash = this.state.method === "partial_mash" ? 1 : 0;
        beerJSON.yeast_form_dry = this.state.yeastType === "dry" ? 1 : 0;
        beerJSON.yeast_form_liquid = this.state.yeastType === "liquid" ? 1 : 0;
        beerJSON.yeast_flocculation_high = this.state.flocculation === "high" ? 1 : 0;
        beerJSON.yeast_flocculation_low = this.state.flocculation === "low" ? 1 : 0;
        beerJSON.yeast_flocculation_medium = this.state.flocculation === "medium" ? 1 : 0;
        // console.log(this.state);

        fetch("https://api.bdinh.me/v1/beer", {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(beerJSON)
        })
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(result => {
                this.setState({ "predictedScore": result.predicted_popularity })
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    };

    handleExampleButton = (star) => {
        if (star === "one") {
            // One Star
            this.setState({
                abv: "22.05",
                ibu: "0.0",
                og: "0.168",
                fg: "0.168",
                boil: "60",
                efficiency: "70.0",
                totalFerm: "40.0",
                baseMalt: "0.0",
                crystalMalt: "0.0",
                roastedMalt: "0.0",
                otherFerm: "0.0",
                extract: "0.0",
                sugars: "0.0",
                rawFerm: "0.0",
                accidulatedMalt: "0.0",
                fruitFerm: "40.0",
                glutenFreeMalt: "0.0",
                pelletHops: "0.0",
                wholeHops: "0.0",
                plugHops: "0.0",
                attenRate: "75.0",

                flocculation: "medium",
                method: "all_grain",
                containSpice: "no",
                containFinings: "no",
                containFlavors: "no",
                containHerbs: "no",
                containOther: "no",
                containWater: "no",
                yeastType: "liquid"
            });
        } else if (star === "two") {

            // Two Star
            this.setState({
                abv: "12.39",
                ibu: "0.0",
                og: "0.094",
                fg: "0.094",
                boil: "15",
                efficiency: "35.0",
                totalFerm: "5.82097",
                baseMalt: "0.0",
                crystalMalt: "0.0",
                roastedMalt: "0.0",
                otherFerm: "0.0",
                extract: "0.0",
                sugars: "0.0",
                rawFerm: "0.0",
                accidulatedMalt: "0.0",
                fruitFerm: "5.820197",
                glutenFreeMalt: "0.0",
                pelletHops: "0.0",
                wholeHops: "0.0",
                plugHops: "0.0",
                attenRate: "75.5",

                flocculation: "medium",
                method: "extract",
                containSpice: "no",
                containFinings: "no",
                containFlavors: "no",
                containHerbs: "no",
                containOther: "no",
                containWater: "no",
                yeastType: "liquid"
            });
        } else if (star === "three") {
            // three Star
            this.setState({
                abv: "5.92",
                ibu: "38.66",
                og: "0.046",
                fg: "0.001",
                boil: "60",
                efficiency: "61.0",
                totalFerm: "13.5",
                baseMalt: "11.0",
                crystalMalt: "1.0",
                roastedMalt: "0.0",
                otherFerm: "0.75",
                extract: "0.0",
                sugars: "0.0",
                rawFerm: "0.75",
                accidulatedMalt: "0.0",
                fruitFerm: "0.0",
                glutenFreeMalt: "0.0",
                pelletHops: "0.25",
                wholeHops: "0.0",
                plugHops: "0.0",
                attenRate: "77.0",

                flocculation: "high",
                method: "all_grain",
                containSpice: "no",
                containFinings: "no",
                containFlavors: "no",
                containHerbs: "no",
                containOther: "yes",
                containWater: "no",
                yeastType: "dry"
            });
        } else if (star === "four") {
            // four Star
            this.setState({
                abv: "5.58",
                ibu: "40.12",
                og: "0.042",
                fg: "0.042",
                boil: "70",
                efficiency: "79.0",
                totalFerm: "12.41",
                baseMalt: "11.5",
                crystalMalt: ".90875",
                roastedMalt: "0.0",
                otherFerm: "0.0",
                extract: "0.0",
                sugars: "0.0",
                rawFerm: "0.0",
                accidulatedMalt: "0.0",
                fruitFerm: "0.0",
                glutenFreeMalt: "0.0",
                pelletHops: "0.375",
                wholeHops: "0.0",
                plugHops: "0.0",
                attenRate: "81.0",

                flocculation: "medium",
                method: "all_grain",
                containSpice: "no",
                containFinings: "no",
                containFlavors: "no",
                containHerbs: "no",
                containOther: "yes",
                containWater: "no",
                yeastType: "dry"
            });
        } else if (star === "five") {
            // five Star
            this.setState({
                abv: "5.92",
                ibu: "38.66",
                og: "0.045",
                fg: "0.045",
                boil: "60",
                efficiency: "61.0",
                totalFerm: "13.5",
                baseMalt: "11.0",
                crystalMalt: "1.0",
                roastedMalt: "0.0",
                otherFerm: "0.75",
                extract: "0.0",
                sugars: "0.0",
                rawFerm: "0.0",
                accidulatedMalt: "0.0",
                fruitFerm: "0.0",
                glutenFreeMalt: "0.0",
                pelletHops: "0.25",
                wholeHops: "0.0",
                plugHops: "0.0",
                attenRate: "77.0",

                flocculation: "high",
                method: "all_grain",
                containSpice: "no",
                containFinings: "no",
                containFlavors: "no",
                containHerbs: "no",
                containOther: "yes",
                containWater: "no",
                yeastType: "dry"
            });
        }

    }

    getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    getRandomIntInclusive = (max) => {
        return Math.floor(Math.random() * (Math.floor(max) - 1));
    }

    // generates random values around the mean per feature
    generateRandomValues = () => {
        this.setState({
            abv: "" + Math.round(this.getRandomArbitrary(1, 20) * 100) / 100,
            ibu: "" + Math.round(this.getRandomArbitrary(10, 80) * 100) / 100,
            og: "" + Math.round(this.getRandomArbitrary(1.05, 1.08) * 100) / 100,
            fg: "" + Math.round(this.getRandomArbitrary(1.009, 1.02) * 100) / 100,
            boil: "" + Math.round(this.getRandomArbitrary(30, 90) * 100) / 100,
            efficiency: "" + Math.round(this.getRandomArbitrary(60, 70) * 100) / 100,
            totalFerm: "" + Math.round(this.getRandomArbitrary(5, 20) * 100) / 100,
            baseMalt: "" + Math.round(this.getRandomArbitrary(4, 20) * 100) / 100,
            crystalMalt: "0",
            roastedMalt: "0",
            otherFerm: "0",
            extract: "0",
            sugars: "0",
            rawFerm: "0",
            accidulatedMalt: "0",
            fruitFerm: "0",
            glutenFreeMalt: "0",
            pelletHops: "" + Math.round(this.getRandomArbitrary(3, 20) * 100) / 100,
            wholeHops: "0",
            plugHops: "0",
            attenRate: "" + Math.round(this.getRandomArbitrary(72, 83) * 100) / 100,
        });

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
                                <h1>Predictions</h1>
                            </Col>
                            <Col xs={12} md={6}>
                                <p className="jumbotron-para">
                                    Create a recipe for yourself - we'll give you a score. If you need help getting started we can initialize some key values for you.
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
                    <ButtonGroup bsSize="large" className="button-grouping">
                        <Button onClick={() => this.handleExampleButton("one")}>One Star Preset</Button>
                        <Button onClick={() => this.handleExampleButton("two")}>Two Star Preset</Button>
                        <Button onClick={() => this.handleExampleButton("three")}>Three Star Preset</Button>
                        <Button onClick={() => this.handleExampleButton("four")}>Four Star Preset</Button>
                        <Button onClick={() => this.handleExampleButton("five")}>Five Star Preset</Button>
                    </ButtonGroup>
                </ButtonToolbar>

                <ButtonToolbar className="forms-buttons">
                    <Button bsStyle="warning" bsSize="large" className="run-button" onClick={this.generateRandomValues} > Get Started </Button>
                    <Button bsStyle="primary" bsSize="large" className="run-button" onClick={this.handleButton} > Run </Button>
                </ButtonToolbar>

                {(this.state.predictedScore) &&
                    <Jumbotron>
                        <Grid>
                            <Row>
                                <Col xs={12} md={6}>
                                    <h1> {(this.state.predictedScore > 0) && <Glyphicon glyph="star" />}
                                        {(this.state.predictedScore > 1) && <Glyphicon glyph="star" />}
                                        {(this.state.predictedScore > 2) && <Glyphicon glyph="star" />}
                                        {(this.state.predictedScore > 3) && <Glyphicon glyph="star" />}
                                        {(this.state.predictedScore > 4) && <Glyphicon glyph="star" />}</h1>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p className="jumbotron-para rating-jumbo">
                                        {"Popularity rating of " + this.state.predictedScore + " out of 5!"}
                                    </p>
                                </Col>
                            </Row>
                        </Grid>
                    </Jumbotron>
                }
            </div>
        );
    }
}
