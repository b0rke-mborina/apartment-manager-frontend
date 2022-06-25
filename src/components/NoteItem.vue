<template>
	<v-card color="#E3EAEF" width="250" class="ma-4 rounded-xl notes-card d-flex flex-column">
		<router-link :to="{ name: 'note-detail-modification', params: { id: note._id }}" class="router-link notes-header pt-3">
			<!-- Note item title -->
			<v-card-title class="pt-1 justify-center text-break">{{ note.heading }}</v-card-title>
			<!-- Note item important icon (visible if note is important) -->
			<v-card-subtitle class="text-center pb-1">
				<v-icon v-if="note.important === true" icon color="#FF6F6F">mdi-alert-circle-outline</v-icon>
				<v-icon v-else></v-icon>
			</v-card-subtitle>
		</router-link>
		<router-link :to="{ name: 'note-detail-modification', params: { id: note._id }}" class="router-link flex-main">
			<!-- Note item body / main content -->
			<v-card-text class="note-body">{{ getStringForRender(note.body) }}</v-card-text>
			<!-- Spacer and empty text element (make items the same size) -->
			<v-spacer></v-spacer>
			<v-card-text class="pa-0"></v-card-text>
		</router-link>
		<!-- Main action icons -->
		<v-card-actions class="flex-bottom pa-3">
			<router-link :to="{ name: 'note-detail-modification', params: { id: note._id }}" class="router-link">
				<IconEdit/>
			</router-link>
			<IconDelete itemType="note" itemCaptionType="heading" :itemName="note.heading"
							service="note" :_id="note._id" />
		</v-card-actions>
	</v-card>
</template>

<script>
import IconDelete from '@/components/IconDelete.vue';
import IconEdit from '@/components/IconEdit.vue';

export default {
	name: 'NoteItem',
	methods: {
		// returns first 100 characters of string for render 
		getStringForRender(bodyString) {
			let substring = bodyString.slice(0, bodyString.split(/\r\n|\r|\n/, 2).join(/\r\n|\r|\n/).length);
			if (substring.length <= 100 && substring == bodyString) return substring;
			else return substring.slice(0, 97) + "...";
		}
	},
	props: {
		note: Object
	},
	components: {
		IconDelete,
		IconEdit
	}
}
</script>

<style scoped>
.notes-header {
	background-color: #A5D4FF;
}
.flex-main {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 108px;
}
.note-body {
	white-space: pre-wrap; 
}
.flex-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>
