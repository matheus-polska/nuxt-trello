import { db } from "~/firebase/db";

const tasks = db.collection("tasks");
const lists = db.collection("lists");
const boards = db.collection("boards");
const teams = db.collection("teams");
const managedteams = db.collection("manageteams");
const users = db.collection("users");

export const state = () => ({
  usersInManagedTeams: [],
  teamsUserIsParticipating: [],
  specificManagedUser: {},
  teamCreatorInfo: {}
});

export const mutations = {
  SET_USERS_IN_MANAGED_TEAMS(state, payload) {
    state.usersInManagedTeams = payload;
  },
  SET_TEAMS_USER_IS_PARTICIPATING(state, payload) {
    const newArray = payload.map(p => {
      p.text = p.teamName;
      p.route = `/${p.id}`;
      p.iconName = "hands-helping";
      return p;
    });
    state.teamsUserIsParticipating = newArray;
  },
  SET_SPECIFIC_MANAGED_USER(state, payload) {
    state.specificManagedUser = payload;
  },
  SET_TEAM_CREATOR_INFO(state, payload) {
    state.teamCreatorInfo = payload;
  }
};

export const actions = {
  async addUserToTeam(context, payload) {
    const managedTeamsRef = managedteams.doc();
    managedTeamsRef.set({
      ...payload,
      id: managedTeamsRef.id
    });
  },
  async fetchUsersInManagedTeams(context, payload) {
    let usersInManagedTeams = [];
    managedteams
      .where("team_id", "==", payload)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          usersInManagedTeams.push(doc.data());
        });
        context.commit("SET_USERS_IN_MANAGED_TEAMS", usersInManagedTeams);
      });
  },
  async fetchTeamsUserIsParticipating(context) {
    const email = context.rootGetters["auth/user"].email;
    managedteams
      .where("email", "==", email)
      .get()
      .then(function(querySnapshot) {
        const occurrenceOfTheUser = [];
        querySnapshot.forEach(doc => occurrenceOfTheUser.push(doc.data()));

        const teamIds = occurrenceOfTheUser.map(occ => occ.team_id);
        if (occurrenceOfTheUser.length < 1) {
          context.commit("SET_TEAMS_USER_IS_PARTICIPATING", []);
          return;
        }
        teamIds.forEach(async id => {
          await teams
            .where("id", "==", id)
            .get()
            .then(function(querySnapshot) {
              const teamsUserIsParticipating = [];
              querySnapshot.forEach(doc =>
                teamsUserIsParticipating.push(doc.data())
              );
              console.log(teamsUserIsParticipating);
              context.commit(
                "SET_TEAMS_USER_IS_PARTICIPATING",
                teamsUserIsParticipating
              );
            });
        });
      });
  },
  async fetchSpecificManagedUser(context, { team_id, email }) {
    const managedUser = {};
    managedteams
      .where("team_id", "==", team_id, "&&", "email", "==", email)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          Object.assign(managedUser, doc.data());
        });
        context.commit("SET_SPECIFIC_MANAGED_USER", managedUser);
      });
  },
  async changeUserRole(context, { $event, id }) {
    managedteams.doc(id).update({
      role: $event
    });
  },
  async fetchTeamCreatorInfo(context, id) {
    const teamCreatorInfo = {};
    users
      .where("uid", "==", id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          Object.assign(teamCreatorInfo, doc.data());
        });
        context.commit("SET_TEAM_CREATOR_INFO", teamCreatorInfo);
      });
  },
  async removeUser(context, id) {
    managedteams.doc(id).delete();
  }
};

export const getters = {
  usersInManagedTeams(state) {
    return state.usersInManagedTeams;
  },
  teamsUserIsParticipating(state) {
    return state.teamsUserIsParticipating;
  },
  managedUser(state) {
    return state.specificManagedUser;
  },
  teamCreatorInfo(state) {
    return state.teamCreatorInfo;
  }
};
