from instascrape import Post
import os
from dotenv import load_dotenv
from instascrape.scrapers.reel import Reel
load_dotenv()

instagram_sessionid = os.environ.get('INSTAGRAM_SESSION_ID')
headers = {"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36 Edg/87.0.664.57",
           "cookie": f"sessionid={instagram_sessionid};"}


def download_post(post_url,id):

    """
    utility function to download posts from the given post url
    """

    post = Post(post_url)
    post.scrape(headers=headers)

    if post['is_video']:
        try:
            post.download(id + '.mp4')
        except Exception as esc:
            print(f"Exception : {esc}")
    else:
        try:
            post.download(id + '.jpg')
        except Exception as esc:
            print(f"Exception : {esc}")

def download_reels(reels_url,id):

    """
    utility function to download posts from the given reel url
    """

    reel = Reel(reels_url)
    reel.scrape(headers=headers)
    try:
        reel.download(id + '.mp4')
    except Exception as esc:
        print(f"Exception : {esc}")
        
def download(url):

    site = url.split('/')[2].split('.')[1]
    type = url.split('/')[3]
    id = url.split('/')[4]

    # check if the url is valid instagram url
    if site != 'instagram':

        raise 'Error : Not valid instagram url'

    # Post url
    if type == 'p':
        download_post(url,id)

    # Reel url
    elif type == 'reel':
        download_reels(url,id)


if __name__ == "__main__":

    #url = 'https://www.instagram.com/p/CHmfQ9xlWI_/?utm_medium=copy_link'
    url = 'https://www.instagram.com/reel/CVKobtmgTST/?utm_medium=copy_link'
    download(url)