import VueRouter from 'vue-router';
import AppComponent from './components/app-component.vue';
import ModalComponent from './components/modal-component.vue';
import LoginComponent from './components/login-component.vue';
import NovaContaComponent from './components/novaconta-component.vue';
import ListaNoticiaComponent from './components/listanoticia-component.vue';
import ListaLeituraComponent from './components/listaleitura-component.vue';

const router = new VueRouter({
  routes : [
    { name : 'home', path : '/', component: AppComponent,
      children : [{
        name : 'noticias',
        path : '/noticias',
        component : ListaNoticiaComponent,
        children : [{
            name : 'modalnoticia',
            path:'/:a0/:a1/:a2/:a3/:a4',
            component: ModalComponent
          },
          {
            name : 'modalnoticia2',
            path:'/:a0/:a1/:a2/:a3/:a4/:a5',
            component: ModalComponent
          }]   
        },
        { name : 'minha-lista', 
          path : '/minha-lista', 
          component: ListaLeituraComponent
        }
      ]      
    },
    { name : 'login', path : '/login', component: LoginComponent},
    { name : 'nova-conta', path : '/nova-conta', component: NovaContaComponent}
   

  ],
  mode : 'hash'
});

export default router;