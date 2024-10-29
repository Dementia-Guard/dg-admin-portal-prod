class LocalStore {
    storeAuth(data) {
        localStorage.setItem("auth", JSON.stringify(data));
    }

    getAuth() {
        const tokenData = localStorage.getItem("auth");
        return tokenData ? JSON.parse(tokenData) : null;
    }
    getRole() {
        const tokenData = this.getAuth();
        return tokenData ? tokenData?.user?.Role : null;
    }

    removeAuth() {
        localStorage.removeItem("auth");
    }
}

export default LocalStore = new LocalStore()