import React, { Component } from 'react';
import './Results.css';
import { Col, Grid, Jumbotron, Row } from "react-bootstrap";

export class Results extends Component {

    render() {
        return (
            <div>
                <Jumbotron>
                    <Grid>
                        <Row>
                            <Col xs={12} md={6}>
                                <h1>Analysis & Conclusions</h1>
                            </Col>
                            <Col xs={12} md={6}>
                                <p className="jumbotron-para results-jumbo">
                                    What to take away from it all.
                                </p>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>

                <Grid>
                    <Row>
                        <Col xs={12}>
                            <h2>Results</h2>
                            <p className="normal-para">Initially we considered our rating value as a continuous variable since the ratings for
                                recipes were between 0 and 5 with an accuracy of two decimals. With that in mind we
                                decided to use generalized regression models. Since we had such a large dataset with
                                more than 30 features we decided to use SVR and Ridge regressions as well as a Neural
                                Network Regressor. We ran grid search on all of these models to select the best parameters
                                and fine tune the model. However, what resulted was pretty low scores across the board.
                            </p>
                            <p className="normal-para">Ridge regression gave us a score of 0.02% while SVR fit such a poor model that we received
                                a negative score. The Neural Net Regression yielded an accuracy of 3%, and our best models, random forest and XGBoost regressor, both got 10% accuracy.
                                The models explored in the course of our analysis can be found <a href="https://github.com/bdinh/LonelyBeachBoys/tree/master/models">here</a>.
                            </p>
                            <p className="normal-para">
                                We made the collective decision to transform our outcome variable into a categorical
                                variable. We rounded the rating value to the nearest fourth. For example, 4.14 would be
                                rounded to 4.25. This meant that we broke up the scale of 0 to 5 into 20 even categories.
                                All ratings would fall under one of these bins.
                            </p>
                            <p className="normal-para">
                                Once this was done, we decided to use classifier models to try to predict the category
                                the ratings belonged in, instead of a continuous number. We used a KNN classifier, which
                                resulted in a 53.05% score, which was a massive improvement, and led us to our final model.
                            </p>
                            <img src={"./img/model-bar.jpeg"} />
                        </Col>

                        <Col xs={12}>
                            <h2>The Model</h2>
                            <p className="normal-para">Our final model was a Neural Network Classifier, which achieved a 58.54% accuracy using
                                the following hyperparameters:</p>
                            <ul>
                                <li className="normal-para"><b>Hidden_layer_sizes</b>: 100</li>
                                <li className="normal-para"><b>Activation</b>: relu</li>
                                <li className="normal-para"><b>Solver</b>: adam</li>
                                <li className="normal-para"><b>Alpha</b>: 0.001</li>
                                <li className="normal-para"><b>Learning_rate</b>: constant</li>
                                <li className="normal-para"><b>Random_state</b>: 42</li>
                                <li className="normal-para"><b>Beta_1</b>: 0.07</li>
                                <li className="normal-para"><b>Beta_2</b>: 0.999</li>
                                <li className="normal-para"><b>Early_stopping</b>: False</li>
                            </ul>
                            <p className="normal-para">
                                We trained the model using a 25% test-train-split, and split the training data into 10 different folds for cross-validation. All data was normalized
                                using a min-max scaler prior to being fed through the model.
                            </p>
                            <p className="normal-para">
                                We had a 60.50% score in the beginning, but after investigating the results we realized the model was only ever predicting 5.0, regardless of features.
                                This was due to the prevalence of high scores in our outcomes, so we changed the activation from logistic to relu, and increased hidden layer size from
                                10 to 100. After these changes our predictive score went down 2%, but we were predicting a much broader spectrum of scores, so we elected to use this model.
                            </p>
                        </Col>

                        <Col xs={12}>
                            <h2>Final Thoughs</h2>
                            <p className="normal-para">
                                Even though a neural net is something of a black box when it comes to determining which features had an impact on the score, we can say with 
                                confidence that the quantifiable features of a homebrew recipe have a measurable effect on a beer’s popularity. The 58.54% accuracy we
                                arrived at is not ideal, but it’s more accurate than a coin flip, and allows us to put some confidence in the model. Using our Neural Net, we set up an
                                interactive app which returns an expected popularity based on the parameters it’s passed. It can be used to gain a rough idea of how good a recipe is before
                                time and money are spent to brew it. Even though it cannot provide recommendations on how the beer could be improved, the score it returns can still be used
                                as an indicator of whether the recipe is good as is, or if it should be improved. Thus, the answer to our research question, <b>"Do quantifiable attributes of 
                                a homebrew recipe (such as fermentables, hop type, etc.) influence a beer’s popularity?"</b>, is a tentative <b>"yes"</b>. 
                            </p>
                            <p className="normal-para">
                                That said, the predictive model proves itself to be overfit to the data. As is the nature of nerual networks, this is fundamentally a problem of too little data - a problem that
                                in this situation is very difficult to overcome. Scraping <a href="https://www.brewersfriend.com/">brewersfriend.com</a> for recipes provided us an incredible 100,000
                                rows, however only about 2,000 of them had actual ratings associated with them. Among these rated recipes, the distribution of ratings was very high - the large majority of ratings
                                being 4 or 5 stars. This uneven distribution means that our neural network simply does not have enough 1, 2, and 3 star recipes to accuraley train on. Further, the complexity and time
                                required to test homebrew recipes and provide ratings for ourselves is prohibitivley high. Expanding and improving upon this model would likely require creatively scraping and combining 
                                ratings from other sites, or simply waiting for more recipes to be rated over time. 
                            </p>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}