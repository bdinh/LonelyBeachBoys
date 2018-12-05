# INFO 370 Project Proposal
#### Sam Otto, Bao Dinh, Naman Mehra, Josiah Chapman

## Project Description

### Final Resource

You can view our final project resource [here](https://bdinh.github.io/LonelyBeachBoys/#/)! Enjoy :)

### Overview

[Homebrewing](https://en.wikipedia.org/wiki/Homebrewing) is a hobby that has been gaining traction recently - the activity has a long and storied history, stretching back thousands of years, and is now embraced by people in the lab and garage alike. There are many different approaches, starting points, and strategies, but it all boils down to taking an unfermented grain derivative and turning it into beer (as if, as was previously thought, by magic). As it turns out, this is a rather complicated undertaking, and there are many communities devoted to figuring out how to brew good beer. These communities can be found everywhere from the university, to the dive bar, and the pursuit of brewing perfection pervades research papers as much as online forums.

Chemists seem especially drawn to brewing, since, unlike most industrial fermentation processes designed to produce one thing in quantity which is then extracted and purified, beer is itself both the process and the final product - all the byproducts are a part of the beer (Gee & Ramirez, 1994). These chemists came up with a series of mathematical models to predict the growth of yeast and existence of extra flavor compounds such as fusel alcohols and esters in beer. Their models were far more rigorous than previous attempts, and continue to be cited today. They are imperfect, however, and don’t account for everything which can lead to off flavors - in fact, the science behind brewing good beer is incomplete, and new discoveries continue to be made (Olaniran, Hiralal, Mokoena & Pillay, 2017). The aforementioned necessity of by-products in beer and their tenuous relationship with the pallet are responsible for this complexity. For example, according to Olaniran et al. (2017), Isoamyl - which is a higher alcohol produced by yeast as part of the brewing process - is a sought after compound in beer due to its “heavy” effect on taste, but it leads to off flavors if it exceeds “20% of the total amount of n-propanol, isobutyl alcohol and isoamyl alcohol.” Many such balancing acts exist within the brewing process, and the difficulty they impart is exacerbated by the relatively few knobs and dials a brewer has at their disposal.

A brewer bears more resemblance to a zookeeper than a cook, as their most important job is to keep the yeast happy, healthy, and entertained with the proper substances. Since the yeast is doing all the real work - eating, excreting, and eventually lying dormant at the bottom of a bottle (in this they bear a striking resemblance to the human race) - and since the balance of what they produce and for how long can be impacted by just about everything going on in the wort, every minor tweak to process or ingredient has a cascading effect throughout the beer. Even measuring properties like off flavors is a feat unknown to the bucket-brewer, requiring esoteric knowledge and equipment to even attempt. Marsili et al. (2007) make note that “Beer contains dozens of odor active chemical components in concentrations ranging from percent to parts-per-trillion (ppt)“ as they propose a new method of quantitatively measuring off flavors in beer. Because the typical homebrewer cannot be expected to measure variation in compounds which are described in ppt, or understand the inner workings of a polydimethylsiloxane extraction, they are restricted to highly subjective qualitative analysis. Such analysis usually takes the form of “this tastes good,” or “this tastes like the inside of a shoe,” which is not especially useful except when taken in aggregate.

As mentioned previously, a brewer has at their fingertips a number of knobs and dials, each of which has a multitude inscrutable, overlapping effects on the final product. These include standardized parameters and measures of the brewing process (such as boil time, original gravity (OG), final gravity (FG), chill method, pitch rate, hopping method, etc.) as well as the ingredients (attenuation, flocculation, yeast type, alpha acid units (AAU’s), hop type, etc.). We propose using these parameters to create a model capable of predicting the final quality of a beer. In doing so we hope to glean some insight into what aspects of the brewing process are most important to the final quality. Since it is almost as difficult to quantitatively assess the quality of the beer (which we define here as the absence of off flavors), we will be using aggregate recipe ratings sourced from a popular homebrew website as our metric. In this way we hope to predict beer quality based on features that a homebrewer has reasonable control over, and provide a utility that they can use to get an idea of how good a recipe might turn out before devoting the time and money required to brew it.

Marsili, R. T., Laskonis, L. C., and Kenaan, C. (2007) Evaluation of PDMS-Based Extraction Techniques and GC-TOFMS for the Analysis of Off-Flavor Chemicals in Beer, Journal of the American Society of Brewing Chemists, 65:3, 129-137, DOI: 10.1094/ASBCJ-2007-0617-01

Olaniran, A. O., Hiralal, L., Mokoena, M. P., and Pillay, B. (2017) Flavour‐active volatile compounds in beer: production, regulation and control. J. Inst. Brew., 123: 13–23. doi: 10.1002/jib.389.

Gee, D. A. and Ramirez, W. F. (1994), A FLAVOUR MODEL FOR BEER FERMENTATION. Journal of the Institute of Brewing, 100: 321-329. doi:10.1002/j.2050-0416.1994.tb00830.x

### Hypothesis

There exists some statistically significant correlation between the ingredients, processes, and features used in the home-brewing process and aggregate ratings.

### Dataset

We are going to use an open dataset found on kaggle.com. The link to the dataset is [here](https://www.kaggle.com/jtrofe/beer-recipes). The dataset includes 75,000 home-brewed beers recipes. There are more than 176 styles and the recipes are reported by users on the [this website.](https://www.brewersfriend.com/) There is a lot of metadata on each home-brewed beer but the most important features are the original and final gravity, ABV, IBU and the color of the beer. There is lots of other information that we might or might not use when we perform our analysis based on if they add value to our model.
Furthermore, we intend on using the aggregate user ratings of these beers and this data is not part of the .csv given to us from Kaggle. Therefore, we will use scripts to scrape the Brewers Friend website to gather the ratings for the beer and recipes that have them.

### Methods

To explore our data and see if there are correlations between certain features and the ratings of beers we will use **linear and generalized linear models** to explore the dataset. Once we have done enough exploration we will use Machine Learning methods, specifically, **decision trees, boosted decision trees, and random forests** to create predictive models. We will use these models to see if we can use certain features of the homebrewing recipes to predict the ratings of beers. Since we have aggregate rating data, we will use **supervised learning** to build and train the models.

### Audience

Our target audience will consist primarily of individuals who are interested in brewing or learning about homemade beer. This consists of individuals from a range of brewing experiences, new or experienced.

In terms of what our target audience may learn from our resource, we plan on building a model that will primarily map the correlation between ingredients, processes, and features to that of a subjective satisfaction rating so that potential brewers may gauge the quality of a recipe prior to brewing it (or at least gauge the potential popularity of a recipe). Examples of questions they may ask are as follows:

- What types of ingredients tend to correlate to higher/lower ratings? Is this consistent across different brewing methods?
- Of the available processes included in brewing, what are the general relationships between these processes and the overall quality of a beer?


## Technical Approach

### Format

The format of the final web resource will be HTML with code compiled through Jupyter Notebook. We will further develop a connected HTML web client to allow potential users to input their recipe and receive a potential rating for that brew.

### Data Challenges

The data for the project will be scraped from the www.brewersfriend.com website for all the homebrewing data and joined with the Kaggle dataset. The primary challenge in this dataset will likely be in the weighting of scores for each recipe. Many recipes will have high or low scores based on few reviews. These scores are not as significant to our predictive model as the scores for recipes that are based on many reviews. One data collection challenge will be in identifying the number of reviews for each recipe, while one data management challenge will be in identifying the correct weights for recipes based on their number of reviews.

### Skills to Develop

Since we intend on using **Boosted Decision Trees Regression** we will have to understand and learn what Scikit Learn is doing behind the scene. This will help us better train our models and make them more accurate. Along with that we want to learn and gain a deeper understand on supervised learning and folds so we can break up our train dataset to the right degree.

Also, two of our team members know how to scrape websites for data using Python so they will compile that information. However, the other two members will understand the scripts being run as to stay in the loop.

### Conducting Analysis

As of now, we plan to do a general exploratory data analysis with our dataset to better understand some of the nuances within it. This will include the step of scraping extensive amounts of review data from the web and formatting it into the dataset to allow for accurate (and weighted) supervised learning. Part of the exploratory analysis will include the use of **linear and generalized linear models** in order to access relationships within our data. We plan on using **decision trees, boosted decision trees, and random forests** to create the predictive models, likely relying on a calculated entropy index for feature selection. In doing so, we will need to further investigate the underlying details of these regression methods and how it pertains to modeling our our relationships.

### Major Challenges

As explored above, the primary challenge will be scraping the relevant data from the website. The potential size of the dataset will increase the computational times for creating and testing the model, which will also be a challenge. Next will be creating an accurate calculation for our outcome variable weights so that our supervised learning is as accurate as possible. The final challenge is determining which of the models, between decision trees, boosted decision trees, random forests, or potentially any other unforeseen models will yield the best predictive results.
