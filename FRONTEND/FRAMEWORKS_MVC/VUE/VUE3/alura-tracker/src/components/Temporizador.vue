<template>
    <section class="is-flex is-align-items-center is-justify-content-space-between">
        <cronometro :tempoEmSegundos="tempoEmSegundos"/>
        <botao @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="cronometroRodando" />
        <botao @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!cronometroRodando" />
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Cronometro from './Cronometro.vue'
import Botao from './Botao.vue'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { useStore } from '@/store'
// import { notificacaoMixin } from "@/mixins/notificar"
import useNotificador from "@/hooks/notificador"

export default defineComponent({
    name: 'Temporizador',
    emits: ['aoTemporizadorFinalizado'],
    props: ['idProjeto'],
    // mixins: [notificacaoMixin],
    components: {
        Cronometro, Botao
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar (){
            // começar a contagem
            this.cronometroRodando = true
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            },1000)
            console.log('iniciando')
        },
        finalizar () {
            console.log(this.idProjeto)
            const projeto = this.projetos.find((p) => p.id == this.idProjeto);
            if (!projeto) {
                this.notificar(TipoNotificacao.FALHA, 'Ops!', "Selecione um projeto antes de finalizar a tarefa!")
                return;
            }

            this.cronometroRodando = false
            clearInterval(this.cronometro)
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0 
        }

    },
    setup() {
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            projetos: computed(() => store.state.projetos),
            store,
            notificar
        }
    }
})
</script>

<style>

</style>