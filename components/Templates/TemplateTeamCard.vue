<template>
  <div class="wrapper">
    <OrganismTeamCard :boards="boards" :team="team" />
    <AtomButtonCreateBoard @emitClickFired="opened = !opened" />
    <OrganismModal
      @onCloseModal="opened = !opened"
      :opened="opened"
      :title="`Creating a new board on ${team.teamName}`"
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
      boardName: ""
    };
  },
  computed: {
    ...mapGetters({
      team: "main/IndividualTeam",
      boards: "board/boards",
      user: "auth/user",
      managedUser: "manageteam/managedUser"
    })
    // team() {
    //   return this.$store.getters["main/IndividualTeam"](
    //     this.$route.params.timeslug
    //   );
    //}
  },
  watch: {
    async $route(to, from) {
      await this.fetchIndividualTeam(this.$route.params.timeslug);
      this.fetchBoardsByTeam(this.$route.params.timeslug);
      this.fetchManagedUser();
    }
  },
  methods: {
    ...mapActions({
      fetchIndividualTeam: "main/fetchIndividualTeam",
      fetchBoardsByTeam: "board/fetchBoardsByTeam",
      createBoard: "main/createBoard",
      fetchSpecificManagedUser: "manageteam/fetchSpecificManagedUser"
    }),
    async onCreateBoard() {
      const boardName = this.boardName;
      if (this.user.uid == this.team.creator_id) {
        await this.createBoard(boardName);
        this.opened = false;
      } else if (this.managedUser.role == "editor") {
        alert("Sorry, editors can't create boards on this team");
        this.opened = false;
      } else {
        await this.createBoard(boardName);
        this.opened = false;
      }
    },
    fetchManagedUser() {
      console.log(this.team.creator_id, this.user.uid);
      if (this.team.creator_id !== this.user.uid) {
        this.fetchSpecificManagedUser({
          team_id: this.team.id,
          email: this.user.email
        });
      }
    }
  },
  async created() {
    await this.fetchIndividualTeam(this.$route.params.timeslug);
    this.fetchBoardsByTeam(this.$route.params.timeslug);
    this.fetchManagedUser();
  }
};
</script>
<style scoped>
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
.wrapper {
  padding-bottom: 30px;
}
</style>
