<template>
	<v-container absolute fluid class="main-content">
		<!-- Main content -->
		<v-card color="#E3EAEF" class="details-grid mt-9 mx-auto py-4 px-10 rounded-xl">
			<!-- Page title -->
			<h1 class="my-5 text-center">Log in</h1>
			<!-- Email info -->
			<div class="details-grid-item my-5">
				<FormLabel text="Email" class="details-label text-center" />
				<v-text-field v-model="user.email" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  type="email"
								  label="example@email.com"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Password info -->
			<div class="details-grid-item mb-5">
				<FormLabel text="Password" class="details-label text-center" />
				<v-text-field v-model="user.password" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  type="password"
								  label="********"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Log in button -->
			<div class="text-center">
				<router-link :to="{ name: 'dashboard' }" class="router-link">
					<v-btn @click="logIn()" elevation="2" rounded large class="login-btn mb-12">
						Log in
					</v-btn>
				</router-link>
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
	name: 'LoginView',
	data() {
		return {
			user: {
				email: null,
				password: null
			},
			snackbarMsg: null,
			snackbarColor: null,
			snackbar: false
		}
	},
	methods: {
		async logIn() {
			if (this.user.email && this.user.password) {
				try {
					await Auth.login(this.user.email, this.user.password);
					if (Auth.authenticated) $router.push({ name: "dashboard" });
				} catch (error) {
					this.snackbarMsg = "Error has occured. Please try again.";
					this.snackbarColor = "#FF6F6F";
					this.snackbar = true;
				}
			} else {
				this.snackbarMsg = "All fields are required. Fill all fields and try again. Email must be valid.";
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
