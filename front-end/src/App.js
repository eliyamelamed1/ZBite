import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ActivatePage from './containers/users/ActivatePage';
import Chats from './containers/chats/Chats';
import DetailChat from './containers/chats/ChatDetail';
import HomePage from './containers/HomePage';
import Layout from './components/Layout';
import LoginPage from './containers/users/LoginPage';
import NotFound from './components/NotFound';
import { Provider } from 'react-redux';
import React from 'react';
import RecipeCreatePage from './containers/recipes/RecipeCreatePage';
import RecipeDetailPage from './containers/recipes/RecipeDetailPage';
import RecipeListPage from './containers/recipes/RecipeListPage';
import ResetPasswordConfirmPage from './containers/users/ResetPasswordConfirmPage';
import ResetPasswordPage from './containers/users/ResetPasswordPage';
import SignupPage from './containers/users/SignupPage';
import UserDetailPage from './containers/users/UserDetailPage';
import UserListPage from './containers/users/UserListPage';
import store from './redux/store';

// pages

// components

// reduxjj

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/users' component={UserListPage} />
                    <Route exact path='/users/:id' component={UserDetailPage} />
                    <Route exact path='/login' component={LoginPage} />
                    <Route exact path='/signup' component={SignupPage} />
                    <Route exact path='/recipes/create' component={RecipeCreatePage} />
                    <Route exact path='/recipes' component={RecipeListPage} />
                    <Route exact path='/recipes/:id' component={RecipeDetailPage} />
                    <Route exact path='/reset_password' component={ResetPasswordPage} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirmPage} />
                    <Route exact path='/activate/:uid/:token' component={ActivatePage} />
                    <Route exact path='/chats' component={Chats} />
                    <Route exact path='/chats/chat/:chatId' component={DetailChat} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;
