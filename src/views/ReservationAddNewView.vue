<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Create a new reservation</h1>
		<!-- Reservation period -->
		<!-- Reservation price -->
		<!-- Current state of reservation -->
		<!-- Main information grid -->
		<div class="details-grid">
			<!-- Value of reservation in EUR -->
			<div class="details-grid-item">
				<FormLabel text="Value in EUR" class="details-label" />
				<FormTextField v-if="reservation.price"
									:text="reservation.price.valueInEur + ' EUR'" />
			</div>
			<!-- Guest who made the reservation -->
			<div class="details-grid-item">
				<FormLabel text="Guest who made the reservation" class="details-label" />
				<FormTextField v-if="reservation.madeByGuest"
									:text="reservation.madeByGuest.firstName + ' ' + reservation.madeByGuest.lastName" />
			</div>
			<!-- Other guests -->
			<div class="details-grid-item">
				<FormLabel text="Other guests" class="details-label" />
				<div v-if="reservation.guests">
					<div v-for="guest in reservation.guests" v-bind:key="guest.ObjectId">
						<FormTextField v-if="guest.ObjectId !== reservation.madeByGuest.ObjectId"
											:text="guest.firstName + ' ' + guest.lastName" />
					</div>
				</div>
			</div>
		</div>
		<!-- Main action buttons -->
		<div class="text-center">
			<router-link :to="{ name: 'reservations'}" class="router-link">
				<ButtonBack/>
			</router-link>
			<ButtonDialogDelete/>
			<!-- <router-link :to="{ name: 'reservations'}" class="router-link"> -->
				<ButtonSave/>
			<!-- </router-link> -->
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import FormLabel from '@/components/FormLabel.vue';
import FormTextField from '@/components/FormTextField.vue';

import ButtonBack from '@/components/ButtonBack.vue';
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'ReservationAddNewView',
	data() {
		return {
			reservation: {}
		}
	},
	mounted() {
		let reservationFromBackend = {
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
		};
		this.reservation = reservationFromBackend;
		console.log(this.reservation);
	},
	components: {
		FormLabel,
		FormTextField,
		ButtonBack,
		ButtonDialogDelete,
		ButtonCancel,
		ButtonSave,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
	.details-grid {
		display: grid;
		grid-template-columns: auto;
	}
	.details-grid-item {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width:750px) {
		.details-grid-item {
			grid-template-columns: auto;
		}
		.details-label {
			text-align: center;
			margin-bottom: 8px;
		}
	}
</style>
