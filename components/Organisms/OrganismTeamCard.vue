<template>
  <div>
    <div class="team-and-board-card">
      <AtomTeamCardTitle
        :description="team.teamDescription"
        :teamid="team.id"
        :titleText="team.teamName"
      />
      <div class="boards">
        <MoleculeBoardCard
          v-for="board in boards"
          :key="board.id"
          :routeid="board.id"
          :boardText="board.boardName"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["team", "boards"]
};
</script>
<style scoped>
.boards {
  display: flex;
  flex-wrap: wrap;
}
</style>
