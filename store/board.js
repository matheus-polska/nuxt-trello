import { db } from "~/firebase/db";

const tasks = db.collection("tasks");
const lists = db.collection("lists");
const boards = db.collection("boards");
const tags = db.collection("tags");

export const state = () => ({
  boards: [],
  boardsByTeams: [],
  individualBoard: {},
  lists: [],
  tasks: [],
  tags: [],
  emulatedLists: [],
  emulatedTasks: []
});

export const mutations = {
  CREATE_EMULATED_LIST(state) {
    const emulatedList = state.lists.map(list => {
      const arrayOfTasks = state.emulatedTasks.filter(
        task => task.list_id == list.id
      );
      list.items = arrayOfTasks;
      return list;
    });
    state.emulatedLists = emulatedList;
  },
  SET_EMULATED_LIST(state, payload) {
    state.emulatedLists = payload;
  },
  SET_LISTS(state, payload) {
    state.lists = payload;
  },
  SET_TASKS(state, payload) {
    state.tasks = payload;
  },
  SET_TAGS(state, payload) {
    state.tags = payload;
  },
  CREATE_EMULATED_TASKS(state) {
    const emulatedTasks = state.tasks.map(tsk => {
      const arrayOfTags = state.tags.filter(tag => tag.task_id == tsk.id);
      tsk.tags = arrayOfTags;
      return tsk;
    });
    state.emulatedTasks = emulatedTasks;
  },
  SET_BOARDS(state, payload) {
    state.boards = payload;
  },
  SET_BOARDS_BY_TEAMS(state, { teams, data_boards }) {
    const emulatedBoardsByTeams = teams.map(team => {
      team.boards = data_boards.filter(board => board.team_id == team.id);
      return team;
    });

    state.boardsByTeams = emulatedBoardsByTeams;

    // console.log(data_boards);
  },
  SET_INDIVIDUAL_BOARD(state, payload) {
    state.individualBoard = payload;
  },
  SET_NEW_LIST_ORDER(state, i) {
    state.emulatedLists[i].order = i;
  },
  SPLICE_LIST(state, { toIndex, fromIndex }) {
    state.emulatedLists.splice(
      toIndex,
      0,
      state.emulatedLists.splice(fromIndex, 1)[0]
    );
  },
  SPLICE_ITEMS(state, { fromListRef, fromIndex, toListRef, toIndex }) {
    const fromListItems = state.emulatedLists[fromListRef].items;
    const toListItems = state.emulatedLists[toListRef].items;

    toListItems.splice(toIndex, 0, fromListItems.splice(fromIndex, 1)[0]);
  },
  SET_ITEM_ORDER(state, { ref }) {
    state.emulatedLists[ref].items = state.emulatedLists[ref].items.map(
      (item, i) => {
        item.order = i;
        return item;
      }
    );
  }
};

export const actions = {
  async moveList(context, [fromIndex, toIndex]) {
    context.commit("SPLICE_LIST", { toIndex, fromIndex });

    context.state.emulatedLists.map((list, i) => {
      context.commit("SET_NEW_LIST_ORDER", i);
      lists.doc(list.id).update({ order: list.order });
    });

    // context.dispatch("reorderList");
  },
  async moveItem(context, [fromListRef, fromIndex, toListRef, toIndex]) {
    const fromListItems = context.state.emulatedLists[fromListRef].items;
    const toListItems = context.state.emulatedLists[toListRef].items;

    const toList = context.getters.emulatedLists[toListRef];
    context.commit("SPLICE_ITEMS", {
      fromListRef,
      fromIndex,
      toListRef,
      toIndex
    });

    context.commit("SET_ITEM_ORDER", { ref: fromListRef });
    fromListItems.map(item => {
      tasks.doc(item.id).update({ order: item.order });
    });

    if (toList) {
      context.commit("SET_ITEM_ORDER", { ref: toListRef });
      toListItems.map(item => {
        item.list_id = toList.id;
        tasks.doc(item.id).update({ order: item.order, list_id: toList.id });
      });
    }
  },
  async fetchListsByBoard(context, payload) {
    return new Promise(resolve => {
      const data = [];
      lists
        .orderBy("order")
        .where("board_id", "==", payload)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            data.push(doc.data());
          });
          context.commit("SET_LISTS", data);
          context.commit("CREATE_EMULATED_LIST");
          resolve();
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
    });
  },
  async fetchTagsByBoard(context, payload) {
    return new Promise(resolve => {
      const data = [];
      tags
        .where("board_id", "==", payload)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            data.push(doc.data());
          });
          context.commit("SET_TAGS", data);
          resolve();
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
    });
  },
  async fetchBoardsByTeams(context) {
    const teams = context.rootGetters["main/userTeams"];
    const data_boards = [];
    console.log("cheguei");

    if (teams.length == 0) {
      context.state.boardsByTeams = [];
      return;
    }
    await teams.forEach(team => {
      boards
        .where("team_id", "==", team.id)
        .get()
        .then(function(bds) {
          bds.forEach(doc => {
            if (doc.data()) {
              console.log(doc.data());
              data_boards.push(doc.data());
            }
          });
          context.commit("SET_BOARDS_BY_TEAMS", { teams, data_boards });
        });
    });
  },
  async fetchBoardsByTeam(context, payload) {
    console.log(payload);
    const userteamid = context.rootGetters["main/userTeams"];
    const participatingTeamId =
      context.rootGetters["manageteam/teamsUserIsParticipating"];

    const id =
      userteamid.length > 0 && userteamid.some(t => t.id == payload)
        ? userteamid.find(t => t.route == `/${payload}`).id
        : participatingTeamId.find(t => t.route == `/${payload}`).id;

    boards.where("team_id", "==", id).onSnapshot(function(querySnapshot) {
      const boards = [];
      querySnapshot.forEach(doc => boards.push(doc.data()));
      context.commit("SET_BOARDS", boards);
    });
  },
  async fetchTasksByBoard(context, payload) {
    return new Promise(resolve => {
      const data = [];
      tasks
        .where("board_id", "==", payload)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            data.push(doc.data());
          });

          context.commit("SET_TASKS", data);
          context.commit("CREATE_EMULATED_TASKS");
          resolve();
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
    });
  },
  async fetchIndividualBoard(context, payload) {
    return new Promise((resolve, reject) => {
      boards.where("id", "==", payload).onSnapshot(function(querySnapshot) {
        let board = {};
        querySnapshot.forEach(doc => {
          board = doc.data();
        });
        context.commit("SET_INDIVIDUAL_BOARD", board);
        resolve();
      });
    });
  },
  async createList(context, payload) {
    const userId = context.rootGetters["auth/user"].uid;
    const board = context.getters.individualBoard;
    const listLength = context.getters.emulatedLists.length;

    const newList = {
      creator_id: userId,
      team_id: board.team_id,
      board_id: board.id,
      order: listLength,
      title: payload
    };
    const listsDocRef = lists.doc();
    await listsDocRef.set({
      ...newList,
      id: listsDocRef.id
    });
    console.log("List has been added");
  },
  async createTask(context, payload) {
    const userId = context.rootGetters["auth/user"].uid;
    const board = context.getters.individualBoard;
    const listItems = context.getters.emulatedLists.find(
      l => l.id == payload.list_id
    ).items;

    const newTask = {
      creator_id: userId,
      team_id: board.team_id,
      board_id: board.id,
      list_id: payload.list_id,
      order: listItems.length,
      title: payload.title,
      description: payload.description ? payload.description : " "
    };
    const tasksDocRef = tasks.doc();
    await tasksDocRef.set({
      ...newTask,
      id: tasksDocRef.id
    });
    console.log("Task has been added");
  },
  async createTag(context, payload) {
    const userId = context.rootGetters["auth/user"].uid;
    const board = context.getters.individualBoard;

    const newTag = {
      creator_id: userId,
      color: payload.tagColor,
      team_id: board.team_id,
      board_id: board.id,
      list_id: payload.list_id,
      task_id: payload.taskId,
      title: payload.tagName
    };
    const tagsDocRef = tags.doc();
    await tagsDocRef.set({
      ...newTag,
      id: tagsDocRef.id
    });
    console.log("Tag has been added");
  },
  async updateTag(context, payload) {
    const updatedTag = {
      color: payload.tagColor,
      title: payload.tagName
    };
    await tags.doc(payload.tagId).update(updatedTag);

    console.log("Tag has been updated");
  },
  async editTask(context, payload) {
    tasks.doc(payload.id).update({
      title: payload.title,
      description: payload.description
    });
  },
  async editListTitle(context, payload) {
    lists.doc(payload.id).update({
      title: payload.title
    });
  },
  async deleteTask(context, payload) {
    await tasks.doc(payload).delete();
  },
  async removeList(context, payload) {
    await lists.doc(payload).delete();

    const batch = db.batch();
    tasks
      .where("list_id", "==", payload)
      .get()
      .then(tsks => {
        tsks.forEach(doc => batch.delete(doc.ref));
        batch.commit();
      });
  },
  async removeBoard(context, payload) {
    await boards.doc(payload).delete();

    const batchOne = db.batch();

    await lists
      .where("board_id", "==", payload)
      .get()
      .then(lts => {
        lts.forEach(doc => batchOne.delete(doc.ref));
        batchOne.commit();
      });

    const batchTwo = db.batch();

    await tasks
      .where("board_id", "==", payload)
      .get()
      .then(tks => {
        tks.forEach(doc => batchTwo.delete(doc.ref));
        batchTwo.commit();
      });
  }
};

export const getters = {
  emulatedLists(state) {
    return state.emulatedLists;
  },
  boards(state) {
    return state.boards;
  },
  itemsFromList: (state, getters) => index => {
    return getters.emulatedLists[index].items.sort((a, b) => a.order - b.order);
  },
  individualBoard(state) {
    return state.individualBoard;
  },
  boardsByTeams(state) {
    return state.boardsByTeams;
  },
  emulatedTasks(state) {
    return state.emulatedTasks;
  }
};
