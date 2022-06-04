<template>
	<v-container absolute fluid class="main-content">
		<h1 class="mt-5 mb-4 text-center">Calendar</h1>
		<CalendarItem/>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import CalendarItem from '@/components/CalendarItem.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'CalendarView',
	data() {
		return {
			closedPeriods: []
		}
	},
	mounted() {
		let periodsFromBackend = [
			{
				ObjecId: 100,
				startDate: "2022-05-26",
				endDate: "2022-05-30"
			},
			{
				ObjecId: 101,
				startDate: "2022-06-28",
				endDate: "2022-07-08"
			},
			{
				ObjecId: 102,
				startDate: "2022-07-8",
				endDate: "2022-07-20"
			},
			{
				ObjecId: 103,
				startDate: "2022-08-01",
				endDate: "2022-08-15"
			}
		];
		this.closedPeriods = periodsFromBackend;
		console.log(this.closedPeriods);
	},
	components: {
		CalendarItem,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
