<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">To-do lists</h1>
		<!-- List of to do lists -->
		<div class="flex-div">
			<!-- Empty list sign -->
			<NoItemsDiv items="to-do lists" v-if="toDoLists.length === 0 && !loading" />
			<!-- List of to-do lists -->
			<ToDoListItem v-for="toDoList in toDoLists" v-bind:key="toDoList._id" :toDoList="toDoList" />
			<!-- Loading circular progress bar -->
			<v-progress-circular v-if="loading" indeterminate color="#A5D4FF"></v-progress-circular>
			<!-- Snackbar for showing errors -->
			<v-snackbar :value="snackbar" :timeout="-1" rounded="xl" color="#FF6F6F" width="400">
				<span class="snackbar">{{ errorMsg }}</span>
				<template v-slot:action="{ attrs }" class="snackbar-content">
					<v-btn text v-bind="attrs" @click="errorMsg = null, snackbar = false" color="#000000">
						CLOSE
					</v-btn>
				</template>
			</v-snackbar>
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
			toDoLists: [],
			loading: false,
			errorMsg: null,
			snackbar: false
		}
	},
	async mounted() {
		// get all to-do lists data and save it to view data
		this.loading = true;
		try {
			let response = await AxiosService.get("/todolists");
			this.toDoLists = response.data;
		} catch (error) {
			this.errorMsg = "Error has occured. Please try again.";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loading = false;
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
	.snackbar-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.snackbar {
		color: #000000;
	}
</style>
