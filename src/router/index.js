import Vue from 'vue';
import VueRouter from 'vue-router';
import { Auth } from '@/services';

// imports of main views
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

// imports of accomodation views (detail, edit, add new)
import AccomodationDetailView from '../views/AccomodationDetailView.vue';
import AccomodationEditView from '../views/AccomodationEditView.vue';
import AccomodationAddNewView from '../views/AccomodationAddNewView.vue';

// imports of reservation views (detail, edit, add new)
import ReservationDetailView from '../views/ReservationDetailView.vue';
import ReservationEditView from '../views/ReservationEditView.vue';
import ReservationAddNewView from '../views/ReservationAddNewView.vue';

// imports of period views (detail-edit, add new)
import PeriodDetailEditView from '@/views/PeriodDetailEditView.vue';
import PeriodAddNewView from '@/views/PeriodAddNewView.vue';

// imports of guest views (detail, edit, add new)
import GuestDetailView from '../views/GuestDetailView.vue';
import GuestEditView from '../views/GuestEditView.vue';
import GuestAddNewView from '../views/GuestAddNewView.vue';

// imports of to-do list views (detail-edit, add new)
import ToDoListDetailEditView from '../views/ToDoListDetailEditView.vue';
import ToDoListAddNewView from '../views/ToDoListAddNewView.vue';

// imports of note views (detail-edit, add new)
import NoteDetailEditView from '../views/NoteDetailEditView.vue';
import NoteAddNewView from '../views/NoteAddNewView.vue';

Vue.use(VueRouter)

// routes list
const routes = [
	// dashboard route
	{
		path: '/',
		name: 'dashboard',
		component: DashboardView
	},
	// accomodation routes
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
	// reservation routes
	{
		path: '/reservations',
		name: 'reservations',
		component: ReservationsView
	},
	{
		path: '/reservation/creation',
		name: 'reservation-creation',
		component: ReservationAddNewView
	},
	{
		path: '/reservation/:id',
		props: true,
		name: 'reservation-detail',
		component: ReservationDetailView
	},
	{
		path: '/reservation/:id/modification',
		props: true,
		name: 'reservation-modification',
		component: ReservationEditView
	},
	// calendar and period routes
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
		name: 'period-detail-modification',
		component: PeriodDetailEditView
	},
	// guest routes
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
	// to-do list routes
	{
		path: '/todolists',
		name: 'todolists',
		component: ToDoListsView
	},
	{
		path: '/todolist/creation',
		name: 'todolist-creation',
		component: ToDoListAddNewView
	},
	{
		path: '/todolist/:id',
		props: true,
		name: 'todolist-detail-modification',
		component: ToDoListDetailEditView
	},
	// note routes
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
		name: 'note-detail-modification',
		component: NoteDetailEditView
	},
	// analytics route
	{
		path: '/analytics',
		name: 'analytics',
		component: AnalyticsView
	},
	// authentification routes
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
	// shows top of view after route change
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});

// make all routes except login and signup unavailable if user is not logged in
router.beforeEach((to, from, next) => {
	const publicPages = ["/login", "/signup"];
	const authRequired = !publicPages.includes(to.path);
	const user = Auth.getUser();

	if (authRequired && !user) {
		return next("/login");
	}
	next();
});

export default router;
