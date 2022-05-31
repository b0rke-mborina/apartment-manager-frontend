<template>
	<v-card color="#E3EAEF" class="my-3 pa-4 rounded-xl main-grid">
		<div class="grid-div">
			<div class="name-location">
				<v-icon class="mx-2">mdi-account</v-icon>
				<span class="mx-2">{{ guest.firstName }} {{ guest.lastName }}</span>
				<span class="mx-2 location">{{ guest.city }}, {{ guest.country }}</span>
			</div>
			<div class="period-dates">
				<span class="mx-2">{{ guest.period.startDate }} - {{ guest.period.endDate }}</span>
				<v-chip color="green" class="mx-2">CURRENT GUEST</v-chip><!-- {{ guest }} -->
			</div>
		</div>
		<div class="edit-delete-icons">
			<v-icon icon color="#0000FF" class="mx-2">mdi-pencil</v-icon>
			<v-icon icon color="#FF0000" class="mx-2">mdi-trash-can-outline</v-icon>
		</div>
	</v-card>
</template>

<script>
export default {
	name: 'GuestItem',
	data() {
		return {
			items: [
				'CURRENT GUEST',
				'FORMER GUEST',
				'FUTURE GUEST',
				'POSSIBLE GUEST',
				'POTENTIAL GUEST'
			],
		}
	},
	props: {
		guest: Object
	}
}
</script>

<style scoped>
.main-grid {
	display: grid;
	grid-template-columns: 6fr 1fr;
	font-size: 16px;
}
.grid-div {
	display: grid;
	grid-template-columns: 1fr 1fr;
}
.location {
	font-size: 12px;
}
.name-location, .period-dates {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: center;
	padding: 10px 0px;
}
.edit-delete-icons {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: right;
	padding: 10px 0px;
}
@media (max-width:500px) {
	.grid-div {
		grid-template-columns: auto;
	}
}
</style>
