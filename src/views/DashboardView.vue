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
import AccomodationItem from '@/components/AccomodationItem.vue';
import ReservationItem from '@/components/ReservationItem.vue';
import GuestItem from '@/components/GuestItem.vue';
import ToDoListItem from '@/components/ToDoListItem.vue';
import NoteItem from '@/components/NoteItem.vue';
import DashboardItem from '@/components/DashboardItem.vue';

import ButtonDelete from '@/components/ButtonDelete.vue';
import ButtonSave from '@/components/ButtonSave.vue';
import ButtonBack from '@/components/ButtonBack.vue';
import ButtonSeeMore from '@/components/ButtonSeeMore.vue';

import FormLabel from '@/components/FormLabel.vue';
import FormTextField from '@/components/FormTextField.vue';

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
	mounted() {
		let dataFromBackend = {
			accomodations: [
				{
					ObjectId: 111,
					name: "Apartment Nature",
					categoryStarNumber: 3,
					maxGuestNumber: 6,
					currentState: "AVAILABLE",
					location: {
						street: "Labinska",
						houseNumber: "2",
						entranceNumber: "1a",
						postalNumber: 52100,
						city: "Pula",
						country: "Croatia"
					},
					hasYard: true,
					lowestFloor: 0,
					numberofFloors: 1
				},
				{
					ObjectId: 211,
					name: "Apartment Marie",
					categoryStarNumber: 4,
					maxGuestNumber: 4,
					currentState: "OCCUPIED",
					location: {
						street: "Valturska",
						houseNumber: "11",
						entranceNumber: "1a",
						postalNumber: 52210,
						city: "Rovinj",
						country: "Croatia"
					},
					hasYard: false,
					lowestFloor: 1,
					numberofFloors: 2
				},
				{
					ObjectId: 311,
					name: "Apartment x",
					categoryStarNumber: 5,
					maxGuestNumber: 5,
					currentState: "NOT READY",
					location: {
						street: "Valturska",
						houseNumber: "1d",
						entranceNumber: "l",
						postalNumber: 52210,
						city: "Rovinj",
						country: "Croatia"
					},
					hasYard: false,
					lowestFloor: 2,
					numberofFloors: 1
				}
			],
			reservations: [
				{
					ObjectId: 100,
					period: {
						ObjectId: 100,
						start: "2022-05-26",
						end: "2022-05-30"
					},
					madeByGuest: {
						ObjectId: 100,
						firstName: "Mark",
						lastName: "Williams",
						email: "mwilliams@gmail.com",
						phoneNumber: "+000 000 0000",
						country: "United Kingdom",
						city: "London"
					},
					guests: [
						{
							ObjectId: 100,
							firstName: "Mark",
							lastName: "Williams",
							email: "mwilliams@gmail.com",
							phoneNumber: "+000 000 0000",
							country: "United Kingdom",
							city: "London"
						},
						{
							ObjectId: 102,
							firstName: "Marie",
							lastName: "Smith",
							email: "msmith@gmail.com",
							phoneNumber: "+222 222 2222",
							country: "United States",
							city: "Los Angeles"
						},
						{
							ObjectId: 103,
							firstName: "Mario",
							lastName: "Vercetti",
							email: "mvercetti@gmail.com",
							phoneNumber: "+333 333 3333",
							country: "Italy",
							city: "Milano"
						}
					],
					currentState: "CONFIRMED",
					price: {
						value: 1000,
						currency: "EUR",
						valueInEur: 1000
					}
				},
				{
					ObjectId: 101,
					period: {
						ObjectId: 101,
						start: "2022-06-28",
						end: "2022-07-08"
					},
					madeByGuest: {
						ObjectId: 103,
						firstName: "Mario",
						lastName: "Vercetti",
						email: "mvercetti@gmail.com",
						phoneNumber: "+333 333 3333",
						country: "Italy",
						city: "Milano"
					},
					guests: [
						{
							ObjectId: 103,
							firstName: "Mario",
							lastName: "Vercetti",
							email: "mvercetti@gmail.com",
							phoneNumber: "+333 333 3333",
							country: "Italy",
							city: "Milano"
						},
						{
							ObjectId: 100,
							firstName: "Mark",
							lastName: "Williams",
							email: "mwilliams@gmail.com",
							phoneNumber: "+000 000 0000",
							country: "United Kingdom",
							city: "London"
						},
						{
							ObjectId: 101,
							firstName: "Hans",
							lastName: "Muller",
							email: "hmuller@gmail.com",
							phoneNumber: "+111 111 1111",
							country: "Germany",
							city: "Munchen"
						}
					],
					currentState: "INQUIRY",
					price: {
						value: 3500,
						currency: "HRK",
						valueInEur: 1000
					}
				}
			],
			guests: [
				{
					ObjectId: 110,
					firstName: "Mark",
					lastName: "Williams",
					email: "mwilliams@gmail.com",
					phoneNumber: "+000 000 0000",
					country: "United Kingdom",
					city: "London",
					newestPeriod: {
						start: "2022-07-01",
						end: "2022-07-10",
						privateAccomodation: {
							ObjectId: 111,
							name: "Apartment Nature"
						}
					},
					guestState: "CONFIRMED GUEST"
				},
				{
					ObjectId: 111,
					firstName: "Hans",
					lastName: "Muller",
					email: "hmuller@gmail.com",
					phoneNumber: "+111 111 1111",
					country: "Germany",
					city: "Munchen",
					newestPeriod: {
						start: "2022-08-01",
						end: "2022-08-10",
						privateAccomodation: {
							ObjectId: 111,
							name: "Apartment Nature"
						}
					},
					guestState: "POSSIBLE GUEST"
				},
				{
					ObjectId: 102,
					firstName: "Marie",
					lastName: "Smith",
					email: "msmith@gmail.com",
					phoneNumber: "+222 222 2222",
					country: "United States",
					city: "Los Angeles",
					newestPeriod: {
						start: "2022-07-10",
						end: "2022-07-31",
						privateAccomodation: {
							ObjectId: 111,
							name: "Apartment Nature"
						}
					},
					guestState: "POTENTIAL GUEST"
				}
			],
			noteItemsNumber: 3,
			toDoListItemsNumber: 2
		};
		this.accomodations = dataFromBackend.accomodations;
		console.log(this.accomodations);
		this.reservations = dataFromBackend.reservations;
		console.log(this.reservations);
		this.guests = dataFromBackend.guests;
		console.log(this.guests);
		this.noteItem.number = dataFromBackend.noteItemsNumber;
		console.log(this.noteItem);
		this.toDoListItem.number = dataFromBackend.toDoListItemsNumber;
		console.log(this.toDoListItem);
	},
	components: {
		AccomodationItem,
		ReservationItem,
		GuestItem,
		ToDoListItem,
		NoteItem,
		DashboardItem,
		ButtonDelete,
		ButtonSave,
		ButtonBack,
		ButtonSeeMore,
		FormLabel,
		FormTextField,
		NoItemsDiv,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
