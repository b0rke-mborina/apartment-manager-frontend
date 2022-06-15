import Vue from 'vue';
import VueRouter from 'vue-router';

import DashboardView from '../views/DashboardView.vue';
import AccomodationsView from '../views/AccomodationsView.vue';
import ReservationsView from '../views/ReservationsView.vue';
import CalendarView from '../views/CalendarView.vue';
import GuestsView from '../views/GuestsView.vue';
import ToDoListsView from '../views/ToDoListsView.vue';
import NotesView from '../views/NotesView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';

import AccomodationDetailView from '../views/AccomodationDetailView.vue';
import AccomodationEditView from '../views/AccomodationEditView.vue';
import AccomodationAddNewView from '../views/AccomodationAddNewView.vue';
import ReservationDetailView from '../views/ReservationDetailView.vue';
import PeriodDetailEditView from '@/views/PeriodDetailEditView.vue';
import PeriodAddNewView from '@/views/PeriodAddNewView.vue';
import GuestDetailView from '../views/GuestDetailView.vue';
import GuestEditView from '../views/GuestEditView.vue';
import GuestAddNewView from '../views/GuestAddNewView.vue';
import ToDoListDetailEditView from '../views/ToDoListDetailEditView.vue';
import NoteDetailEditView from '../views/NoteDetailEditView.vue';
import NoteAddNewView from '../views/NoteAddNewView.vue';

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
		path: '/accomodation/creation',
		name: 'accomodation-creation',
		component: AccomodationAddNewView
	},
	{
		path: '/accomodation/:id',
		props: true,
		name: 'accomodation-detail',
		component: AccomodationDetailView
	},
	{
		path: '/accomodation/:id/modification',
		props: true,
		name: 'accomodation-modification',
		component: AccomodationEditView
	},
	{
		path: '/reservations',
		name: 'reservations',
		component: ReservationsView
	},
	{
		path: '/reservation/:id',
		props: true,
		name: 'reservation-detail',
		component: ReservationDetailView
	},
	{
		path: '/calendar',
		name: 'calendar',
		component: CalendarView
	},
	{
		path: '/period/creation',
		name: 'period-creation',
		component: PeriodAddNewView
	},
	{
		path: '/period/:id',
		props: true,
		name: 'period-detail-edit',
		component: PeriodDetailEditView
	},
	{
		path: '/guests',
		name: 'guests',
		component: GuestsView
	},
	{
		path: '/guest/creation',
		name: 'guest-creation',
		component: GuestAddNewView
	},
	{
		path: '/guest/:id',
		props: true,
		name: 'guest-detail',
		component: GuestDetailView
	},
	{
		path: '/guest/:id/modification',
		props: true,
		name: 'guest-modification',
		component: GuestEditView
	},
	{
		path: '/todolists',
		name: 'todolists',
		component: ToDoListsView
	},
	{
		path: '/todolist/:id',
		props: true,
		name: 'todolist-detail-edit',
		component: ToDoListDetailEditView
	},
	{
		path: '/notes',
		name: 'notes',
		component: NotesView
	},
	{
		path: '/note/creation',
		name: 'note-creation',
		component: NoteAddNewView
	},
	{
		path: '/note/:id',
		props: true,
		name: 'note-detail-edit',
		component: NoteDetailEditView
	},
	{
		path: '/analytics',
		name: 'analytics',
		component: AnalyticsView
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
	routes,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
})

export default router
