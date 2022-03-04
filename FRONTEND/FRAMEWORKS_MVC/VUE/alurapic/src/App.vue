<template>
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>

    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo titulo..." name="" id="">

    <ul class="lista-fotos">
      <li v-for="foto of fotosComFiltro" :key="foto" class="lista-fotos-item">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo"/>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from './components/shared/painel/Painel'
import ImagemResponsiva from './components/shared/imagem-responsiva/ImagemResponsiva'

export default {
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva
  },
  data() {
    return {
      titulo: 'Alurapic',
      fotos: [], 
      filtro: ''
    }
  }, 

  computed: {
    fotosComFiltro() {
      if(this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i')
        return this.fotos.filter(foto => exp.test(foto.titulo))
      }else{
        return this.fotos
      }
    }
  },

  created() {
      this.$http.get('http://localhost:3000/v1/fotos')
        .then(res => res.json())
        .then(fotos => this.fotos = fotos)
  }
}
</script>

<style>
  .corpo {
    font-family: Helvetica, sans-serif;
    width: 90%;
    margin: 0 auto;
  }

  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

  .filtro {
    display: block;
    width: 100%;
  }
</style>