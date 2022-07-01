<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Edit a reservation</h1>
		<!-- Loading circular progress bar -->
		<div class="text-center">
			<v-progress-circular v-if="loadingData" indeterminate color="#A5D4FF"></v-progress-circular>
		</div>
		<!-- Reservation state, private accomodation, price, currency and period -->
		<h3 v-if="!loadingData" class="text-center mb-4">Main information</h3>
		<div v-if="!loadingData" class="main-flex mb-10">
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
					<v-select v-model="period.privateAccomodation" return-object
								:items="privateAccomodations"
								item-value="privateAccomodation"
								item-text="name"
								label="Select private accomodation"
								solo rounded
								background-color="#A5D4FF">
								<!-- { _id: privateAccomodation._id, name: privateAccomodation.name } -->
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
		<h3 v-if="!loadingData" class="text-center mb-4">Guests</h3>
		<!-- Main information grid -->
		<div v-if="!loadingData" class="details-grid">
			<!-- Guest who made the reservation select -->
			<div class="details-grid-item mb-10">
				<FormLabel text="Guest who made the reservation" class="details-label mb-2" />
				<div>
					<v-select v-model="reservation.madeByGuest"
								:items="guests"
								item-value="_id"
								:item-text="item => item.firstName +' '+ item.lastName"
								@change="updateGuestList(reservation.madeByGuest)"
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
			<ButtonDialogDelete itemType="reservation" service="reservation" :_id="reservation._id"
									  routeName="reservations" />
			<!-- <router-link :to="{ name: 'reservations'}" class="router-link"> -->
				<ButtonSave @click.native="updateReservation()" :loading="loading" />
			<!-- </router-link> -->
		</div>
		<!-- Snackbar for showing errors -->
		<v-snackbar :value="snackbar" :timeout="-1" rounded="xl" :color="snackbarColor" width="400">
			<span class="snackbar">{{ snackbarMsg }}</span>
			<template v-slot:action="{ attrs }" class="snackbar-content">
				<v-btn text v-bind="attrs" @click="snackbarMsg = null, snackbar = false" color="#000000">
					CLOSE
				</v-btn>
			</template>
		</v-snackbar>
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
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'ReservationEditView',
	data() {
		return {
			reservation: {
				_id: null,
				period: null,
				madeByGuest: null,
				guests: [],
				currentState: null,
				price: {
					value: null,
					currency: null,
					valueInEur: null
				}	
			},
			originalReservation: null,
			period: {
				name: null,
				start: null,
				end: null,
				privateAccomodation: {
					id: null,
					name: null
				}
			},
			originalPeriod: null,
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
			availableGuests: [],
			loading: false,
			loadingData: false,
			snackbarMsg: null,
			snackbarColor: null,
			snackbar: false
		}
	},
	async mounted() {
		this.loadingData = true;
		try {
			// parallel calls (accomodations and guests)
			let responses = await Promise.all([
				await AxiosService.get(`/reservation/${this.$route.params.id}`),
				await AxiosService.get("/privateaccomodations"),
				await AxiosService.get("/guests")
			]);
			// set retrieved data to period
			this.period = responses[0].data.period;
			this.originalPeriod = JSON.parse(JSON.stringify(responses[0].data.period));
			// set dates for date picker to be start and end dates from period
			this.dates = [responses[0].data.period.start, responses[0].data.period.end];
			// set retrieved data to reservation
			let initialReservation = responses[0].data;
			initialReservation.period = responses[0].data.period._id;
			initialReservation.madeByGuest = responses[0].data.madeByGuest._id;
			initialReservation.guests = responses[0].data.guests.map(guest => guest._id);
			initialReservation.price.valueInEur = null;
			this.reservation = initialReservation;
			console.log("reservation");
			console.log(this.reservation);
			// add original objects for check (copies)
			this.originalReservation = JSON.parse(JSON.stringify(initialReservation));
			// set retrieved accomodations data to view data and modify it for simplicity
			this.privateAccomodations = responses[1].data.map(accomodation => {
				return {
					id: accomodation._id,
					name: accomodation.name
				}
			});
			// set retrieved guests data to view data and modify it for simplicity (guests and available guests)
			this.guests = responses[2].data.map(guest => {
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
			// set available guests to be all guests but ones in reservation
			this.availableGuests = this.guests
				.filter(availableGuest => !this.reservation.guests
				.find(guest => guest._id === availableGuest._id));
			this.availableGuests = this.availableGuests.filter(guest => this.reservation.madeByGuest !== guest._id);
			// set guests (objects) to reservation
			initialReservation.guests = initialReservation.guests.map(guestId => {
				return this.guests.find(guest => guest._id === guestId);
			});
		} catch (error) {
			this.snackbarMsg = "Error has occured. Please try again.";
			this.snackbarColor = "#FF6F6F";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loadingData = false;

		console.log("period");
		console.log(this.period);
		console.log("dates");
		console.log(this.dates);
		console.log("reservation");
		console.log(this.reservation);
		console.log("guests");
		console.log(this.guests);
		console.log("reservation guests");
		console.log(this.reservation.guests);
		console.log("available guests");
		console.log(this.availableGuests);
	},
	methods: {
		// updates guest list, guest who made the reservation and list of available guests
		updateGuestList(guestId) {
			this.reservation.madeByGuest = this.guests.find(guest => guest._id === guestId)._id;
			this.reservation.guests = this.reservation.guests.filter(guest => guest._id !== guestId);
			this.availableGuests = this.guests.filter(guest => guest._id !== guestId);
			this.availableGuests = this.availableGuests
				.filter(availableGuest => !this.reservation.guests
				.find(guest => guest._id === availableGuest._id));
		},
		// removes guest from reservation list and updates list of available guests
		removeGuest(guestId) {
			this.reservation.guests = this.reservation.guests.filter(guest => guest._id !== guestId);
			this.availableGuests.push(this.guests.find(guest => guest._id === guestId));
		},
		// adds guest to reservation list and updates list of available guests
		addGuest(guestId) {
			this.reservation.guests.push(this.availableGuests.find(guest => guest._id === guestId));
			this.availableGuests = this.availableGuests.filter(guest => guest._id !== guestId);
		},
		// checks if two objects received as parameters are equal
		objectsAreEqual(object1, object2) {
			const keys1 = Object.keys(object1);
			const keys2 = Object.keys(object2);
			if (keys1.length !== keys2.length) {
				return false;
			}
			for (const key of keys1) {
				const val1 = object1[key];
				const val2 = object2[key];
				const areObjects = this.isObject(val1) && this.isObject(val2);
				if (areObjects && !this.objectsAreEqual(val1, val2) || !areObjects && val1 !== val2) {
					return false;
				}
			}
			return true;
		},
		isObject(object) {
			return object != null && typeof object === 'object';
		},
		// modifies reservation data, checks its completeness and sends it to backend for saving
		async updateReservation() {
			// update start and end dates
			this.dates = this.dates.sort();
			console.log(this.dates);
			this.period.start = this.dates[0];
			this.period.end = this.dates[1];
			// update value in eur (backend)
			this.reservation.price.valueInEur = null;
			// update period name
			let mainGuest = this.guests.find(guest => guest._id === this.reservation.madeByGuest);
			this.period.name = `Reservation (${mainGuest.firstName} ${mainGuest.lastName})`;

			const reservationIsFull = Object.values(this.reservation).every(value => value !== null && value !== '');
			const priceIsFull = Boolean(
				this.reservation.price.value !== null && this.reservation.price.value !== undefined
				&& typeof this.reservation.price.value === "number"
				&& this.reservation.price.currency && typeof this.reservation.price.currency === "string"
			);
			const periodIsFull = Object.values(this.period).every(value => value !== null && value !== '');
			const accomodationIsFull = Object.values(this.period.privateAccomodation).every(value => value !== null && value !== '');
			if (reservationIsFull && priceIsFull && periodIsFull && accomodationIsFull) {
				// update guests
				this.reservation.guests = this.reservation.guests.map(guest => guest._id);
				this.originalReservation.guests = this.originalReservation.guests.map(guestId => {
					return this.guests.find(guest => guest._id === guestId);
				});
				// send data to backend for saving
				this.loading = true;
				try {
					if (!this.objectsAreEqual(this.reservation, this.originalReservation)) {
						await AxiosService.patch(`reservation/${this.reservation._id}`, this.reservation);
					}
					console.log(this.period);
					console.log(this.originalPeriod);
					if (!this.objectsAreEqual(this.period, this.originalPeriod)) {
						await AxiosService.patch(`period/${this.period._id}`, this.period);
					}
					this.$router.push({ name: 'reservation-detail', params: { id: this.reservation._id } });
				} catch (error) {
					this.snackbarMsg = "Error has occured. Please try again.";
					this.snackbarColor = "#FF6F6F";
					this.snackbar = true;
					console.log(Object.keys(error), error.message);
				}
				this.loading = false;
			}
			// update guests
			this.reservation.guests = this.reservation.guests.map(guestId => {
				return this.guests.find(guest => guest._id === guestId);
			});
			console.log("reservation guests in f");
			console.log(this.reservation.guests);
		}
	},
	components: {
		draggable,
		FormLabel,
		ButtonCreateNewGuest,
		ButtonCancel,
		ButtonDialogDelete,
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
	.snackbar-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.snackbar {
		color: #000000;
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
