<template>
  <div>
    <div
      class="team-and-board-card"
      v-for="team in boardsByTeams"
      :key="team.id"
    >
      <AtomTeamBoardCardTitle
        :description="team.teamDescription"
        :titleText="team.teamName"
      />
      <div class="boards">
        <MoleculeBoardCard
          v-for="board in team.boards"
          :key="board.id"
          :routeid="board.id"
          :boardText="board.boardName"
        />
      </div>
      <AtomButtonCreateBoard
        @emitClickFired="
          $emit('emitClickFired', {
            team_id: team.id,
            teamName: team.teamName
          })
        "
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["boardsByTeams"]
};
</script>
<style scoped>
.boards {
  display: flex;
  flex-wrap: wrap;
}
.team-and-board-card:not(:last-of-type) {
  margin-bottom: 20px;
}
.team-and-board-card {
  border-bottom: 1px solid #d2d2d2;
  padding-bottom: 10px;
}
</style>
