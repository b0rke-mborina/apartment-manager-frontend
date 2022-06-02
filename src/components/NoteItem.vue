<template>
	<v-card color="#E3EAEF" width="250" class="ma-4 rounded-xl notes-card d-flex flex-column">
		<div class="notes-header pt-3">
			<v-card-title class="pt-1 justify-center text-break">{{ note.header }}</v-card-title>
		</div>
		<div class="flex-div text-center">
			<v-card-text v-if="note.body.length <= 100">{{ note.body }}</v-card-text>
			<v-card-text v-else-if="note.body.length > 100 || (note.body.split(/\r\n|\r|\n/).length) > 3" class="note-body">
				{{ getStringForRender() }}...
			</v-card-text>
		</div>
		<v-spacer v-if="note.body.length <= 100"></v-spacer>
		<v-card-actions class="flex-bottom pa-3">
			<v-icon icon color="#0000FF">mdi-pencil</v-icon>
			<v-icon icon color="#FF0000">mdi-trash-can-outline</v-icon>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'NoteItem',
	methods: {
		getStringForRender() {
			if (this.note.body.length < 100 && (this.note.body.split(/\r\n|\r|\n/).length) < 3) return this.note.body;
			let substringLength = 97;
			if (this.note.body.split("\n", 3).join("\n").length < 97) substringLength = this.note.body.split("\n", 3).join("\n").length;
			return this.note.body.substring(0, substringLength);
		}
	},
	props: {
		note: Object
	}
}
</script>

<style scoped>
.notes-header {
	background-color: #A5D4FF;
}
.note-body {
	white-space: pre;
}
.flex-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>
