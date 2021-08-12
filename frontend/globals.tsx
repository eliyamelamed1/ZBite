export const endpointRoute = (id = String) => ({
    users: {
        followUnFollow: `${process.env.NEXT_PUBLIC_API_URL}/api/followers/follow/`,
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
        search: `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/search/`,
        details: `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}/`,
    },
});
export const pageRoute = {
    home: '/',
    login: '/users/UserLogin',
};

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

    nonExistingUser: {},
};
export const ssrContextParams = {
    loggedUser: {
        params: { UserDetails_Id: userParams.loggedUser.id },
    },
    otherUser: {
        params: { UserDetails_Id: userParams.otherUser.id },
    },
    nonExistingUser: {
        params: { UserDetails_Id: userParams.nonExistingUser.id },
    },
};
