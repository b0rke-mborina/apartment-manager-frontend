<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">To-do lists</h1>
		<!-- List of to do lists -->
		<div class="flex-div">
			<!-- Empty list sign -->
			<NoItemsDiv items="to-do lists" v-if="toDoLists.length === 0" />
			<!-- List of to-do lists -->
			<ToDoListItem v-for="toDoList in toDoLists" v-bind:key="toDoList.ObjectId" :toDoList="toDoList" />
		</div>
		<!-- Add new to do list button -->
		<div class="text-center">
			<router-link :to="{ name: 'todolist-creation' }" class="router-link">
				<AddNewButton/>
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService } from "@/services";

import ToDoListItem from '@/components/ToDoListItem.vue';
import AddNewButton from '@/components/ButtonAddNew.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'ToDoListsView',
	data() {
		return {
			toDoLists: []
		}
	},
	async mounted() {
		console.log("call data");
		let response = await AxiosService.get("/todolists");
		this.toDoLists = response.data;
		console.log(this.toDoLists);
		let toDoListsFromBackend = [
			{
				ObjectId: 100,
				title: "Buying backup items",
				date: "2022-04-10",
				items: [
					{
						ObjectId: 111,
						name: "Buy glasses",
						position: 0,
						completed: false
					},
					{
						ObjectId: 112,
						name: "Buy linens",
						position: 1,
						completed: true
					},
					{
						ObjectId: 113,
						name: "Buy towels",
						position: 2,
						completed: true
					},
					{
						ObjectId: 114,
						name: "Buy detergents",
						position: 3,
						completed: true
					},
					{
						ObjectId: 115,
						name: "Buy plates",
						position: 4,
						completed: false
					},
					{
						ObjectId: 116,
						name: "Buy cups",
						position: 5,
						completed: false
					}
				],
				completed: false
			},
			{
				ObjectId: 111,
				title: "Cleaning",
				date: "2022-08-05",
				items: [
					{
						ObjectId: 111,
						name: "Clean the kitchen",
						position: 0,
						completed: true
					},
					{
						ObjectId: 112,
						name: "Clean the bathroom",
						position: 1,
						completed: false
					}
				],
				completed: false
			},
			{
				ObjectId: 211,
				title: "Repair damages",
				date: "2022-06-01",
				items: [
					{
						ObjectId: 111,
						name: "Repaint the walls",
						position: 0,
						completed: true
					},
					{
						ObjectId: 112,
						name: "Replace broken glasses",
						position: 1,
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
		AddNewButton,
		NoItemsDiv,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
