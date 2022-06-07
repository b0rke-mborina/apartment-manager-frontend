<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Note detail: OK</h1>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import NoteItem from '@/components/NoteItem.vue';
import AddNewButton from '@/components/ButtonAddNew.vue';
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
				ObjecId: 100,
				heading: "Available periods",
				body: "1.6. - 28.6., 10.7. - 14.7.",
				important: true
			},
			{
				ObjecId: 101,
				heading: "Last guests",
				body: "clean, quiet, very pleased with them",
				important: false
			},
			{
				ObjecId: 102,
				heading: "Bedroom wall",
				body: "Small damages on it",
				important: true
			},
			{
				ObjecId: 103,
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
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
