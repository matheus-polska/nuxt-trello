import { db } from "~/firebase/db";

const teams = db.collection("teams");
const boards = db.collection("boards");

export const state = () => ({
  userTeams: [],
  individualTeam: {}
});

export const mutations = {
  SET_USERTEAMS(state, payload) {
    const newArray = payload.map(p => {
      p.text = p.teamName;
      p.route = `/${p.id}`;
      p.iconName = "user-friends";
      return p;
    });
    state.userTeams = newArray;
  },
  SET_INDIVIDUALTEAM(state, payload) {
    state.individualTeam = payload;
  }
};

export const actions = {
  async createTeam(context, newTeam) {
    const userId = context.rootGetters["auth/user"].uid;
    newTeam.creator_id = userId;
    const teamDocRef = teams.doc();
    await teamDocRef.set({
      ...newTeam,
      id: teamDocRef.id
    });
    console.log("Team has been added");
  },
  async fetchTeamsByUser(context) {
    return new Promise(resolve => {
      const userId = context.rootGetters["auth/user"].uid;
      teams
        .where("creator_id", "==", userId)
        .onSnapshot(function(querySnapshot) {
          const teams = [];
          querySnapshot.forEach(doc => teams.push(doc.data()));
          context.commit("SET_USERTEAMS", teams);
          resolve();
        });
    });
  },
  fetchIndividualTeam(context, payload) {
    return new Promise((resolve, reject) => {
      const userteamid = context.state.userTeams;
      const participatingTeamId =
        context.rootGetters["manageteam/teamsUserIsParticipating"];

      const id =
        userteamid.length > 0 && userteamid.some(t => t.id == payload)
          ? userteamid.find(t => t.route == `/${payload}`).id
          : participatingTeamId.find(t => t.route == `/${payload}`).id;

      teams.where("id", "==", id).onSnapshot(function(querySnapshot) {
        let team = {};
        querySnapshot.forEach(doc => {
          team = doc.data();
        });
        context.commit("SET_INDIVIDUALTEAM", team);
        resolve();
      });
    });
  },
  async createBoard(context, boardName) {
    const userId = context.rootGetters["auth/user"].uid;
    const teamId = context.getters.IndividualTeam.id;

    const newBoard = {
      boardName: boardName,
      creator_id: userId,
      team_id: teamId
    };
    const boardsDocRef = boards.doc();
    await boardsDocRef.set({
      ...newBoard,
      id: boardsDocRef.id
    });
    console.log("Team has been added");
  },
  async createBoardFromTeamAndCard(context, { boardName, team_id }) {
    const userId = context.rootGetters["auth/user"].uid;
    const newBoard = {
      boardName: boardName,
      creator_id: userId,
      team_id: team_id
    };
    const boardsDocRef = boards.doc();
    await boardsDocRef.set({
      ...newBoard,
      id: boardsDocRef.id
    });
    console.log("Team has been added");
  }
};

export const getters = {
  userTeams(state) {
    return state.userTeams;
  },
  IndividualTeam(state) {
    return state.individualTeam;
  }
  // IndividualTeam: state => route => {
  //   return state.userTeams.find(t => t.route === `/${route}`);
  // }
};
