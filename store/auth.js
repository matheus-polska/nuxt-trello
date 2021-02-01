import firebaseApp from "~/firebase/app";
import Cookies from "js-cookie";
import { db } from "~/firebase/db";

const users = db.collection("users");

require("firebase/auth");

export const state = () => ({
  uid: null,
  user: null
});

export const mutations = {
  setUSER(state, user) {
    console.log("[STORE MUTATIONS] - setUSER:", user);
    state.user = user;
  },
  saveUID(state, uid) {
    console.log("[STORE MUTATIONS] - saveUID:", uid);
    state.uid = uid;
  }
};

export const actions = {
  async signIn(context) {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.$fire.auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      const { displayName, email, uid } = user;
      console.log(displayName, email, uid);
    });
  },
  async signOut(context) {
    this.$fire.auth
      .signOut()
      .then(() => {
        console.log("sucesso");
      })
      .catch(error => {
        console.error(error);
      });
  },
  onAuthStateChangedAction(context, { authUser, claims }) {
    if (!authUser) {
      console.log("Deslogou");
    } else {
      const { displayName, email, uid } = authUser;
      context.commit("SET_USER", { displayName, email, uid });
    }
  },
  async login({ dispatch, state }, user) {
    console.log("[STORE ACTIONS] - login");
    const token = await firebaseApp.auth().currentUser.getIdToken(true);
    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid
    };
    users.doc(userInfo.uid).set(userInfo);
    Cookies.set("access_token", token); // saving token in cookie for server rendering
    await dispatch("setUSER", userInfo);
    await dispatch("saveUID", userInfo.uid);
    console.log("[STORE ACTIONS] - in login, response:", status);
  },

  async logout({ commit, dispatch }) {
    console.log("[STORE ACTIONS] - logout");
    await firebaseApp.auth().signOut();

    Cookies.remove("access_token");
    commit("setUSER", null);
    commit("saveUID", null);
  },
  saveUID({ commit }, uid) {
    console.log("[STORE ACTIONS] - saveUID");
    commit("saveUID", uid);
  },
  setUSER({ commit }, user) {
    commit("setUSER", user);
  },
  setTeste({ commit }, user) {
    commit("setUSER", user);
  }
};

export const getters = {
  uid(state) {
    if (state.user && state.user.uid) return state.user.uid;
    else return null;
  },

  user(state) {
    return state.user;
  },

  isAuthenticated(state) {
    return !!state.user && !!state.user.uid;
  }
};
