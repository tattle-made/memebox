# memebox
Your personal meme database and community wiki to bookmark your favourite memes, annotate them and stay upto date with Indian Internet culture.

# Demo Video
https://vimeo.com/645765582

# Developing Locally

The project depends on a running instance of mysql and elasticsearch. You can run `docker-compose up` in the root folder of the project to bring those up.

The project is split into 4 components (source code to be found for them in the services directory) 
1. ui-browser-plugin
2. ui-web-app
3. backend
4. processors

ui-browser-plugin is a chrome extension. There's not any development notes as such since its html, css and js file. You have to enable developer mode in your browser and load it since the extension is not yet released. Instructions can be found [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

ui-web-app is a gatsby app. 
run `npm install` and `npm run dev` to start a development server. The web app will be accessible at http://localhost:8000

backend is a nodejs and express server.
run `npm install && npm install -g nodemon` and `nodemon index.js` to start the development server. API becomes accessible at http://localhost:3000

processors is a flask server that expose scraping and search endpoints.
run `pip install -r requirements.text` and `python server.py` to start the development server. API becomes accessible at http://localhost:5000



