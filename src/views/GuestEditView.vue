<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 text-center">Edit guest accomodation</h1>
		<!-- Current state of the guest -->
		<div v-if="guest.newestPeriod" class="text-center mb-9">
			<v-chip v-if="guest.guestState === 'CANCELLED GUEST'"
					  color="#FF6F6F" class="mx-2 my-1">
				CANCELLED GUEST
			</v-chip>
			<v-chip v-else-if="guest.guestState === 'POSSIBLE GUEST'"
					  color="#6666ff" class="mx-2 my-1">
				POSSIBLE GUEST
			</v-chip>
			<v-chip v-else-if="guest.guestState === 'POTENTIAL GUEST'"
					  color="#FFCC00" class="mx-2 my-1">
				POTENTIAL GUEST
			</v-chip>
			<v-chip v-else-if="guest.newestPeriod.end < currentDate()
									&& guest.guestState === 'CONFIRMED GUEST'"
					  color="#B5B5B5" class="mx-2 my-1">
				FORMER GUEST
			</v-chip>
			<v-chip v-else-if="guest.newestPeriod.start >= currentDate()
									&& guest.newestPeriod.end <= currentDate()
									&& guest.guestState === 'CONFIRMED GUEST'"
					  icon color="#55FF66" class="pr-2">
				CURRENT GUEST
			</v-chip>
			<v-chip v-else-if="guest.newestPeriod.start > currentDate()
									&& guest.guestState === 'CONFIRMED GUEST'"
					  icon color="#55FF66" class="pr-2">
				FUTURE GUEST
			</v-chip>
		</div>
		<!-- Main information grid -->
		<div class="details-grid">
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
								  type="email"
								  label="Guest's last name"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Email info -->
			<div class="details-grid-item">
				<FormLabel text="Email" class="details-label" />
				<v-text-field v-model="guest.email" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Guest's email"
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
			<router-link :to="{ name: 'guests'}" class="router-link">
				<ButtonCancel/>
			</router-link>
			<ButtonDialogDelete itemType="guest" />
			<ButtonSave @click.native="printGuest()" />
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import FormLabel from '@/components/FormLabel.vue';

import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'GuestEditView',
	data() {
		return {
			guest: {}
		}
	},
	mounted() {
		let guestFromBackend = {
			ObjectId: 100,
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
		};
		this.guest = guestFromBackend;
		console.log(this.guest);
	},
	methods: {
		currentDate() {
			const current = new Date();
			const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
			return date;
		},
		printGuest() {
			console.log(this.guest);
		}
	},
	components: {
		FormLabel,
		ButtonCancel,
		ButtonDialogDelete,
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
