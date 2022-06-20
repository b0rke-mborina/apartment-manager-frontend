<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Create a new reservation</h1>
		<!-- Reservation state, private accomodation, price, currency and period -->
		<h3 class="text-center mb-4">Main information</h3>
		<div class="main-flex mb-10">
			<div class="mr-3 text-center">
				<!-- Current state of reservation select -->
				<div>
					<FormLabel text="State of reservation" class="details-label mb-2" />
					<v-select v-model="reservation.currentState"
								:items="reservationStates"
								item-value="value"
								item-text="value"
								label="Select state of reservation"
								solo rounded
								background-color="#A5D4FF">
						<template v-slot:append>
							<v-icon color="#000000">mdi-menu-down</v-icon>
						</template>
					</v-select>
				</div>
				<!-- Private accomodation select -->
				<div>
					<FormLabel text="Private accomodation" class="details-label mb-2" />
					<v-select v-model="reservation.period.privateAccomodation" return-object
								:items="privateAccomodations"
								item-value="privateAccomodation"
								item-text="name"
								label="Select private accomodation"
								solo rounded
								background-color="#A5D4FF">
								<!-- { ObjectId: privateAccomodation.ObjectId, name: privateAccomodation.name } -->
						<template v-slot:append>
							<v-icon color="#000000">mdi-menu-down</v-icon>
						</template>
					</v-select>
				</div>
				<div class="details-grid-item">
					<!-- Reservation price input number -->
					<div class="mr-2 details-grid-subitem">
						<FormLabel text="Price value" class="details-label mb-2" />
						<v-text-field v-model.number="reservation.price.value" solo rounded
										single-line type="number" step="0.01"
										background-color="#A5D4FF" class="input-number">
						</v-text-field>
					</div>
					<!-- Reservation currency select -->
					<div class="ml-2 details-grid-subitem">
						<FormLabel text="Currency" class="details-label mb-2" />
						<v-select v-model="reservation.price.currency"
									:items="currencies"
									item-value="value"
									item-text="value"
									label="Select currency"
									solo rounded
									background-color="#A5D4FF" class="importance-select">
							<template v-slot:append>
								<v-icon color="#000000">mdi-menu-down</v-icon>
							</template>
						</v-select>
					</div>
				</div>
			</div>
			<!-- Reservation period date range select -->
			<div class="ml-3 text-center">
				<FormLabel text="Period:" class="details-label mb-2" />
				<v-date-picker v-model="dates" range></v-date-picker>
			</div>
		</div>
		<h3 class="text-center mb-4">Guests</h3>
		<!-- Main information grid -->
		<div class="details-grid">
			<!-- Guest who made the reservation select -->
			<div class="details-grid-item mb-10">
				<FormLabel text="Guest who made the reservation" class="details-label mb-2" />
				<div>
					<v-select v-model="reservation.madeByGuest" return-object
								:items="guests"
								:item-text="item => item.firstName +' '+ item.lastName"
								@change="updateGuestList(reservation.madeByGuest.ObjectId)"
								label="Select a guest"
								solo rounded
								background-color="#A5D4FF" class="importance-select">
						<template v-slot:append>
							<v-icon color="#000000">mdi-menu-down</v-icon>
						</template>
					</v-select>
					<!-- Create new guest if not available button option -->
					<ButtonCreateNewGuest/>
				</div>
			</div>
			<!-- Other guests list -->
			<div class="details-grid-item mb-10">
				<FormLabel text="Other guests" class="details-label mb-2" />
				<div>
					<draggable v-model="reservation.guests"
								:group="{ name: 'otherGuests', pull: 'clone', put: false }"
								@start="drag=true" @end="drag=false"
								:animation="200"
								ghost-class="moving-card">
						<transition-group name="fade">
							<div v-for="guest in reservation.guests" v-bind:key="guest.ObjectId"
								class="item-flex mx-auto">
								<!-- Name of item -->
								<v-text-field solo rounded readonly
												:value="guest.firstName + ' ' + guest.lastName"
												label="Name of street"
												background-color="#A5D4FF">
								</v-text-field>
								<!-- Remove icon -->
								<v-btn icon class="btn" @click="removeGuest(guest.ObjectId)">
									<v-icon color="#000000">mdi-close</v-icon>
								</v-btn>
							</div>
						</transition-group>
					</draggable>
					<!-- Empty list sign -->
					<NoItemsDiv items="guests" v-if="reservation.guests.length === 0" />
					<!-- Add new guest button and select list with available guests -->
					<div class="text-center">
						<v-menu v-if="availableGuests.length > 0" rounded="xl">
							<template v-slot:activator="{ attrs, on }">
								<!-- Add new guest button -->
								<v-btn v-bind="attrs" v-on="on"
										elevation="2" rounded
										class="list-btn mx-3 my-2">
									<v-icon color="#000000" class="mr-2">mdi-plus</v-icon>
									ADD NEW GUEST
								</v-btn>
							</template>
							<!-- Select list with available guests -->
							<v-list>
								<v-list-item v-for="guest in availableGuests" v-bind:key="guest.ObjectId"
												@click="addGuest(guest.ObjectId)" link>
									<v-list-item-title>{{ guest.firstName + ' ' + guest.lastName }}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</div>
					<!-- Create new guest if not available option -->
					<ButtonCreateNewGuest/>
				</div>
			</div>
		</div>
		<!-- Main action buttons -->
		<div class="text-center">
			<router-link :to="{ name: 'reservations'}" class="router-link">
				<ButtonCancel/>
			</router-link>
			<!-- <router-link :to="{ name: 'reservations'}" class="router-link"> -->
				<ButtonSave @click.native="updateReservation()" />
			<!-- </router-link> -->
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import draggable from 'vuedraggable';

import FormLabel from '@/components/FormLabel.vue';

import ButtonCreateNewGuest from '@/components/ButtonCreateNewGuest.vue';
import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'ReservationAddNewView',
	data() {
		return {
			reservation: {
				ObjectId: null,
				period: {
					ObjectId: null,
					name: null,
					start: null,
					end: null,
					privateAccomodation: {
						ObjectId: null,
						name: null
					}
				},
				madeByGuest: null,
				guests: [],
				currentState: "INQUIRY",
				price: {
					value: null,
					currency: null,
					valueInEur: null
				}	
			},
			reservationStates: [
				{ value: "INQUIRY" },
				{ value: "PENDING" },
				{ value: "CONFIRMED" },
				{ value: "CANCELLED" },
				{ value: "COMPLETED" },
			],
			currencies: [
				{ value: "EUR" },
				{ value: "HRK" },
				{ value: "USD" },
			],
			dates: [],
			privateAccomodations: [],
			guests: [],
			availableGuests: []
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
		let guestsFromBackend = [
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
		];
		this.privateAccomodations = privateAccomodationsFromBackend;
		console.log(this.privateAccomodations);
		this.guests = guestsFromBackend;
		console.log(this.guests);
		this.availableGuests = guestsFromBackend;
		console.log(this.availableGuests);
	},
	methods: {
		updateGuestList(guestId) {
			this.reservation.madeByGuest = this.guests.find(guest => guest.ObjectId === guestId);
			this.reservation.guests = this.reservation.guests.filter(guest => guest.ObjectId !== guestId);
			this.availableGuests = this.guests.filter(guest => guest.ObjectId !== guestId);
			this.availableGuests = this.availableGuests
				.filter(availableGuest => !this.reservation.guests
				.find(guest => guest.ObjectId === availableGuest.ObjectId));
		},
		removeGuest(guestId) {
			this.reservation.guests = this.reservation.guests.filter(guest => guest.ObjectId !== guestId);
			this.availableGuests.push(this.guests.find(guest => guest.ObjectId === guestId));
		},
		addGuest(guestId) {
			this.reservation.guests.push(this.availableGuests.find(guest => guest.ObjectId === guestId));
			this.availableGuests = this.availableGuests.filter(guest => guest.ObjectId !== guestId);
		},
		updateReservation() {
			// update start and end dates
			this.dates = this.dates.sort();
			console.log(this.dates);
			this.reservation.period.start = this.dates[0];
			this.reservation.period.end = this.dates[1];
			// update value in eur (backend)
			this.reservation.price.valueInEur = null;
			// update period name
			this.reservation.period.name = `Closed (${this.reservation.madeByGuest.firstName} ${this.reservation.madeByGuest.lastName})`
			// print for check
			console.log(this.reservation);
		},
	},
	components: {
		draggable,
		FormLabel,
		ButtonCreateNewGuest,
		ButtonCancel,
		ButtonSave,
		NoItemsDiv,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
	.moving-card {
		opacity: 0.5;
		background: #F7FAFC;
		border: 1px solid #4299e1;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
	.main-flex {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.details-grid {
		display: grid;
		grid-template-columns: auto;
	}
	.details-grid-item {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.details-grid-subitem {
		width: 260px;
	}
	.btn {
		margin-top: 6px;
	}
	.list-btn {
		background-color: #A5D4FF !important;
	}
	.item-flex {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: top;
	}
	@media (max-width:1100px) {
		.main-flex {
			justify-content: center;
		}
	}
	@media (max-width:600px) {
		.main-flex {
			justify-content: center;
		}
		.details-grid-item {
			grid-template-columns: auto;
			text-align: center;
		}
		.details-grid-subitem {
			margin: 0px !important;
			width: 100%;
		}
	}
</style>
