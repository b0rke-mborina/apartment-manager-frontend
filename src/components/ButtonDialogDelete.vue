<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on" elevation="2" rounded large class="ma-4 btn-delete">
				<v-icon color="#000000" class="mr-2">mdi-trash-can-outline</v-icon>
				DELETE
			</v-btn>
		</template>
		<v-card class="rounded-xl">
			<v-card-title class="text-h5">Deletion warning</v-card-title>
			<v-card-text>
				Are you sure you want to delete this {{ itemType }}?
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
import ButtonDelete from '@/components/ButtonDelete.vue';
import ButtonCancel from '@/components/ButtonCancel.vue';

export default {
	name: 'ButtonDialogDelete',
	data() {
		return {
			dialog: false
		}
	},
	props: {
		itemType: String
	},
	components: {
		ButtonDelete,
		ButtonCancel
	}
}
</script>

<style scoped>
.btn-delete {
	background-color: #FF6F6F !important;
}
.btn-delete:before {
	background: none;
}
</style>
