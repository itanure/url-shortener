import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "./containers/Home";
import HandleRedirectContainer from "./containers/HandleRedirect";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeContainer />
        </Route>
        <Route exact path="/:shortId">
          <HandleRedirectContainer />
        </Route>
        <Route exact path="/not-found">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;