import { useEffect, useState } from "react";
import { Grommet, Box, Grid, Card, CardHeader, CardBody, Image, Video, Select, Text } from "grommet";
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
import  memes from './data-structure';

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

function App() {
  const [memesData, setMemesData] = useState([]);
  const [allFilters, setAllFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => setMemesData(memes), [memes]);

  useEffect(() => {
    const memesType = memesData.map(elem => elem.type)
    setAllFilters(['all', ...new Set(memesType)])
    setFilteredData(memesData)
  }, [memesData])
  
  useEffect(() => {
      selectedFilter === 'all' || selectedFilter === ''? setFilteredData(memesData):setFilteredData(memesData.filter(value => value.type === selectedFilter))

  }, [selectedFilter])

  const theme = {
    themeMode: 'dark',
    global: {
      font: {
        family: `-apple-system,
            BlinkMacSystemFont, 
            "Segoe UI"`,
      },
    },
    card: {
      hover: {
        container: {
          elevation: 'large',
        },
      },
      container: {
        elevation: 'medium',
        extend: `transition: all 0.2s ease-in-out;`,
      },
      footer: {
        pad: { horizontal: 'medium', vertical: 'small' },
        background: '#00000008',
      },
    },
  };

  return (
    // <Grommet>
    //   <Box>
    //     <Text>hi</Text>
    //     <Router>
    //       <Switch>
    //         {getSuperTokensRoutesForReactRouterDom(ReactRouterDom)}
    //       </Switch>
    //     </Router>
    //   </Box>
    // </Grommet>
    <Grommet theme={theme} full>
      <Box pad='medium'>
        <Box fill align="start" justify="start">
          <Select
            placeholder="All"
            value={selectedFilter}
            options={allFilters}
            onChange={(e) => setSelectedFilter(e.target.value)}
            clear
            margin='medium'
          />
        </Box>
        <Grid gap="large" columns={{ count: 'fit', size: 'small' }}>
          {filteredData.map((value) => (
            <Card
              key={value.id}
              // onClick={() => {
                
              //   open the card on fullscreen
              // }}
              height='medium'
              width='medium'
            >
              <CardHeader background='light-1' pad='small'>
                  <Text>{value.data.title}</Text>
              </CardHeader>
              <CardBody pad="small">
                {value.type === 'image' || value.type === 'GIF' ?
                  <Image
                  fit="scale-down"
                  src={ value.data.url }
                  /> : (value.type === 'video' ? 
                    <Video controls="over" fit="scale-down">
                      <source key="video" src={ value.data.url } type="video/mp4" />
                    </Video> : <Text>{value.data.text}</Text>
                  )}
              </CardBody>
            </Card>
          ))}
        </Grid>
     </Box>
  </Grommet>
  );
}

export default App;
