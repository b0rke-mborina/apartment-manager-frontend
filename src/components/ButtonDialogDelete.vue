<template>
	<v-dialog v-model="dialog" width="500">
		<!-- Main delete button which opens the dialog -->
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on" elevation="2" rounded large class="ma-4 btn-delete">
				<v-icon color="#000000" class="mr-2">mdi-trash-can-outline</v-icon>
				DELETE
			</v-btn>
		</template>
		<v-card class="rounded-xl">
			<!-- Dialog title and text -->
			<v-card-title class="text-h5">Deletion warning</v-card-title>
			<v-card-text>
				Are you sure you want to delete this {{ itemType }}?
			</v-card-text>
			<!-- Dialog buttons (cancel and delete) -->
			<v-card-actions>
				<v-spacer></v-spacer>
				<ButtonCancel @click.native="dialog = false" />
				<ButtonDelete @click.native="deleteItem(), dialog = false" />
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { AxiosService } from '@/services';

import ButtonDelete from '@/components/ButtonDelete.vue';
import ButtonCancel from '@/components/ButtonCancel.vue';

export default {
	name: 'ButtonDialogDelete',
	data() {
		return {
			dialog: false
		}
	},
	methods: {
		// sends DELETE request to backend to specified service and with specified id
		async deleteItem() {
			await AxiosService.delete(`${this.service}/${this._id}`);
		}
	},
	props: {
		itemType: String,
		service: String,
		_id: String
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
