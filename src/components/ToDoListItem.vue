<template>
	<v-card>
		<v-icon>mdi-format-list-checks</v-icon>
		<span>{{ toDoList.title }} {{ toDoList.type }}</span>
		<br>
		<span>{{ toDoList.date }}, {{ toDoList.repeatPeriod }}</span>
		<br>
		<span>{{ toDoList.items[0].name }} - {{ toDoList.items[0].completed }}</span>
	</v-card>
</template>

<script>
export default {
	name: 'ToDoListItem',
	props: {
		toDoList: Object
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
