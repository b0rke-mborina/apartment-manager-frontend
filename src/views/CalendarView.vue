<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Calendar</h1>
		<!-- Select private accomoradtion by name whose calendar you want to see -->
		<div class="select-div mt-4">
			<span class="select-text mx-4">Show calendar for: </span>
			<v-select v-model="privateAccomodationId"
					 :items="privateAccomodations"
					 item-value="ObjectId"
					 item-text="name"
					 label="Private accomodations"
					 solo rounded
					 @input="updateClosedPeriodsForPrivateAcomodation()"
					 background-color="#A5D4FF"
					 prepend-inner-icon="mdi-bed"
					 class="mx-4">
		</v-select>
		</div>
		<!-- Calendar actions (left, right, title, today) -->
		<v-sheet class="d-flex grid-div">
			<div class="calendar-months">
				<!-- Button left - go one calendar period older -->
				<v-btn icon @click="$refs.calendar.prev()" class="ma-2 arrow-btn">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<!-- Calendar to title -->
				<span v-if="$refs.calendar" class="calendar-title my-2">{{ $refs.calendar.title }}</span>
				<!-- Button right - go one calendar period newer -->
				<v-btn icon @click="$refs.calendar.next()" class="ma-2 arrow-btn">
					<v-icon>mdi-chevron-right</v-icon>
				</v-btn>
			</div>
			<!-- Button today - set current month -->
			<v-btn rounded color="#A5D4FF" @click="setToday" class="text-center my-2">
				Today
			</v-btn>
		</v-sheet>
		<!-- Sheet with calendar items -->
		<v-sheet height="420">
			<v-calendar ref="calendar"
							v-model="value"
							event-overlap-mode="stack"
							type="month"
							:weekdays="weekday"
							:events="closedPeriodsForPrivateAccomodation"
							event-color="#FF6F6F"
							color="#A5D4FF">
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
			mode: 'stack',
			weekday: [1, 2, 3, 4, 5, 6, 0],
			value: '',
			allClosedPeriods: [],
			closedPeriodsForPrivateAccomodation: [],
			privateAccomodations: [],
			privateAccomodationId: null
		}
	},
	mounted() {
		let privateAccomodationsFromBackend = [
			{
				ObjectId: 111,
				name: "Apartment Nature"
			},
			{
				ObjectId: 112,
				name: "Apartment Marie"
			},
			{
				ObjectId: 113,
				name: "Apartment x"
			}
		];
		let periodsFromBackend = [
			{
				ObjectId: 110,
				start: "2021-05-16",
				end: "2021-05-25",
				privateAccomodationObjectId: 111
			},
			{
				ObjectId: 100,
				start: "2022-05-26",
				end: "2022-05-30",
				privateAccomodationObjectId: 111
			},
			{
				ObjectId: 101,
				start: "2022-06-28",
				end: "2022-07-08",
				privateAccomodationObjectId: 111
			},
			{
				ObjectId: 102,
				start: "2022-07-10",
				end: "2022-07-20",
				privateAccomodationObjectId: 112
			},
			{
				ObjectId: 103,
				start: "2022-08-01",
				end: "2022-08-15",
				privateAccomodationObjectId: 112
			}
		];
		this.privateAccomodations = privateAccomodationsFromBackend;
		console.log(this.privateAccomodations);
		this.privateAccomodationId = this.privateAccomodations[0].ObjectId;
		console.log(this.privateAccomodationId);
		this.allClosedPeriods = periodsFromBackend; // .filter(period => period.privateAccomodationObjectId === this.privateAccomodationId);
		console.log(this.allClosedPeriods);
		this.closedPeriodsForPrivateAccomodation = periodsFromBackend.filter(period => period.privateAccomodationObjectId === this.privateAccomodationId);
		console.log(this.closedPeriodsForPrivateAccomodation);
	},
	methods: {
		setToday () {
			this.value = ''
		},
		updateClosedPeriodsForPrivateAcomodation() {
			this.closedPeriodsForPrivateAccomodation = this.allClosedPeriods.filter(period => period.privateAccomodationObjectId === this.privateAccomodationId);
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
	.select-div {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: center;
	}
	.select-text {
		line-height: 48px;
	}
	.grid-div {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-content: space-between;
	}
	.calendar-months {
		width: 50%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.arrow-btn {
		margin-left: 0px !important;
		margin-right: 0px !important;
	}
	.calendar-title {
		font-size: 24px;
	}
	@media (max-width:750px) {
		.select-div {
			grid-template-columns: auto;
		}
	}
	@media (max-width:750px) {
		.calendar-months {
			width: 67%;
		}
		.select-text {
			text-align: center;
		}
	}
	@media (max-width:400px) {
		.calendar-months {
			width: auto;
			padding-top: 2px;
		}
		.calendar-title {
			font-size: 16px;
			margin-top: 12px !important;
		}
	}
</style>
