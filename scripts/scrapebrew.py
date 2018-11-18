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


def scrape_brewer_friends():
    """
        scrape_brewer_friends maintains the conditional structure that allows for the scraping of 
        4954 pages of beer recipes. This function does not accept an arguments and does not return 
        anything.
    """
    rows = get_url_page_table_rows(url_start)
    processed_rows = []
    append_rows = process_url_page_table_rows(rows)
    count = 2
    processed_rows = processed_rows + append_rows
    while (len(append_rows) != 0):
        url = url_pattern.replace("{ID}", str(count))
        print("Scraping beer recipes from: " + url)
        rows = get_url_page_table_rows(url)
        append_rows = process_url_page_table_rows(rows)
        processed_rows = processed_rows + append_rows
        print("Completed processing beer recipes from: " + url)
        count += 1
    write_beer_recipes_to_csv(processed_rows)
    print("Completed writing beer recipes to CSV")
    
    
def write_beer_recipes_to_csv(processed_rows):
    """
        write_beer_recipes_to_csv takes in a processed_rows array and writes the data out into a CSV
        Args:
            processed_rows (array): An array of beer recipes with an assortment of fields that are identified from 
            https://www.brewersfriend.com/.
    """
    with open("data/brewer_scrape_test.csv", mode='w', encoding='utf-8') as csv_file:
        field_names = ["title", "title_url", "author", "style_title", "style_url", "batch_size", "abv", "ibu", "og", "fg",
                 "color_title", "color_hex", "method", "view_count", "brewed_count", "boil_size", "boil_time", "boil_gravity",
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
        row["title"] = title

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