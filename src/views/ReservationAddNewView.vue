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
								item-value="_id"
								@change="updateGuestList(reservation.madeByGuest._id)"
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
							<div v-for="guest in reservation.guests" v-bind:key="guest._id"
								class="item-flex mx-auto">
								<!-- Name of item -->
								<v-text-field solo rounded readonly
												:value="guest.firstName + ' ' + guest.lastName"
												label="Name of street"
												background-color="#A5D4FF">
								</v-text-field>
								<!-- Remove icon -->
								<v-btn icon class="btn" @click="removeGuest(guest._id)">
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
								<v-list-item v-for="guest in availableGuests" v-bind:key="guest._id"
												@click="addGuest(guest._id)" link>
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
				<ButtonSave @click.native="saveReservation()" />
			<!-- </router-link> -->
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService } from "@/services";

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
				period: {
					name: null,
					start: null,
					end: null,
					privateAccomodation: {
						_id: null,
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
	async mounted() {
		// get accomodations from backend, modify them for simplicity and save them to view data
		let responseAccomodations = await AxiosService.get("/privateaccomodations");
		this.privateAccomodations = responseAccomodations.data;
		this.privateAccomodations = this.privateAccomodations.map(accomodation => {
			return {
				_id: accomodation._id,
				name: accomodation.name
			}
		});
		console.log(this.privateAccomodations);
		// get guests from backend, modify them for simplicity and save them to view data (guests and available guests)
		let responseGuests = await AxiosService.get("/guests");
		this.guests = responseGuests.data;
		this.guests = this.guests.map(guest => {
			return {
				_id: guest._id,
				firstName: guest.firstName,
				lastName: guest.lastName,
				email: guest.email,
				phoneNumber: guest.phoneNumber,
				country: guest.country,
				city: guest.city
			}
		});
		console.log(this.guests);
		this.availableGuests = this.guests;
		console.log(this.availableGuests);
	},
	methods: {
		// updates guest list, guest who made the reservation and list of available guests
		updateGuestList(guestId) {
			// change the guest who made the reservation, remove him from reservation guest list (if needed),
			// and remove him from list of available guests (if needed)
			this.reservation.madeByGuest = this.guests.find(guest => guest._id === guestId);
			this.reservation.guests = this.reservation.guests.filter(guest => guest._id !== guestId);
			this.availableGuests = this.guests.filter(guest => guest._id !== guestId);
			// remove all reservation guests (guest list) from list of available guests
			this.availableGuests = this.availableGuests
				.filter(availableGuest => !this.reservation.guests
				.find(guest => guest._id === availableGuest._id));
		},
		// removes guest from reservation list and updates list of available guests
		removeGuest(guestId) {
			// remove guest from reservation list and add him to list of available guests
			this.reservation.guests = this.reservation.guests.filter(guest => guest._id !== guestId);
			this.availableGuests.push(this.guests.find(guest => guest._id === guestId));
		},
		// adds guest to reservation list and updates list of available guests
		addGuest(guestId) {
			// add guest to reservation list and remove him from list of available guests
			this.reservation.guests.push(this.availableGuests.find(guest => guest._id === guestId));
			this.availableGuests = this.availableGuests.filter(guest => guest._id !== guestId);
		},
		// modifies reservation data, checks its completeness and sends it to backend for saving
		async saveReservation() {
			// update start and end dates
			this.dates = this.dates.sort();
			console.log(this.dates);
			this.reservation.period.start = this.dates[0];
			this.reservation.period.end = this.dates[1];
			// update value in eur (backend)
			this.reservation.price.valueInEur = null;
			// update period name
			if (this.reservation.madeByGuest) {
				this.reservation.period.name = `Closed (${this.reservation.madeByGuest.firstName} ${this.reservation.madeByGuest.lastName})`;
			}
			
			console.log(this.reservation);
					
			// check if reservation data is complete
			const reservationIsFull = Object.values(this.reservation)
				.every(x => x !== null && x !== undefined && x !== '');
			if (reservationIsFull) {
				const madeByGuestIsFull = Object.values(this.reservation.madeByGuest)
					.every(x => x !== null && x !== undefined && x !== '');
				const periodIsFull = Object.values(this.reservation.period)
					.every(x => x !== null && x !== undefined && x !== '');
				const accomodationIsFull = Object.values(this.reservation.period.privateAccomodation)
					.every(x => x !== null && x !== undefined && x !== '');
				const priceIsFull = Boolean(this.reservation.price.value && this.reservation.price.currency);
				console.log(priceIsFull);
				if (madeByGuestIsFull && periodIsFull && accomodationIsFull && priceIsFull) {
					// update made by guest and guests (set _id-s only)
					this.reservation.madeByGuest = this.reservation.madeByGuest._id;
					this.reservation.guests = this.reservation.guests.map(guest => guest._id);
					console.log("full");
					// save period to database
					console.log(this.reservation.period);
					let periodId = await AxiosService.post("/periods", this.reservation.period);
					this.reservation.period = periodId._id;
					// save reservation to database
					console.log(this.reservation);
					await AxiosService.post("/reservations", this.reservation);
				} else console.log("An error has occured. Please try again.");
			} else console.log("An error has occured. Please try again.");
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
