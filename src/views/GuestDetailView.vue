<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 v-if="!loadingData" class="mt-5 text-center">{{ guest.firstName }} {{ guest.lastName }}</h1>
		<!-- Loading circular progress bar -->
		<div class="text-center">
			<v-progress-circular v-if="loadingData" indeterminate color="#A5D4FF"></v-progress-circular>
		</div>
		<!-- Guest's email -->
		<div v-if="guest.email && !loadingData" class="text-center mb-2">{{ guest.email }}</div>
		<!-- Guest's phone number -->
		<div v-if="guest.phoneNumber && !loadingData" class="text-center mb-2">{{ guest.phoneNumber }}</div>
		<!-- Current state of the guest -->
		<div v-if="guest.newestPeriod && !loadingData" class="text-center mb-5">
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
			<v-chip v-else-if="guest.newestPeriod.start && guest.newestPeriod.end
									&& guest.newestPeriod.end.localeCompare(currentDate()) === -1
									&& guest.currentState === 'CONFIRMED GUEST'"
					  color="#B5B5B5" class="mx-2 my-1">
				FORMER GUEST
			</v-chip>
			<v-chip v-else-if="guest.newestPeriod.start && guest.newestPeriod.end
										&& (guest.newestPeriod.start.localeCompare(currentDate())
											|| guest.newestPeriod.start.localeCompare(currentDate()) === 0)
										&& (guest.newestPeriod.end.localeCompare(currentDate()) === -1
											|| guest.newestPeriod.end.localeCompare(currentDate()) === 0)
										&& guest.currentState === 'CONFIRMED GUEST'"
					  icon color="#55FF66" class="pr-2">
				CURRENT GUEST
			</v-chip>
			<v-chip v-else-if="guest.newestPeriod.start && guest.newestPeriod.end
									&& guest.newestPeriod.start.localeCompare(currentDate())
									&& guest.currentState === 'CONFIRMED GUEST'"
					  icon color="#55FF66" class="pr-2">
				FUTURE GUEST
			</v-chip>
		</div>
		<!-- Main information grid -->
		<div v-if="!loadingData" class="details-grid">
			<!-- Maximum number of guests -->
			<div class="details-grid-item">
				<FormLabel text="From..." class="details-label" />
				<FormTextField :text="guest.city + ', ' + guest.country" readonly />
			</div>
			<!-- Guest's newest reservation -->
			<div v-if="guest.newestPeriod && guest.newestPeriod.start
						 && guest.newestPeriod.end && guest.newestPeriod.privateAccomodation"
				  class="details-grid-item">
				<FormLabel text="Newest reservation" class="details-label" />
				<FormTextField :text="convertPeriod(guest.newestPeriod.start, guest.newestPeriod.end)
											+ ' (' + guest.newestPeriod.privateAccomodation + ')'"
									readonly />
			</div>
		</div>
		<!-- Main action buttons -->
		<div class="text-center">
			<router-link :to="{ name: 'guests'}" class="router-link">
				<ButtonBack/>
			</router-link>
			<ButtonDialogDelete itemType="guest" service="guest" :_id="guest._id" routeName="guests" />
			<router-link :to="{ name: 'guest-modification', params: { id: guest._id } }" class="router-link">
				<ButtonEdit/>
			</router-link>
		</div>
		<!-- Snackbar for showing successes and errors -->
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
import { AxiosService, convertPeriod, Auth } from '@/services';

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
			guest: {},
			auth: Auth.state,
			loading: false,
			loadingData: false,
			snackbarMsg: null,
			snackbarColor: null,
			snackbar: false
		}
	},
	async mounted() {
		// get guest data from backend and save it to view data
		this.loadingData = true;
		try {
			let response = await AxiosService.get(`/guest/${this.$route.params.id}?userId=${this.auth.userId}`);
			this.guest = response.data;
		} catch (error) {
			this.snackbarMsg = "Error has occured. Please try again.";
			this.snackbarColor = "#FF6F6F";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loadingData = false;
		// console.log(this.guest);
	},
	methods: {
		// returns current date in YYYY-MM-DD format
		currentDate() {
			const current = new Date();
			let year = current.getFullYear();
			let month = current.getMonth()+1;
			let day = current.getDate();
			if (month < 10) month = "0" + month;
			if (day < 10) day = "0" + day;
			const date = `${year}-${month}-${day}`;
			return date;
		},
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
	.btn-delete {
		background-color: #FF6F6F !important;
	}
	.btn-delete:before {
		background: none;
	}
	.snackbar-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.snackbar {
		color: #000000;
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
