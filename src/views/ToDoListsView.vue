<template>
	<v-container absolute fluid class="main-content">
		<span>TO DO LISTS: OK</span>
		<ToDoListItem/>
	</v-container>
</template>

<script>
import ToDoListItem from '@/components/ToDoListItem.vue'

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
				ObjecId: 100,
				title: "Buying backup items",
				type: "repeating",
				date: "2022-04-10",
				repeatPeriod: [2, "m"],
				items: [
					{
						name: "Buy glasses",
						completed: false
					},
					{
						name: "Buy linens",
						completed: true
					},
					{
						name: "Buy towels",
						completed: true
					},
					{
						name: "Buy detergents",
						completed: true
					},
					{
						name: "Buy plates",
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
						name: "Clean the bethroom",
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
		ToDoListItem
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
