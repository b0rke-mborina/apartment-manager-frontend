<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Calendar</h1>
		<!-- Select private accomoradtion by name whose calendar you want to see -->
		<div class="select-div mt-4">
			<span class="select-text mx-4">Show calendar for: </span>
			<v-select v-model="privateAccomodationId"
					 :items="privateAccomodations"
					 item-value="_id"
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
						<router-link :to="{ name: 'period-detail-modification', params: { id: selectedPeriod._id }}" class="router-link">
							<IconEdit/>
						</router-link>
						<IconDelete v-if="selectedPeriod.start && selectedPeriod.end"
										itemType="period" itemCaptionType="dates and times"
										:itemName="convertDatetime(selectedPeriod.start) + ' and ' + convertDatetime(selectedPeriod.end)"
										service="period" :_id="selectedPeriod._id"
										class="mb-2" />
					</v-toolbar>
					<!-- Period menu info (use service to render period parts) -->
					<v-card-text>
						<span v-if="selectedPeriod.start">Start: {{ convertDatetime(selectedPeriod.start) }}</span>
						<br>
						<span v-if="selectedPeriod.end">End: {{ convertDatetime(selectedPeriod.end) }}</span>
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
			<router-link :to="{ name: 'period-creation', params: { id: selectedPeriod._id }}" class="router-link">
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
import { AxiosService, convertDatetime } from "@/services";

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
	async mounted() {
		// parallel calls (accomodations and periods)
		console.log("parallel calls");
		let responses = await Promise.all([
			await AxiosService.get("/privateaccomodations"),
			await AxiosService.get("/periods")
		]);
		// save all accomodations data
		this.privateAccomodations = responses[0].data;
		console.log(this.privateAccomodations);
		// set initial accomodation (id) for which the periods will show
		this.privateAccomodationId = this.privateAccomodations[0]._id;
		console.log(this.privateAccomodationId);
		// save all periods data
		this.allClosedPeriods = responses[1].data;
		console.log(this.allClosedPeriods);
		// set initial periods which will show for set private accomodation
		this.closedPeriodsForPrivateAccomodation = responses[1].data.filter(period => period.privateAccomodation === this.privateAccomodationId);
		console.log(this.closedPeriodsForPrivateAccomodation);
	},
	methods: {
		// sets calndar month to current month
		setToday () {
			this.value = ''
		},
		// updates periods shown on calendar based on selected accomodation
		updateClosedPeriodsForPrivateAcomodation() {
			this.closedPeriodsForPrivateAccomodation = this.allClosedPeriods.filter(period => period.privateAccomodation === this.privateAccomodationId);
		},
		// opens period detail popup menu when a calendar (event) period is clicked
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
      },
		// imported function for datetime conversion
		convertDatetime
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
