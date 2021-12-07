import { useEffect, useState, createContext } from "react";
import { Grommet, Box, Grid, Card, CardHeader, CardBody, Image, Video, Select, Text, Pagination } from "grommet";
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import ThirdPartyEmailPassword, {
  Github,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import ReactRouterDom from "react-router-dom";
import axios from "axios";
Session.addAxiosInterceptors(axios);
import memes from './data-structure';
import Feed from "./components/Feed";
import FeedControls from "./components/FeedControls";
import Post from "./components/Post";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.io/docs/thirdpartyemailpassword/appinfo
    appName: "memebox",
    apiDomain: "http://localhost:3001",
    websiteDomain: "http://localhost:3000",
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [Github.init()],
      },
    }),
    Session.init(),
  ],
});

export const DataContext = createContext(null);

function App() {
  const [memesData, setMemesData] = useState([]);
  const [filterCurrentData, setFilterCurrentData] = useState([]);
  const [bg, setBg] = useState('')

  useEffect(() => {
    setMemesData(memes);
  }, [memes]);



  const theme = {
    themeMode: 'light',
    global: {
      font: {
        family: `-apple-system,
            BlinkMacSystemFont, 
            "Segoe UI"`,
      },
    },
    // card: {
    //   container: {
    //     elevation: 'small',
    //     extend: `transition: all 0.2s ease-in-out;`,
    //   },
    // },
  };

  const bgOptions = {
    light: {
      color: '#fff'
    },
    dark: {
      color: '#000'
    }
  }

  return ( 
    <Grommet pad='large' theme={theme} background={bgOptions.dark} full>
      <Router>
        <DataContext.Provider
          value={
            {
              memesData,
              filterCurrentData,
              setFilterCurrentData
            }
        }>
          
        <Switch>
          <Route
            path='/:postId'
            children={<Post />}
          />
            <Route path='/'>
              <FeedControls />
              <Feed />
            </Route>
          </Switch>
        </DataContext.Provider>
      </Router>
    </Grommet>
  );
}

export default App;