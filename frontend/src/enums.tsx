const prodUrl = 'https://zbite.herokuapp.com';
const devUrl = 'http://localhost:8000';

export const BASE_URL = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;

export const endpointRoute = (id = '') => ({
    users: {
        followUser: `${BASE_URL}/api/followers/follow/`,
        loggedUserData: `${BASE_URL}/api/accounts/logged_user/`,
        login: `${BASE_URL}/api/djoser/token/login/`,
        logout: `${BASE_URL}/api/djoser/token/logout/`,
        signup: `${BASE_URL}/api/djoser/users/`,
        activate: `${BASE_URL}/api/djoser/users/activation/`,
        resetPassword: `${BASE_URL}/api/djoser/users/reset_password/`,
        resetPasswordConfirm: `${BASE_URL}/api/djoser/users/reset_password_confirm/`,
        details: `${BASE_URL}/api/accounts/${id}/`,
        leaderboard: `${BASE_URL}/api/accounts/top/`,
    },
    recipes: {
        create: `${BASE_URL}/api/recipes/create/`,
        trending: `${BASE_URL}/api/recipes/top_rated/`,
        followed: `${BASE_URL}/api/recipes/recipes_of_accounts_followed/`,
        details: `${BASE_URL}/api/recipes/${id}/`,
        saved_recipes: `${BASE_URL}/api/accounts/saved_recipes/`,
        save: `${BASE_URL}/api/saves/save/`,
        userOwnRecipes: `${BASE_URL}/api/accounts/own_recipes/${id}/`,
        search: `${BASE_URL}/api/recipes/search/${id}/`,
    },
    reviews: {
        create: `${BASE_URL}/api/reviews/create/`,
        delete: `${BASE_URL}/api/reviews/delete/${id}/`,
        reviews_in_recipe: `${BASE_URL}/api/reviews/reviews_in_recipe/`,
    },
    ingredients: {
        create: `${BASE_URL}/api/ingredients/create/`,
        detail: `${BASE_URL}/api/ingredients/${id}/`,
    },
    instructions: {
        create: `${BASE_URL}/api/instructions/create/`,
        detail: `${BASE_URL}/api/instructions/${id}/`,
    },
});
export const pageRoute = (id = '') => ({
    home: '/',
    login: '/users/UserLogin',
    signup: '/users/UserSignup',
    profile: `/users/${id}`,
    leaderboard: '/users/Leaderboard',
    savedRecipes: '/recipes/SavedRecipes',
    createRecipe: '/recipes/RecipeCreate',
    reset_password: '/users/reset_password/UserResetPassword',
    recipeProfile: `/recipes/${id}/`,
    search: '/{id}/',
});

export const typeOfRecipesEnum = {
    trending: 'trending',
    following: 'following',
};

// tests
export const userParams = {
    loggedUser: {
        id: 'loggedUserId',
        email: 'loggedUser@gmail.com',
        name: 'loggedUser',
        following: [],
        followers: [],
    },
    otherUser: {
        id: 'otherUserId',
        email: 'otherUser@gmail.com',
        name: 'otherUser',
        following: [],
        followers: [],
    },
    otherUser2: {
        id: 'otherUser2',
        email: 'otherUser2@gmail.com',
        name: 'otherUser2',
        following: [],
        followers: [],
    },

    nonExistingUser: {},
};

export const reviewParams = {
    author: { name: 'authorName', id: 'authorId', photo_main: null },
    recipe: 'recipeId',
    stars: '5',
    comment: 'commentText',
    image: null,
    id: 'reviewId',
    created_at: '2022-01-03T16:36:24.778530Z',
};
