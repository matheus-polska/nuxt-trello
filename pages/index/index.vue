<template>
  <div class="wrapper">
    <p>
      Welcome to Nuxt Trello. This is almost a trello clone made with Nuxt.js
      and Firebase.
    </p>

    <img src="~/assets/Task-pana.svg" alt="" />
    <p>Wih this application you will be able to:</p>
    <ul>
      <li>Create boards, lists and taks</li>
      <li>Add/remove other people to/from your team</li>
      <li>Define the role of your teamates, if editor or admin</li>
      <li>
        Create unlimited teams and boards, and add unlimited people to your team
      </li>
      <li>Add tags to your taks</li>
      <li>Create multiple teams and add different people to them</li>
      <li>Enjoy, its free : D</li>
    </ul>
  </div>
</template>
<script></script>
<style scoped>
img {
  width: 100%;
}
p {
  text-align: center;
  font-weight: bold;
}
.wrapper {
  padding-bottom: 30px;
  display: block !important;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
ul li {
  border-bottom: 1px solid #cecece;
  padding-bottom: 9px;
}
ul li:not(:last-of-type) {
  margin-bottom: 10px;
}
</style>
