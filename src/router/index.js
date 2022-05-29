import Vue from 'vue'
import VueRouter from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import AccomodationsView from '../views/AccomodationsView.vue'
import ReservationsView from '../views/ReservationsView.vue'
import CalendarView from '../views/CalendarView.vue'
import GuestsView from '../views/GuestsView.vue'
import ToDoListsView from '../views/ToDoListsView.vue'
import NotesView from '../views/NotesView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'dashboard',
		component: DashboardView
	},
	{
		path: '/accomodations',
		name: 'accomodations',
		component: AccomodationsView
	},
	{
		path: '/reservations',
		name: 'reservations',
		component: ReservationsView
	},
	{
		path: '/calendar',
		name: 'calendar',
		component: CalendarView
	},
	{
		path: '/guests',
		name: 'guests',
		component: GuestsView
	},
	{
		path: '/todolists',
		name: 'todolists',
		component: ToDoListsView
	},
	{
		path: '/notes',
		name: 'notes',
		component: NotesView
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView
	},
	{
		path: '/signup',
		name: 'signup',
		component: SignupView
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
