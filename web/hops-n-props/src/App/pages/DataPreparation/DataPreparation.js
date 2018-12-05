import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import './DataPreparation.css';

export class DataPreparation extends Component {

    render() {
        return(
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12}>
                            <h2>Data</h2>
                            <p>
                                We scraped all our data from brewersfriend.com, a website dedicated to sharing and
                                rating homebrew recipes. Anyone can add or vote on a recipe, and the available recipes
                                are not curated.
                            </p>
                            <h2>Scraping Techniques</h2>
                            <p>
                                Add data scraping techniques here later
                            </p>
                            <h2>Feature Abstraction and Engineering</h2>
                            <p>
                                The final structure of the dataframe varied in some ways from the data on Brewers Friend.
                                Many of the variables we wanted to train our model on were not readily quantifiable. In
                                order to represent this data, we addressed each recipe component in turn and came up
                                with a way to incorporate it into our dataframe.
                            </p>
                            <p>
                                The Fermentables section lists the many substances which make up the majority of the mash.
                                These substances provide the yeast with sugar, which it turns into ethanol, carbon dioxide,
                                and a number of other by-products. A typical fermentables section on Brewers Friend looks
                                like the following:
                            </p>
                            <img src={"./img/Fermentables.png"}/>
                            <p>
                                There were too many different ingredients to track all of them, but each ingredient had an associated type. We decided the best way to capture differences between recipe fermentables was to create a variable for each different type of fermentable, e.g. crystal malt, extract, and fruit. We then assigned the value of the combined weight of every fermentable in that category to the variable representing that category - if a recipe called for 2 lbs of Pale 2-Row and 3 lbs of White Wheat (both of which are base malts), the base malt variable for that row would be 5 lbs. By tracking the weight of fermentables in each category, we are able to look at the ratios between each fermentable category while getting rid of the substantial categorical bloat that would come from tracking each individual fermentable name.
                            </p>
                            <p>
                                The hops category contains pertinent information on alpha acids, hop use, and boil time, as well as which hops and how many to use. Hops lend a beer its bitterness and aroma, and are an important part of the final product. A typical Brewer’s friend hop section looks like the following:

                            </p>
                            <img src={"./img/Hops.png"}/>
                            <p>All of the hop statistics, such as AA’s, hop use, and boil time are are accounted for in a Beer’s IBU calculation. Because of this, we elected not to include them, and instead use IBUs in their place. We did, however, track the type of hop used (full, pellet, plug), because it could have an impact on the final beer quality. Hop type was tracked in the same manner as fermentables, using a different variable for each type measured in weight.
                            </p>
                            <p>The other ingredients section listed all the extra ingredients contained within the recipe, which varied by type. There are many different ingredient types and uses, and the section functions as a catch-all location to specify non-standard ingredients. A typical other ingredients section looks like the following:
                            </p>
                            <img src={"./img/Other-ingredients.png"}/>
                            <p>Instead of creating a categorical variable for each different ingredient, we made a new variable for each type of ingredient, and assigned it 1 or 0 depending on whether the recipe contained an ingredient of that type. If a recipe contained any amount of, say, spices, the spices variable read exactly 1. Notice that unlike fermentables and hops, these variables did not take into account the weight of ingredients in a certain category. This is due to the catch-all-nature of other ingredients. A single ounce of vanilla extract will have a much larger impact on the flavor of a beer than an ounce of ginger since it is a far stronger spice. Both of these would register as an ounce of spice, but mean different things. Therefore, we abstracted out amount, because it would only serve to confuse our model.</p>

                            <h2>Picking Features</h2>
                            <p>In addition to the features we engineered above, we also included a number of variables which were already readily available on the website. These and their descriptions are as follows:</p>
                            <ul>
                                <li>Rating value - the outcome we tried to predict</li>
                                <li>ABV - the alcohol by volume of the beer</li>
                                <li>IBU - International Bittering Units, a measure of hoppiness</li>
                                <li>Gravity difference - the difference between original and final gravity, an indicator of how much a beer has fermented</li>
                                <li>Method - the general workflow followed to make the beer, how “from scratch” the recipe is</li>
                                <li>Boil time - how long the beer is boiled for</li>
                                <li>Efficiency - beer mash extraction efficiency - extracting sugars from the grain during mash</li>
                                <li>Total weight of fermentables - total fermentables ingredient weight</li>
                                <li>Base malt weight - total weight of base malt fermentables</li>
                                <li>Crystal malt weight - total weight of crystal malt fermentables</li>
                                <li>Roasted malt weight - total weight of roasted malt fermentables</li>
                                <li>Other fermentables weight - total weight of other fermentables</li>
                                <li>Extract weight - total weight of extract fermentables</li>
                                <li>Sugar weight - total weight of sugar fermentables</li>
                                <li>Raw fermentables weight - total weight of raw fermentables</li>
                                <li> Acidulated malt weight - total weight of acidulated malt fermentables</li>
                                <li>Fruit fermentables weight - total weight of fruit fermentables</li>
                                <li> Gluten free malt weight - total weight of gluten free malt fermentables</li>
                                <li>Pellet hops weight - the weight of pellet hops used</li>
                                <li> Whole hops weight - the weight of whole hops used</li>
                                <li>Plug hops weight - the weight of plug hops used</li>
                                <li>Spice - whether the recipe contains added spices</li>
                                <li>Water agent - whether the recipe contains added water agents</li>
                                <li>Other - whether the recipe contains other (non-standard) ingredients</li>
                                <li>Fining - whether the recipe contains added finings</li>
                                <li>Flavor - whether the recipe contains added flavors</li>
                                <li>Herbs - whether the recipe contains added herbs</li>
                                <li> Yeast form - whether the yeast was liquid or dry</li>
                                <li>Attenuation - the attenuation rate of the yeast</li>
                                <li>Flocculation - the flocculation rate of the yeast</li>
                            </ul>

                            <h2>Dealing with NAs</h2>
                            <p>The first modification we made to our data was to drop every row without a rating. These could not be used to train our model, since they did not have an outcome, and were therefore useless to our analysis. We had about 2000 rows after this operation, and most of the NA’s had been eliminated. Excluding yeast information, each NA existed in a column we did not wish to keep in the final dataset (one that was not listed above). There were 12 rows containing NA’s for yeast information, so we dropped them from the dataset.
                            </p>
                            <h2>Outliers
                            </h2>

                        </Col>
                    </Row>
                </Grid>
            </div>

        )
    }
}