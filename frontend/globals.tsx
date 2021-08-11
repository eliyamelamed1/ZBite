export const endpointRoute = {
    followUnFollow: `${process.env.NEXT_PUBLIC_API_URL}/api/followers/follow/`,
    userList: `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/list/`,
    loggedUserData: `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/logged_user/`,
    login: `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/token/login/`,
    signup: `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/`,
    activate: `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/activation/`,
    resetPassword: `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/reset_password/`,
    resetPasswordConfirm: `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/reset_password_confirm/`,
};
export const pageRoute = {
    home: '/',
    login: '/users/UserLogin',
};
