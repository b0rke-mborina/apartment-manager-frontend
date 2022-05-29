<template>
	<v-app>
		<v-app-bar color="#A5D4FF" elevate-on-scroll absolute short rounded class="fill-height">
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="toolbar-title">Apartment manager</v-toolbar-title>
			<v-spacer></v-spacer>
			<!-- <v-btn icon>
				<v-icon>mdi-cog</v-icon>
			</v-btn> -->
			<v-btn icon>
				<v-icon>mdi-account-circle</v-icon>
			</v-btn>
			<v-btn text :to="login">
				<span>Log in</span>
			</v-btn>
			<v-btn text :to="signup">
				<span>Sign up</span>
			</v-btn>
    	</v-app-bar>

		<v-navigation-drawer
			app
			color="#A5D4FF"
			temporary
			v-model="drawer"
			rounded
		>
			<v-list>
				<v-list-item class="px-2">
					<v-img src="@/assets/ApartmentManagerLogo.png" max-height="40" max-width="40" class="logo"></v-img>
					<span class="app-name">Apartment<br>manager</span>
					<v-btn icon @click.stop="drawer = !drawer" class="fold-btn">
						<v-icon color="#000000">mdi-chevron-left</v-icon>
        			</v-btn>
				</v-list-item>

				<v-divider class="h-line"></v-divider>

				<v-list-item-group v-model="selectedItem" color="#000000">
					<v-list-item
						v-for="item in items"
						:key="item.title"
						:to="item.route"
					>
							<v-list-item-icon>
								<v-icon color="#000000">{{ item.icon }}</v-icon>
							</v-list-item-icon>

							<v-list-item-content>
								<v-list-item-title color="#000000">{{ item.title }}</v-list-item-title>
							</v-list-item-content>
					</v-list-item>
				</v-list-item-group>

			</v-list>
			<template v-slot:append>
				<div class="pa-4 text-center">
					<v-btn color="#A5D4FF">
						<v-icon color="#000000">mdi-logout</v-icon>
						Logout
					</v-btn>
				</div>
			</template>
		</v-navigation-drawer>
		<v-main class="app-content">
			<router-view/>
		</v-main>
	</v-app>
</template>

<script>

export default {
	name: 'App',
	data () {
      return {
			drawer: false,
      	selectedItem: 1,
			login: "/login",
			signup: "/signup",
			items: [
				{ route: '/', title: 'Dashboard', icon: 'mdi-home' },
				{ route: '/accomodations', title: 'Accomodations', icon: 'mdi-bed' },
				{ route: '/reservations', title: 'Reservations', icon: 'mdi-calendar-check' },
				{ route: '/calendar', title: 'Calendar', icon: 'mdi-calendar' },
				{ route: '/guests', title: 'Guests', icon: 'mdi-account-group' },
				{ route: '/todolists', title: 'To - do', icon: 'mdi-format-list-checks' },
				{ route: '/notes', title: 'Notes', icon: 'mdi-note-edit' },
			]
      }
	},
	watch: {
		group() {
			this.drawer = false
		}
	}
};
</script>

<style scoped>
.app-name {
	font-weight: bold;
	text-align: center;
	line-height: 1.25;
	margin-left: auto;
	margin-right: auto;
}
.logo {
	margin: 8px 8px 8px 0px;
}
.h-line {
	margin: 10px 0px 30px 0px;
	color: #6C6C6C;
}
.list-item-name {
	padding: 0px 10px;
}
.app-content {
	margin-top: 56px;
}
@media (max-width:500px) {
	.toolbar-title {
		display: none;
	}
}
.main-content {
	width: 80%;
}
@media (max-width:900px) {
	.main-content {
		width: 95%;
	}
}
</style>
