<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Reservation information</h1>
		<!-- Reservation period -->
		<div v-if="reservation.period" class="text-center mb-2">
			{{ reservation.period.start }} - {{ reservation.period.end }}
		</div>
		<!-- Reservation price -->
		<div v-if="reservation.price" class="text-center mb-2">
			{{ reservation.price.value }} {{ reservation.price.currency }}
		</div>
		<!-- Current state of reservation -->
		<div class="text-center mb-5">
			<v-chip v-if="reservation.currentState === 'CONFIRMED'" color="#55FF66" class="mx-2 mb-2">
				CONFIRMED
			</v-chip>
			<v-chip v-else-if="reservation.currentState === 'PENDING'" color="#6666ff" class="mx-2">
				PENDING
			</v-chip>
			<v-chip v-else-if="reservation.currentState === 'CANCELLED'" color="#FF6F6F" class="mx-2">
				CANCELLED
			</v-chip>
			<v-chip v-else-if="reservation.currentState === 'INQUIRY'" color="#FFCC00" class="mx-2">
				INQUIRY
			</v-chip>
			<v-chip v-else-if="reservation.currentState === 'COMPLETED'" color="#B5B5B5" class="mx-2">
				COMPLETED
			</v-chip>
		</div>
		<!-- Main information grid -->
		<div class="details-grid">
			<!-- Value of reservation in EUR -->
			<div class="details-grid-item">
				<FormLabel text="Value in EUR" class="details-label" />
				<FormTextField v-if="reservation.price" :text="reservation.price.valueInEur + ' EUR'" />
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
			<!-- Back button -->
			<router-link :to="{ name: 'reservations'}" class="router-link">
				<ButtonBack/>
			</router-link>
			<!-- Delete button and dialog -->
			<v-dialog v-model="dialog" width="500">
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs" v-on="on" elevation="2" rounded large class="ma-4 btn-delete">
						<v-icon color="#000000" class="mr-2">mdi-trash-can-outline</v-icon>
						DELETE
					</v-btn>
				</template>
				<v-card class="rounded-xl">
					<v-card-title class="text-h5">Deletion warning</v-card-title>
					<v-card-text>
						Are you sure you want to delete this reservation?
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<ButtonCancel @click.native="dialog = false" />
						<ButtonDelete @click.native="dialog = false" />
					</v-card-actions>
				</v-card>
			</v-dialog>
			<!-- Edit button -->
			<ButtonEdit/>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import FormLabel from '@/components/FormLabel.vue';
import FormTextField from '@/components/FormTextField.vue';

import ButtonBack from '@/components/ButtonBack.vue';
import ButtonDelete from '@/components/ButtonDelete.vue';
import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonEdit from '@/components/ButtonEdit.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'ReservationDetailView',
	data() {
		return {
			reservation: {},
			dialog: false
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
		ButtonDelete,
		ButtonCancel,
		ButtonEdit,
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
	.btn-delete {
		background-color: #FF6F6F !important;
	}
	.btn-delete:before {
		background: none;
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
