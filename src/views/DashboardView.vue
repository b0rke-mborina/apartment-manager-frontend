<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Dashboard</h1>
		<!-- To do lists, notes and calendars -->
		<h2 class="mt-5 mb-2">Your upcoming work and calendars</h2>
		<div class="flex-div">
			<DashboardItem :item="noteItem" />
			<DashboardItem :item="toDoListItem" />
			<DashboardItem :item="null" />
		</div>
		<!-- Accomodations -->
		<h2 class="mt-5 mb-2">Your accomodations</h2>
		<div class="flex-div">
			<!-- Empty list sign -->
			<NoItemsDiv items="accomodations" v-if="accomodations.length === 0" />
			<!-- List of accomodations -->
			<AccomodationItem v-for="accomodation in accomodations" v-bind:key="accomodation.ObjectId" :accomodation="accomodation" />
		</div>
		<!-- See more button -->
		<div class="text-center">
			<router-link to="/accomodations" class="router-link">
				<ButtonSeeMore/>
			</router-link>
		</div>
		<!-- Reservations -->
		<h2 class="mt-5 mb-2">Your upcoming reservations</h2>
		<!-- Empty list sign -->
		<NoItemsDiv items="reservations" v-if="reservations.length === 0" />
		<!-- List of reservations -->
		<ReservationItem v-for="reservation in reservations" v-bind:key="reservation.ObjectId" :reservation="reservation"/>
		<!-- See more button -->
		<div class="text-center">
			<router-link to="/reservations" class="router-link">
				<ButtonSeeMore/>
			</router-link>
		</div>
		<!-- Guests -->
		<h2 class="mt-5 mb-2">Your guests</h2>
		<!-- Empty list sign -->
		<NoItemsDiv items="guests" v-if="guests.length === 0" />
		<!-- List of guests -->
		<GuestItem v-for="guest in guests" v-bind:key="guest.ObjectId" :guest="guest" />
		<!-- See more button -->
		<div class="text-center">
			<router-link to="/guests" class="router-link">
				<ButtonSeeMore/>
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService } from "@/services";

import DashboardItem from '@/components/DashboardItem.vue';
import AccomodationItem from '@/components/AccomodationItem.vue';
import ReservationItem from '@/components/ReservationItem.vue';
import GuestItem from '@/components/GuestItem.vue';

import ButtonSeeMore from '@/components/ButtonSeeMore.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'DashboardView',
	data() {
		return {
			accomodations: [],
			reservations: [],
			guests: [],
			noteItem: {
				title: "Notes",
				aspect: "important",
				number: 0,
				link: "/notes"
			},
			toDoListItem: {
				title: "To-do lists",
				aspect: "not completed",
				number: 0,
				link: "/todolists"
			}
		}
	},
	async mounted() {
		// parallel calls
		let responses = await Promise.all([
			await AxiosService.get("/privateaccomodations?limit=3"),
			await AxiosService.get("/reservations?limit=3"),
			await AxiosService.get("/guests?limit=3"),
			await AxiosService.get("/notes?important=true"),
			await AxiosService.get("/todolists?completed=false")
		]);
		// set retrieved accomodation data to view data
		this.accomodations = responses[0].data;
		console.log("accomodations");
		console.log(this.accomodations);
		// set retrieved reservation data to view data
		this.reservations = responses[1].data;
		console.log("reservations");
		console.log(this.reservations);
		// set retrieved guest data to view data
		this.guests = responses[2].data;
		console.log("guests");
		console.log(this.guests);
		// set length of retrieved note data to view data
		this.noteItem.number = responses[3].data.length;
		console.log("noteItem");
		console.log(this.noteItem.number);
		// set length of retrieved to-do list data to view data
		this.toDoListItem.number = responses[4].data.length;
		console.log("toDoListItem");
		console.log(this.toDoListItem.number);
	},
	components: {
		DashboardItem,
		AccomodationItem,
		ReservationItem,
		GuestItem,
		ButtonSeeMore,
		NoItemsDiv,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
