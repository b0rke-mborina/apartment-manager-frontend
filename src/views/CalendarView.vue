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
					 class="mx-4">
				<template v-slot:prepend-inner>
					<v-icon color="#000000">mdi-bed</v-icon>
				</template>
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
							@click:event="showEvent"
							event-color="#FF6F6F"
							color="#A5D4FF">
			</v-calendar>
			<!-- Period details popup menu -->
			<v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" rounded="xl"
					  offset-y min-width="150px" max-width="450px">
				<v-card color="#E3EAEF" min-width="150px" max-width="450px" class="period-menu">
					<v-toolbar elevation="0" color="#A5D4FF">
						<!-- Period menu title / name -->
						<v-toolbar-title v-html="selectedPeriod.name" class="mr-5"></v-toolbar-title>
						<v-spacer></v-spacer>
						<!-- Period menu edit and delete (with dialog) icons -->
						<router-link :to="{ name: 'period-detail-modification', params: { id: selectedPeriod.ObjectId }}" class="router-link">
							<IconEdit/>
						</router-link>
						<IconDelete/>
					</v-toolbar>
					<!-- Period menu info -->
					<v-card-text>
						<span>Start: {{ selectedPeriod.start }}</span>
						<br>
						<span>End: {{ selectedPeriod.end }}</span>
					</v-card-text>
					<!-- Period menu cancel button (close) -->
					<v-card-actions>
						<ButtonCancel @click.native="selectedOpen = false" />
					</v-card-actions>
				</v-card>
			</v-menu>
		</v-sheet>
		<!-- Add new period button -->
		<div class="text-center">
			<router-link :to="{ name: 'period-creation', params: { id: selectedPeriod.ObjectId }}" class="router-link">
				<v-btn elevation="2" rounded large class="mb-4 mt-8 btn-add-new">
					<v-icon color="#000000" class="mr-2">mdi-plus</v-icon>
					ADD NEW PERIOD
				</v-btn>
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import IconEdit from '@/components/IconEdit.vue';
import IconDelete from '@/components/IconDelete.vue';
import ButtonCancel from '@/components/ButtonCancel.vue';

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
			privateAccomodationId: null,
			selectedPeriod: {},
			selectedElement: null,
			selectedOpen: false,
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
				start: "2021-05-16 15:00",
				end: "2021-05-25 10:00",
				name: "Reservation (Hans Muller)",
				privateAccomodationObjectId: 111
			},
			{
				ObjectId: 100,
				start: "2022-05-26 15:00",
				end: "2022-05-30 10:00",
				name: "Reservation (Marie Smith)",
				privateAccomodationObjectId: 111
			},
			{
				ObjectId: 101,
				start: "2022-06-28 15:00",
				end: "2022-07-08 10:00",
				name: "Closed (no reason)",
				privateAccomodationObjectId: 111
			},
			{
				ObjectId: 102,
				start: "2022-07-10 15:00",
				end: "2022-07-20 10:00",
				name: "Closed (can't get it ready)",
				privateAccomodationObjectId: 112
			},
			{
				ObjectId: 103,
				start: "2022-08-01 15:00",
				end: "2022-08-15 10:00",
				name: "Closed (vacation)",
				privateAccomodationObjectId: 112
			}
		];
		this.privateAccomodations = privateAccomodationsFromBackend;
		console.log(this.privateAccomodations);
		this.privateAccomodationId = this.privateAccomodations[0].ObjectId;
		console.log(this.privateAccomodationId);
		this.allClosedPeriods = periodsFromBackend;
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
		},
      showEvent ({ nativeEvent, event }) {
			// function that opens menu after click on period
			const open = () => {
				this.selectedPeriod = event;
				this.selectedElement = nativeEvent.target;
				requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true));
			}
			// handles closing and opening menu
			if (this.selectedOpen) {
				this.selectedOpen = false;
				requestAnimationFrame(() => requestAnimationFrame(() => open()));
			} else {
				open();
			}
			// prevents further propagation of the current event in the capturing and bubbling phases
			nativeEvent.stopPropagation();
      }
	},
	components: {
		IconEdit,
		IconDelete,
		ButtonCancel,
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
	.period-menu {
		border-radius: 24px !important;
	}
	.btn-add-new {
		background-color: #A5D4FF !important;
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
