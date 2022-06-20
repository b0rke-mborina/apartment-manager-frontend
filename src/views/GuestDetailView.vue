<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 text-center">{{ guest.firstName }} {{ guest.lastName }}</h1>
		<!-- Guest's email -->
		<div class="text-center mb-2">{{ guest.email }}</div>
		<!-- Guest's phone number -->
		<div class="text-center mb-2">{{ guest.phoneNumber }}</div>
		<!-- Current state of the guest -->
		<div v-if="guest.newestPeriod" class="text-center mb-5">
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
			<!-- Maximum number of guests -->
			<div class="details-grid-item">
				<FormLabel text="From..." class="details-label" />
				<FormTextField :text="guest.city + ', ' + guest.country" readonly />
			</div>
			<!-- Guest's newest reservation -->
			<div v-if="guest.newestPeriod && guest.newestPeriod.privateAccomodation" class="details-grid-item">
				<FormLabel text="Newest reservation" class="details-label" />
				<FormTextField :text="convertPeriod(guest.newestPeriod.start, guest.newestPeriod.end)
											+ ' (' + guest.newestPeriod.privateAccomodation.name + ')'"
									readonly />
			</div>
		</div>
		<!-- Main action buttons -->
		<div class="text-center">
			<router-link :to="{ name: 'guests'}" class="router-link">
				<ButtonBack/>
			</router-link>
			<ButtonDialogDelete itemType="guest" />
			<router-link :to="{ name: 'guest-modification', params: { id: guest.ObjectId }}" class="router-link">
				<ButtonEdit/>
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { convertPeriod } from '@/services';

import FormLabel from '@/components/FormLabel.vue';
import FormTextField from '@/components/FormTextField.vue';

import ButtonBack from '@/components/ButtonBack.vue';
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonEdit from '@/components/ButtonEdit.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'GuestDetailView',
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
