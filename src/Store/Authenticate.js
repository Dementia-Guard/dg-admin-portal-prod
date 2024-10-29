import LocalStore from "./LocalStore"

class Authenticate {
    isAuthenticated() {
        const authData = LocalStore.getAuth();
        return authData && authData.access_token ? true : false;
    }

    getRole() {
        const authData = LocalStore.getAuth();
        return authData ? authData.user.Role : null;
    }

    logoutUser() {
        LocalStore.removeToken();
    }
}
export default Authenticate = new Authenticate()