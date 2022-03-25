import { EstadoTarefa, tarefa } from './modulos/tarefa/index';
import { INotificacao } from './../interfaces/INotificacao';
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from "vuex"
import { NOTIFICAR, REMOVE_TAREFA } from "./tipo-mutacoes"
import { EstadoProjeto, projeto } from './modulos/projeto';
export interface Estado {
    notificacoes: INotificacao[],
    projeto: EstadoProjeto, 
    tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        },
        notificacoes: []
    },
    mutations: {

        [REMOVE_TAREFA](state, id: string) {
            state.projeto.projetos = state.projeto.projetos.filter(p => p.id != id)
        },

        [NOTIFICAR] (state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    modules: {
        projeto, tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}