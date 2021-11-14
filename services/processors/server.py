from flask import Flask, request
from instascrape.scrapers import post

app = Flask(__name__)

from Scraper import download
from search import SearchMemeBox
from mappings import post_mapping

es_client = SearchMemeBox()


@app.route("/scrape")
def scrap_util():

    """
    pass a url and get media and metadata
    """

    url = request.args["url"]
    try:
        response = download(url)
    except:
        raise "Could not download"

    return response

    # return "Downloaded succesfully"
    #


@app.route("/index", methods=["GET", "POST"])
def index_util():

    """
    pass the metadata to be added to elasticsearch
    """
    es_client.create_index(index_name="memes", mapping=post_mapping)

    content = request.json
    # if not es_client.indices.exists(index='memes'):
    # data = {"title": "Aa","platform":"instagram","tags":[],"annotation":[],platform_metadata: content}
    try:
        es_client.insert_index(index_name="memes", post=content)

    except Exception as err:
        print(f"Other error occurred: {err}")

    return {"message": "Indexing complete"}


@app.route("/search", methods=["GET", "POST"])
def search_util():

    """
    pass query to search through elasticsearch
    """

    query = request.json
    # print(query)

    try:
        # if not es_client.indices.exists(index='memes'):
        #    print("Yooo")
        print("res")
        res = es_client.search_index(index_name="memes", query=query)

        print(res)
        # print("%d documents found" % res['hits']['total'])

        # for doc in res['hits']['hits']:
        #     print("%s) %s" % (doc['_id'], doc['_source']['content']))

    except Exception as err:
        print(f"Other error occurred: {err}")

    return {"message": "Search success"}


if __name__ == "__main__":

    app.run(host="localhost", debug=True)
