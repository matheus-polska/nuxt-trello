<template>
  <div class="signin-container">
    <div class="login-box">
      <h2>Login to start using Nuxt Trello</h2>
      <button @click="fbGoogleLogin">Login com o Google</button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import firebaseApp, { googleProvider } from "~/firebase/app";

export default {
  layout: "blank",
  middleware: ["handle-login-route"],
  methods: {
    ...mapActions({
      login: "auth/login",
      logout: "auth/logout"
    }),
    async fbGoogleLogin() {
      const { user } = await firebaseApp.auth().signInWithPopup(googleProvider);
      await this.login(user);
      this.$router.push("/");
    },
    async fbGoogleLogout() {
      await this.logout();
      this.$router.push("/site");
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>
<style scoped>
.signin-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #026aa7;
}
h2 {
  margin-bottom: 10px;
  color: black;
  font-weight: 300;
}

.login-box {
  max-width: 400px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 3px;
  padding: 25px 40px;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
}

button {
  background: #fff;
  box-shadow: rgb(0 0 0 / 20%) 1px 1px 5px 0;
  border-color: transparent;
  text-align: center;
  border-radius: 3px;
  width: 99%;
  height: 39px;
  outline: none;
  cursor: pointer;
  margin: auto;
  font-size: 14px;
  font-family: inherit;
  font-weight: bold;
  color: #505f79;
  line-height: 32px;
}
</style>
