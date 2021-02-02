<template>
  <div class="container">
    <div class="board-header">
      <h3>{{ individualBoard.boardName }}</h3>
      <button @click="onRemoveBoard">Delete Board</button>
    </div>
    <div class="lists">
      <Container
        lock-axis="x"
        orientation="horizontal"
        drag-handle-selector=".list-drag-handle"
        @drop="onListDrop"
      >
        <Draggable v-for="(list, i) in lists" :key="list.id">
          <div class="list">
            <div class="list-header">
              <entryInputList
                @eventEditListFired="onEditListTitle($event, list.id)"
                :listTitle="list.title"
              />
              <div>
                <span @click="onRemoveList(list.id)" class="remove-list-btn"
                  ><fa :icon="['fas', 'trash-alt']"
                /></span>
                <span class="move-list list-drag-handle">Move</span>
              </div>
            </div>
            <div class="list-content">
              <Container
                group-name="list"
                drag-class="card-ghost"
                drop-class="card-ghost-drop"
                non-drag-area-selector=".icon"
                :animation-duration="100"
                @drop="e => onCardDrop(e, list, i)"
              >
                <Draggable v-for="item in itemsFromList(i)" :key="item.id">
                  <div @click="onItemSettings(item)" class="list-card">
                    <div class="tags">
                      <span
                        :style="{ background: tag.color }"
                        v-for="tag in item.tags"
                        :key="tag.id"
                      ></span>
                    </div>
                    {{ item.title }}
                  </div>
                </Draggable>
                <div>
                  <entryInput :listId="list.id" @eventAddFired="addItem" />
                </div>
              </Container>
            </div>
          </div>
        </Draggable>
        <div
          @click="openedCreateListModal = !openedCreateListModal"
          class="add-new-list"
        >
          <fa :icon="['fas', 'plus']" />
          <span>Add new list</span>
        </div>
      </Container>
    </div>
    <OrganismModal
      :opened="openedItemSettings"
      @onCloseModal="openedItemSettings = !openedItemSettings"
      title="Item settings"
    >
      <OrganismItemSettings
        @onDeleteTask="onDeleteTask"
        @onEditItem="editItem"
        @onAddTag="onAddTag"
        ref="settings"
      />
    </OrganismModal>
    <OrganismModal
      :opened="openedFullItemModal"
      @onCloseModal="openedFullItemModal = !openedFullItemModal"
      title="Creating a new task"
    >
      <OrganismFullItemForm @onAddFullItem="addFullItem" ref="form" />
    </OrganismModal>
    <OrganismModal
      @onCloseModal="openedCreateListModal = !openedCreateListModal"
      title="Creating a new list"
      :opened="openedCreateListModal"
    >
      <form @submit.prevent="onCreateList">
        <div>
          <label>List name</label>
          <input
            placeholder=""
            type="Enter the board name"
            v-model="listName"
          />
        </div>
        <button class="btn-submit">Create list</button>
      </form>
    </OrganismModal>
    <pre style="display: none">{{ lists }}lists</pre>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { Container, Draggable } from "vue-smooth-dnd";
import { makeDropHandler } from "@/handlers/dropHandler.js";
import entryInput from "@/ui/entryInput.vue";
import entryInputList from "@/ui/entryInputList.vue";

export default {
  components: {
    Container,
    Draggable,
    entryInput,
    entryInputList
  },
  data() {
    return {
      openedCreateListModal: false,
      openedFullItemModal: false,
      openedItemSettings: false,
      listName: ""
    };
  },
  methods: {
    ...mapActions({
      fetchLists: "board/fetchListsByBoard",
      fetchTasks: "board/fetchTasksByBoard",
      moveList: "board/moveList",
      moveItem: "board/moveItem",
      fetchIndividualBoard: "board/fetchIndividualBoard",
      createList: "board/createList",
      createTask: "board/createTask",
      editTask: "board/editTask",
      deleTask: "board/deleteTask",
      removeList: "board/removeList",
      editListTitle: "board/editListTitle",
      removeBoard: "board/removeBoard",
      fetchIndividualTeam: "main/fetchIndividualTeam",
      fetchTeamsByUser: "main/fetchTeamsByUser",
      fetchTeamsUserIsParticipating: "manageteam/fetchTeamsUserIsParticipating",
      fetchSpecificManagedUser: "manageteam/fetchSpecificManagedUser",
      fetchTagsByBoard: "board/fetchTagsByBoard",
      createTag: "board/createTag",
      updateTag: "board/updateTag"
    }),
    onListDrop: makeDropHandler("onListDropComplete"),
    onListDropComplete(src, trg) {
      this.moveList([src.index, trg.index]);
    },
    onCardDrop: makeDropHandler("onCardDropComplete"),
    onCardDropComplete(src, trg, element, payload) {
      this.moveItem([src.params[1], src.index, trg.params[1], trg.index]);
    },
    async onCreateList() {
      await this.createList(this.listName);
      this.reFetchListsAndTasks();
      this.listName = "";
      this.openedCreateListModal = !this.openedCreateListModal;
    },
    async addItem({ list_id, title, event }) {
      if (event) {
        this.showModal({ list_id, title });
        return;
      }
      await this.createTask({ list_id, title });
      await this.reFetchListsAndTasks();
      setTimeout(() => {
        this.scrollToElement();
      }, 230);
    },
    async onAddTag(payload) {
      if (payload.editing) {
        await this.updateTag(payload);
      } else {
        await this.createTag(payload);
      }
      await this.fetchTagsByBoard(this.$route.params.boardslug);
      await this.reFetchListsAndTasks();

      this.$nextTick(() => {
        const task = this.emulatedTasks.find(tsk => tsk.id === payload.taskId);
        this.$refs.settings.updateData(task);
        console.log(task);
      });
    },
    async addFullItem(item) {
      await this.createTask({
        title: item.taskTitle,
        list_id: item.list_id,
        description: item.taskDescription
      });
      this.reFetchListsAndTasks();
      this.openedFullItemModal = false;
    },
    showModal(item) {
      this.openedFullItemModal = true;
      this.$nextTick(() => {
        this.$refs.form.updateData(item);
      });
    },
    onItemSettings(item) {
      this.openedItemSettings = true;
      this.$nextTick(() => {
        this.$refs.settings.updateData(item);
      });
    },
    async editItem(item) {
      const editingTask = {
        title: item.taskTitle,
        id: item.taskId,
        description: item.taskDescription
      };
      await this.editTask(editingTask);
      this.reFetchListsAndTasks();
    },
    async onDeleteTask(id) {
      await this.deleTask(id);
      this.reFetchListsAndTasks();
      this.openedItemSettings = false;
    },
    async onRemoveList(id) {
      const sure = confirm(
        "This list and all its tasks will be removed. Do you want to continue?"
      );
      if (sure) {
        await this.removeList(id);
        this.reFetchListsAndTasks();
      }
    },
    async reFetchListsAndTasks() {
      await this.fetchTasks(this.$route.params.boardslug);
      await this.fetchLists(this.$route.params.boardslug);
    },
    async onEditListTitle({ title }, id) {
      const payload = {
        title: title,
        id: id
      };
      await this.editListTitle(payload);
      this.reFetchListsAndTasks();
    },
    async onRemoveBoard() {
      if (this.user.uid == this.team.creator_id) {
        const sure = confirm(
          "All lists and tasks will be removed. Do you want to continue?"
        );
        if (sure) {
          const id = this.$route.params.boardslug;
          await this.removeBoard(id);
          this.$router.push("/boards");
        }
      } else if (this.managedUser.role == "editor") {
        alert(
          "Sorry, editors can't remove boards. Please, ask for permsission "
        );
      } else {
        const sure = confirm(
          "All lists and tasks will be removed. Do you want to continue?"
        );
        if (sure) {
          const id = this.$route.params.boardslug;
          await this.removeBoard(id);
          this.$router.push("/boards");
        }
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
    },
    scrollToElement() {
      const el = this.$el.getElementsByClassName("list-content")[0];
      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollTop = el.scrollHeight + 120;
      }
    }
  },
  computed: {
    ...mapState("board", {
      lists: state => state.emulatedLists
    }),
    ...mapGetters({
      lists: "board/emulatedLists",
      itemsFromList: "board/itemsFromList",
      individualBoard: "board/individualBoard",
      team: "main/IndividualTeam",
      user: "auth/user",
      managedUser: "manageteam/managedUser",
      emulatedTasks: "board/emulatedTasks"
    })
  },
  async created() {
    await this.fetchTeamsByUser();
    await this.fetchTeamsUserIsParticipating();
    await this.fetchTagsByBoard(this.$route.params.boardslug);
    await this.fetchTasks(this.$route.params.boardslug);
    this.fetchLists(this.$route.params.boardslug);
    await this.fetchIndividualBoard(this.$route.params.boardslug);
    await this.fetchIndividualTeam(this.individualBoard.team_id);
    this.fetchManagedUser();
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
}
li {
  margin-right: 20px;
  height: 300px;
  background: black;
  color: white;
  padding: 10px;
}
.board-header {
  display: flex;
  align-items: center;
}
.board-header button {
  border: none;
  margin-left: 10px;
  padding: 6px 11px;
  background: #ff5050;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}
.lists {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  user-select: none;
  white-space: nowrap;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 8px;
  position: absolute;
  top: 82px;
  right: 0;
  bottom: 0px;
  left: 0;
}
.list {
  width: 320px;
  height: auto;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  background-color: #ebecf0;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(9, 30, 66, 0.25);
}
.list-header {
  font-weight: bold;
  padding: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-header .move-list {
  cursor: move;
}

.remove-list-btn {
  margin-right: 13px;
  color: #ff5050;
  cursor: pointer;
}

.list-content {
  padding: 7px;
}
.list-card {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 50px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  padding: 6px 8px 10px;
  font-size: 14px;
}
.container {
  padding: 4px 10px;
  overflow: auto;
}

.add-new-list {
  background: rgb(78 151 194 / 20%);
  height: 39px;
  width: 147px;
  justify-content: center;
  font-weight: 200;
  cursor: pointer;
  border-radius: 3px;
  transition: background 150ms ease-in;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.add-new-list span {
  margin-left: 10px;
}
.add-new-list:hover {
  background-color: rgb(78 151 194 / 30%);
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
.tags {
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.tags span {
  display: block;
  padding: 3px 18px;
  border-radius: 75px;
  font-size: 13px;
  color: white;
  margin-right: 10px;
  margin-top: 10px;
}

/* SCROLL */
.smooth-dnd-container {
  height: 100%;
}

.list-content {
  overflow-y: auto;
  height: 100%;
  overflow-x: hidden;
}

.list {
  overflow-y: auto;
  max-height: -webkit-fill-available;
  overflow-x: hidden;
}

.list-content::-webkit-scrollbar-track {
  background: rgba(9, 30, 66, 0.08);
}
.list-content::-webkit-scrollbar {
  width: 8px;
}

.list-content::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-radius: 10px;
}

.list-content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #d0d0d0;
}
</style>
