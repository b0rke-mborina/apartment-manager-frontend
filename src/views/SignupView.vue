<template>
	<v-container absolute fluid class="main-content">
		<!-- Main content -->
		<v-card color="#E3EAEF" class="details-grid mt-9 mx-auto py-4 px-10 rounded-xl">
			<!-- Page title -->
			<h1 class="my-5 text-center">Sign up</h1>
			<!-- First name -->
			<div class="details-grid-item my-5">
				<FormLabel text="First name" class="details-label text-center" />
				<v-text-field v-model="user.firstName" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="John"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Last name -->
			<div class="details-grid-item my-5">
				<FormLabel text="Last name" class="details-label text-center" />
				<v-text-field v-model="user.lastName" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Doe"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Email -->
			<div class="details-grid-item my-5">
				<FormLabel text="Email" class="details-label text-center" />
				<v-text-field v-model="user.email" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  type="email"
								  label="example@email.com"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Password -->
			<div class="details-grid-item mb-5">
				<FormLabel text="Password" class="details-label text-center" />
				<v-text-field v-model="user.password" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  type="password"
								  label="********"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Confirm password -->
			<div class="details-grid-item mb-5">
				<FormLabel text="Confirm password" class="details-label text-center" />
				<v-text-field v-model="passwordConfirm" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  type="password"
								  label="********"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Sign up button -->
			<div class="text-center">
				<!-- <router-link :to="{ name: 'dashboard' }" class="router-link"> -->
					<v-btn elevation="2" rounded large class="login-btn mb-12" @click="signUp()">
						Sign up
					</v-btn>
				<!-- </router-link> -->
			</div>
		</v-card>
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
import $router from '@/router';
import { Auth } from '@/services';

import FormLabel from '@/components/FormLabel.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'SignupView',
	data() {
		return {
			user: {
				email: null,
				password: null,
				firstName: null,
				lastName: null
			},
			passwordConfirm: null,
			snackbarMsg: null,
			snackbarColor: null,
			snackbar: false
		}
	},
	methods: {
		// checks if values in password and password confirmation inputs are the same
		passwordConfirmed() {
			return (this.user.password === this.passwordConfirm && this.user.password && this.passwordConfirm)
				? true : false;
		},
		isInEmailFormat(emailString) {
			if (emailString && typeof emailString === "string"
				&& String(emailString).toLowerCase().match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)) {
				return true;
			} else {
				return false;
			}
		},
		async signUp() {
			if (this.isInEmailFormat(this.user.email) && this.passwordConfirmed() && this.user.firstName && this.user.lastName) {
				try {
					console.log(this.user);
					let signedUp = await Auth.signup(this.user);
					if (signedUp) {
						await Auth.login(this.user.email, this.user.password);
						$router.replace({ path: "/" });
					}
				} catch (error) {
					this.snackbarMsg = "Error has occured. Please try again.";
					this.snackbarColor = "#FF6F6F";
					this.snackbar = true;
				}
			} else {
				this.snackbarMsg = "All fields are required. Fill all fields and try again. Email must be valid and passwords must match.";
				this.snackbarColor = "#FF6F6F";
				this.snackbar = true;
			}
		}
	},
	components: {
		FormLabel,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
	.details-grid {
		width: 55%;
		display: grid;
		grid-template-columns: auto;
	}
	.details-grid-item {
		width: 100%;
		display: grid;
		grid-template-columns: auto;
		gap: 5px;
	}
	.login-btn {
		background-color: #A5D4FF !important;
	}
	.snackbar-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.snackbar {
		color: #000000;
	}
	@media (max-width:1000px) {
		.details-grid {
			width: 70%;
		}
		.details-grid-item {
			grid-template-columns: auto;
		}
	}
	@media (max-width:600px) {
		.details-grid {
			width: 100%;
			padding: 20px !important;
		}
		.details-grid-item {
			grid-template-columns: auto;
		}
	}
</style>
