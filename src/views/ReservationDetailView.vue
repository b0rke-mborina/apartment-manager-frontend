<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Reservation information</h1>
		<!-- Reservation period -->
		<div v-if="reservation.period" class="text-center mb-2">
			{{ convertPeriod(reservation.period.start, reservation.period.end) }}
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
				<FormTextField v-if="reservation.price" readonly
									:text="reservation.price.valueInEur + ' EUR'" />
			</div>
			<!-- Guest who made the reservation -->
			<div class="details-grid-item">
				<FormLabel text="Guest who made the reservation" class="details-label" />
				<FormTextField v-if="reservation.madeByGuest" readonly
									:text="reservation.madeByGuest.firstName + ' ' + reservation.madeByGuest.lastName" />
			</div>
			<!-- Other guests -->
			<div class="details-grid-item">
				<FormLabel text="Other guests" class="details-label" />
				<div v-if="reservation.guests">
					<div v-for="guest in reservation.guests" v-bind:key="guest._id">
						<FormTextField v-if="guest._id !== reservation.madeByGuest._id"
											readonly
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
			<ButtonDialogDelete itemType="reservation" service="reservation" :_id="reservation._id" />
			<router-link :to="{ name: 'reservation-modification'}" class="router-link">
				<ButtonEdit/>
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService, convertPeriod } from '@/services';

import FormLabel from '@/components/FormLabel.vue';
import FormTextField from '@/components/FormTextField.vue';

import ButtonBack from '@/components/ButtonBack.vue';
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonEdit from '@/components/ButtonEdit.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'ReservationDetailView',
	data() {
		return {
			reservation: {}
		}
	},
	async mounted() {
		// get reservation data and set it to view data
		console.log("call");
		let response = await AxiosService.get(`/reservation/${this.$route.params.id}`);
		this.reservation = response.data;
		console.log(this.reservation);
	},
	methods: {
		// imported function for period conversion
		convertPeriod
	},
	components: {
		FormLabel,
		FormTextField,
		ButtonBack,
		ButtonDialogDelete,
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
