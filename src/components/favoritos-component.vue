<template>
	<div class='lista-wrapper'>
		<div v-if="!lista || lista.length == 0" >
			<center>Nenhuma notícia favorita</center>
		</div>
		<md-layout :md-gutter="8">
			<noticiacard-component  v-for='n in lista' v-bind:key='n.id'
				v-bind:titulo='n.webTitle'
				v-bind:data='n.webPublicationDate'
				v-bind:thumbnail='n.thumbnail'
				v-bind:url='n.id'>
			</noticiacard-component>
		</md-layout>
		<router-view></router-view>
	</div>
</template>


<script>
	import NoticiaCardComponent from './noticiacard-component.vue';
	export default {
		data : () => {
			return {
				lista : null
			}
		},
		components: {
            'noticiacard-component': NoticiaCardComponent,
        },
        methods : {
        },
        beforeMount(){
        	db.collection("favoritos").where('userId','==',auth.currentUser.uid).onSnapshot( docs => {
				this.lista = [];
				docs.forEach( doc => {
					this.lista.push({
						webTitle : doc.data().webTitle,
						webPublicationDate : doc.data().webPublicationDate,
						thumbnail : doc.data().thumbnail,
						id : doc.data().id,
						fId : doc.id
					})
				})
			})
        },
        created(){
			if(!auth.currentUser)
				router.push({name:'login'})
		}
	}
</script>

<style >
</style>