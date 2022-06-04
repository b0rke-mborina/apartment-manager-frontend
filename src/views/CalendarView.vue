<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Calendar</h1>
		<!-- <CalendarItem/> -->
		<!-- Calendar actions (left, right, title, today) -->
		<v-sheet class="d-flex flex-div">
			<!-- Button left - go one calendar period older -->
			<v-btn icon class="ma-2" @click="$refs.calendar.prev()">
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<!-- Calendar to title -->
			<span v-if="$refs.calendar" class="calendar-title my-2">{{ $refs.calendar.title }}</span>
			<!-- Button right - go one calendar period newer -->
			<v-btn icon class="ma-2" @click="$refs.calendar.next()">
				<v-icon>mdi-chevron-right</v-icon>
			</v-btn>
			<!-- Button today - set current month -->
			<v-btn class="text-center my-2 today" color="#A5D4FF" @click="setToday">
				Today
			</v-btn>
		</v-sheet>
		<!-- Sheet with calendar items -->
		<v-sheet height="420">
			<v-calendar ref="calendar" v-model="value" color="#A5D4FF"
				event-overlap-mode="stack" type="month" :weekdays="weekday"
				:events="closedPeriods" event-color="#FF6F6F">
			</v-calendar>
		</v-sheet>
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
			closedPeriods: [],
			mode: 'stack',
			weekday: [1, 2, 3, 4, 5, 6, 0],
			value: ''
		}
	},
	mounted() {
		let periodsFromBackend = [
			{
				ObjecId: 110,
				start: "2021-05-16",
				end: "2021-05-25"
			},
			{
				ObjecId: 100,
				start: "2022-05-26",
				end: "2022-05-30"
			},
			{
				ObjecId: 101,
				start: "2022-06-28",
				end: "2022-07-08"
			},
			{
				ObjecId: 102,
				start: "2022-07-10",
				end: "2022-07-20"
			},
			{
				ObjecId: 103,
				start: "2022-08-01",
				end: "2022-08-15"
			}
		];
		this.closedPeriods = periodsFromBackend;
		console.log(this.closedPeriods);
	},
	methods: {
		setToday () {
			this.value = ''
		}
	},
	components: {
		CalendarItem,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
	.calendar-title {
		font-size: 24px;
	}
</style>
