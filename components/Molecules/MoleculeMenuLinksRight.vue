<template>
  <div class="menu-links-right">
    <ul>
      <AtomMenuLink @emitClickFired="fbGoogleLogout" iconName="sign-out-alt" />
    </ul>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions({
      logout: "auth/logout"
    }),
    async fbGoogleLogout() {
      await this.logout();
      this.$router.push("/signin");
    }
  }
};
</script>
<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}
</style>
