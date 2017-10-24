<template>
	<div>
		<md-toolbar>
			<md-button class="md-icon-button" @click="openMenu">
				<md-icon>menu</md-icon>
			</md-button>

			<h2 class="md-title" style="flex: 1">
				<router-link to="noticias" id="noticias">Notícias</router-link>
			</h2>

			<md-toolbar>
				<md-button class="md-icon-button" v-if="busca" v-on:click="limpar()">
					<md-icon>clear</md-icon>
				</md-button>
				<md-input-container class="md-flex">
					<md-input placeholder="Pesquisar" v-model="busca"></md-input>
				</md-input-container>
				<md-button class="md-icon-button" v-on:click="buscar(busca)">
					<md-icon>search</md-icon>
				</md-button>

				<md-menu md-offset-x="-99" md-offset-y="50">
					<md-button class="md-icon-button" md-menu-trigger>
						<md-icon>account_circle</md-icon>
					</md-button>

					<md-menu-content>

						<md-menu-item>
							<md-icon>star</md-icon>
							<span>Favoritos</span>
						</md-menu-item>
						<md-menu-item @click="lista">
							<md-icon>library_books</md-icon>
							<span>Lista</span>
						</md-menu-item>
						<md-menu-item @click="logout">
							<md-icon>exit_to_app</md-icon>
							<span>Sair</span>
						</md-menu-item>
					</md-menu-content>
				</md-menu>



			</md-toolbar>

		</md-toolbar>
	</div>
	

</template>


<script>
export default {
	methods : {
		openMenu() {
			Eventos.$emit('abrir');
		},
		buscar(texto,cat = null) {
			Eventos.$emit('buscar', {texto:texto, categoria : cat});	
		},
		limpar(){
			this.busca = '';
			Eventos.$emit('buscar', {texto:null, categoria : 'technology'});
		},
		logout(){
			auth.signOut().then(() => {
				router.push({name:'login'});
			}).catch(err => {
				console.log(err);
				this.$refs.snackbar.open();
			});
		},
		lista(){
			router.push({name:'minha-lista'});
		}
	},
	data : () => {
		return {
			busca : ''
		}
	},
	created(){
		Eventos.$on('logged', () => {
			this.logged = true;
		})
	}
}
</script>
<style>
.icon-fix{
	margin-left : -50px;
}
#noticias{
	color:white;
}
</style>