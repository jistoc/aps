<template>
	<div id="comentario_wrapper">
		<p>
			<span class="texto">{{texto}} &nbsp;&nbsp;&nbsp;</span>
			<md-button @click="remover(id)" class="md-icon-button md-raised md-accent">
			  <md-icon>delete</md-icon>
			</md-button><br><br>

		</p>
	</div>
</template>
<script>
	export default{

		props : ['texto','id'],
		methods : {
			remover(id){
				console.log(this.id_fav);
				db.collection("comentarios")
				.doc(this.id)
				.delete()
				.then(() => {

					
				}).catch(function(error) {
					console.log(error)
				});
			}
		}
	}
</script>
<style>
	#comentario_wrapper{
		border-bottom: 2px dashed gray;
		margin-bottom: 5px;
	}
	.texto{
		position: relative;
		top:1em;
	}
</style>