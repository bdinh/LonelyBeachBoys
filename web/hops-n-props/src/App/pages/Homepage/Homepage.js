import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import './Homepage.css';
import { TeamCard } from './components/TeamCard';

const team = [{ name: "Sam Otto", img: "./img/me_1.jpg", alt: "Sam standing by tree" }, { name: "Namam Mehra", img: "./img/namam.jpeg", alt: "Picture of team member Namam" }, { name: "Josiah Chapman", img: "./img/josiah.jpeg", alt: "Picture of team member Josiah" }, { name: "Bao Dinh", img: "./img/bao.JPG", alt: "Picture of team member Bao" }];

export class Homepage extends Component {

    render() {
        return (
            <div>
                <Jumbotron>
                    <Grid>
                        <Row>
                            <Col xs={12} md={6}>
                                <h1>Research Question</h1>
                            </Col>
                            <Col xs={12} md={6}>
                                <p className="jumbotron-para">
                                    Do quantifiable attributes of a homebrew recipe (such as fermentables, hop type, etc.) influence a beer’s popularity?
                                </p>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>

                <Grid>
                    <Row>
                        <Col xs={12}>
                            <h2>Background</h2>
                            <p className="normal-para">Homebrewing is a hobby that has been gaining traction recently - the activity has a long
                                and storied history, stretching back thousands of years, and is now embraced by people
                                in the lab and garage alike. There are many different approaches, starting points, and
                                strategies, but it all boils down to taking an unfermented grain derivative and turning
                                it into beer (as if, as was previously thought, by magic). As it turns out, this is a
                                rather complicated undertaking, and there are many communities devoted to figuring out
                                how to brew good beer. These communities can be found everywhere from the university,
                                to the dive bar, and the pursuit of brewing perfection pervades research papers as much
                                as online forums.
                            </p>
                            <p className="normal-para">Chemists seem especially drawn to brewing, since, unlike most industrial fermentation
                                processes designed to produce one thing in quantity which is then extracted and purified,
                                beer is itself both the process and the final product - all the byproducts are a part of
                                the beer (Gee & Ramirez, 1994). These chemists came up with a series of mathematical
                                models to predict the growth of yeast and existence of extra flavor compounds such as
                                fusel alcohols and esters in beer. Their models were far more rigorous than previous
                                attempts, and continue to be cited today. They are imperfect, however, and don’t account
                                for everything which can lead to off flavors - in fact, the science behind brewing good
                                beer is incomplete, and new discoveries continue to be made (Olaniran, Hiralal, Mokoena
                                & Pillay, 2017). The aforementioned necessity of by-products in beer and their tenuous
                                relationship with the pallet are responsible for this complexity. For example, according
                                to Olaniran et al. (2017), Isoamyl - which is a higher alcohol produced by yeast as part
                                of the brewing process - is a sought after compound in beer due to its “heavy” effect on
                                taste, but it leads to off flavors if it exceeds “20% of the total amount of n-propanol,
                                isobutyl alcohol and isoamyl alcohol.” Many such balancing acts exist within the brewing
                                process, and the difficulty they impart is exacerbated by the relatively few knobs and
                                dials a brewer has at their disposal.</p>
                            <p className="normal-para">
                                A brewer bears more resemblance to a zookeeper than a cook, as their most important job
                                is to keep the yeast happy, healthy, and entertained with the proper substances. Since
                                the yeast is doing all the real work - eating, excreting, and eventually lying dormant
                                at the bottom of a bottle (in this they bear a striking resemblance to the human race)
                                - and since the balance of what they produce and for how long can be impacted by just
                                about everything going on in the wort, every minor tweak to process or ingredient has a
                                cascading effect throughout the beer. Even measuring properties like off flavors is a
                                feat unknown to the bucket-brewer, requiring esoteric knowledge and equipment to even
                                attempt. Marsili et al. (2007) make note that “Beer contains dozens of odor active
                                chemical components in concentrations ranging from percent to parts-per-trillion (ppt)“
                                as they propose a new method of quantitatively measuring off flavors in beer. Because
                                the typical homebrewer cannot be expected to measure variation in compounds which are
                                described in ppt, or understand the inner workings of a polydimethylsiloxane extraction,
                                they are restricted to highly subjective qualitative analysis. Such analysis usually
                                takes the form of “this tastes good,” or “this tastes like the inside of a shoe,” which
                                is not especially useful except when taken in aggregate.
                            </p>
                            <p className="normal-para">
                                As mentioned previously, a brewer has at their fingertips a number of knobs and dials,
                                each of which has a multitude inscrutable, overlapping effects on the final product.
                                These include standardized parameters and measures of the brewing process (such as boil
                                time, original gravity (OG), final gravity (FG), chill method, pitch rate,
                                hopping method, etc.) as well as the ingredients (attenuation, flocculation,
                                yeast type, alpha acid units (AAU’s), hop type, etc.). We propose using these parameters
                                to create a model capable of predicting the final quality of a beer. In doing so we hope
                                to glean some insight into what aspects of the brewing process are most important to the
                                final quality. Since it is almost as difficult to quantitatively assess the quality of
                                the beer (which we define here as the absence of off flavors), we will be using
                                aggregate recipe ratings sourced from a popular homebrew website as our metric. In this
                                way we hope to predict beer quality based on features that a homebrewer has reasonable
                                control over, and provide a utility that they can use to get an idea of how good a
                                recipe might turn out before devoting the time and money required to brew it.
                            </p>
                        </Col>
                        <Col xs={12}>
                            <h2>Our Work</h2>
                            <p className="normal-para">Our work is documented within this <a href={"https://github.com/bdinh/LonelyBeachBoys"}>Github Repository</a>. Feel free to provide any
                                feedback or suggestions.</p>
                        </Col>
                        <Col xs={12}>
                            <h3>Sources</h3>
                            <p>Marsili, R. T., Laskonis, L. C., and Kenaan, C. (2007) Evaluation of PDMS-Based
                                Extraction Techniques and GC-TOFMS for the Analysis of Off-Flavor Chemicals in Beer,
                                Journal of the American Society of Brewing Chemists, 65:3, 129-137, DOI: 10.1094/ASBCJ-2007-0617-01
                            </p>
                            <p>
                                Olaniran, A. O., Hiralal, L., Mokoena, M. P., and Pillay, B. (2017) Flavour‐active
                                volatile compounds in beer: production, regulation and control. J. Inst. Brew.,
                                123: 13–23. doi: 10.1002/jib.389.
                            </p>
                            <p>
                                Gee, D. A. and Ramirez, W. F. (1994), A FLAVOUR MODEL FOR BEER FERMENTATION. Journal of
                                the Institute of Brewing, 100: 321-329. doi:10.1002/j.2050-0416.1994.tb00830.x
                            </p>
                        </Col>
                    </Row>
                </Grid>

                <div className="div-panel">
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <h1 className="panel-heading">Meet the Team</h1>
                            </Col>
                        </Row>
                        <Row>
                            {team.map((member, index) => { return <TeamCard key={"member" + index} member={member} /> })}
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

