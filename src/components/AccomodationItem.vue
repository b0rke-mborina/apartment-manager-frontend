<template>
	<v-card color="#E3EAEF" width="250" class="ma-4 rounded-xl accomodation-card">
		<v-img height="126px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" alt="Photo"></v-img>
		<div class="flex-div">
			<div class="text-div">
				<v-card-title class="py-0 availability">AVAILABLE</v-card-title>
				<v-card-title class="pt-1">{{ accomodation.name }}</v-card-title>
				<v-card-subtitle>
					{{ accomodation.location.street }} {{ accomodation.location.houseNumber }}
				</v-card-subtitle>
			</div>
			<div class="edit-delete-icons">
				<v-icon icon color="#0000FF" class="mr-2 mb-2">mdi-pencil</v-icon>
				<v-icon icon color="#FF0000" class="mr-2 mb-2">mdi-trash-can-outline</v-icon>
			</div>
		</div>
	</v-card>
</template>

<script>
export default {
	name: 'Item',
	props: {
		accomodation: Object
	}
}
</script>

<style scoped>
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
</style>
