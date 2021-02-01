<template>
  <div>
    <h3>Membros do time</h3>
    <button v-if="allowUser">Deleter time</button>
    <div v-if="allowUser" class="field">
      <input
        @keydown.enter="onAddUserToTeam"
        type="text"
        placeholder="Add a member by email"
        v-model="email"
      />
    </div>
    <div class="members-list">
      <ul>
        <li>
          <span class="email">{{ teamCreatorInfo.email }}</span>
          <span class="bg-read role">Creator</span>
        </li>
        <li v-for="managedUser in usersInManagedTeams" :key="managedUser.id">
          <span class="email">{{ managedUser.email }}</span>
          <button
            class="btn-remove-user"
            @click="onRemoveUser(managedUser.id, true)"
            v-if="user.email == managedUser.email"
          >
            Sair
          </button>
          <button
            class="btn-remove-user"
            v-if="allowUser"
            @click="onRemoveUser(managedUser.id)"
          >
            Excluir
          </button>
          <div v-if="allowUser">
            <persmissionSelect
              :class="{
                'bg-green': managedUser.role == 'editor',
                'bg-blue': managedUser.role == 'admin'
              }"
              @eventSelectFired="onChangeUserRole($event, managedUser.id)"
              :role="managedUser.role"
            />
          </div>
          <span
            v-else
            :class="{
              role: true,
              'bg-green': managedUser.role == 'editor',
              'bg-blue': managedUser.role == 'admin'
            }"
            >{{ managedUser.role }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import persmissionSelect from "@/ui/permissionSelect";

export default {
  components: {
    persmissionSelect
  },
  data() {
    return {
      email: "",
      team_creator_id: ""
    };
  },
  methods: {
    ...mapActions({
      addUserToTeam: "manageteam/addUserToTeam",
      fetchUsersInManagedTeams: "manageteam/fetchUsersInManagedTeams",
      changeUserRole: "manageteam/changeUserRole",
      fetchTeamCreatorInfo: "manageteam/fetchTeamCreatorInfo",
      removeUser: "manageteam/removeUser",
      fetchTeamsUserIsParticipating: "manageteam/fetchTeamsUserIsParticipating"
    }),
    async onAddUserToTeam() {
      const payload = {
        email: this.email,
        team_id: this.$route.params.timeslug,
        role: "admin"
      };
      await this.addUserToTeam(payload);
      this.email = "";
      this.fetchUsersInManagedTeams(this.$route.params.timeslug);
    },
    async onChangeUserRole($event, id) {
      await this.changeUserRole({ $event, id });
      this.fetchUsersInManagedTeams(this.$route.params.timeslug);
    },
    async onRemoveUser(id, leave) {
      await this.removeUser(id);
      this.fetchUsersInManagedTeams(this.$route.params.timeslug);

      if (leave) {
        await this.fetchTeamsUserIsParticipating();
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapGetters({
      usersInManagedTeams: "manageteam/usersInManagedTeams",
      userTeams: "main/userTeams",
      teamsUserIsParticipating: "manageteam/teamsUserIsParticipating",
      user: "auth/user",
      teamCreatorInfo: "manageteam/teamCreatorInfo"
    }),
    allowUser() {
      return this.user.uid == this.team_creator_id;
    }
  },
  created() {
    this.fetchUsersInManagedTeams(this.$route.params.timeslug);
    console.log("CRIADO");

    const userteamid = this.userTeams;
    const participatingTeamId = this.teamsUserIsParticipating;

    this.team_creator_id =
      userteamid.length > 0 &&
      userteamid.some(t => t.id == this.$route.params.timeslug)
        ? userteamid.find(t => t.id == this.$route.params.timeslug).creator_id
        : participatingTeamId.find(t => t.id == this.$route.params.timeslug)
            .creator_id;

    this.fetchTeamCreatorInfo(this.team_creator_id);
  }
};
</script>
<style scoped>
.field {
  margin-top: 10px;
}
input {
  width: 100%;
  border: 1px solid #a6a6a6;
  outline: none;
  height: 31px;
  transition: border 0.3ms ease-in-out;
  border-radius: 5px;
  padding: 5px;
}
input:focus {
  border: 2px solid #026aa7;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 23px 0;
  border-bottom: 1px solid #d1d1d1;
  font-size: 15px;
  color: #707070;
}
li span {
  display: block;
}

select {
  width: 100px;
  padding: 3px;
  border: 1px solid #b6b6b6;
  background: #4e97c2;
  color: white;
  border: none;
  outline: none;
}

.btn-remove-user {
  display: block;
  padding: 5px 15px;
  color: white;
  border: none;
  outline: none;
  background: #4e97c2;
  border-radius: 3px;
  cursor: pointer;
}

.role {
  display: block;
  padding: 5px 15px;
  border-radius: 19px;
  color: white;
}

.bg-green {
  background: #3bc56b;
}
.bg-blue {
  background: black;
}
.bg-read {
  background: red;
}
</style>
