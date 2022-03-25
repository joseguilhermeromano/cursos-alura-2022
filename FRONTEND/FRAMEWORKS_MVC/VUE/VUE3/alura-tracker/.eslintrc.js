module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': ['error', {
      'ignores': [  'Formulario', 'Cronometro', 'Temporizador', 'Botao', 
                    'Tarefa', 'Box', 'Projetos', 'Lista', 'Notificacoes', 'Modal']
    }],
    'vue/valid-v-slot': [ 'error', { allowModifiers: true } ]
  }
}
