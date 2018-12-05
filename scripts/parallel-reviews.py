from bs4 import BeautifulSoup as bs
import requests as r
import re
import json
import csv
import sys
sys.path.append("./scripts")
import warnings
warnings.filterwarnings('ignore')
import scrapebrew as sb
import pandas as pd
from multiprocessing import Pool

fermentables = pd.read_csv("./data/raw/fermentables.csv", keep_default_na=False)
fermentables_dict = dict(zip(fermentables["name"], fermentables["type"]))
yeast_dict = {}
fermentables_countries = fermentables.country.unique()

beer_recipes = pd.read_csv("./data/raw/all_recipes.csv", keep_default_na=False)
titles = beer_recipes.title_url.loc

def crawl(url):
    print(url)

    page = r.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    soup = bs(page.content, "html.parser")
    brewpart_divs  = soup.findAll("div", {"class": "brewpart"})
    brewpart_review_div = brewpart_divs[len(brewpart_divs) - 1]
    brewpart_review_tables = brewpart_review_div.find("table").find("td").findAll("table")
    reviews = []

    if (len(brewpart_review_tables) != 0):
        for i in range(len(brewpart_review_tables)):
            review = {}

            review["title_url"] = url

            review_tds = brewpart_review_tables[i].findAll("td")
            if len(review_tds) != 0:
                review_td = review_tds[len(review_tds) - 1]

            reviewer_url = "N/A"
            reviewer_name = "N/A"
            if (review_td.find("a") != None):
                reviewer_url = review_td.find("a")["href"]
                reviewer_name = review_td.find("a").text
            else:
                reviewer_name = review_td.find("font").text

            review["reviewer_url"] = reviewer_url
            review["reviewer_name"] = reviewer_name

            review_fonts = review_td.findAll("font")
            review_td_datetime = review_fonts[1].text.split("at")
            review_date = review_td_datetime[0].replace("•", "").strip()
            review["reviewer_date"] = review_date

            review_time = review_td_datetime[1].strip()
            review["reviewer_time"] = review_time

            review_description = "N/A"
            if (review_fonts[len(review_fonts) - 1] != None):
                review_description = review_fonts[len(review_fonts) - 1].text.strip()
            review["review_description"] = review_description

            review_rating = "N/A"
            review_rating_span = brewpart_review_tables[i].find("span", {"class": "blue"})
            if (review_rating_span != None):
                review_rating = review_rating_span.text.replace("of 5", "").strip()
            review["review_rating"] = review_rating

            reviews.append(review)
    return reviews


with Pool(12) as p:
    records = p.map(crawl, titles)

name = "new_brewer_review_all.csv"

with open("data/raw/" + name, mode='a', encoding='utf-8') as csv_file:
    field_names = ["title_url", "reviewer_url", "reviewer_name", "review_description",
                   "review_rating", "reviewer_date", "reviewer_time"]
    writer = csv.DictWriter(csv_file, fieldnames=field_names)
    writer.writeheader()
    for row in reviews_list:
        writer.writerow(row)