<template>
  <aside>
    <MoleculeAsideLinks :arrayOfLinks="fixedLinks" />
    <MoleculeAsideLinks
      @emitClickFired="$emit('emitClickFired')"
      title="My Teams"
      :arrayOfLinks="userTeams"
    />
    <MoleculeAsideLinks
      @emitClickFired="$emit('emitClickFired')"
      title="Participating"
      :arrayOfLinks="teamsUserIsParticipating"
    />
    <pre></pre>
  </aside>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fixedLinks: [
        {
          route: "/",
          iconName: "home",
          text: "Home",
          id: 1
        },
        {
          route: "/boards",
          iconName: "border-all",
          text: "Boards",
          id: 2
        }
      ],
      teamsFromApi: [
        {
          route: "/time",
          iconName: "user-friends",
          text: "Time 1",
          id: "343"
        },
        {
          route: "/time2",
          iconName: "user-friends",
          text: "Time 2",
          id: "232"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      userTeams: "main/userTeams",
      teamsUserIsParticipating: "manageteam/teamsUserIsParticipating"
    })
  }
};
</script>
<style scoped>
aside {
  width: 200px;
}
</style>
