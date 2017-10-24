import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import VueResource from 'vue-resource';
import firebase from 'firebase';
import firestore from 'firebase/firestore';
import router from './router'
import {config} from './config/firebase';
import 'vue-material/dist/vue-material.css';

import ToolbarComponent from './components/toolbar-component.vue';
import MenuComponent from './components/menu-component.vue';

Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(VueResource);

Vue.component('toolbar-component', ToolbarComponent);
Vue.component('menu-component', MenuComponent);

firebase.initializeApp(config);
window.firebase = firebase;
window.db = firebase.firestore();
window.auth = firebase.auth();
window.Eventos = new Vue();
window.router = router;
window.Vue = new Vue({
	el: "#app",
  	router : router,
	data : {
		busca : ''
	},
	created(){
		if(!auth.currentUser){
			router.push({name:'login'})
		}
	}
	
});