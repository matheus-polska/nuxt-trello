<template>
  <div class="settings-wrapper" ref="container">
    <div class="settings-edit-container">
      <div class="edit-helper field" style="cursor: pointer">
        <fa style="margin-right: 10px" :icon="['fas', 'edit']" />
        <input
          @blur="emitEditItem"
          placeholder=""
          type="Enter the board name"
          v-model="taskTitle"
        />
      </div>
      <div class="field">
        <div class="edit-helper">
          <fa style="margin-right: 10px" :icon="['fas', 'edit']" />
          <label>Description</label>
        </div>

        <textarea
          @focus="showButtonSave = true"
          @blur="handleBlur"
          id=""
          cols="30"
          rows="6"
          placeholder="Enter a short description about your team"
          v-model="taskDescription"
        ></textarea>
      </div>
      <button
        @click.prevent="emitEditItem"
        v-show="showButtonSave"
        class="btn-submit"
      >
        Save
      </button>
    </div>
    <div class="settings-actions-container">
      <ul class="actions">
        <li>Members</li>
        <li @click="tagsModal = !tagsModal" id="tags-activator">
          Tags
        </li>
        <li style="background: transparent; height: 0; padding: 0" id="tags">
          <div class="tags-box" v-if="tagsModal">
            <span class="btn-close-tags" @click="tagsModal = !tagsModal"
              >x</span
            >
            <div class="tags-header">
              <h4>Create a new tag</h4>
            </div>
            <input type="text" placeholder="enter the tag name" />
            <div class="tags-color">
              <div class="tag green-tag"></div>
              <div class="tag yellow-tag"></div>
              <div class="tag orange-tag"></div>
              <div class="tag red-tag"></div>
              <div class="tag purple-tag"></div>
              <div class="tag blue-tag"></div>
              <div class="tag light-blue-tag"></div>
              <div class="tag light-green-tag"></div>
              <div class="tag pink-tag"></div>
              <div class="tag black-tag"></div>
              <div class="tag grey-tag"></div>
            </div>
            <button class="button-tag-create">Create</button>
          </div>
        </li>
        <li @click="onDeleteTask">Excluir</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      taskTitle: "",
      taskDescription: "",
      list_id: "",
      showButtonSave: false,
      taskId: "",
      tagsModal: false
    };
  },
  methods: {
    updateData(item) {
      this.taskTitle = item.title;
      this.list_id = item.list_id;
      this.taskDescription = item.description;
      this.taskId = item.id;
    },
    handleBlur() {
      this.showButtonSave = false;
      this.emitEditItem();
    },
    onDeleteTask() {
      this.$emit("onDeleteTask", this.taskId);
    },
    emitEditItem() {
      this.$emit("onEditItem", {
        taskTitle: this.taskTitle,
        taskDescription: this.taskDescription,
        list_id: this.list_id,
        taskId: this.taskId
      });
    }
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
  border: none;
  outline: none;
  height: 31px;
  transition: border 0.3ms ease-in-out;
  border-radius: 5px;
}
textarea {
  width: 100%;
  outline: none;
  border: none;
}

input:focus,
textarea:focus {
  border: 2px solid #026aa7;
}

.edit-helper {
  display: flex;
  align-items: center;
}
.field:not(:last-of-type) {
  margin-bottom: 10px;
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
.settings-actions-container {
  width: 130px;
}
.settings-edit-container {
  flex: 1;
}
.settings-wrapper {
  display: flex;
}
.actions {
  display: unset;
}
.actions li {
  background-color: rgba(9, 30, 66, 0.07);
  box-shadow: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  display: block;
  height: 32px;
  margin-top: 8px;
  max-width: 300px;
  padding: 6px 12px;
  white-space: nowrap;
  cursor: pointer;
  font-size: 15px;
  position: relative;
}

.green-tag {
  background: #61bd4f;
}
.yellow-tag {
  background: #f2d600;
}
.orange-tag {
  background: #ff9f1a;
}
.red-tag {
  background: #eb5a46;
}
.purple-tag {
  background: #c377e0;
}
.blue-tag {
  background: #0079bf;
}
.light-blue-tag {
  background: #00c2e0;
}
.light-green-tag {
  background: #51e898;
}
.pink-tag {
  background: #ff78cb;
}
.black-tag {
  background: #344563;
}
.grey-tag {
  background: #b3bac5;
}
.btn-close-tags {
  display: block;
  padding: 1px 8px;
  background: #eb5a46;
  position: absolute;
  right: 0;
  color: white;
  top: 0;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}
.tags-box {
  width: 300px;
  background: white;
  position: absolute;
  left: 0;
  z-index: 999;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  border-radius: 3px;
  padding: 0 12px 12px;
  top: 0px;
}
.tags-header {
  padding: 8px 0;
  border-bottom: 1px solid #eeeeee;
  text-align: center;
  color: grey;
}

.tags-box input {
  outline: none;
  border: none;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  background-color: #fafbfc;
  box-sizing: border-box;
  -webkit-appearance: none;
  border-radius: 3px;
  display: block;
  line-height: 20px;
  margin-bottom: 12px;
  padding: 8px 12px;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  margin-top: 15px;
}
.tags-color {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.tag {
  width: 18%;
  height: 29px;
  margin-top: 10px;
  border-radius: 4px;
}

.tags-header h4 {
  font-weight: 400;
}

.button-tag-create {
  margin-top: 13px;
  background: #5aac44;
  border: none;
  outline: none;
  color: white;
  padding: 7px 18px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
