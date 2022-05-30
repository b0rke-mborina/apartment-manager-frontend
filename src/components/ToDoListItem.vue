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

</style>
