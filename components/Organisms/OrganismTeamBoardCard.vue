<template>
  <div>
    <div
      class="team-and-board-card"
      v-for="team in boardsByTeams"
      :key="team.id"
    >
      <AtomTeamBoardCardTitle :titleText="team.teamName" />
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
</style>
