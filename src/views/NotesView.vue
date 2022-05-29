<template>
	<v-container absolute fluid class="main-content">
		<span>NOTES: OK</span>
		<NoteItem/>
	</v-container>
</template>

<script>
import NoteItem from '@/components/NoteItem.vue'

export default {
	name: 'NotesView',
	components: {
		NoteItem
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
