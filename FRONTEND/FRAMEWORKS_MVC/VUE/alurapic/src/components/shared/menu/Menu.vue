<template>
    <nav>
      <ul>
        <li v-for="(rota, idx) in rotas" :key="idx"><router-link :to="rota.path ? rota.path : '/'">{{ rota.titulo }}</router-link></li>
      </ul>
    </nav>
</template>

<script>
export default {
    props: {
        rotas: {
            type: Array, 
            required: true
        }
    }
}
</script>

<style>

</style>