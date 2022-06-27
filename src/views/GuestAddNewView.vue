<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 text-center">Create a new guest</h1>
		<!-- Main information grid -->
		<div class="details-grid mt-9">
			<!-- First name info -->
			<div class="details-grid-item">
				<FormLabel text="First name" class="details-label" />
				<v-text-field v-model="guest.firstName" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Guest's first name"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Last name info -->
			<div class="details-grid-item">
				<FormLabel text="Last name" class="details-label" />
				<v-text-field v-model="guest.lastName" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Guest's last name"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Email info -->
			<div class="details-grid-item">
				<FormLabel text="Email" class="details-label" />
				<v-text-field v-model="guest.email" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  type="email"
								  label="example@email.com"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Phone number info -->
			<div class="details-grid-item">
				<FormLabel text="Phone number" class="details-label" />
				<v-text-field v-model="guest.phoneNumber" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Guest's phone number"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Country info -->
			<div class="details-grid-item">
				<FormLabel text="Country" class="details-label" />
				<v-text-field v-model="guest.country" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Country the guest is from"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- City info -->
			<div class="details-grid-item">
				<FormLabel text="City" class="details-label" />
				<v-text-field v-model="guest.city" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="City the guest is from"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
		</div>
		<!-- Main action buttons -->
		<div class="text-center mt-5">
			<router-link :to="{ name: 'guests' }" class="router-link">
				<ButtonCancel/>
			</router-link>
			<!-- <router-link :to="{ name: 'guests' }" class="router-link"> -->
				<ButtonSave @click.native="saveGuest()" :loading="loading" />
			<!-- </router-link> -->
		</div>
		<!-- Snackbar for showing errors -->
		<v-snackbar :value="snackbar" :timeout="-1" rounded="xl" color="#FF6F6F" width="400">
			<span class="snackbar">{{ errorMsg }}</span>
			<template v-slot:action="{ attrs }" class="snackbar-content">
				<v-btn text v-bind="attrs" @click="errorMsg = null, snackbar = false" color="#000000">
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

import FormLabel from '@/components/FormLabel.vue';

import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'GuestAddNewView',
	data() {
		return {
			guest: {
				firstName: null,
				lastName: null,
				email: null,
				phoneNumber: null,
				country: null,
				city: null
			},
			loading: false,
			errorMsg: null,
			snackbar: false
		}
	},
	methods: {
		// checks completeness of guest data and sends it to backend for saving
		async saveGuest() {
			// set additional attributes to guest
			this.guest["currentState"] = "NOT A GUEST YET";
			const newestPeriod = {
				start: null,
				end: null,
				privateAccomodation: null
			}
			this.guest["newestPeriod"] = newestPeriod;
			// check completeness of data
			console.log(this.guest);
			const check = Boolean(this.guest.firstName && this.guest.lastName && this.guest.country && this.guest.city);
			if (check) {
				// send data to backend for saving
				this.loading = true;
				try {
					await AxiosService.post("/guests", this.guest);
					this.$router.push({ name: 'guests' });
				} catch (error) {
					this.errorMsg = "Error has occured. Please try again.";
					this.snackbar = true;
					console.log(Object.keys(error), error.message);
				}
				this.loading = false;
			} else {
				this.errorMsg = "All fields except email and phone number are required. Fill required fields and try again.";
				this.snackbar = true;
			}
		}
	},
	components: {
		FormLabel,
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
	.heading-text-field {
		width: 50%;
	}
	.importance-select {
		width: 40%;
	}
	.v-input__slot, textarea {
		padding-top: 10px !important;
		padding-bottom: 10px !important;
	}
	.heading-text-field .v-icon {
		color: #000000 !important;
	}
	@media (max-width:1200px) {
		.heading-text-field {
			width: 70%;
		}
	}
	@media (max-width:800px) {
		.heading-text-field {
			width: 100%;
		}
		.importance-select {
			width: 75%;
		}
	}
	@media (max-width:500px) {
		.importance-select {
			width: 100%;
		}
	}
</style>
