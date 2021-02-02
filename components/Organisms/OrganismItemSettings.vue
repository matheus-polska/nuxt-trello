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
        <div class="tags-container">
          <span
            :style="{ background: tag.color }"
            @click="startTagModal(tag, 'editing')"
            v-for="tag in tags"
            :key="tag.id"
            >{{ tag.title }}</span
          >
        </div>
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
    </div>
    <div class="settings-actions-container">
      <ul class="actions">
        <li @click="startTagModal(false, false)" id="tags-activator">
          Tags
        </li>
        <li style="background: transparent; height: 0; padding: 0" id="tags">
          <div class="tags-box" v-if="tagsModal">
            <span
              ref="closetagsmodal"
              class="btn-close-tags"
              @click="tagsModal = !tagsModal"
              >x</span
            >
            <div class="tags-header">
              <h4>Create a new tag</h4>
            </div>
            <input
              v-model="tagName"
              type="text"
              placeholder="enter the tag name"
            />
            <div class="tags-color">
              <label class="container-label">
                <input
                  v-model="pickedTagColor"
                  :value="'#61bd4f'"
                  type="radio"
                  name="color"
                />
                <span class="checkmark tag green-tag"></span>
              </label>
              <label class="container-label">
                <input
                  v-model="pickedTagColor"
                  :value="'#f2d600'"
                  type="radio"
                  name="color"
                />
                <span class="checkmark tag yellow-tag"></span>
              </label>
              <label class="container-label">
                <input
                  v-model="pickedTagColor"
                  :value="'#ff9f1a'"
                  type="radio"
                  name="color"
                />
                <span class="checkmark tag orange-tag"></span>
              </label>
              <label class="container-label">
                <input
                  v-model="pickedTagColor"
                  :value="'#eb5a46'"
                  type="radio"
                  name="color"
                />
                <span class="checkmark tag red-tag"></span>
              </label>
              <label class="container-label">
                <input
                  v-model="pickedTagColor"
                  :value="'#c377e0'"
                  type="radio"
                  name="color"
                />
                <span class="checkmark tag purple-tag"></span>
              </label>
              <label class="container-label">
                <input
                  v-model="pickedTagColor"
                  :value="'#0079bf'"
                  type="radio"
                  name="color"
                />
                <span class="checkmark tag blue-tag"></span>
              </label>
              <label class="container-label">
                <input
                  v-model="pickedTagColor"
                  :value="'#00c2e0'"
                  type="radio"
                  name="color"
                />
                <span class="checkmark tag light-blue-tag"></span>
              </label>
              <label class="container-label">
                <input
                  v-model="pickedTagColor"
                  :value="'#51e898'"
                  type="radio"
                  name="color"
                />
                <span class="checkmark tag light-green-tag"></span>
              </label>
              <label class="container-label">
                <input
                  v-model="pickedTagColor"
                  :value="'#ff78cb'"
                  type="radio"
                  name="color"
                />
                <span class="checkmark tag pink-tag"></span>
              </label>
              <label class="container-label">
                <input
                  v-model="pickedTagColor"
                  :value="'#344563'"
                  type="radio"
                  name="color"
                />
                <span class="checkmark tag black-tag"></span>
              </label>
              <label class="container-label">
                <input
                  v-model="pickedTagColor"
                  :value="'#b3bac5'"
                  type="radio"
                  name="color"
                />
                <span class="checkmark tag grey-tag"></span>
              </label>
            </div>
            <button @click="emitAddTag" class="button-tag-create">
              Save
            </button>
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
      tagsModal: false,
      tagName: "",
      pickedTagColor: "",
      mode: "",
      tag: {},
      tagEditingid: "",
      tags: []
    };
  },
  methods: {
    updateData(item) {
      this.taskTitle = item.title;
      this.list_id = item.list_id;
      this.taskDescription = item.description;
      this.taskId = item.id;
      this.tags = item.tags;
    },
    startTagModal(tag, mode) {
      if (tag) {
        this.tagName = tag.title;
        this.pickedTagColor = tag.color;
        this.tagEditingid = tag.id;
        this.tagsModal = !this.tagsModal;
        this.mode = mode;
      } else {
        this.tagsModal = !this.tagsModal;
        this.mode = false;
      }
    },
    emitAddTag() {
      if (this.mode == "editing") {
        this.$emit("onAddTag", {
          tagName: this.tagName,
          tagColor: this.pickedTagColor,
          tagId: this.tagEditingid,
          taskId: this.taskId,
          editing: true
        });
      } else {
        this.$emit("onAddTag", {
          tagName: this.tagName,
          tagColor: this.pickedTagColor,
          list_id: this.list_id,
          taskId: this.taskId,
          editing: false
        });
      }

      this.$refs.closetagsmodal.click();
      this.tagName = "";
      this.pickedTagColor = "";
      this.mode = "";
      this.tag = {};
      this.tagEditingid = "";
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
.container-label {
  display: block;
  position: relative;
  width: 18%;
  height: 29px;
  cursor: pointer;
}

/* Hide the browser's default checkbox */
.container-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 100%;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container-label:hover input ~ .checkmark {
  opacity: 0.6;
}

/* When the checkbox is checked, add a blue background */
.container-label input:checked ~ .checkmark {
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container-label input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container-label .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
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

.tags-container {
  padding-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}

.tags-container span {
  display: block;
  padding: 3px 18px;
  border-radius: 75px;
  font-size: 13px;
  color: white;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
