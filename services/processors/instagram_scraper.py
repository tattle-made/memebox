import os
from dotenv import load_dotenv

load_dotenv()

from instascrape import Post
from instascrape.scrapers.reel import Reel

from s3_helper import *
from time import sleep
import uuid
import json

instagram_sessionid = os.environ.get("INSTAGRAM_SESSION_ID")
headers = {
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36 Edg/87.0.664.57",
    "cookie": f"sessionid={instagram_sessionid};",
}


def s3_url_util(_file):

    """
    _file : to upload
    """

    _, aws_bucket, s3_client, _ = initialize_s3()
    key = str(uuid.uuid4())
    upload_to_s3(s3_client, _file, key, aws_bucket, "image")
    return get_s3_url(aws_bucket, key)


def download_post(post_url, id):

    """
    utility function to download posts from the given post url
    """

    post = Post(post_url)
    post.scrape(headers=headers)

    if post["is_video"]:
        _file = id + ".mp4"
        post.download(_file)
        s3_url = s3_url_util(_file)

    else:
        _file = id + ".jpg"
        post.download(_file)
        s3_url = s3_url_util(_file)

    # post_dict =  post.to_dict(True)
    # response_dict = {}
    # response_dict['accessibility_caption'] = str(post['accessibility_caption']).decode(encoding='UTF-8',errors='strict')
    # response_dict['caption'] = str(post['caption']).decode(encoding='UTF-8',errors='strict')
    # response_dict['location'] = str(post['location']).decode(encoding='UTF-8',errors='strict')

    # return response_dict

    keys = {"accessibility_caption", "caption", "location"}

    response = {key: post[key] for key in keys}
    response["s3_url"] = s3_url

    return response
    # return post['accessibility_caption']


def download_reels(reels_url, id):

    """
    utility function to download posts from the given reel url
    """
    reel = Reel(reels_url)
    reel.scrape(headers=headers)
    _file = id + ".mp4"

    reel.download(_file)
    # sleep(4)
    s3_url = s3_url_util(_file)

    keys = {"accessibility_caption", "caption", "location"}

    response = {key: reel[key] for key in keys}
    response["s3_url"] = s3_url

    print(response)

    return response


def instagram_downloader(url):

    """
    given a url ,downloads the media ,uploads it to s3-bucket and returns the response dict
    with meta-data to the user
    """

    post_type = url.split("/")[3]
    post_id = url.split("/")[4]

    # Post url
    if post_type == "p":
        try:
            response = download_post(url, post_id)
        except:
            raise "Could not parse the post url"

    # Reel url
    elif post_type == "reel":
        try:
            response = download_reels(url, post_id)
        except:
            raise "Could not parse the reels url"

    return response
