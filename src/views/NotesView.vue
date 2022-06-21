<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Notes</h1>
		<!-- List of notes -->
		<div class="flex-div">
			<!-- Empty list sign -->
			<NoItemsDiv items="notes" v-if="notes.length === 0" />
			<!-- List of notes -->
			<NoteItem v-for="note in notes" v-bind:key="note._id" :note="note" />
		</div>
		<!-- Add new note button -->
		<div class="text-center">
			<router-link :to="{ name: 'note-creation' }" class="router-link">
				<AddNewButton/>
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService } from "@/services";

import NoteItem from '@/components/NoteItem.vue';

import AddNewButton from '@/components/ButtonAddNew.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'NotesView',
	data() {
		return {
			notes: []
		}
	},
	async mounted() {
		// save all notes data
		let response = await AxiosService.get("/notes");
		this.notes = response.data;
		console.log(this.notes);
	},
	components: {
		NoteItem,
		AddNewButton,
		NoItemsDiv,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
