<template>
	<md-layout md-flex-xsmall="100" md-flex-large="33"  md-flex-medium="50">
		<div style="padding:20px;">
			<md-card>
				<md-card-media>
					<md-image v-if="thumbnail" :md-src="thumbnail"></md-image>
					<img v-else src="http://via.placeholder.com/350x150">
				</md-card-media>

				<md-card-header>
					<div class="md-title">{{titulo}}</div>
					<div class="md-subhead">{{dataFormatada}}</div>
				</md-card-header>

				<md-card-actions>
					<md-button v-if="!elista" @click="add_leitura" class="md-raised md-primary">
						<md-icon>library_add</md-icon>
					</md-button>
					&nbsp;&nbsp;
						<md-button class="md-raised md-primary" @click="abrir(url)">
							Ler
						</md-button>
				</md-card-actions>
			</md-card>
		</div>
		<md-snackbar md-position="top center" ref="snackbar" md-duration="4000">
			<span>{{msg}}</span>

			<md-button class="md-warn" @click="fechar_snack();">Fechar</md-button>
		</md-snackbar>
	</md-layout>
	
</template>


<script>
import moment from 'moment';
export default {
	props : ['thumbnail','titulo','url','data', 'elista'],
	computed : {

		dataFormatada() {
			return moment(this.data).format('DD/MM/YYYY');
		}

	},
    data : function() {
    	return {
    		msg : ''
    	}
    },
	methods : {
		abrir(url){
			if(url.charAt(0)=='/'){
				url = url.substring(1);
			}
			let u = url.split("/");
			console.log('noticia card - url ');
			console.log(this.url);
			switch(u.length){
				case 5 :
				router.push({ name: router.history.current.name+'1', params: { a0: u[0], a1: u[1], a2: u[2], a3: u[3], a4: u[4] }});
				break;
				case 6 :
				router.push({ name: router.history.current.name+'2', params: { a0: u[0], a1: u[1], a2: u[2], a3: u[3], a4: u[4], a5: u[5] }});
				break;
			}
		},
		add_leitura(){
			var aux = this.url;
					if(this.url.charAt(0)!='/')
						aux = '/' + this.url;

			db.collection("leitura")
			.where('userId','==',auth.currentUser.uid)
			.where('id','==',aux)
			.get()
			.then( result => {
				if(result.docs.length==0){
					

					db.collection("leitura").add({
						thumbnail : this.thumbnail,
						webTitle: this.titulo,
						webPublicationDate : this.data,
						id : aux,
						userId : auth.currentUser.uid
					})
					.then( doc => {
						this.msg = 'Notícia adicionada para leitura!'
						this.$refs.snackbar.open();

					})
					.catch(error => {

						this.msg = 'Falha ao adicionar a lista!'
						this.$refs.snackbar.open();
					});
				} else {
					this.msg = 'Noticia já foi adicionada!'
					this.$refs.snackbar.open();
				}
			})
			.catch(err => {
				this.msg = 'Falha ao adicionar a lista!'
			 	this.$refs.snackbar.open();
			});

		},
		fechar_snack(){
			this.$refs.snackbar.close();
		}
	}
}
</script>
<style>
.btn-ler{
	color: #fff;
}
</style>