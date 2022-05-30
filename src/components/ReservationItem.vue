<template>
	<v-card>
		<v-icon>mdi-calendar-check</v-icon>
		<span>{{ reservation.currentState }}, {{ reservation.price.value }} {{ reservation.price.currency }}</span>
		<br>
		<span>{{ reservation.madeByGuest.email }}, {{ reservation.madeByGuest.phoneNumber }}</span>
		<br>
		<span>{{ reservation.period.startDate }} - {{ reservation.period.endDate }}</span>
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

</style>
