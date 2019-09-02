const questoes = [
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 0,
      scoreInseguranca: 1,
      scoreCarencia: 2,
      scoreInsatisfacao: 2,
      scoreIdentificacao: 2,
      scoreNegligencia: 1,
      scoreImpulsividade: 1,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'Tenho dificuldade em ir ao shopping e voltar de mãos vazias!',
  },
  {
    scores: {
      scoreEsperanca: 1,
      scoreReatividade: 1,
      scoreInseguranca: 0,
      scoreCarencia: 2,
      scoreInsatisfacao: 3,
      scoreIdentificacao: 2,
      scoreNegligencia: 1,
      scoreImpulsividade: 1,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta:
      'Recorro ao cartão de crédito para cobrir os gastos que excedam meu salário',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 1,
      scoreInseguranca: 1,
      scoreCarencia: 6,
      scoreInsatisfacao: 2,
      scoreIdentificacao: 2,
      scoreNegligencia: 0,
      scoreImpulsividade: 1,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'Costumo recorrer às compras quando me sinto mal emocionalmente',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 0,
      scoreInseguranca: 1,
      scoreCarencia: 2,
      scoreInsatisfacao: 2,
      scoreIdentificacao: 6,
      scoreNegligencia: 0,
      scoreImpulsividade: 0,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'O que pensam de mim é muito importante',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 0,
      scoreInseguranca: 1,
      scoreCarencia: 2,
      scoreInsatisfacao: 2,
      scoreIdentificacao: 6,
      scoreNegligencia: 0,
      scoreImpulsividade: 0,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta:
      'Gasto muito para manter meu estilo de vida e minha imagem para outras pessoas',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 0,
      scoreInseguranca: 1,
      scoreCarencia: 6,
      scoreInsatisfacao: 2,
      scoreIdentificacao: 2,
      scoreNegligencia: 0,
      scoreImpulsividade: 0,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta:
      'Para mim, dar presentes é uma das melhores formas de demonstrar amor',
  },
  {
    scores: {
      scoreEsperanca: 1,
      scoreReatividade: 1,
      scoreInseguranca: 0,
      scoreCarencia: 2,
      scoreInsatisfacao: 2,
      scoreIdentificacao: 2,
      scoreNegligencia: 1,
      scoreImpulsividade: 1,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta:
      'Minha referência para gastar é o limite do(s) meu(s) cartão(ões) de crédito, não o meu salário',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 1,
      scoreInseguranca: 1,
      scoreCarencia: 2,
      scoreInsatisfacao: 6,
      scoreIdentificacao: 2,
      scoreNegligencia: 1,
      scoreImpulsividade: 1,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta:
      'Sinto que mereço gastar com atividades que me dão prazer, independente da minha situação financeira',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 1,
      scoreInseguranca: 1,
      scoreCarencia: 2,
      scoreInsatisfacao: 2,
      scoreIdentificacao: 2,
      scoreNegligencia: 1,
      scoreImpulsividade: 1,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta: 'Costumo comprar mais do que o necessário',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 0,
      scoreInseguranca: 0,
      scoreCarencia: 2,
      scoreInsatisfacao: 6,
      scoreIdentificacao: 2,
      scoreNegligencia: 0,
      scoreImpulsividade: 1,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'Me sinto mal com meu trabalho atual',
  },
  {
    scores: {
      scoreEsperanca: 1,
      scoreReatividade: 0,
      scoreInseguranca: 0,
      scoreCarencia: 1,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 1,
      scoreNegligencia: 1,
      scoreImpulsividade: 2,
      scoreOtimismo: 3,
    },
    valor: 0,
    pergunta:
      'Quando vou fazer grandes compras, normalmente encontro boas justificativas para fazê-las o quanto antes',
  },
  {
    scores: {
      scoreEsperanca: 1,
      scoreReatividade: 1,
      scoreInseguranca: 1,
      scoreCarencia: 0,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 1,
      scoreNegligencia: 2,
      scoreImpulsividade: 3,
      scoreOtimismo: 2,
    },
    valor: 0,
    pergunta: 'Não costumo perder uma boa oportunidade',
  },
  {
    scores: {
      scoreEsperanca: 1,
      scoreReatividade: 1,
      scoreInseguranca: 0,
      scoreCarencia: 1,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 0,
      scoreNegligencia: 2,
      scoreImpulsividade: 6,
      scoreOtimismo: 2,
    },
    valor: 0,
    pergunta: 'Quando se trata de compras, sou impulsivo(a)',
  },
  {
    scores: {
      scoreEsperanca: 1,
      scoreReatividade: 0,
      scoreInseguranca: 0,
      scoreCarencia: 0,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 0,
      scoreNegligencia: 6,
      scoreImpulsividade: 2,
      scoreOtimismo: 2,
    },
    valor: 0,
    pergunta:
      'Assumo compromissos financeiros maiores, acreditando que serei capaz de cortar gastos que já tenho no presente',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 1,
      scoreInseguranca: 0,
      scoreCarencia: 1,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 0,
      scoreNegligencia: 2,
      scoreImpulsividade: 3,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta:
      'Costumo aproveitar promoções e descontos, mesmo em coisas de que não necessito',
  },
  {
    scores: {
      scoreEsperanca: 1,
      scoreReatividade: 0,
      scoreInseguranca: 0,
      scoreCarencia: 0,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 1,
      scoreNegligencia: 3,
      scoreImpulsividade: 2,
      scoreOtimismo: 6,
    },
    valor: 0,
    pergunta:
      'Assumo compromissos financeiros acreditando que posso aumentar minha renda num curto espaço de tempo',
  },
  {
    scores: {
      scoreEsperanca: 1,
      scoreReatividade: 0,
      scoreInseguranca: 0,
      scoreCarencia: 1,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 0,
      scoreNegligencia: 1,
      scoreImpulsividade: 2,
      scoreOtimismo: 6,
    },
    valor: 0,
    pergunta: 'Tomo decisões acreditando que tudo vai melhorar',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 1,
      scoreInseguranca: 0,
      scoreCarencia: 0,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 1,
      scoreNegligencia: 2,
      scoreImpulsividade: 6,
      scoreOtimismo: 2,
    },
    valor: 0,
    pergunta: "Se percebo que algo 'vale muito a pena', não penso duas vezes",
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 1,
      scoreInseguranca: 1,
      scoreCarencia: 0,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 1,
      scoreNegligencia: 1,
      scoreImpulsividade: 3,
      scoreOtimismo: 2,
    },
    valor: 0,
    pergunta:
      'Quando estou diante de uma grande oferta, fico com medo de perder a oportunidade e nunca mais ter a chance novamente',
  },
  {
    scores: {
      scoreEsperanca: 1,
      scoreReatividade: 0,
      scoreInseguranca: 0,
      scoreCarencia: 0,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 1,
      scoreNegligencia: 6,
      scoreImpulsividade: 2,
      scoreOtimismo: 2,
    },
    valor: 0,
    pergunta:
      'Antes de fazer uma compra mais cara, não verifico meu orçamento atual e futuros lançamentos para saber se posso comprar',
  },
  {
    scores: {
      scoreEsperanca: 6,
      scoreReatividade: 2,
      scoreInseguranca: 1,
      scoreCarencia: 0,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 1,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta:
      "'Deixo para depois' para tomar grandes decisões que envolvam dinheiro, pois penso que tudo vai melhorar",
  },
  {
    scores: {
      scoreEsperanca: 3,
      scoreReatividade: 2,
      scoreInseguranca: 6,
      scoreCarencia: 1,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 1,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'Evito pensar nos problemas financeiros',
  },
  {
    scores: {
      scoreEsperanca: 2,
      scoreReatividade: 3,
      scoreInseguranca: 2,
      scoreCarencia: 1,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 0,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta: 'É comum ter imprevistos no meu orçamento',
  },
  {
    scores: {
      scoreEsperanca: 6,
      scoreReatividade: 2,
      scoreInseguranca: 1,
      scoreCarencia: 0,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 1,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta:
      'Evito tomar algumas decisões, porque acredito que as coisas estarão sempre melhores',
  },
  {
    scores: {
      scoreEsperanca: 2,
      scoreReatividade: 2,
      scoreInseguranca: 3,
      scoreCarencia: 0,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 0,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta:
      "Evito pensar ou tomar decisões que envolvam 'dinheiro' e 'futuro' ao mesmo tempo",
  },
  {
    scores: {
      scoreEsperanca: 2,
      scoreReatividade: 6,
      scoreInseguranca: 1,
      scoreCarencia: 0,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 1,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta: "Deixo para pensar no 'amanhã' quando o 'amanhã' chegar",
  },
  {
    scores: {
      scoreEsperanca: 2,
      scoreReatividade: 3,
      scoreInseguranca: 2,
      scoreCarencia: 0,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 0,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta:
      "Sinto que, sempre que tudo parece bem financeiramente, alguma coisa acontece e me 'complica'",
  },
  {
    scores: {
      scoreEsperanca: 2,
      scoreReatividade: 6,
      scoreInseguranca: 2,
      scoreCarencia: 0,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 0,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta:
      'Prefiro aguardar que os problemas aconteçam para tomar minhas decisões',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 2,
      scoreInseguranca: 6,
      scoreCarencia: 1,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 0,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta:
      'Prefiro não pensar no meu futuro financeiro, por insegurança de que ele não será bom',
  },
  {
    scores: {
      scoreEsperanca: 3,
      scoreReatividade: 3,
      scoreInseguranca: 2,
      scoreCarencia: 0,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 1,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta:
      "Esta frase faz sentido para mim: 'o problema de amanhã eu resolvo amanhã'",
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 1,
      scoreInseguranca: 1,
      scoreCarencia: 1,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 1,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'Não converso sobre dinheiro com meu cônjuge/parceiro(a)',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 0,
      scoreInseguranca: 1,
      scoreCarencia: 1,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 0,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'Evito falar sobre dinheiro com meus filhos',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 0,
      scoreInseguranca: 0,
      scoreCarencia: 2,
      scoreInsatisfacao: 2,
      scoreIdentificacao: 2,
      scoreNegligencia: 0,
      scoreImpulsividade: 0,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'Enjoo rápido das coisas que tenho',
  },
  {
    scores: {
      scoreEsperanca: 1,
      scoreReatividade: 0,
      scoreInseguranca: 1,
      scoreCarencia: 0,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 0,
      scoreNegligencia: 2,
      scoreImpulsividade: 0,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta: 'Quando estou apertado(a) evito abrir o extrato do banco/cartão',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 0,
      scoreInseguranca: 1,
      scoreCarencia: 2,
      scoreInsatisfacao: 2,
      scoreIdentificacao: 2,
      scoreNegligencia: 0,
      scoreImpulsividade: 1,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'Frequentemente desejo ter coisas que os outros têm',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 0,
      scoreInseguranca: 0,
      scoreCarencia: 1,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 1,
      scoreNegligencia: 0,
      scoreImpulsividade: 2,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'Compro as coisas e não uso',
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 0,
      scoreInseguranca: 1,
      scoreCarencia: 1,
      scoreInsatisfacao: 1,
      scoreIdentificacao: 0,
      scoreNegligencia: 0,
      scoreImpulsividade: 2,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'Compro coisas que não preciso',
  },
  {
    scores: {
      scoreEsperanca: 2,
      scoreReatividade: 2,
      scoreInseguranca: 0,
      scoreCarencia: 0,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 0,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta: 'Tenho uma reserva financeira para emergências',
  },
  {
    scores: {
      scoreEsperanca: 2,
      scoreReatividade: 2,
      scoreInseguranca: 0,
      scoreCarencia: 0,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 0,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 0,
    },
    valor: 0,
    pergunta:
      "Normalmente meu gasto mensal cabe no meu orçamento, o que me atrapalha financeiramente são as 'eventualidades'",
  },
  {
    scores: {
      scoreEsperanca: 0,
      scoreReatividade: 0,
      scoreInseguranca: 2,
      scoreCarencia: 1,
      scoreInsatisfacao: 0,
      scoreIdentificacao: 0,
      scoreNegligencia: 1,
      scoreImpulsividade: 0,
      scoreOtimismo: 1,
    },
    valor: 0,
    pergunta: "Não consigo dizer 'não' para meus filhos/pais",
  },
];

export default questoes;
