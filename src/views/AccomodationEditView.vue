<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title (name of private accomodation) -->
		<h1 class="mt-5 text-center">Edit a private accomodation</h1>
		<!-- Loading circular progress bar -->
		<div class="text-center">
			<v-progress-circular v-if="loadingData" indeterminate color="#A5D4FF"></v-progress-circular>
		</div>
		<!-- Current state of private accomodation -->
		<div v-if="!loadingData" class="text-center mb-9">
			CURRENTLY {{ accomodation.currentState }}
			<v-icon v-if="accomodation.currentState === 'AVAILABLE'"
					icon color="#FFCC00" class="pr-2">
				mdi-circle
			</v-icon>
			<v-icon v-else-if="accomodation.currentState === 'OCCUPIED'"
					icon color="#55FF66" class="pr-2">
				mdi-circle
			</v-icon>
			<v-icon v-else-if="accomodation.currentState === 'PENDING'"
					icon color="#6666ff" class="pr-2">
				mdi-circle
			</v-icon>
		</div>
		<!-- Main information grid -->
		<div v-if="!loadingData" class="details-grid">
			<h3 class="mt-4 mb-2">Basic information</h3>
			<!-- Accomodation name -->
			<div class="details-grid-item">
				<FormLabel text="Name of private accomodation" class="details-label mr-4" />
				<v-text-field v-model="accomodation.name" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Accomodation name"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Number of stars (category) and maximum number of guests -->
			<div class="details-grid-item">
				<!-- Number of stars (category) -->
				<div class="details-grid-subitem">
					<FormLabel text="Number of stars (category)" class="details-label mr-4" />
					<v-text-field v-model.number="accomodation.categoryStarNumber" solo rounded
									single-line type="number"
									min="3" max="5" step="1"
									background-color="#A5D4FF" class="input-number">
					</v-text-field>
				</div>
				<!-- Maximum number of guests -->
				<div class="details-grid-subitem">
					<FormLabel text="Maximum number of guests" class="details-label mr-4" />
					<v-text-field v-model.number="accomodation.maxGuestNumber" solo rounded
									single-line type="number"
									min="1" max="99" step="1"
									background-color="#A5D4FF" class="input-number ml-auto">
					</v-text-field>
				</div>
			</div>
			<h3 class="mt-9 mb-2">Address information</h3>
			<!-- Street name - address info -->
			<div v-if="accomodation.location" class="details-grid-item">
				<FormLabel text="Street (address)" class="details-label mr-4" />
				<v-text-field v-model="address.street" solo rounded
								clearable clear-icon="mdi-close-circle"
								label="Name of street"
								background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- House and entrance numbers - address info -->
			<div v-if="accomodation.location" class="details-grid-item">
				<!-- House number - address info -->
				<div class="details-grid-subitem">
					<FormLabel text="House number (address)" class="details-label mr-4" />
					<v-text-field v-model="address.houseNumber" solo rounded
									label="Number of the house"
									background-color="#A5D4FF" class="input-number">
					</v-text-field>
				</div>
				<!-- Entrance number - address info -->
				<div class="details-grid-subitem">
					<FormLabel text="Entrance number (address)" class="details-label mr-4" />
					<v-text-field v-model="address.entranceNumber" solo rounded
									label="Entrance label"
									background-color="#A5D4FF" class="input-number ml-auto">
					</v-text-field>
				</div>
			</div>
			<div v-if="accomodation.location" class="details-grid-item">
				<!-- Postal number - address info -->
				<div v-if="accomodation.location" class="details-grid-subitem">
					<FormLabel text="Postal number (address)" class="details-label mr-4" />
					<v-text-field v-model.number="address.postalNumber" solo rounded
									single-line type="number"
									label="Post office number"
									background-color="#A5D4FF" class="input-number">
					</v-text-field>
				</div>
				<!-- City - address info -->
				<div v-if="accomodation.location" class="details-grid-subitem input-city">
					<FormLabel text="City (address)" class="details-label mr-4" />
					<v-text-field v-model="address.city" solo rounded
									clearable clear-icon="mdi-close-circle"
									label="Name of city"
									background-color="#A5D4FF" class="ml-auto">
					</v-text-field>
				</div>
			</div>
			<div class="details-grid-item">
				<div class="details-grid-subitem">
				</div>
				<div class="details-grid-subitem">
					<!-- Country - address info -->
					<FormLabel text="Country (address)" class="details-label mr-4" />
					<v-text-field v-model="address.country" solo rounded
									clearable clear-icon="mdi-close-circle"
									label="Name of country"
									background-color="#A5D4FF">
					</v-text-field>
				</div>
			</div>
			<h3 class="mt-9 mb-2">Other information</h3>
			<!-- Lowest and highest floors info -->
			<div class="details-grid-item">
				<div class="details-grid-subitem">
					<FormLabel text="From floor (lowest level)" class="details-label mr-4" />
					<v-text-field v-model.number="accomodation.lowestFloor" solo rounded
									single-line type="number" step="1"
									background-color="#A5D4FF" class="input-number">
					</v-text-field>
				</div>
				<!-- Highest floor info -->
				<div class="details-grid-subitem">
					<FormLabel text="To floor (highest level)" class="details-label mr-4" />
					<v-text-field v-model.number="toFloor" solo rounded
									single-line type="number" step="1"
									background-color="#A5D4FF" class="input-number ml-auto">
					</v-text-field>
				</div>
			</div>
			<!-- Yard info - address info -->
			<v-checkbox v-model="accomodation.hasYard" label="Has a yard" class="mt-0 pt-0 yard-check"></v-checkbox>
		</div>
		<!-- Main action buttons -->
		<div class="text-center mt-5">
			<router-link :to="{ name: 'accomodations'}" class="router-link">
				<ButtonCancel/>
			</router-link>
			<ButtonDialogDelete itemType="accomodation" service="privateaccomodation" :_id="accomodation._id"
									  routeName="accomodations" />
			<!-- <router-link :to="{ name: 'accomodation-detail', params: { id: accomodation._id } }" class="router-link"> -->
				<ButtonSave @click.native="updateAccomodation()" :loading="loading" />
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

import FormLabel from '@/components/FormLabel.vue';
import FormTextField from '@/components/FormTextField.vue';

import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'AccomodationEditView',
	data() {
		return {
			accomodation: {},
			address: {},
			originalAccomodation: {},
			originalAddress: {},
			accomodationsOnAddress: 0,
			addresses: 0,
			toFloor: 0,
			loading: false,
			loadingData: false,
			snackbarMsg: null,
			snackbarColor: null,
			snackbar: false
		}
	},
	async mounted() {		
		// get accomodation data from backend and save it to view data
		this.loadingData = true;
		try {
			// parallel calls (accomodation and address)
			const responses = await Promise.all([
				await AxiosService.get(`/privateaccomodation/${this.$route.params.id}`),
				await AxiosService.get(`/privateaccomodation/${this.$route.params.id}/address`)
			]);
			// set retrieved accomodations data to view data
			this.accomodation = responses[0].data;
			this.address = responses[1].data;
			// add original accomodation and address to data (copies)
			this.originalAccomodation = JSON.parse(JSON.stringify(responses[0].data));
			this.originalAddress = JSON.parse(JSON.stringify(responses[1].data));
			this.accomodation.location = this.address._id;
			this.originalAccomodation.location = this.address._id;
		} catch (error) {
			this.snackbarMsg = "Error has occured. Please try again.";
			this.snackbarColor = "#FF6F6F";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loadingData = false;
		console.log(this.accomodation);
		console.log(this.address);
		try {
			// parallel calls (accomodation and address)
			let responsesAddresses = await Promise.all([
				await AxiosService.get(`/address/${this.address._id}/privateaccomodations`),
				await AxiosService.get(`/addresses`)
			]);
			this.accomodationsOnAddress = responsesAddresses[0].data.length;
			this.addresses = responsesAddresses[1].data;
		} catch (error) {
			this.snackbarMsg = "Error has occured. Please try again.";
			this.snackbarColor = "#FF6F6F";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		console.log(this.accomodationsOnAddress);
		console.log(this.addresses);
	},
	methods: {
		// updates number of floors for accomodation
		updateFloorsNumber() {
			// make sure values of floors are OK
			if (this.toFloor < this.accomodation.lowestFloor) {
				this.accomodation.lowestFloor = [this.toFloor, this.toFloor = this.accomodation.lowestFloor][0];
			}
			// update number of floors
			this.accomodation.floorsNumber = this.toFloor - this.accomodation.lowestFloor + 1;
			// console.log(this.accomodation);
		},
		// checks if two objects received as parameters are equal
		objectsAreEqual(object1, object2) {
			const keys1 = Object.keys(object1);
			const keys2 = Object.keys(object2);
			if (keys1.length !== keys2.length) {
				return false;
			}
			for (let key of keys1) {
				if (object1[key] !== object2[key]) {
					return false;
				}
			}
			return true;
		},
		// checks completeness of accomodation data and sends it to backend for updating
		async updateAccomodation() {
			// check completeness of data
			console.log(this.address);
			console.log(this.originalAddress);
			// check completeness requirements
			const accomodationIsFull = Object.values(this.accomodation).every(value => value !== null && value !== '');
			const locationIsFull = Object.values(this.accomodation.location).every(value => value !== null && value !== '');
			const locationExists = this.addresses.find(address =>
				address.street === this.address.street && address.houseNumber === this.address.houseNumber
				&& address.entranceNumber === this.address.entranceNumber && address.postalNumber === this.address.postalNumber
				&& address.city === this.address.city && address.country === this.address.country
			);
			if (accomodationIsFull && locationIsFull) {
				// send data to backend for saving
				this.loading = true;
				try {
					this.address["_id"] = this.originalAddress._id;
					console.log(this.address);
					console.log(this.originalAddress);
					// update address (if it was changed)
					if (!this.objectsAreEqual(this.address, this.originalAddress)) {
						console.log("address changed");
						if (this.accomodationsOnAddress > 1) {
							// create new address if there is other accomodations on address
							delete this.address._id;
							let responseAddress = await AxiosService.post("/addresses", this.address);
							this.accomodation.location = responseAddress.data._id;
						} else if (locationExists) {
							// delete old address if accomodation was moved to existing address
							this.accomodation.location = locationExists._id;
							await AxiosService.delete(`address/${this.address._id}`);
						} else {
							await AxiosService.patch(`address/${this.address._id}`, this.address);
						}
					}
					console.log("current");
					console.log(this.accomodation);
					console.log("original");
					console.log(this.originalAccomodation);
					// update accomodation (if it was changed) and change route
					if (!this.objectsAreEqual(this.accomodation, this.originalAccomodation)) {
						await AxiosService.patch(`privateaccomodation/${this.$route.params.id}`, this.accomodation);
					}
					this.$router.push({ name: 'accomodation-detail', params: { id: this.accomodation._id } });
				} catch (error) {
					this.snackbarMsg = "Error has occured. Please try again.";
					this.snackbarColor = "#FF6F6F";
					this.snackbar = true;
					console.log(Object.keys(error), error.message);
				}
				this.loading = false;
			} else {
				this.snackbarMsg = "All fields are required. Fill all fields and try again.";
				this.snackbarColor = "#FF6F6F";
				this.snackbar = true;
			}
		}
	},
	watch: {
		// updates number of floors every time value of top floor is changed
		toFloor() {
			this.updateFloorsNumber();
		},
		// updates number of floors every time value of lowest floor is changed
		'accomodation.lowestFloor': function() {
			this.updateFloorsNumber();
		}
	},
	components: {
		FormLabel,
		FormTextField,
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
		gap: 32px;
	}
	.details-grid-subitem {
		display: grid;
		grid-template-columns: auto auto;
	}
	.input-number {
		width: 150px;
	}
	.input-city div:nth-child(2) {
		width: 100%;
	}
	.yard-check {
		width: 130px;
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
			gap: 4px;
		}
		.details-grid-subitem {
			grid-template-columns: auto auto;
		}
		.details-grid-subitem div:nth-child(1) {
			text-align: left;
		}
		.details-grid-subitem div:nth-child(2) {
			margin-left: auto;
			margin-right: 0px;
		}
		.input-city {
			grid-template-columns: 1fr 1fr;
		}
		.input-city div:nth-child(2) {
			width: 100%;
		}
		.details-label {
			text-align: center;
			margin-bottom: 8px;
		}
	}
	@media (max-width:425px) {
		.input-city {
			grid-template-columns: auto;
			text-align: center;
		}
		.details-grid-subitem div:nth-child(1) {
			text-align: center;
		}
		.details-grid-subitem div:nth-child(2) {
			margin-left: auto;
			margin-right: auto;
		}
	}
</style>
