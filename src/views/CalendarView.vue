<template>
	<v-container absolute fluid class="main-content">
		<span>CALENDAR: OK</span>
		<CalendarItem/>
	</v-container>
</template>

<script>
import CalendarItem from '@/components/CalendarItem.vue'

export default {
	name: 'Calendar',
	components: {
		CalendarItem
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
