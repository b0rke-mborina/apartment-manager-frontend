<template>
	<v-card color="#E3EAEF" width="250" class="ma-4 rounded-xl accomodation-card">
		<v-img height="126px"
				src="https://apartmentsborina.hr/resources/gallery/terrace-tables-chairs-light-sunny.jpg"
				alt="Photo">
		</v-img>
		<div class="flex-div">
			<router-link :to="{ name: 'accomodation-detail', params: { id: accomodation.ObjectId }}" class="router-link text-div">
				<v-card-title class="py-0 availability">
					<v-icon v-if="accomodation.currentState === 'AVAILABLE'"
							icon color="#FFCC00" class="pr-2">
						mdi-circle
					</v-icon>
					<v-icon v-else-if="accomodation.currentState === 'OCCUPIED'"
							icon color="#55FF66" class="pr-2">
						mdi-circle
					</v-icon>
					<v-icon v-else-if="accomodation.currentState === 'PENDING'"
							icon color="#6666ff" class="pr-2">
						mdi-circle
					</v-icon>
					<v-icon v-else-if="accomodation.currentState === 'NOT READY'"
							icon color="#FF6F6F" class="pr-2">
						mdi-circle
					</v-icon>
					{{ accomodation.currentState }}
				</v-card-title>
				<v-card-title class="text-break text-center pt-3">
						{{ accomodation.name }}
				</v-card-title>
				<v-card-subtitle class="text-break address pt-0">
					{{ accomodation.location.street }} {{ accomodation.location.houseNumber }}
				</v-card-subtitle>
			</router-link>
			<div class="edit-delete-icons">
				<IconEdit class="mb-2"/>
				<IconDelete itemType="accomodation" itemCaptionType="name"
								:itemName="accomodation.name" class="mb-2" />
			</div>
		</div>
	</v-card>
</template>

<script>
import IconDelete from '@/components/IconDelete.vue'
import IconEdit from '@/components/IconEdit.vue'

export default {
	name: 'Item',
	props: {
		accomodation: Object
	},
	components: {
		IconDelete,
		IconEdit
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
.accomodation-card {
	justify-content: center;
}
.availability {
	font-size: 14px;
}
.flex-div {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.text-div {
	padding: 10px 0px;
}
.edit-delete-icons {
	display: flex;
	flex-direction: column;
	justify-content: bottom;
	align-items: right;
	padding: 10px 0px;
}
@media (max-width:500px) {
	.grid-div {
		grid-template-columns: auto;
	}
}
@media (max-width:300px) {
	.flex-div {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.edit-delete-icons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 70%;
	}
	.availability {
		justify-content: center;
	}
	.address {
		text-align: center;
		padding-bottom: 4px;
	}
}
</style>
