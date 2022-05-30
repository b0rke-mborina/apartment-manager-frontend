<template>
	<v-container absolute fluid class="main-content">
		<!-- <AccomodationItem/>
		<ReservationItem/>
		<GuestItem/>
		<ToDoListItem/>
		<NoteItem/>
		<CalendarItem/> -->
		<!-- <br>
		<span>HOME: OK</span> -->
		<h1 class="mt-5 mb-4 text-center">Dashboard</h1>
	</v-container>
</template>

<script>
import AccomodationItem from '@/components/AccomodationItem.vue'
import ReservationItem from '@/components/ReservationItem.vue'
import GuestItem from '@/components/GuestItem.vue'
import ToDoListItem from '@/components/ToDoListItem.vue'
import NoteItem from '@/components/NoteItem.vue'
import CalendarItem from '@/components/CalendarItem.vue'

export default {
	name: 'DashboardView',
	components: {
		AccomodationItem,
		ReservationItem,
		GuestItem,
		ToDoListItem,
		NoteItem,
		CalendarItem
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
