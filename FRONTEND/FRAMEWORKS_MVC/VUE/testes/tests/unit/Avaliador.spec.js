import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes, getLances } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
    {
        produto: 'Livro da Casa do Codigo',
        lanceInicial: 50, 
        descricao: 'Livro sobre VueJS'
    }, 
    {
        produto: 'Livro da Casa do Código', 
        lanceInicial: 50, 
        descricao: 'Livro sobre teste Unitário'
    }
]

describe('Um avaliador que se conecta com a API', () => {
    test('mostra todos os leiloes retornados pela API', async() => {
        getLeiloes.mockResolvedValueOnce(leiloes)
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises()
        const totalLeiloesExoibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExoibidos).toBe(leiloes.length)
    })

    test('Não há leiloes retornados pela API', async() => {
        getLeiloes.mockResolvedValueOnce([])
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises()
        const totalLeiloesExoibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExoibidos).toBe(0)
    })
})