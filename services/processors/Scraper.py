import os
from instagram_scraper import instagram_downloader
from twitter_scraper import twitter_downloader

def download(url):
    
    site = url.split('/')[2].split('.')[1]
    print(site)

    # check if the url is valid instagram url and download the post
    if 'instagram.com' in url:
        return instagram_downloader(url)

    # check if the url is valid twitter url and download the tweet
    elif 'twitter.com' in url:
        return twitter_downloader(url)

    # Not a valid url
    else:
        raise 'Error : Not valid instagram (or) twitter url'
    