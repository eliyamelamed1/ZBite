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
import ResetPasswordConfirmPage from './components/users/UserResetPasswordConfirmPage';
import ResetPasswordPage from './components/users/UserResetPasswordPage';
import SignupPage from './components/users/UserSignup';
import UserDetailPage from './components/users/UserDetails';
import UserList from './components/users/UserList';
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
                    <Route exact path='/users' component={UserList} />
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
