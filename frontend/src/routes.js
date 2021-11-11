import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewQuote from "./pages/NewQuote";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Logon} exact />
        <Route path='/register' component={Register} />
        <Route path='/profile' component={Profile} />
        <Route path='/quotes/new' component={NewQuote} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
