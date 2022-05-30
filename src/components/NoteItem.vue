<template>
	<v-card>
		<v-icon>mdi-note-edit</v-icon>
		<span>{{ note.header }}</span>
		<br>
		<span>{{ note.body }}</span>
		<br>
		<span>{{ note.important }}</span>
	</v-card>
</template>

<script>
export default {
	name: 'NoteItem',
	props: {
		note: Object
	}
}
</script>

<style scoped>

</style>
