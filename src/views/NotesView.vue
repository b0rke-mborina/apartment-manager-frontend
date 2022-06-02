<template>
	<v-container absolute fluid class="main-content">
		<h1 class="mt-5 mb-4 text-center">Notes</h1>
		<div class="flex-div">
			<NoteItem v-for="note in notes" v-bind:key="note.ObjectId" :note="note" />
		</div>
		<div class="text-center">
			<AddNewButton/>
		</div>
	</v-container>
</template>

<script>
import NoteItem from '@/components/NoteItem.vue';
import AddNewButton from '@/components/ButtonAddNew.vue';

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
				header: "Available periods",
				body: "1.6. - 28.6., 10.7. - 14.7.",
				important: true
			},
			{
				ObjecId: 101,
				header: "Last guests",
				body: "clean, quiet, very pleased with them",
				important: false
			},
			{
				ObjecId: 102,
				header: "Bedroom wall",
				body: "Small damages on it",
				important: true
			},
			{
				ObjecId: 103,
				header: "Music festivals",
				body: "Don't have\nguests that\nmay be going to\nmusic festivals\naaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaaa",
				important: true
			}
		];
		this.notes = notesFromBackend;
		console.log(this.notes);
	},
	components: {
		NoteItem,
		AddNewButton
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
