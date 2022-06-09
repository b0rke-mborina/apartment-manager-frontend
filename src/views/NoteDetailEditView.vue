<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Edit a note</h1>
		<!-- Note heading -->
		<v-text-field v-model="note.heading" solo rounded
						  clearable clear-icon="mdi-close-circle"
						  label="Note heading..."
						  background-color="#A5D4FF"
						  class="heading-text-field mt-5">
		</v-text-field>
		<!-- Note body -->
		<v-textarea v-model="note.body" solo rounded auto-grow
						clearable clear-icon="mdi-close-circle"
						label="Write a note here..."
						background-color="#A5D4FF"></v-textarea>
		<!-- Main action buttons -->
		<div class="text-center">
			<!-- Delete button and dialog -->
			<ButtonDialogDelete/>
			<!-- Cancel button -->
			<router-link :to="{ name: 'notes'}" class="router-link">
				<ButtonCancel/>
			</router-link>
			<!-- Save button -->
			<ButtonSave/>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'NotesView',
	data() {
		return {
			note: {}
		}
	},
	mounted() {
		let noteFromBackend = {
			ObjectId: 103,
			heading: "Music festivals",
			body: "Don't have\nguests that\nmay be going to\nmusic festivals\naaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaaa",
			important: true
		};
		this.note = noteFromBackend;
		console.log(this.note);
	},
	components: {
		ButtonDialogDelete,
		ButtonCancel,
		ButtonSave,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
	.heading-text-field {
		font-size: 1.75em;
		width: 50%;
		margin: 0px auto;
	}
	.v-input__slot, textarea {
		padding-top: 10px !important;
		padding-bottom: 10px !important;
	}
	.heading-text-field .v-icon {
		color: #000000 !important;
	}
	@media (max-width:800px) {
		.heading-text-field {
			width: 100%;
		}
	}
</style>
