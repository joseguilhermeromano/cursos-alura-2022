import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = {
    produto: 'Livro da casa do código',
    lanceInicial: 50,
    descricao: 'Livro bem bacana sobre VUE'
}

const lances = [
    {
        id: 1,
        valor: 1001,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1
    }, 
    {
        valor: 1005,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1,
        id: 2
    },
    {
        valor: 1099,
        data: '2020-06-13T18:19:44.871Z',
        leilao_id: 1,
        id: 3
    }
]

describe('Leiloeiro inicia um leilão que não possui lances', () => {
    test('avisa quando não existem lances', async() => {

        // getLances.mockResolvedValueOnce([{
        //     id: 1,
        //     valor: 100,
        //     data: '2020-12-01',
        //     leilao_id: 1
        // }])

        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce([])

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBe(true)
    })
})

describe('Um leiloeiro exibe os lances existentes', () => {
    test('Não mostra o aviso de "sem lances"', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()
        const alerta = wrapper.find('.alert-dark')
        expect(alerta.exists()).toBe(false)
    })
    test('Possui uma lista de lances', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const alerta = wrapper.find('.list-inline')
        expect(alerta.exists()).toBe(true)
    })
})

describe('Um leiloeiro comunica os valores de menor lance', () => {
    test('Mostra o maior lance daquele leiloeiro', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()
        const maiorLance = wrapper.find('.maior-lance')
        expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1099')
    })
    test('Mostra o menor lance daquele leiloeiro', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()
        const menorLance = wrapper.find('.menor-lance')
        expect(menorLance.element.textContent).toContain('Menor lance: R$ 1001')
    })
})