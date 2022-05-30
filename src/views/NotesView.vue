<template>
	<v-container absolute fluid class="main-content">
		<span>NOTES: OK</span>
		<NoteItem v-for="note in notes" v-bind:key="note.ObjectId" :note="note" />
	</v-container>
</template>

<script>
import NoteItem from '@/components/NoteItem.vue'

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
				body: "Don't have guests that may be going to music festivals",
				important: true
			}
		];
		this.notes = notesFromBackend;
		console.log(this.notes);
	},
	components: {
		NoteItem
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
