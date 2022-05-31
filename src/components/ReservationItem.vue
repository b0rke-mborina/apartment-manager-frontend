<template>
	<v-card color="#E3EAEF" class="my-3 pa-4 rounded-xl main-grid">
		<div class="grid-div">
			<div class="reservation-info">
				<v-icon class="mx-2">mdi-calendar-check</v-icon>
				<span v-if="reservation.madeByGuest.email && reservation.madeByGuest.phoneNumber" class="mx-2 text-center">
					{{ reservation.madeByGuest.email }}
				</span>
				<span v-if="reservation.madeByGuest.email && reservation.madeByGuest.phoneNumber" class="mx-2 text-center">
					{{ reservation.madeByGuest.phoneNumber }}
				</span>
				<span v-else class="mx-2 text-center">
					{{ reservation.madeByGuest.firstName }} {{ reservation.madeByGuest.lastName }}
				</span>
			</div>
			<div class="money">
				<span class="mx-2">{{ reservation.price.value }} {{ reservation.price.currency }}</span>
				<v-chip color="green" class="mx-2">{{ reservation.currentState }}</v-chip>
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
	name: 'ReservationItem',
	props: {
		reservation: Object
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
.reservation-info, .money {
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
@media (max-width:450px) {
	.grid-div {
		grid-template-columns: auto;
	}
}
</style>
