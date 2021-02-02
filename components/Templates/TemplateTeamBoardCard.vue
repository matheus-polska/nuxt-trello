<template>
  <div class="wrapper">
    <div class="no-teams" v-if="boardsByTeams.length == 0">
      <img src="~assets/Task-bro.svg" alt="" />
      <p>You don't have any team yet</p>
    </div>
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
<style scoped>
.wrapper {
  padding-bottom: 30px;
}
label {
  margin-bottom: 5px;
  color: grey;
}
input {
  width: 100%;
  border: 1px solid #a6a6a6;
  outline: none;
  height: 31px;
  transition: border 0.3ms ease-in-out;
  border-radius: 5px;
}
textarea {
  width: 100%;
  outline: none;
  border: 1px solid #a6a6a6;
}

input:focus,
textarea:focus {
  border: 2px solid #026aa7;
}

.btn-submit {
  margin-top: 5px;
  background: #026aa7;
  border: none;
  outline: none;
  color: white;
  padding: 7px 29px;
  cursor: pointer;
}

.no-teams img {
  max-height: 400px;
  width: 100%;
}
.no-teams p {
  text-align: center;
  font-weight: bold;
}
</style>
