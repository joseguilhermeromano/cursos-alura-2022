import IProjeto from '@/interfaces/IProjeto';

export default interface ITarefa {
    id: string,
    duracaoEmSegundos: number,
    descricao: string,
    projeto?: IProjeto
}