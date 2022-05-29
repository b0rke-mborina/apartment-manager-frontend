<template>
	<v-container absolute fluid class="main-content">
		<span>RESERVATIONS: OK</span>
		<ReservationItem/>
	</v-container>
</template>

<script>
import ReservationItem from '@/components/ReservationItem.vue'

export default {
	name: 'ReservationsView',
	components: {
		ReservationItem
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
