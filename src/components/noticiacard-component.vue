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
					<router-link :to="url">
						<md-button class="md-raised md-primary">
							Ler
						</md-button>
					</router-link>
				</md-card-actions>
			</md-card>
		</div>
	</md-layout>
</template>


<script>
import moment from 'moment';
export default {
	props : ['thumbnail','titulo','url','data'],
	computed : {

		dataFormatada() {
			return moment(this.data).format('DD/MM/YYYY');
		}

	},
	methods : {
		abrir(url){
			let u = url.split("/");
			switch(u.length){
				case 5 :
				router.push({ name: 'modalnoticia', params: { a0: u[0], a1: u[1], a2: u[2], a3: u[3], a4: u[4] }});
				break;
				case 6 :
				router.push({ name: 'modalnoticia2', params: { a0: u[0], a1: u[1], a2: u[2], a3: u[3], a4: u[4], a5: u[5] }});
				break;
			}
		}
	}
}
</script>
<style>
.btn-ler{
	color: #fff;
}
</style>