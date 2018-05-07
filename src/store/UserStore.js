import UserService from "../services/UserService.js";

export default {
  state: {
    loggedinUser: null
  },
  mutations: {
    setUser(state, { user }) {
      state.loggedinUser = user;
    },
    updateUser(state, {user}) {
      state.loggedinUser = user;
    }
  },
  getters: {
    loggedinUser(state) {
      return state.loggedinUser;
    }
  },
  actions: {
    login(store, { userCredentials }) {
      return UserService.login({
        email: userCredentials.email,
        password: userCredentials.password
      }).then(user => {
        store.commit({ type: "setUser", user });
      });
    },
    logout(store) {
      console.log(store);
      return UserService.logout().then(() => {
        store.commit({ type: "setUser", user: null });
      });
    },

    updateUser(store, { user, newUrl }) {
      user = JSON.parse(JSON.stringify(user))
      user.profileImg = newUrl;
      // console.log('&&&&&&&&&&&&&&&&&',user, newUrl);
      UserService.updateUser(user, newUrl).then(() => {
        store.commit({ type: "updateUser", user });
      })
    }
  }
};
