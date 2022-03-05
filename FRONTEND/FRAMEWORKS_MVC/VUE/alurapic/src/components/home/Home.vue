<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>

    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo titulo..." name="" id="">

    <ul class="lista-fotos">
      <li v-for="foto of fotosComFiltro" :key="foto" class="lista-fotos-item">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo"/>
          <meu-botao 
            tipo="button" 
            rotulo="REMOVER" 
            @BotaoAtivado="remove(foto)" 
            :confirmacao="false"
            estilo="padrao"/>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel'
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva'
import Botao from '../shared/botao/Botao'

export default {
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
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

  methods: {
    remove(foto) {
      alert("TESTE"+foto.titulo)
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