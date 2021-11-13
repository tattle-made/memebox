import { useState } from "react";
import { Grommet, Box, Text } from "grommet";
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import ThirdPartyEmailPassword, {
  Github,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactRouterDome from "react-router-dom";
import axios from "axios";
Session.addAxiosInterceptors(axios);

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
  const [count, setCount] = useState(0);

  return (
    <Grommet>
      <Box>
        <Text>hi</Text>
        <Router>
          <Switch>
            {getSuperTokensRoutesForReactRouterDom(ReactRouterDome)}
          </Switch>
        </Router>
      </Box>
    </Grommet>
  );
}

export default App;
