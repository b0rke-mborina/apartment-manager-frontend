<template>
	<v-container absolute fluid class="main-content">
		<h1 class="mt-5 mb-4 text-center">To-do lists</h1>
		<div class="flex-div">
			<ToDoListItem v-for="toDoList in toDoLists" v-bind:key="toDoList.ObjectId" :toDoList="toDoList" />
		</div>
		<div class="text-center">
			<AddNewButton/>
		</div>
	</v-container>
</template>

<script>
import ToDoListItem from '@/components/ToDoListItem.vue';
import AddNewButton from '@/components/ButtonAddNew.vue';

export default {
	name: 'ToDoListsView',
	data() {
		return {
			toDoLists: []
		}
	},
	mounted() {
		let toDoListsFromBackend = [
			{
				ObjectId: 100,
				title: "Buying backup items",
				type: "repeating",
				date: "2022-04-10",
				repeatPeriod: [2, "m"],
				items: [
					{
						ObjectId: 111,
						name: "Buy glasses",
						completed: false
					},
					{
						ObjectId: 112,
						name: "Buy linens",
						completed: true
					},
					{
						ObjectId: 113,
						name: "Buy towels",
						completed: true
					},
					{
						ObjectId: 114,
						name: "Buy detergents",
						completed: true
					},
					{
						ObjectId: 115,
						name: "Buy plates",
						completed: false
					},
					{
						ObjectId: 116,
						name: "Buy cups",
						completed: false
					}
				],
				completed: false
			},
			{
				ObjectId: 111,
				title: "Cleaning",
				type: "repeating",
				date: "2022-08-05",
				repeatPeriod: [1, "w"],
				items: [
					{
						ObjectId: 111,
						name: "Clean the kitchen",
						completed: true
					},
					{
						ObjectId: 112,
						name: "Clean the bathroom",
						completed: false
					}
				],
				completed: false
			},
			{
				ObjectId: 211,
				title: "Repair damages",
				type: "one-time",
				date: "2022-06-01",
				repeatPeriod: [],
				items: [
					{
						ObjectId: 111,
						name: "Repaint the walls",
						completed: true
					},
					{
						ObjectId: 112,
						name: "Replace broken glasses",
						completed: true
					}
				],
				completed: true
			}
		];
		this.toDoLists = toDoListsFromBackend;
		console.log(this.toDoLists);
	},
	components: {
		ToDoListItem,
		AddNewButton
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
