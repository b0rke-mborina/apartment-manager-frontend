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
					<v-btn elevation="2" rounded large class="login-btn mb-12" @click="checkPasswordConfirmation()">
						Sign up
					</v-btn>
				<!-- </router-link> -->
			</div>
		</v-card>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
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
			passwordConfirm: null
		}
	},
	methods: {
		// checks if values in password and password confirmation inputs are the same
		checkPasswordConfirmation() {
			this.user.password === this.passwordConfirm
				? console.log("Password confirmed!")
				: console.log("Passwords must be the same!");
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
