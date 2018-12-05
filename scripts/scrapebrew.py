from bs4 import BeautifulSoup as bs
import requests as r
import re
import json
import csv

# Constants
# These urls are the two unique patterns used on Brewer's Friend that will be utlized to
# scrape all of their beer recipes.
url_start = "https://www.brewersfriend.com/homebrew-recipes/?sort=breweddown"
url_pattern = "https://www.brewersfriend.com/homebrew-recipes/page/{ID}/?sort=breweddown"
base_url = "https://www.brewersfriend.com"


def scrape_brewer_friends(csv_name, page_max):
    """
        scrape_brewer_friends maintains the control flow structure that allows for the scraping of 
        5000+ pages of beer recipes. This function does not accept an arguments and does not return 
        anything.
        Args:
            csv_name (string): Represents a string used to name the csv file being written
    """
    rows = get_url_page_table_rows(url_start)
    processed_rows = []
    append_rows = process_url_page_table_rows(rows)
    count = 2
    processed_rows = processed_rows + append_rows
    while (len(append_rows) != 0 and count < page_max):
        url = url_pattern.replace("{ID}", str(count))
        print("Scraping beer recipes from: " + url)
        rows = get_url_page_table_rows(url)
        append_rows = process_url_page_table_rows(rows)
        processed_rows = processed_rows + append_rows
        print("Completed processing beer recipes from: " + url)
        count += 1
    write_beer_recipes_to_csv(processed_rows, csv_name)
    print("Completed writing beer recipes to CSV. Data can be found: data/raw/" + csv_name)

def write_beer_recipes_to_csv(processed_rows, name):
    """
        write_beer_recipes_to_csv takes in a processed_rows array and writes the data out into a CSV
        Args:
            processed_rows (array): An array of beer recipes with an assortment of fields that are identified from 
            https://www.brewersfriend.com/.
    """
    with open("data/raw/" + name, mode='w', encoding='utf-8') as csv_file:
        field_names = ["title", "title_url", "author", "style_title", "style_url", "batch_size", "abv", "ibu", "og", "fg",
                 "color_title", "color_hex", "method", "brewed_count", "boil_size", "boil_time", "boil_gravity",
                 "efficiency", "mash_thickness", "sugar_scale", "pitch_rate", "primary_temp", "priming_method", "priming_amount", 
                 "creation_date", "notes"]
        writer = csv.DictWriter(csv_file, fieldnames=field_names)
        writer.writeheader()
        for row in processed_rows:
            writer.writerow(row)

def get_url_page_table_rows(url):
    """
        get_url_page_table_rows takes in an url argument in order to scrape and returns an array of rows
        that represents the row of a html table. 
        Args:
            url (string): Represents a Brewer Friend URL page with lists of recipes.
        Return:
            Returns an array of rows that represents all of the scraped table rows in a list of recipes.
    
    """
    page = r.get(url, headers={'User-Agent':'Mozilla/5.0'})
    soup = bs(page.content, "html.parser")
    table_rows_list = soup.findAll("tr")
    
    result = []
    for row in table_rows_list:
        if row.has_attr("bgcolor") or row.has_attr("id"):
            result.append(row)
    return result

def process_url_page_table_rows(rows):
    """
        process_url_page_table_rows takes in an array of rows that represents beer recipes and extracts 
        them in order to return a formatted list of objects that could be used to write out to a CSV file.
        Args:
            rows (array): Represents an array of table rows with beer recipes
        Return:
            Returns an array of formatted beer recipe objects
    
    """
    result = []
    for i in range(len(rows) // 2):
        # Each row comes in pair 
        row = {}
        table_row_simple = rows[2*i]
        table_row_detailed = rows[2*i + 1]
        
        # Scrape each cell for each row
        table_cells_simple = table_row_simple.findAll("td")
        table_cells_detailed = table_row_detailed.findAll("td")

        # Title URL 
        title_url_cell_div = table_cells_simple[0].find("div")
        title_url_cell_url = title_url_cell_div.find("a")["href"]
        row["title_url"] = "https://www.brewersfriend.com" + title_url_cell_url

        # Style
        style_cell_url = table_cells_simple[1].find("a")["href"]
        style_cell_title = table_cells_simple[1].find("span").text
        row["style_url"] = "https://www.brewersfriend.com" + style_cell_url
        row["style_title"] = style_cell_title

        # Batch Size
        batch_size_cell_size = table_cells_simple[2].find("span").text
        row["batch_size"] = batch_size_cell_size

        # ABV
        abv = table_cells_simple[3].text
        row["abv"] = abv

        # IBU 
        ibu = table_cells_simple[4].text
        row["ibu"] = ibu

        # OG
        og = table_cells_simple[5].text
        row["og"] = og

        # FG
        fg = table_cells_simple[6].text
        row["fg"] = fg

        # Color
        color_title = table_cells_simple[7].text
        color_hex = table_cells_simple[7].find("div", {"class", "color"})["style"].replace("background-color: ", "").replace(";", "")
        row["color_title"] = color_title
        row["color_hex"] = color_hex

        # Method
        method = table_cells_simple[8].text
        row["method"] = method

        # Views
        view_count = table_cells_simple[9].text
        row["batch_size"] = batch_size_cell_size

        # Brewed Count
        brewed_count = table_cells_simple[10].text
        row["brewed_count"] = brewed_count

        table_cells_detailed_rows = table_cells_detailed[0].findAll("tr")

        # Beer Title
        title = table_cells_detailed_rows[0].find("td").text.replace("Title: ", "").lstrip()
        row["title"] = title.strip()

       # Author
        anchor = table_cells_detailed_rows[1].find("a")
        if (anchor != None):  
            author = anchor.text
        else:
            font = table_cells_detailed_rows[1].find("font")
            if (font != None):
                author = font.text
            else:
                author = "NA"
        row["author"] = author

        table_cells_detailed_rows_process_1 = table_cells_detailed_rows[3].findAll("td")

        # Boil Size
        boil_size = table_cells_detailed_rows_process_1[0].text.replace("Boil Size: ", "").lstrip()
        row["boil_size"] = boil_size

        # Boil Time
        boil_time = table_cells_detailed_rows_process_1[1].text.replace("Boil Time: ", "").lstrip()
        row["boil_time"] = boil_time

        # Boil Gravity 
        boil_gravity = table_cells_detailed_rows_process_1[2].text.replace("Boil Gravity: ", "").lstrip()
        row["boil_gravity"] = boil_gravity

        # Efficiency
        efficiency = table_cells_detailed_rows_process_1[3].text.replace("Efficiency: ", "").lstrip()
        row["efficiency"] = efficiency

        # Mash Thickness
        mash_thickness = table_cells_detailed_rows_process_1[4].text.replace("Mash Thickness: ", "").lstrip()
        row["mash_thickness"] = mash_thickness

        # Sugar Scale
        sugar_scale = table_cells_detailed_rows_process_1[5].text.replace("Sugar Scale: ", "").lstrip()
        row["sugar_scale"] = sugar_scale

        table_cells_detailed_rows_process_2 = table_cells_detailed_rows[4].findAll("td")

        # Pitch Rate
        pitch_rate = table_cells_detailed_rows_process_2[1].text.replace("Pitch Rate: ", "").lstrip()
        row["pitch_rate"] = pitch_rate

        # Primary Temp
        primary_temp = table_cells_detailed_rows_process_2[2].text.replace("Primary Temp: ", "").lstrip()
        row["primary_temp"] = primary_temp

        # Priming Method
        priming_method = table_cells_detailed_rows_process_2[3].text.replace("Priming Method: ", "").lstrip()
        row["priming_method"] = priming_method

        # Priming Amount
        priming_amount = table_cells_detailed_rows_process_2[4].text.replace("Priming Amount: ", "").lstrip()
        row["priming_amount"] = priming_amount

        # Creation Date
        creation_date = table_cells_detailed_rows_process_2[5].text.replace("Creation Date: ", "").lstrip()
        row["creation_date"] = creation_date

        # Notes
        notes = table_cells_detailed_rows[5].text.lstrip()
        row["notes"] = notes
        result.append(row)
    return result

def scrape_fermentables_table():
    resource = "/fermentables/"
    fermentable_url = base_url + resource
    page = r.get(fermentable_url, headers={'User-Agent':'Mozilla/5.0'})
    soup = bs(page.content, "html.parser")
    
    # Body that contains all of the table rows with fermentables
    tbody = soup.find("tbody")
    tr_list = tbody.findAll("tr")
    
    fermentables_result = []
    for i in range(len(tr_list)):
        fermentable = {}
        td_list = tr_list[i].findAll("td")
        
        # Fermentable name and url 
        fermentables_name_anchor = td_list[0].find("a")
        fermentable_name = ""
        fermentable_url = ""
        if (fermentables_name_anchor != None):
            fermentable_name = fermentables_name_anchor.text
            fermentable_url = "https://www.brewersfriend.com" + fermentables_name_anchor["href"]
        fermentable["name"] = fermentable_name
        fermentable["url"] = fermentable_url
            
        # Country 
        country = td_list[1].find("font").text
        if (len(country) == 0):
            country = "N/A"
        fermentable["country"] = country
        
        # Category
        category = td_list[2].find("font").text
        fermentable["category"] = category
        
        # Type
        ferm_type = td_list[3].find("font").text
        fermentable["type"] = ferm_type

        # Color
        color = td_list[4].find("font").text
        color_hex = td_list[4].find("div", {"class": "batchColor"})["style"].replace("background-color: ", "").replace(";", "")
        fermentable["color"] = color
        fermentable["color_hex"] = color_hex
        
        # PPG
        ppg = td_list[5].find("font").text
        fermentable["ppg"] = ppg
        
        # Recipes
        recipes = td_list[6].find("font").text
        fermentable["recipes"] = recipes
        
        fermentables_result.append(fermentable)
    return fermentables_result

def write_fermentables_to_csv(fermentables):
    with open("data/raw/fermentables.csv", mode='w', encoding='utf-8') as csv_file:
        field_names = ["name", "url", "country", "category", "type",
                       "color", "color_hex", "ppg", "recipes"]
        writer = csv.DictWriter(csv_file, fieldnames=field_names)
        writer.writeheader()
        for row in fermentables:
            writer.writerow(row)

def write_detail_recipe_to_csv(recipes_list, name):
    """
        write_detail_recipe_to_csv takes in a recipes_list array and writes the data out into a CSV
        Args:
            recipe_list (array): An array of beer recipes with fields that were not readily available unless 
            viewed from a detail beer recipe page.
    """
    with open("data/raw/" + name, mode='a+', encoding='utf-8') as csv_file:
        field_names = ["title_url", "mash_ph", "rating_value", "rating_count", "view_count", "ferm_total_weight", 
                       "ferm_type_base_malt", "ferm_type_crystal_malt", "ferm_type_roasted_malt", "ferm_type_other",
                      "ferm_type_extract", "ferm_type_sugar", "ferm_type_raw", "ferm_type_acidulated_malt",
                      "ferm_type_fruit", "ferm_type_gluten_free_malt", "hops_type_pellet", "hops_type_leaf_whole",
                      "hops_type_plug", "hops_type_pellet", "other_type_spice", "other_type_water_agt", "other_type_other",
                      "other_type_fining", "other_type_flavor", "other_type_herb", "yeast_amount", "yeast_starter", "yeast_name",
                      "yeast_type", "yeast_form", "yeast_laboratory", "yeast_attenuation", "yeast_flocculation", "water_ca+2",
                      "water_mg+2", "water_na+", "water_cl-", "water_so4-2", "water_hco3-"]
        writer = csv.DictWriter(csv_file, fieldnames=field_names)
        writer.writeheader()
        for row in recipes_list:
            writer.writerow(row)
            
def write_recipe_reviews_to_csv(reviews_list, name):
    """
        write_recipe_reviews_to_csv takes in a reviews_list array and writes the data out into a CSV
        Args:
            reviews_list (array): An array of beer recipes reviews with an assortment of fields.
    """
    with open("data/raw/" + name, mode='a+', encoding='utf-8') as csv_file:
        field_names = ["title_url", "reviewer_url", "reviewer_name", "review_description",
                       "review_rating", "reviewer_date", "reviewer_time"]
        writer = csv.DictWriter(csv_file, fieldnames=field_names)
        writer.writeheader()
        for row in reviews_list:
            writer.writerow(row)
            
import pandas as pd
fermentables = pd.read_csv("./data/raw/fermentables.csv", keep_default_na=False)
fermentables_dict = dict(zip(fermentables["name"], fermentables["type"]))
yeast_dict = {}
fermentables_countries = fermentables.country.unique()
    
def scrape_recipes_details(title_url_list, csv_detail, csv_review):
    """
        scrape_recipes_details maintains the control flow structure that allows for the scraping of 
        4954 pages of beer recipes. This function looks to extract detailed information for each beer recipe.
        Information such as ratings, reviews and view count that will be combined with the original set of information
        extracted.
        Args:
            title_url_list (array): An array of title urls that will be use to scrape more details about the 
            beer recipes.
            
    """
    general, reviews = [], []
    for i in range(len(title_url_list)):
        append_gen, append_reviews = scrape_detail_page(title_url_list[i])
        print("Completed scraping beer recipes (" + str(i + 1) + "/" +str(len(title_url_list)) + ") details from: " + title_url_list[i])
        general.append(append_gen)
        reviews = reviews + append_reviews
    write_detail_recipe_to_csv(general, csv_detail)
    print("Completed writing detailed beer recipes to CSV. Data can be found: data/raw/" + csv_detail)
    write_recipe_reviews_to_csv(reviews, csv_review)
    print("Completed writing beer recipes reviews to CSV. Data can be found: data/raw/" + csv_review)


def scrape_detail_page(page_url):
    """
        scrape_detail_page takes in a page_url string used to extract detail information and reviews for that 
        particular beer recipe url.
        Args:
            page_url (string): An string that represents a beer recipe page url
        Return:
            Returns two arrays. The first contains additional general information about a beer recipe. 
            The other contains reviews left for that beer recipe.
    """
    page = r.get(page_url, headers={'User-Agent':'Mozilla/5.0'})
    soup = bs(page.content, "html.parser")
    
    page_general_details = extract_general_recipe_detail(soup, page_url)
    reviews_list = extract_recipe_reviews(soup, page_url)
    return page_general_details, reviews_list
    
    
def extract_recipe_reviews(soup, title_url):
    """
        extract_general_recipe_detail takes in a BeautifulSoup object that represents the HTML makeup of the particular
        url (title_url) for a particular beer recipe. This function extracts reviews about the beer recipe
        used to be combine to an existing data set.
        Args:
            soup (object): A BeautifulSoup object that represents the HTML makeup of a page.
            title_url (string): An string that represents a beer recipe page url
        Return:
            Returns an array of review object
    """
    brewpart_divs = soup.findAll("div", {"class": "brewpart"})
    brewpart_review_div = brewpart_divs[len(brewpart_divs) - 1]
    brewpart_review_tables = brewpart_review_div.find("table").find("td").findAll("table")
    reviews = []
    
    if (len(brewpart_review_tables) != 0):
        for i in range(len(brewpart_review_tables)):
            review = {}

            review["title_url"] =  title_url

            review_tds = brewpart_review_tables[i].findAll("td")
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


def scrape_other_ingredients_table():
    resource = "/other/"
    other_url = base_url + resource
    page = r.get(other_url, headers={'User-Agent':'Mozilla/5.0'})
    soup = bs(page.content, "html.parser")
    
    # Body that contains all of the table rows with fermentables
    tbody = soup.find("tbody")
    tr_list = tbody.findAll("tr")
    
    others_result = []
    for i in range(len(tr_list)):
        other = {}
        td_list = tr_list[i].findAll("td")
        
        # Inredient 
        other_anchor = td_list[0].find("a")
        other_name = ""
        other_url = ""
        if (other_anchor != None):
            other_name = other_anchor.text
            other_url = "https://www.brewersfriend.com" + other_anchor["href"]
        other["ingredient"] = other_name
        other["url"] = other_url
        
        # Type
        other_type = td_list[1].find("font").text
        other["type"] = other_type
        # Use
        other_use = td_list[2].find("font").text
        other["use"] = other_use
                
        others_result.append(other)
    return others_result

def write_other_ingredients_to_csv(others):
    with open("data/raw/other_ingredients.csv", mode='w', encoding='utf-8') as csv_file:
        field_names = ["ingredient", "url", "type", "use"]
        writer = csv.DictWriter(csv_file, fieldnames=field_names)
        writer.writeheader()
        for row in others:
            writer.writerow(row)
            
            
def extract_general_recipe_detail(soup, title_url):
    """
        extract_general_recipe_detail takes in a BeautifulSoup object that represents the HTML makeup of the particular
        url (title_url) for a particular beer recipe. This function extracts general information about the beer recipe
        used to be combine to an existing data set.
        Args:
            soup (object): A BeautifulSoup object that represents the HTML makeup of a page.
            title_url (string): An string that represents a beer recipe page url
        Return:
            Returns an object that represents additional general information for a beer recipe
    """
    
    result = {}
    mash_ph = soup.find("div", {"class": "phMin"}).text.strip()
    
    result["title_url"] = title_url
    result["mash_ph"] = mash_ph
    rating_div = soup.find("div", {"class": "reviews"})
    rating_value = "N/A"
    rating_count = 0
    if (rating_div != None):
        rating_value = rating_div.find("span", {"itemprop": "ratingValue"}).text.strip()
        rating_count = rating_div.find("span", {"itemprop": "reviewCount"}).text.strip()
    result["rating_value"] = rating_value
    result["rating_count"] = rating_count

    view_count_div = soup.find("div", {"class": "lastupdated"})
    view_count_bold = view_count_div.findAll("b")
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
