const projeto = {
    id: 1,
    descricao: 'Alura tracker 3.0'
}

const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave, receptor) {
        console.log(`alguém pediu a chave ${chave}.`)
        return Reflect.get(objetoOriginal, chave, receptor)
    },

    set(objetoOriginal, chave, valor) {
        console.log(`alguém alterou a chave ${chave} do projeto para o valor ${valor}.`)
        objetoOriginal[chave] = valor
    }

})

proxy.descricao = 'Reatividade é mega bacana.'

console.log(proxy.descricao)
//console.log(projeto.descricao)