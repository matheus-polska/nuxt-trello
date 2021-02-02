<template>
  <div class="container mt-pattern">
    <div class="wrapper">
      <OrganismAside @emitClickFired="openedModal" />
      <div class="route-content">
        <NuxtChild />
      </div>
    </div>
    <OrganismModal
      @onCloseModal="opened = !opened"
      :opened="opened"
      title="Creating a new team"
    >
      <form @submit.prevent="onCreateTeam">
        <div>
          <label>Team name</label>
          <input
            placeholder=""
            type="insert the team name"
            v-model="teamName"
          />
        </div>
        <div>
          <label>Topic</label>
          <input
            placeholder=""
            type="Ex: Education, Human resources"
            v-model="teamTopic"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            id=""
            cols="30"
            rows="6"
            placeholder="Enter a short description about your team"
            v-model="teamDescription"
          ></textarea>
        </div>
        <button class="btn-submit">Create</button>
      </form>
    </OrganismModal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      opened: false,
      teamName: "",
      teamTopic: "",
      teamDescription: ""
    };
  },
  methods: {
    ...mapActions({
      createTeam: "main/createTeam",
      fetchTeamsByUser: "main/fetchTeamsByUser",
      fetchTeamsUserIsParticipating: "manageteam/fetchTeamsUserIsParticipating",
      fetchBoardsByTeams: "board/fetchBoardsByTeams"
    }),
    openedModal() {
      this.opened = true;
    },
    async onCreateTeam() {
      const newTeam = {
        teamName: this.teamName,
        teamTopic: this.teamTopic,
        teamDescription: this.teamDescription
      };
      await this.createTeam(newTeam);
      this.fetchBoardsByTeams();
      this.opened = false;
    }
  },
  created() {
    this.fetchTeamsByUser();
    this.fetchTeamsUserIsParticipating();
  }
};
</script>

<style scoped>
.container {
  width: 1190px;
  margin: auto;
}

.mt-pattern {
  margin-top: 40px;
}
@media screen and (max-width: 1200px) {
  .container {
    width: 90%;
  }
}

.wrapper {
  display: flex;
  align-items: flex-starts;
}

.route-content {
  flex: 1;
  padding: 0px 16px 0;
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
</style>
