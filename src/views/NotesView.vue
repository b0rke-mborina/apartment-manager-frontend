<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Notes</h1>
		<!-- List of notes -->
		<div class="flex-div">
			<!-- Empty list sign -->
			<NoItemsDiv v-if="notes.length === 0" />
			<!-- List of notes -->
			<NoteItem v-for="note in notes" v-bind:key="note.ObjectId" :note="note" />
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
	mounted() {
		let notesFromBackend = [
			{
				ObjectId: 100,
				heading: "Available periods",
				body: "1.6. - 28.6., 10.7. - 14.7.",
				important: true
			},
			{
				ObjectId: 101,
				heading: "Last guests",
				body: "clean, quiet, very pleased with them",
				important: false
			},
			{
				ObjectId: 102,
				heading: "Bedroom wall",
				body: "Small damages on it",
				important: true
			},
			{
				ObjectId: 103,
				heading: "Music festivals",
				body: "Don't have\nguests that\nmay be going to\nmusic festivals\naaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaaa",
				important: true
			}
		];
		this.notes = notesFromBackend;
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
