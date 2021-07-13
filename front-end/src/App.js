import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import { Provider } from 'react-redux';
import React from 'react';
import RecipeCreate from './components/recipes/RecipeCreate';
import RecipeDetails from './components/recipes/RecipeDetails';
import RecipeList from './components/recipes/RecipeList';
import UserActivate from './components/users/UserActivate';
import UserDetails from './components/users/UserDetails';
import UserList from './components/users/UserList';
import UserLogin from './components/users/UserLogin';
import UserResetPassword from './components/users/UserResetPassword';
import UserResetPasswordConfirm from './components/users/UserResetPasswordConfirm';
import UserSignup from './components/users/UserSignup';
import store from './redux/store';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/users' component={UserList} />
                    <Route exact path='/users/:id' component={UserDetails} />
                    <Route exact path='/login' component={UserLogin} />
                    <Route exact path='/signup' component={UserSignup} />
                    <Route exact path='/recipes/create' component={RecipeCreate} />
                    <Route exact path='/recipes' component={RecipeList} />
                    <Route exact path='/recipes/:id' component={RecipeDetails} />
                    <Route exact path='/reset_password' component={UserResetPassword} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={UserResetPasswordConfirm} />
                    <Route exact path='/activate/:uid/:token' component={UserActivate} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;
