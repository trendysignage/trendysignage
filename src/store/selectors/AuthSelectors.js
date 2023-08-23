export const isAuthenticated = (state) => {
    if (state.auth?.auth?.token?.token) return true;
    return false;
};
export const isVerified = (state) => {
    if (state.auth?.auth?.vendor?.isVerified) return true;
    return false;
};
