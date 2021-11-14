# Processor

This folder contains scripts which adds the scraping and searching functionality to Backend Services

## Folder Structure

    ├── Scraper.py                        # contains utility function to scrape Twitter and Instagram
    ├── instagram_scraper.py              # contains helper function to scrape Instagram        
    ├── mappings.py                       # contains the mappings for the posts indexed on Elastic Search 
    |── s3_helper.py                      # contains functions to initialize,upload and get s3-url of aws s3 hosted files
    |── search.py                         # contains methods for Elastic Search functionality such as index,search
    ├── server.p                          # Flask app to create API endpoints
    ├── twitter_scraper.py                # contains helper function to scrape Twitter
    |── requirements.txt
    └── README.md                   
    
    
## Instructions to run

- pip install -r requirements.txt
- Run `python server.py` ,which starts the Flask app on your localhost
- There are currently 3 functionalites in the App
  - /scrape
      - User can provide a url of Twitter tweet or Instagram post/reels having meme,which they want to save.
      - The App now download the media/text and uploads it to the s3 bucket and generates the s3-url for the same.
      - s3-url along with the other meta-data of the post are returned to the Elastic Search to Index
      
  - /index
      - Creates an index following the mapping in _mappings.py_
      - Inserts the meta-data to the Index
      
  - /search
      - Helps user to search for their favourite memes
      - User can leverage the search functionality by using different filters such as Platform,language,tags


  
