<template>
	<v-card color="#E3EAEF" width="250" class="ma-4 rounded-xl accomodation-card">
		<!-- Accomodation item photo (makes it look like it is an accomodation) -->
		<v-img height="126px"
				src="https://apartmentsborina.hr/resources/gallery/terrace-tables-chairs-light-sunny.jpg"
				alt="Photo">
		</v-img>
		<!-- Accomodation information -->
		<div class="flex-div">
			<router-link :to="{ name: 'accomodation-detail', params: { id: accomodation._id } }" class="router-link text-div">
				<!-- Accomodation availability (based of current state of accomodation) -->
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
					{{ accomodation.currentState }}
				</v-card-title>
				<!-- Accomodation name -->
				<v-card-title class="text-break pt-3">
						{{ accomodation.name }}
				</v-card-title>
				<!-- Accomodation address -->
				<v-card-subtitle class="text-break address pt-0">
					{{ accomodation.location.street }} {{ accomodation.location.houseNumber }}
				</v-card-subtitle>
			</router-link>
			<!-- Main action icons -->
			<div class="edit-delete-icons">
				<router-link :to="{ name: 'accomodation-modification', params: { id: accomodation._id } }" class="router-link">
					<IconEdit class="mb-2"/>
				</router-link>
				<IconDelete itemType="accomodation" itemCaptionType="name" :itemName="accomodation.name"
								service="privateaccomodation" :_id="accomodation._id"
								class="mb-2" />
			</div>
		</div>
	</v-card>
</template>

<script>
import IconDelete from '@/components/IconDelete.vue';
import IconEdit from '@/components/IconEdit.vue';

export default {
	name: 'AccomodationItem',
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
		flex-wrap: nowrap;
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
