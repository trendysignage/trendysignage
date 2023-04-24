export const isAuthenticated = (state) => {
    if (state.auth?.auth?.token?.token) return true;
    return false;
};
