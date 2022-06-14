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
			<ButtonDialogDelete/>
			<!-- <router-link :to="{ name: 'guests' }" class="router-link"> -->
				<ButtonSave @click.native="printGuest()" />
			<!-- </router-link> -->
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import FormLabel from '@/components/FormLabel.vue';

import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'GuestAddNewView',
	data() {
		return {
			guest: {
				ObjectId: null,
				firstName: null,
				lastName: null,
				email: null,
				phoneNumber: null,
				country: null,
				city: null
			}
		}
	},
	mounted() {
		
	},
	methods: {
		printGuest() {
			console.log(this.guest);
		}
	},
	components: {
		FormLabel,
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
