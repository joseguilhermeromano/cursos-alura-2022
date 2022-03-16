<template>
  <div class="container">
    <div class="jumbotron mt-2">
      <h1 class="display-4">Bem-vindo!</h1>
      <button class="btn btn-danger" @click="efetuarLogout">Sair</button>
      <p>Aplição disponível para listagem dos gerentes do nosso banco.</p>
    </div>
  </div>
</template>

<script>
import { logoutMixin } from '@/mixins'

export default {
  name: 'home',
  mixins: [logoutMixin]
}

// export default {
//   name: 'home',
//   methods: {
//     efetuarLogout () {
//       this.$store.commit('DESLOGAR_USUARIO')
//       this.$router.push({ name: 'login' })
//     }
//   }
// }
</script>
