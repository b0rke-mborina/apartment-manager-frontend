<template>
	<div> <!-- class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js App"/> -->
		<AccomodationItem/>
		<ReservationItem/>
		<GuestItem/>
		<ToDoListItem/>
		<NoteItem/>
		<CalendarItem/>
		<br>
		<span>HOME: OK</span>
	</div>
</template>

<script>
// @ is an alias to /src
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
