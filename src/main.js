import Vue from 'vue';
import VueRouter from 'vue-router';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import Home from './views/Home.vue';
import Add from './views/Add.vue';
import Read from './views/Read.vue';
import Login from './views/Login.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{path: '/', component: Home},
		{path: '/add', component: Add},
		{path: '/login', component: Login},
		{path: '/read/:id', component: Read},
	]
})

new Vue({
	router,
	vuetify: new Vuetify,
	el: '#app',
	render: h => h(App)
})