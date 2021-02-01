<template>
  <div>
    <OrganismTeamBoardCard
      @emitClickFired="onCreateBoardStart"
      :boardsByTeams="boardsByTeams"
    />
    <OrganismModal
      @onCloseModal="opened = !opened"
      :opened="opened"
      :title="`Creating a new board on ${teamName}`"
    >
      <form @submit.prevent="onCreateBoard">
        <div>
          <label>Board Name</label>
          <input
            placeholder=""
            type="Enter the board name"
            v-model="boardName"
          />
        </div>
        <button class="btn-submit">Create Board</button>
      </form>
    </OrganismModal>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      opened: false,
      boardName: "",
      teamId: "",
      teamName: ""
    };
  },
  methods: {
    ...mapActions({
      fetchBoardsByTeams: "board/fetchBoardsByTeams",
      createBoardFromTeamAndCard: "main/createBoardFromTeamAndCard"
    }),
    onCreateBoardStart({ team_id, teamName }) {
      this.teamId = team_id;
      this.teamName = teamName;
      this.opened = !this.opened;
    },
    async onCreateBoard() {
      const boardName = this.boardName;
      const team_id = this.teamId;
      this.createBoardFromTeamAndCard({ boardName, team_id });
      await this.fetchBoardsByTeams();
      this.opened = !this.opened;
      this.boardName = "";
      this.opened = !this.opened;
    }
  },
  computed: {
    ...mapGetters({
      boardsByTeams: "board/boardsByTeams"
    })
  },
  created() {
    this.fetchBoardsByTeams();
  }
};
</script>
<style></style>
