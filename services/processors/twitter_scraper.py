import os
import tweepy
from dotenv import load_dotenv
load_dotenv()

from s3_helper import *
from time import sleep
import uuid

CONSUMER_KEY = os.environ.get('CONSUMER_KEY')
CONSUMER_SECRET = os.environ.get('CONSUMER_SECRET')
OAUTH_TOKEN = os.environ.get('OAUTH_TOKEN')
OAUTH_TOKEN_SECRET = os.environ.get('OAUTH_TOKEN_SECRET')

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
api = tweepy.API(auth)

def s3_url_util(_file):

    """
    _file : to upload
    """

    _,aws_bucket,s3_client,_  = initialize_s3()
    key = str(uuid.uuid4())
    upload_to_s3(s3_client,_file,key,aws_bucket,'text')
    return get_s3_url(aws_bucket,key)

def twitter_downloader(url):

    tweet_id = url.split('/')[5]
    print(f"id : {tweet_id}")
    tweet = api.get_status(tweet_id)
    
    #print(tweet.entities['hashtag'])

    _file = tweet_id + '.txt'
    with open(_file,'w') as f:
        f.write(tweet.text)
    
    s3_url = s3_url_util(_file)

    #keys = {'text','lang','possibly_sensitive','geo'}
    
    ##response = {key:tweet[key] for key in keys}
    response = {}
    response['text'] = tweet.text
    response['lang'] = tweet.lang
    #response['possibly_sensitive'] = tweet.possibly_sensitive
    response['geo'] = tweet.geo
    #response['hashtag'] = tweet['entities']['hashtag']
    response['s3_url'] = s3_url

    return response