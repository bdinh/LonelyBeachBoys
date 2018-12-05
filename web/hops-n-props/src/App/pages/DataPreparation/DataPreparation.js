import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import './DataPreparation.css';

export class DataPreparation extends Component {

    render() {
        return (
            <div>
                <Jumbotron>
                    <Grid>
                        <Row>
                            <Col xs={12} md={6}>
                                <h1>Collection, Preparation, & Exploration</h1>
                            </Col>
                            <Col xs={12} md={6}>
                                <p className="jumbotron-para" id="data-prep-jumbo">
                                    Find out where everything came from, and what it all means.
                                </p>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <h2>Data</h2>
                            <p className="normal-para">
                                We scraped all our data from <a href="https://www.brewersfriend.com/">brewersfriend.com</a>, a website dedicated to sharing and
                                rating homebrew recipes. Anyone can add or vote on a recipe, and the available recipes
                                are not curated.
                            </p>
                            <h2>Scraping Techniques</h2>
                            <p className="normal-para">
                                When it came to collecting our data, we had to scrape 5000+ pages of beer recipes
                                formatted in HTML tables. Each page had 20 beer recipes, which resulting in over
                                100,000 beer recipes that needed to be scrapped. The following is an example of a
                                beer recipe (expanded/not expanded) on Brewers Friend.
                            </p>
                            <img src={"./img/bf_beer_recipe_example.png"} />
                            <p className="normal-para">
                                In order to gather sufficient information (beer ratings, ingredients used, etc) for
                                each beer recipe, we had to scrape a detailed page of that recipe. This resulted in
                                over 100,000 requests. Our first attempt at this was just to iterate through a list
                                of links in order to scrape the information on that page. This soon proved to be
                                cumbersome as the variance in HTML formatting resulted in unhandled edge cases that
                                would interrupt our process. You can imagine how frustrating this can be when we’ve
                                iterated over a couple thousand links, just to have it error out. After carefully
                                revisiting our script to ensure that we accounted for all cases (at least tried to),
                                we still had the issue of long wait times (~16 hours to scrape 100,000+ links). This
                                was not scalable and restricted us from actually being able to explore our data in attempt
                                to capture some relationship. As a result, we had to utilize multiprocessing in order
                                to scrape on separate processes. This proved to be effective as it shaved down our
                                overall scraping time by a factor of 5 (~3 hours to scrape 100,000+ links).
                            </p>
                            <h2>Feature Abstraction and Engineering</h2>
                            <p className="normal-para">
                                The final structure of the dataframe varied in some ways from the data on Brewers Friend.
                                Many of the variables we wanted to train our model on were not readily quantifiable. In
                                order to represent this data, we addressed each recipe component in turn and came up
                                with a way to incorporate it into our dataframe.
                            </p>
                            <p className="normal-para">
                                The Fermentables section lists the many substances which make up the majority of the mash.
                                These substances provide the yeast with sugar, which it turns into ethanol, carbon dioxide,
                                and a number of other by-products. A typical fermentables section on Brewers Friend looks
                                like the following:
                            </p>
                            <img src={"./img/Fermentables.png"} />
                            <p className="normal-para">
                                There were too many different ingredients to track all of them, but each ingredient had
                                an associated type. We decided the best way to capture differences between recipe
                                fermentables was to create a variable for each different type of fermentable, e.g.
                                crystal malt, extract, and fruit. We then assigned the value of the combined weight of
                                every fermentable in that category to the variable representing that category - if a
                                recipe called for 2 lbs of Pale 2-Row and 3 lbs of White Wheat (both of which are base malts),
                                the base malt variable for that row would be 5 lbs. By tracking the weight of fermentables
                                in each category, we are able to look at the ratios between each fermentable category
                                while getting rid of the substantial categorical bloat that would come from tracking
                                each individual fermentable name.
                            </p>
                            <p className="normal-para">
                                The hops category contains pertinent information on alpha acids, hop use, and boil time,
                                as well as which hops and how many to use. Hops lend a beer its bitterness and aroma, and
                                are an important part of the final product. A typical Brewer’s friend hop section looks
                                like the following:
                            </p>
                            <img src={"./img/Hops.png"} />
                            <p className="normal-para">All of the hop statistics, such as AA’s, hop use, and boil time are are accounted for in
                                a Beer’s IBU calculation. Because of this, we elected not to include them, and instead
                                use IBUs in their place. We did, however, track the type of hop used (full, pellet, plug),
                                because it could have an impact on the final beer quality. Hop type was tracked in the
                                same manner as fermentables, using a different variable for each type measured in weight.
                            </p>
                            <p className="normal-para">The other ingredients section listed all the extra ingredients contained within the recipe,
                                which varied by type. There are many different ingredient types and uses, and the section
                                functions as a catch-all location to specify non-standard ingredients. A typical other
                                ingredients section looks like the following:
                            </p>
                            <img src={"./img/Other-ingredients.png"} />
                            <p className="normal-para">Instead of creating a categorical variable for each different ingredient, we made a
                                new variable for each type of ingredient, and assigned it 1 or 0 depending on whether
                                the recipe contained an ingredient of that type. If a recipe contained any amount of,
                                say, spices, the spices variable read exactly 1. Notice that unlike fermentables and hops,
                                these variables did not take into account the weight of ingredients in a certain category.
                                This is due to the catch-all-nature of other ingredients. A single ounce of vanilla extract
                                will have a much larger impact on the flavor of a beer than an ounce of ginger since it is
                                a far stronger spice. Both of these would register as an ounce of spice, but mean different
                                things. Therefore, we abstracted out amount, because it would only serve to confuse our model.</p>

                            <h2>Picking Features</h2>
                            <p className="normal-para">In addition to the features we engineered above, we also included a number of variables
                                which were already readily available on the website. These and their descriptions are as follows:</p>
                            <ul>
                                <li className="normal-para"><b>Rating value</b> - the outcome we tried to predict</li>
                                <li className="normal-para"><b>ABV</b> - the alcohol by volume of the beer</li>
                                <li className="normal-para"><b>IBU</b> - International Bittering Units, a measure of hoppiness</li>
                                <li className="normal-para"><b>Gravity difference</b> - the difference between original and final gravity, an indicator of
                                    how much a beer has fermented</li>
                                <li className="normal-para"><b>Method</b> - the general workflow followed to make the beer, how “from scratch” the recipe is</li>
                                <li className="normal-para"><b>Boil time</b> - how long the beer is boiled for</li>
                                <li className="normal-para"><b>Efficiency</b> - beer mash extraction efficiency - extracting sugars from the grain during mash</li>
                                <li className="normal-para"><b>Total weight of fermentables</b> - total fermentables ingredient weight</li>
                                <li className="normal-para"><b>Base malt weight</b> - total weight of base malt fermentables</li>
                                <li className="normal-para"><b>Crystal malt weight</b> - total weight of crystal malt fermentables</li>
                                <li className="normal-para"><b>Roasted malt weight</b> - total weight of roasted malt fermentables</li>
                                <li className="normal-para"><b>Other fermentables weight</b> - total weight of other fermentables</li>
                                <li className="normal-para"><b>Extract weight</b> - total weight of extract fermentables</li>
                                <li className="normal-para"><b>Sugar weight</b> - total weight of sugar fermentables</li>
                                <li className="normal-para"><b>Raw fermentables weight</b> - total weight of raw fermentables</li>
                                <li className="normal-para"><b>Acidulated malt weight</b> - total weight of acidulated malt fermentables</li>
                                <li className="normal-para"><b>Fruit fermentables weight</b> - total weight of fruit fermentables</li>
                                <li className="normal-para"><b>Gluten free malt weight</b> - total weight of gluten free malt fermentables</li>
                                <li className="normal-para"><b>Pellet hops weight</b> - the weight of pellet hops used</li>
                                <li className="normal-para"><b>Whole hops weight</b> - the weight of whole hops used</li>
                                <li className="normal-para"><b>Plug hops weight</b> - the weight of plug hops used</li>
                                <li className="normal-para"><b>Spice</b> - whether the recipe contains added spices</li>
                                <li className="normal-para"><b>Water agent</b> - whether the recipe contains added water agents</li>
                                <li className="normal-para"><b>Other</b> - whether the recipe contains other (non-standard) ingredients</li>
                                <li className="normal-para"><b>Fining</b> - whether the recipe contains added finings</li>
                                <li className="normal-para"><b>Flavor</b> - whether the recipe contains added flavors</li>
                                <li className="normal-para"><b>Herbs</b> - whether the recipe contains added herbs</li>
                                <li className="normal-para"><b>Yeast form</b> - whether the yeast was liquid or dry</li>
                                <li className="normal-para"><b>Attenuation</b> - the attenuation rate of the yeast</li>
                                <li className="normal-para"><b>Flocculation</b> - the flocculation rate of the yeast</li>
                            </ul>
                            <h2>Dealing with NAs</h2>
                            <p className="normal-para">The first modification we made to our data was to drop every row without a rating.
                                These could not be used to train our model, since they did not have an outcome,
                                and were therefore useless to our analysis. We had about 2000 rows after this operation,
                                and most of the NA’s had been eliminated. Excluding yeast information, each NA existed
                                in a column we did not wish to keep in the final dataset (one that was not listed above).
                                There were 12 rows containing NA’s for yeast information, so we dropped them from the dataset.
                            </p>
                            <h2>Trends
                            </h2>
                            <p className="normal-para"> To find if certain features were more related to helping predict rating values we
                                ran a pearson correlation between rating values and all the other features. What we
                                discovered was that there was some correlation between certain attributes and rating
                                values but not too much. Ferm_type_fruit had an R^2 of 0.111 and other_type_fining had
                                an R^2 of 0.109. Therefore, we made sure to include these and a few other features to
                                build our model before refining it.
                            </p>
                            <img src={"./img/pairplot.jpeg"} />
                            <h2>Outliers</h2>
                            <p className="normal-para">The data that we are using for this project was scraped from a website where all the
                                requirements to submit a recipe or data is making an account. This fact along with
                                the fact that there are more than 100,000 data points, there is bound to be a lack of
                                data integrity. For example, the average IBU for all recipes is 34.76, however the
                                largest data point is 3583.81 and the average OG for all recipes is 1.057, however
                                the largest data point is 50.02. This would skew our predictive model a lot if we
                                included all these outlying data points. To account for this the first thing we did
                                was remove all the rows without a rating value. This helped reduce many outliers since
                                recipes that were made with extreme amounts of a certain attribute or produced a severe
                                outlier were probably never made or rated by other users.
                            </p>
                            <p className="normal-para"><b>Before:</b></p>
                            <img src={"./img/BeforeNA.jpeg"} />
                            <p className="normal-para"><b>After:</b></p>
                            <img src={"./img/AfterNA.jpeg"} />
                            <h2>The Outcome</h2>
                            <p className="normal-para">Our outcome of interest was the aggregate rating for a given recipe. This rating was derived from the average of all reviews submitted for a given beer. The overall review was continuous (rounded to two decimal places), but each individual review was categorical, being one of 1, 2, 3, 4, or 5 stars. Because of this, we decided to use a classifier to predict results instead of a regressor. In order to classify our outcome, we rounded each review score to the nearest 0.25 increment. This allowed us to achieve a middle ground between the categorical nature of the individual reviews, and the continuous nature of the aggregate.</p>
                            <img src={"./img/rating_dist.jpeg"} />
                            <h2>Our Work</h2>
                            <p className="normal-para">For further exploration, the code for our web scraper can be found <a href="https://github.com/bdinh/LonelyBeachBoys/blob/master/brewscraper.ipynb">here</a>. Assorted scripts are in <a href="https://github.com/bdinh/LonelyBeachBoys/tree/master/scripts">this</a> folder. Finally, the fully prepared data can be found <a href="https://github.com/bdinh/LonelyBeachBoys/tree/master/data/prepped">here</a>, while raw data can be found <a href="https://github.com/bdinh/LonelyBeachBoys/tree/master/data/raw">here</a>. </p>
                        </Col>
                    </Row>
                </Grid>
            </div>

        )
    }
}