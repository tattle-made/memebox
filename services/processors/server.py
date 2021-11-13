from flask import Flask,request
app = Flask(__name__)
from scraper import download

@app.route('/process')
def server():
    url = request.args['url']
    try:
        download(url)
    except:
        raise "Could not download"
    
    return "Downloaded succesfully"

if __name__ == "__main__":

    app.run(host='localhost',debug=True)