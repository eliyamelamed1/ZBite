import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ActivatePage from "./containers/ActivatePage";
import Chats from "./containers/Chats";
import HomePage from "./containers/HomePage";
import Layout from "./layout/Layout";
import LoginPage from "./containers/LoginPage";
import NotFound from "./components/NotFound";
import { Provider } from "react-redux";
import React from "react";
import RecipeCreatePage from "./containers/RecipeCreatePage";
import RecipeDetailPage from "./containers/RecipeDetailPage";
import RecipeListPage from "./containers/RecipeListPage";
import ResetPasswordConfirmPage from "./containers/ResetPasswordConfirmPage";
import ResetPasswordPage from "./containers/ResetPasswordPage";
import SignupPage from "./containers/SignupPage";
import UserDetailPage from "./containers/UserDetailPage";
import UserListPage from "./containers/UserListPage";
import store from "./store";

// pages

// components

// reduxjj

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/users" component={UserListPage} />
          <Route exact path="/users/:id" component={UserDetailPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/recipes/create" component={RecipeCreatePage} />
          <Route exact path="/recipes" component={RecipeListPage} />
          <Route exact path="/recipes/:id" component={RecipeDetailPage} />
          <Route exact path="/reset_password" component={ResetPasswordPage} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirmPage}
          />
          <Route exact path="/activate/:uid/:token" component={ActivatePage} />
          <Route path="/chats" component={Chats} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;
