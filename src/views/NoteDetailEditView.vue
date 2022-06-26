<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-9 text-center">Edit a note</h1>
		<!-- Loading circular progress bar -->
		<div class="text-center">
			<v-progress-circular v-if="loadingData" indeterminate color="#A5D4FF"></v-progress-circular>
		</div>
		<div class="head-flex">
			<!-- Note heading -->
			<v-text-field v-model="note.heading" v-if="!loadingData"
							solo rounded
							clearable clear-icon="mdi-close-circle"
							label="Note heading..."
							background-color="#A5D4FF"
							class="heading-text-field mt-5 mr-3">
			</v-text-field>
			<!-- Is note important? - select -->
			<v-select v-model="note.important" v-if="!loadingData"
						 :items="selectItems"
						 item-value="value"
						 item-text="name"
						 solo rounded
						 background-color="#A5D4FF" class="importance-select mt-5 ml-3">
				<template v-slot:append>
					<v-icon color="#000000">mdi-menu-down</v-icon>
				</template>
			</v-select>
		</div>
		<!-- Note body -->
		<v-textarea v-model="note.body" v-if="!loadingData"
						solo rounded auto-grow
						clearable clear-icon="mdi-close-circle"
						label="Write a note here..."
						background-color="#A5D4FF"></v-textarea>
		<!-- Main action buttons -->
		<div class="text-center mt-5">
			<router-link :to="{ name: 'notes'}" class="router-link">
				<ButtonCancel/>
			</router-link>
			<ButtonDialogDelete itemType="note" service="note" :_id="note._id" routeName="notes" />
			<ButtonSave @click.native="updateNote()" :loading="loading" />
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

import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import FormLabel from '@/components/FormLabel.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'NoteDetailEditView',
	data() {
		return {
			note: {},
			// items for importance selection list
			selectItems: [
				{
					value: true,
					name: "IMPORTANT"
				},
				{
					value: false,
					name: "NOT IMPORTANT"
				}
			],
			loading: false,
			loadingData: false,
			snackbarMsg: null,
			snackbarColor: null,
			snackbar: false
		}
	},
	async mounted() {
		// get note data from backend and set it to view data
		this.loadingData = true;
		try {
			let response = await AxiosService.get(`/note/${this.$route.params.id}`);
			this.note = response.data;
		} catch (error) {
			this.snackbarMsg = "Error has occured. Please try again.";
			this.snackbarColor = "#FF6F6F";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loadingData = false;
		console.log(this.note);
	},
	methods: {
		// checks completeness of note data and sends it to backend for updating
		async updateNote() {
			console.log(this.note);
			const noteIsFull = Object.values(this.note).every(value => value !== null && value !== '');
			if (noteIsFull) {
				console.log("full");
				this.loading = true;
				try {
					await AxiosService.patch(`note/${this.note._id}`, this.note);
					this.snackbarMsg = "Note updated successfully.";
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
				this.snackbarMsg = "All fields are required. Fill all fields and try again.";
				this.snackbarColor = "#FF6F6F";
				this.snackbar = true;
			}
		}
	},
	components: {
		ButtonCancel,
		ButtonDialogDelete,
		ButtonSave,
		FormLabel,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
	.head-flex {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.heading-text-field {
		font-size: 1.75em;
		width: 50%;
	}
	.v-input__slot, textarea {
		padding-top: 10px !important;
		padding-bottom: 10px !important;
	}
	.heading-text-field .v-icon {
		color: #000000 !important;
	}
	.snackbar-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.snackbar {
		color: #000000;
	}
	@media (max-width:700px) {
		.head-flex {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.heading-text-field {
			width: 100%;
			margin: 0px !important;
		}
		.importance-select {
			margin: 0px !important;
		}
	}
</style>
