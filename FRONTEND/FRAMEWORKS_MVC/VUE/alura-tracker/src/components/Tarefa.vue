<template>
  <box>
      <div class="columns">
          <div class="column is-7">
              {{ tarefa.descricao || 'Tarefa sem descrição' }}
          </div>
          <div class="column">
              <cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
          </div>
      </div>
  </box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Cronometro from './Cronometro.vue'
import ITarefa from '../interfaces/ITarefa'
import Box from '../components/Box.vue'

export default defineComponent({
    name: 'Tarefa',
    components: {
        Cronometro, Box
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    }
})
</script>