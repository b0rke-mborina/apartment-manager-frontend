<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Edit a to-do list</h1>
		<!-- Loading circular progress bar -->
		<div class="text-center">
			<v-progress-circular v-if="loadingData" indeterminate color="#A5D4FF"></v-progress-circular>
		</div>
		<!-- To-do list title -->
		<v-text-field v-model="toDoList.title" solo rounded v-if="!loadingData"
						clearable clear-icon="mdi-close-circle"
						label="To-do list title..."
						background-color="#A5D4FF"
						class="heading-text-field mt-9 mb-4 mx-auto">
		</v-text-field>
		<!-- To-do list items -->
		<draggable v-model="toDoList.items" v-if="!loadingData"
					  :group="{ name: 'toDoListItems', pull: 'clone', put: false }"
					  @start="drag=true" @end="drag=false" @change="updatePositions()"
					  :animation="200"
					  ghost-class="moving-card">
			<transition-group name="fade">
				<div v-for="item in toDoList.items" v-bind:key="item.position"
					class="item-flex mx-auto">
					<!-- Checkbox - completed -->
					<v-checkbox v-model="item.completed"
									:on-icon="'mdi-checkbox-marked-circle'"
									:off-icon="'mdi-checkbox-blank-circle-outline'"
									color="#A5D4FF" class="mt-2">
					</v-checkbox>
					<!-- Name of item -->
					<v-text-field v-model="item.name"
									solo rounded
									label="Item..."
									background-color="#A5D4FF">
					</v-text-field>
					<!-- Remove icon -->
					<v-btn icon class="btn" @click="removeItem(item.position)">
						<v-icon color="#000000">mdi-close</v-icon>
					</v-btn>
				</div>
			</transition-group>
		</draggable>
		<!-- If to-do list contains no items -->
		<FormLabel v-if="toDoList.items.length === 0 && !loadingData" text="There are no items in this list."
					  class="details-label mb-5 text-center" />
		<!-- Items modification buttons -->
		<div v-if="!loadingData" class="mb-12 text-center">
			<v-btn elevation="2" rounded @click="addItem()" class="list-btn mx-3 my-2">
				<v-icon color="#000000" class="mr-2">mdi-plus</v-icon>
					ADD NEW ITEM
			</v-btn>
			<v-btn v-if="toDoList.items.length !== 0" @click="uncheckAllItems()"
					 elevation="2" rounded class="list-btn mx-3 my-2">
				<v-icon color="#000000" class="mr-2">mdi-close-circle-multiple</v-icon>
					UNCOMPLETE ALL
			</v-btn>
		</div>
		<!-- To-do list date select -->
		<div v-if="!loadingData" class="my-5 text-center">
			<FormLabel text="Deadline:" class="details-label mb-3" />
			<v-date-picker v-model="toDoList.date"></v-date-picker>
		</div>
		<!-- Main action buttons -->
		<div class="text-center mt-5">
			<router-link :to="{ name: 'todolists' }" class="router-link">
				<ButtonCancel/>
			</router-link>
			<ButtonDialogDelete itemType="to-do list" service="todolist" :_id="toDoList._id" routeName="todolists" />
			<!-- <router-link :to="{ name: 'todolists' }" class="router-link"> -->
				<ButtonSave @click.native="updateToDoList()" />
			<!-- </router-link> -->
		</div>
		<!-- Snackbar for showing successes and errors -->
		<v-snackbar :value="snackbar" :timeout="-1" rounded="xl" :color="snackbarColor" width="400">
			<span class="snackbar">{{ snackbarMsg }}</span>
			<template v-slot:action="{ attrs }" class="snackbar-content">
				<v-btn text v-bind="attrs" @click="snackbarMsg = null, snackbar = false" color="#000000">
					CLOSE
				</v-btn>
			</template>
		</v-snackbar>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService } from "@/services";

import draggable from 'vuedraggable';

import FormLabel from '@/components/FormLabel.vue';

import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'ToDoListDetailEditView',
	data() {
		return {
			toDoList: {
				_id: null,
				title: null,
				date: null,
				items: []
			},
      	drag: false,
			loading: false,
			loadingData: false,
			snackbarMsg: null,
			snackbarColor: null,
			snackbar: false
		}
	},
	async mounted() {
		// get to-do list data and set it to view data
		this.loadingData = true;
		try {
			let response = await AxiosService.get(`/todolist/${this.$route.params.id}`);
			this.toDoList = response.data;
			this.updatePositions();
		} catch (error) {
			this.snackbarMsg = "Error has occured. Please try again.";
			this.snackbarColor = "#FF6F6F";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loadingData = false;
		console.log(this.toDoList);
	},
	methods: {
		// updates positions of to-do list items based on their current position in list
		updatePositions() {
			this.toDoList.items = this.toDoList.items.map(item => item = {
				name: item.name,
				position: this.toDoList.items.indexOf(item),
				completed: item.completed
			});
		},
		// removes to-do list item from to-do list based on its current position
		removeItem(itemPosition) {
			this.toDoList.items = this.toDoList.items.filter(item => item.position !== itemPosition);
		},
		// adds an item to to-do list and sets its values
		addItem() {
			let numberOfEmptyItems = this.toDoList.items.filter(item => item.name === "").length;
			if (this.toDoList.items.length === 0 || numberOfEmptyItems === 0) {
				this.toDoList.items.push({
					name: "",
					position: this.toDoList.items.length,
					completed: false
				});
			}
		},
		// unchecks all items in to-do list and makes them not completed
		uncheckAllItems() {
			this.toDoList.items = this.toDoList.items.map(item => item = {
				name: item.name,
				position: item.position,
				completed: false
			});
		},
		// modifies to-do list data, checks its completeness and sends it to backend for saving
		async updateToDoList() {
			this.updatePositions();
			// check completeness of data
			const toDoListIsFull = Object.values(this.toDoList).every(value => value !== null && value !== '' && value.length !== 0);
			const itemListIsNotEmpty = this.toDoList.items.every(item => item.name !== null && item.name !== '');
			if (toDoListIsFull && itemListIsNotEmpty) {
				// set value of completeness
				let numberOfNotCompleted = this.toDoList.items.filter(item => item.completed === false).length;
				if (numberOfNotCompleted === 0) this.toDoList.completed = true;
				else this.toDoList.completed = false;
				// send data to backend for saving
				console.log(this.toDoList);
				console.log("full");
				this.loading = true;
				try {
					await AxiosService.patch(`todolist/${this.toDoList._id}`, this.toDoList);
					this.snackbarMsg = "To-do list updated successfully.";
					this.snackbarColor = "#55FF66";
					this.snackbar = true;
				} catch (error) {
					this.snackbarMsg = "Error has occured. Please try again.";
					this.snackbarColor = "#FF6F6F";
					this.snackbar = true;
					console.log(Object.keys(error), error.message);
				}
				this.loading = false;
			} else {
				this.errorMsg = "All fields are required and list must not be empty. Fill everything and try again.";
				this.snackbar = true;
			}
		}
	},
	components: {
		draggable,
		FormLabel,
		ButtonDialogDelete,
		ButtonCancel,
		ButtonSave,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
	.moving-card {
		opacity: 0.5;
		background: #F7FAFC;
		border: 1px solid #4299e1;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
	.heading-text-field {
		font-size: 1.75em;
		width: 50%;
	}
	.item-flex {
		width: 70%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: top;
	}
	.list-btn {
		background-color: #A5D4FF !important;
	}
	.list-btn:before {
		background: none;
	}
	.btn {
		margin-top: 6px;
	}
	.btn:before {
		background: none;
	}
	@media (max-width:700px) {
		.heading-text-field {
			width: 100%;
		}
		.item-flex {
			width: 100%;
		}
	}
</style>
