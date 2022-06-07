<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn icon class="btn">
				<v-icon v-bind="attrs" v-on="on" icon color="#FF6F6F" class="mx-2">mdi-trash-can-outline</v-icon>
			</v-btn>
		</template>
		<v-card class="rounded-xl">
			<v-card-title class="text-h5">Deletion warning</v-card-title>
			<v-card-text>
				Are you sure you want to delete a {{ itemType }} with the {{ itemCaptionType }} {{ itemName }}?
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<ButtonCancel @click.native="dialog = false" />
				<ButtonDelete @click.native="dialog = false" />
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import ButtonDelete from '@/components/ButtonDelete.vue'
import ButtonCancel from '@/components/ButtonCancel.vue'

export default {
	name: 'IconDelete',
	data() {
		return {
			dialog: false
		}
	},
	props: {
		itemType: String,
		itemCaptionType: String,
		itemName: String
	},
	components: {
		ButtonDelete,
		ButtonCancel
	}
}
</script>

<style scoped>
.btn:before {
	background: none;
}
</style>
