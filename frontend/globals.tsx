export const endpointRoute = (id = String) => ({
    users: {
        followUser: `${process.env.NEXT_PUBLIC_API_URL}/api/followers/follow/`,
        list: `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/list/`,
        loggedUserData: `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/logged_user/`,
        login: `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/token/login/`,
        signup: `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/`,
        activate: `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/activation/`,
        resetPassword: `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/reset_password/`,
        resetPasswordConfirm: `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/reset_password_confirm/`,
        details: `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/${id}/`,
    },
    recipes: {
        create: `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/create/`,
        list: `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/list/`,
        trending: `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/top_rated/`,
        followed: `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/recipes_of_accounts_followed/`,
        search: `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/search/`,
        details: `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}/`,
        saved_recipes: `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/saved_recipes/`,
        save: `${process.env.NEXT_PUBLIC_API_URL}/api/saves/save/`,
    },
    reviews: {
        create: `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/create/`,
        delete: `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/delete/${id}/`,
        reviews_in_recipe: `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/reviews_in_recipe/`,
    },
});
export const pageRoute = (id = String) => ({
    home: '/',
    login: '/users/UserLogin',
    signup: '/users/UserSignup',
    profile: `/users/${id}`,
    leaderboard: '/users/leaderboard',
    savedRecipes: '/recipes/SavedRecipes',
    createRecipe: '/recipes/RecipeCreate',
    reset_password: '/users/reset_password/UserResetPassword',
});

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
    author: { name: 'authorName', id: 'authorId' },
    recipe: 'recipeId',
    stars: 'starsCount',
    comment: 'commentText',
    image: '/image',
    id: 'reviewId',
};
