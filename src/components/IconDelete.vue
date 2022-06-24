<template>
	<v-dialog v-model="dialog" width="500">
		<!-- Main delete icon which opens the dialog -->
		<template v-slot:activator="{ on, attrs }">
			<v-btn icon class="btn">
				<v-icon v-bind="attrs" v-on="on" icon color="#FF6F6F" class="mx-2">mdi-trash-can-outline</v-icon>
			</v-btn>
		</template>
		<v-card class="rounded-xl">
			<!-- Dialog title and text -->
			<v-card-title class="text-h5">Deletion warning</v-card-title>
			<v-card-text>
				Are you sure you want to delete a {{ itemType }} with the {{ itemCaptionType }} {{ itemName }}?
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
	name: 'IconDelete',
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
		itemCaptionType: String,
		itemName: String,
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
.btn:before {
	background: none;
}
</style>
