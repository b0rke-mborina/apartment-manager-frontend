<template>
	<v-container absolute fluid class="main-content">
		<!-- <CalendarItem/> -->
		<h1 class="mt-5 mb-4 text-center">Dashboard</h1>
		<!-- <ButtonBack/>
		<ButtonSave/>
		<FormLabel text="Name" />
		<FormTextField text="Apartment Nature" /> -->
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
			<AccomodationItem v-for="accomodation in accomodations" v-bind:key="accomodation.ObjectId" :accomodation="accomodation" />
		</div>
		<div class="text-center">
			<router-link to="/accomodations" class="router-link">
				<ButtonSeeMore/>
			</router-link>
		</div>
		<!-- Reservations -->
		<h2 class="mt-5 mb-2">Your upcoming reservations</h2>
		<ReservationItem v-for="reservation in reservations" v-bind:key="reservation.ObjectId" :reservation="reservation"/>
		<div class="text-center">
			<router-link to="/reservations" class="router-link">
				<ButtonSeeMore/>
			</router-link>
		</div>
		<!-- Guests -->
		<h2 class="mt-5 mb-2">Your guests</h2>
		<GuestItem v-for="guest in guests" v-bind:key="guest.ObjectId" :guest="guest" />
		<div class="text-center">
			<router-link to="/guests" class="router-link">
				<ButtonSeeMore/>
			</router-link>
		</div>
		<EmptyDiv/>
	</v-container>
</template>

<script>
import AccomodationItem from '@/components/AccomodationItem.vue';
import ReservationItem from '@/components/ReservationItem.vue';
import GuestItem from '@/components/GuestItem.vue';
import ToDoListItem from '@/components/ToDoListItem.vue';
import NoteItem from '@/components/NoteItem.vue';
import CalendarItem from '@/components/CalendarItem.vue';
import DashboardItem from '@/components/DashboardItem.vue';

import ButtonDelete from '@/components/ButtonDelete.vue';
import ButtonSave from '@/components/ButtonSave.vue';
import ButtonBack from '@/components/ButtonBack.vue';
import ButtonSeeMore from '@/components/ButtonSeeMore.vue';
import FormLabel from '@/components/FormLabel.vue';
import FormTextField from '@/components/FormTextField.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'DashboardView',data() {
		return {
			accomodations: [],
			reservations: [],
			guests: [],
			noteItem: null,
			toDoListItem: null
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
						ObjecId: 100,
						startDate: "2022-05-26",
						endDate: "2022-05-30"
					},
					madeByGuest: {
						ObjecId: 100,
						firstName: "Mark",
						lastName: "Williams",
						email: "mwilliams@gmail.com",
						phoneNumber: "+000 000 0000",
						country: "United Kingdom",
						city: "London",
						period: {
							startDate: "2022-07-01",
							endDate: "2022-07-10"
						}
					},
					guests: [
						{
							ObjecId: 100,
							firstName: "Mark",
							lastName: "Williams",
							email: "mwilliams@gmail.com",
							phoneNumber: "+000 000 0000",
							country: "United Kingdom",
							city: "London",
							period: {
								startDate: "2022-07-01",
								endDate: "2022-07-10"
							}
						},
						{
							ObjecId: 102,
							firstName: "Marie",
							lastName: "Smith",
							email: "msmith@gmail.com",
							phoneNumber: "+222 222 2222",
							country: "United States",
							city: "Los Angeles",
							period: {
								startDate: "2022-07-10",
								endDate: "2022-07-31"
							}
						},
						{
							ObjecId: 103,
							firstName: "Mario",
							lastName: "Vercetti",
							email: "mvercetti@gmail.com",
							phoneNumber: "+333 333 3333",
							country: "Italy",
							city: "Milano",
							period: {
								startDate: "2022-07-10",
								endDate: "2022-07-31"
							}
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
						ObjecId: 101,
						startDate: "2022-06-28",
						endDate: "2022-07-08"
					},
					madeByGuest: {
						ObjecId: 103,
						firstName: "Mario",
						lastName: "Vercetti",
						email: "mvercetti@gmail.com",
						phoneNumber: "+333 333 3333",
						country: "Italy",
						city: "Milano",
						period: {
							startDate: "2022-07-10",
							endDate: "2022-07-31"
						}
					},
					guests: [
						{
							ObjecId: 103,
							firstName: "Mario",
							lastName: "Vercetti",
							email: "mvercetti@gmail.com",
							phoneNumber: "+333 333 3333",
							country: "Italy",
							city: "Milano",
							period: {
								startDate: "2022-07-10",
								endDate: "2022-07-31"
							}
						},
						{
							ObjecId: 100,
							firstName: "Mark",
							lastName: "Williams",
							email: "mwilliams@gmail.com",
							phoneNumber: "+000 000 0000",
							country: "United Kingdom",
							city: "London",
							period: {
								startDate: "2022-07-01",
								endDate: "2022-07-10"
							}
						},
						{
							ObjecId: 101,
							firstName: "Hans",
							lastName: "Muller",
							email: "hmuller@gmail.com",
							phoneNumber: "+111 111 1111",
							country: "Germany",
							city: "Munchen",
							period: {
								startDate: "2022-08-01",
								endDate: "2022-08-10"
							}
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
					ObjecId: 100,
					firstName: "Mark",
					lastName: "Williams",
					email: "mwilliams@gmail.com",
					phoneNumber: "+000 000 0000",
					country: "United Kingdom",
					city: "London",
					period: {
						startDate: "2022-07-01",
						endDate: "2022-07-10"
					},
					guestState: "CONFIRMED GUEST"
				},
				{
					ObjecId: 101,
					firstName: "Hans",
					lastName: "Muller",
					email: "hmuller@gmail.com",
					phoneNumber: "+111 111 1111",
					country: "Germany",
					city: "Munchen",
					period: {
						startDate: "2022-08-01",
						endDate: "2022-08-10"
					},
					guestState: "POSSIBLE GUEST"
				},
				{
					ObjecId: 102,
					firstName: "Marie",
					lastName: "Smith",
					email: "msmith@gmail.com",
					phoneNumber: "+222 222 2222",
					country: "United States",
					city: "Los Angeles",
					period: {
						startDate: "2022-07-10",
						endDate: "2022-07-31"
					},
					guestState: "POTENTIAL GUEST"
				}
			],
			noteItem: {
				title: "Notes",
				aspect: "important",
				number: 3,
				link: "/notes"
			},
			toDoListItem: {
				title: "To-do lists",
				aspect: "not completed",
				number: 2,
				link: "/todolists"
			}
		};
		this.accomodations = dataFromBackend.accomodations;
		console.log(this.accomodations);
		this.reservations = dataFromBackend.reservations;
		console.log(this.reservations);
		this.guests = dataFromBackend.guests;
		console.log(this.guests);
		this.noteItem = dataFromBackend.noteItem;
		console.log(this.noteItem);
		this.toDoListItem = dataFromBackend.toDoListItem;
		console.log(this.toDoListItem);
	},
	components: {
		AccomodationItem,
		ReservationItem,
		GuestItem,
		ToDoListItem,
		NoteItem,
		CalendarItem,
		DashboardItem,
		ButtonDelete,
		ButtonSave,
		ButtonBack,
		ButtonSeeMore,
		FormLabel,
		FormTextField,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
