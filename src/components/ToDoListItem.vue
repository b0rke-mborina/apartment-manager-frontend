<template>
	<v-card color="#E3EAEF" width="250" class="ma-4 rounded-xl notes-card">
		<div class="todolists-header pa-3">
			<v-card-title class="py-2 justify-center text-center">{{ toDoList.title }}</v-card-title>
			<div class="flex-head">
				<v-card-subtitle class="px-2 py-0">{{ toDoList.date }}</v-card-subtitle>
				<v-icon icon small class="px-2 py-0">mdi-repeat</v-icon>
			</div>
		</div>
		<div class="flex-main pa-3">
			<v-card-text v-for="item in toDoList.items"  v-bind:key="item.ObjectId" class="pa-1">
				<v-icon icon>mdi-checkbox-blank-circle-outline</v-icon>
				<span class="px-2">{{ item.name }}</span>
			</v-card-text>
			<v-card-text v-if="toDoList.items.length >= 5" class="pa-0 text-center">
				<v-icon icon color="#000000">mdi-dots-horizontal</v-icon>
			</v-card-text>
		</div>
		<v-spacer v-if="toDoList.items.length < 5"></v-spacer>
		<v-card-actions class="flex-bottom pa-3">
			<v-icon icon color="#0000FF">mdi-pencil</v-icon>
			<v-icon icon color="#FF0000">mdi-trash-can-outline</v-icon>
		</v-card-actions>
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
.todolists-header {
	background-color: #A5D4FF;
}
.flex-head {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.flex-main {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.flex-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>
