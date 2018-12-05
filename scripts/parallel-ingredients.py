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
    result = {}
    page = r.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    soup = bs(page.content, "html.parser")

    result["mash_ph"] = "n/a"
    mash_ph = soup.find("div", {"class": "phMin"})
    if (mash_ph != None):
        result["mash_ph"] = mash_ph.text.strip()

    result["title_url"] = url
    rating_div = soup.find("div", {"class": "reviews"})
    rating_value = "N/A"
    rating_count = 0
    if (rating_div != None):
        rating_value = rating_div.find("span", {"itemprop": "ratingValue"}).text.strip()
        rating_count = rating_div.find("span", {"itemprop": "reviewCount"}).text.strip()
    result["rating_value"] = rating_value
    result["rating_count"] = rating_count
    result["view_count"] = 0
    view_count_div = soup.find("div", {"class": "lastupdated"})
    if (view_count_div != None):
        view_count_bold = view_count_div.findAll("b")
        if (len(view_count_bold) != 0):
            view_count = view_count_bold[0].text.replace("View Count: ", "").strip()
            result["view_count"] = view_count
    
    # Fermentables
    fermentables_div = soup.find("div", {"id": "fermentables"})
    result["ferm_total_weight"] = 0
    result["ferm_type_base_malt"] = 0
    result["ferm_type_crystal_malt"] = 0
    result["ferm_type_roasted_malt"] = 0
    result["ferm_type_extract"] = 0
    result["ferm_type_sugar"] = 0
    result["ferm_type_raw"] = 0
    result["ferm_type_acidulated_malt"] = 0
    result["ferm_type_fruit"] = 0
    result["ferm_type_gluten_free_malt"] = 0
    result["ferm_type_other"] = 0

    
    if (fermentables_div != None):
        fermentables_tr = fermentables_div.findAll("tr")
        ferm_total_weight_bold = fermentables_div.findAll("tr")[len(fermentables_div.findAll("tr")) - 1].find("b")
        if (ferm_total_weight_bold != None):
            result["ferm_total_weight"] = convert_to_lb(ferm_total_weight_bold.text)
        for i in range(1, len(fermentables_tr) - 1):
            ferm_amount = convert_to_lb(fermentables_tr[i].find("span").text)
            ferm_key_anchor = fermentables_tr[i].find("a")
            if (ferm_key_anchor != None):
                ferm_key = extract_fermentable_key(fermentables_tr[i].find("a").text).strip()
                if (ferm_key in fermentables_dict):
                    ferm_type_key = fermentables_dict[ferm_key].lower().replace("-", "_").replace(" ", "_").strip()
                    result["ferm_type_" + ferm_type_key] += float(ferm_amount)
    
    # Hops
    hops_div = soup.find("div", {"id": "hops"})
    result["hops_type_pellet"] = 0
    result["hops_type_leaf_whole"] = 0
    result["hops_type_plug"] = 0
#     result["hops_type_fresh"] = 0
    if (hops_div != None):
        hops_table = hops_div.find("table")
        hops_tr = hops_table.findAll("tr")
        for i in range(1, len(hops_tr)):
            hops_td = hops_tr[i].findAll("td")
            hops_amount = convert_to_lb(hops_td[0].find("span").text)
            hops_type = hops_td[2].text.lower().replace("/", "_").strip()
            if (hops_type in ["pellet", "leaf_whole", "plug"]):
                result["hops_type_" + hops_type] += float(hops_amount)
    
    # Other Ingredients
    others_div = soup.find("div", {"id": "others"})
    result["other_type_spice"] = 0
    result["other_type_water_agt"] = 0
    result["other_type_other"] = 0
    result["other_type_fining"] = 0
    result["other_type_flavor"] = 0
    result["other_type_herb"] = 0
    
    if (others_div != None):
        other_table = others_div.find("table")
        other_tr = other_table.findAll("tr")
        
        for i in range(1, len(other_tr)):
            other_td = other_tr[i].findAll("td")
            other_type = other_td[2].text.lower().replace(" ", "_").strip()
            result["other_type_" + other_type] = 1
        
    # Yeast
    yeasts_div = soup.find("div", {"id": "yeasts"})
    result["yeast_amount"] = 0 
    result["yeast_starter"] = "N/A" 
    result["yeast_name"] = "N/A"
    result["yeast_type"] = "N/A"
    result["yeast_form"] = "N/A"
    result["yeast_laboratory"] = "N/A"
    result["yeast_attenuation"] = "N/A"
    result["yeast_flocculation"] = "N/A"
    
    if (yeasts_div != None):
        if (yeasts_div.find("table") != None):
            yeast_tr = yeasts_div.find("table").findAll("tr")

            # Yeast Amount
            yeast_amount = yeast_tr[1].find("td", {"colspan": "3"}).text.strip() 
            result["yeast_amount"] = yeast_amount 

            # Yeast Starter
            yeast_starter = yeast_tr[1].findAll("td")[10].text.strip()
            result["yeast_starter"] = yeast_starter 

            # Yeast Type, Dry, Flocculation, Laboratory, Attenuation
            yeast_name_div = yeasts_div.find("div", {"class": "yeastname"})
            yeast_url = "https://www.brewersfriend.com" + yeast_name_div.find("a")["href"].strip()
            yeast_key = yeast_name_div.text.strip()
            if (yeast_key not in yeast_dict):
                yeast_result = scrape_yeast_url(yeast_url)
                yeast_dict[yeast_key] = yeast_result
            yeast_values = yeast_dict[yeast_key]

            result["yeast_name"] = yeast_values["name"]
            result["yeast_type"] = yeast_values["type"]
            result["yeast_form"] = yeast_values["form"]
            result["yeast_laboratory"] = yeast_values["laboratory"]
            result["yeast_attenuation"] = yeast_values["attenuation"]
            result["yeast_flocculation"] = yeast_values["flocculation"]
            
    # Water
    water_div = soup.find("div", {"id": "water"})
    result["water_ca+2"] = 0
    result["water_mg+2"] = 0
    result["water_na+"] = 0
    result["water_cl-"] = 0
    result["water_so4-2"] = 0
    result["water_hco3-"] = 0
    
    if (water_div != None):
        water_table = water_div.find("table")
        water_tr = water_table.findAll("tr")[1]
        water_td = water_tr.findAll("td")
        result["water_ca+2"] = water_td[0].text.strip()
        result["water_mg+2"] = water_td[1].text.strip()
        result["water_na+"] = water_td[2].text.strip()
        result["water_cl-"] = water_td[3].text.strip()
        result["water_so4-2"] = water_td[4].text.strip()
        result["water_hco3-"] = water_td[5].text.strip()
        
    return result

def convert_to_lb(weight):
    weight_split = weight.split(" ")
    if (weight_split[len(weight_split) - 1] == "oz"):
        return float(weight_split[0]) * 0.0625
    elif (weight_split[len(weight_split) - 1] == "g"):
        return float(weight_split[0]) * 0.00220462
    elif (weight_split[len(weight_split) - 1] == "kg"):
        return float(weight_split[0]) * 2.20462
    return float(weight_split[0])

def extract_fermentable_key(fermentable_name):
    split = fermentable_name.split("-", 1)
    prefix = split[0].strip()
    if prefix not in fermentables_countries:
        return fermentable_name
    return split[len(split) - 1].strip()

def scrape_yeast_url(yeast_url):
    page = r.get(yeast_url, headers={'User-Agent':'Mozilla/5.0'})
    soup = bs(page.content, "html.parser")
    
    yeast_meta_div = soup.findAll("div", {"class": "metadata-item"})
    yeast_result = {}
    yeast_result["name"] = "N/A"
    yeast_result["type"] = "N/A"
    yeast_result["form"] = "N/A"
    yeast_result["laboratory"] = "N/A"
    yeast_result["attenuation"] = "N/A"
    yeast_result["flocculation"] = "N/A"
    if (len(yeast_meta_div) != 0):
        yeast_type = yeast_meta_div[0].text.replace("Type: ", "").strip()
        yeast_form = yeast_meta_div[1].text.replace("Form: ", "").strip()
        yeast_flocculation = yeast_meta_div[2].text.replace("Flocculation: ", "").strip()
        yeast_laboratory = yeast_meta_div[3].text.replace("Laboratory: ", "").strip()
        yeast_attenuation = yeast_meta_div[4].text.replace("Attenuation: ", "").strip()
        
        yeast_result["type"] = yeast_type
        yeast_result["form"] = yeast_form
        yeast_result["laboratory"] = yeast_laboratory
        yeast_result["attenuation"] = yeast_attenuation
        yeast_result["flocculation"] = yeast_flocculation
    
    h1_title_div = soup.find("div", {"class": "ingredient-page-content"})
    if (h1_title_div != None):
        if (h1_title_div.find("h1") != None):
            h1_title = h1_title_div.find("h1").text.strip()
            yeast_name = h1_title.replace(yeast_laboratory, "").strip()
            yeast_result["name"] = yeast_name

    return yeast_result


with Pool(12) as p:
    records = p.map(crawl, titles)

p.terminate()
p.join()
name = "new_brewer_ingredients_all.csv"
with open("data/raw/" + name, mode='a', encoding='utf-8') as csv_file:
    field_names = ["title_url", "mash_ph", "rating_value", "rating_count", "view_count", "ferm_total_weight",
                   "ferm_type_base_malt", "ferm_type_crystal_malt", "ferm_type_roasted_malt", "ferm_type_other",
                   "ferm_type_extract", "ferm_type_sugar", "ferm_type_raw", "ferm_type_acidulated_malt",
                   "ferm_type_fruit", "ferm_type_gluten_free_malt", "hops_type_pellet", "hops_type_leaf_whole",
                   "hops_type_plug", "hops_type_pellet", "other_type_spice", "other_type_water_agt", "other_type_other",
                   "other_type_fining", "other_type_flavor", "other_type_herb", "yeast_amount", "yeast_starter",
                   "yeast_name",
                   "yeast_type", "yeast_form", "yeast_laboratory", "yeast_attenuation", "yeast_flocculation",
                   "water_ca+2",
                   "water_mg+2", "water_na+", "water_cl-", "water_so4-2", "water_hco3-"]
    writer = csv.DictWriter(csv_file, fieldnames=field_names)
    writer.writeheader()
    for row in records:
        writer.writerow(row)