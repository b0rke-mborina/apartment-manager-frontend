<template>
	<v-card color="#E3EAEF" width="250" class="ma-4 rounded-xl notes-card">
		<div class="notes-header pt-3">
			<v-card-title class="pt-1 justify-center">{{ note.header }}</v-card-title>
		</div>
		<div class="flex-div text-center">
			<v-card-text>{{ note.body }}</v-card-text>
		</div>
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
.notes-header {
	background-color: #A5D4FF;
}
</style>
