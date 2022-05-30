<template>
	<v-card>
		<v-icon>mdi-note-edit</v-icon>
		<span>{{ note.header }}</span>
		<br>
		<span>{{ note.body }}</span>
		<br>
		<span>{{ note.important }}</span>
	</v-card>
</template>

<script>
export default {
	name: 'NoteItem',
	props: {
		note: Object
	}
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
