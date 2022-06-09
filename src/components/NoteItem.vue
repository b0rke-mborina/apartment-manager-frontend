<template>
	<v-card color="#E3EAEF" width="250" class="ma-4 rounded-xl notes-card d-flex flex-column">
		<router-link :to="{ name: 'note-detail-edit', params: { id: note.ObjectId }}" class="router-link notes-header pt-3">
			<v-card-title class="pt-1 justify-center text-break">{{ note.heading }}</v-card-title>
			<v-card-subtitle class="text-center pb-1">
				<v-icon v-if="note.important === true" icon color="#FF6F6F">mdi-alert-circle-outline</v-icon>
				<v-icon v-else-if="note.important === false"></v-icon>
			</v-card-subtitle>
		</router-link>
		<router-link :to="{ name: 'note-detail-edit', params: { id: note.ObjectId }}" class="router-link flex-main">
			<v-card-text v-if="note.body.length <= 100">{{ note.body }}</v-card-text>
			<v-card-text v-else-if="note.body.length > 100
										  || (note.body.split(/\r\n|\r|\n/).length) > 3"
							 class="note-body">{{ getStringForRender() }}...</v-card-text>
			<v-spacer></v-spacer>
			<v-card-text class="pa-0"></v-card-text>
		</router-link>
		<v-card-actions class="flex-bottom pa-3">
			<router-link :to="{ name: 'note-detail-edit', params: { id: note.ObjectId }}" class="router-link">
				<IconEdit/>
			</router-link>
			<IconDelete itemType="note" itemCaptionType="heading" :itemName="note.header" />
		</v-card-actions>
	</v-card>
</template>

<script>
import IconDelete from '@/components/IconDelete.vue';
import IconEdit from '@/components/IconEdit.vue';

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
	white-space: pre;
}
.flex-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>
