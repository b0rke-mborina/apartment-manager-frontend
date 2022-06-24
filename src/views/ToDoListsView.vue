<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">To-do lists</h1>
		<!-- List of to do lists -->
		<div class="flex-div">
			<!-- Empty list sign -->
			<NoItemsDiv items="to-do lists" v-if="toDoLists.length === 0" />
			<!-- List of to-do lists -->
			<ToDoListItem v-for="toDoList in toDoLists" v-bind:key="toDoList._id" :toDoList="toDoList" />
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
		// get all to-do lists data and save it to view data
		let response = await AxiosService.get("/todolists");
		this.toDoLists = response.data;
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
