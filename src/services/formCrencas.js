const formCrencas = [
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'Dinheiro que vem fácil, vai fácil',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'Ficar rico é uma questão de sorte ou destino',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'As melhores oportunidades já passaram',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'Agora não é o momento certo "para ir atrás" de riqueza financeira',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'Dinheiro causa muitos problemas',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'Tenho coisas mais importantes para fazer que me planejar',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'Dado meu passado, seria muito difícil ficar rico.',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'Juntar dinheiro para quê se não fui eu que "espalhei"',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'É difícil ganhar dinheiro hoje em dia',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'Segurança financeira vem de um bom emprego e de um salário garantido',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'Toda vez que estou bem financeiramente algo ruim acontece',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'Posso gastar hoje, pois amanhã eu recupero tudo novamente',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'É preciso dinheiro para ganhar dinheiro',
  },
  {
    cat: 'ambiente',
    score: 0,
    pergunta: 'Tudo vai dar certo, não preciso me planejar',
  },
  // CAUSA E EFEITO
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta: 'Lutar por dinheiro pode causar stress e problemas de saúde',
  },
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta: 'Não preciso cuidar do meu dinheiro, porque tenho pouco',
  },
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta: 'Tentar ganhar dinheiro é luta e inquietação',
  },
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta: 'Ter muito dinheiro é uma grande responsabilidade',
  },
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta:
      'O esforço para ganhar dinheiro de verdade, não me dará tempo livre para mais nada na vida',
  },
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta: 'Não gosto de assumir muita responsabilidade',
  },
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta: 'Não adianta ganhar muito dinheiro porque terei que pagar muito mais impostos',
  },
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta:
      'Não preciso guardar dinheiro agora pois no futuro vou ganhar bem mais e o que juntar agora não fara diferença',
  },
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta:
      'Sou muito ocupado para colocar tanto tempo em energia para aprender a gerir melhor meu dinheiro',
  },
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta: 'Se eu tenho várias dívidas, uma nova dívida pequena não fará diferença',
  },
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta: 'Só pesquisa preço quem ganha pouco ou precisa economizar',
  },
  {
    cat: 'causa e efeito',
    score: 0,
    pergunta: 'Eu gasto dinheiro "agora" pois não sei se estarei vivo amanhã',
  },
  // CAPACIDADE
  {
    cat: 'capacidade',
    score: 0,
    pergunta: 'Ficar rico não é uma habilidade que se aprende',
  },
  {
    cat: 'capacidade',
    score: 0,
    pergunta: 'Não tive uma boa educação para poder ficar rico',
  },
  {
    cat: 'capacidade',
    score: 0,
    pergunta: 'Não dá para ficar rico fazendo exatamente o que você ama',
  },
  {
    cat: 'capacidade',
    score: 0,
    pergunta: 'Investimentos são para as pessoas que têm dinheiro',
  },
  {
    cat: 'capacidade',
    score: 0,
    pergunta: 'Se eu tiver muito dinehiro, provavelmente vou perdê-lo',
  },
  {
    cat: 'capacidade',
    score: 0,
    pergunta:
      'Se eu realmente lutar para sair das dívidas e não conseguir, vou me sentir fracassado',
  },
  {
    cat: 'capacidade',
    score: 0,
    pergunta: 'Se eu for esperar ter dinheiro nunca terei nada',
  },
  {
    cat: 'capacidade',
    score: 0,
    pergunta: 'Não sou esperto ou inteligente o suficiente para ficar rico',
  },
  {
    cat: 'capacidade',
    score: 0,
    pergunta: 'Dinheiro é algo difícil de ser adquirido',
  },
  {
    cat: 'capacidade',
    score: 0,
    pergunta: 'Só consigo comprar algo de maior valor se for financiado ou parcelando',
  },
  {
    cat: 'capacidade',
    score: 0,
    pergunta: 'Eu naõ sou bom em matéria de dinheiro e finanças',
  },
  {
    cat: 'capacidade',
    score: 0,
    pergunta: 'Planejamento é algo complicado de se fazer',
  },
  // VALOR
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Não é justo eu ser rico, enquanto outros não tem nada',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Não dá para lutar para ser rico e ser feliz e realizado ao mesmo tempo',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta:
      'A maioria dos ricos provavelmente fez algo ruim ou desonesto para obter seu dinheiro',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Se eu tenho muito dinheiro, significa que alguém tem de menos',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Se vocë for rico em amor, saúde e felicidade, vocë não precisará de dinheiro',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Ter dinheiro em excesso significa que vocë é ganancioso',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Dinheiro não é assim tão importante',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Assim que eu tiver bastante dinheiro, vou finalmente estar seguro',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta:
      'As pessoas deveriam ter somente o dinheiro suficiente para se ter uma vida confortável',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Para ser rico, você terá que usar as pessoas e tirar vantagem delas',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Se algo alguma coisa é barata ela é de má qualidade',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Dinheiro torna as pessoas desonestas e gananciosas',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Dinheiro corrompre o empenho artístico e criativo',
  },
  {
    cat: 'valor',
    score: 0,
    pergunta: 'Quando você pensa muito em dinheiro você se esquece das pessoas',
  },
  // IDENTIDADE
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Não "fui feito" para ser rico',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Pessoas ricas não são felizes',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Sou velho ou jovem demais para me preocupar com dinheiro',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Sou um bom doador, mas não um bom recebedor',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta:
      'Uma mulher para ficar rica, ou precisa receber uma herança ou se casar com um homem rico',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Não me sinto "bom" o suficiente para ficar rico',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Se você já não nasceu rico, provavelmente você nunca será rico',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta:
      'Fazer e adquirir coisas que dão prazer sem peso na consciência é coisa de gente rica',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Prefiro ser uma pessoa simples e humilde que alguém com dinheiro',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Sendo mulher, é muito mais difícil ficar rica',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Se eu pedir ajuda, vão me achar fraco',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Ficar rico não é para pessoas como eu',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Sendo realista, não há chances de eu me tornar rico',
  },
  {
    cat: 'identidade',
    score: 0,
    pergunta: 'Se ganhar muito dinheiro posso me tornar aquilo que não desejo',
  },
  // PERTENCIMENTO
  {
    cat: 'pertencimento',
    score: 0,
    pergunta: 'Vou me provar ficando rico',
  },
  {
    cat: 'pertencimento',
    score: 0,
    pergunta: 'No fundo acredito que vou acabar como os meus pais',
  },
  {
    cat: 'pertencimento',
    score: 0,
    pergunta: 'Dinheiro prejudica os relacionamentos e destrói famílias',
  },
  {
    cat: 'pertencimento',
    score: 0,
    pergunta: 'Onde há amizade não se envolve dinheiro',
  },
  {
    cat: 'pertencimento',
    score: 0,
    pergunta: 'Se eu ficar rico, certas pessoas não vão gostar de mim',
  },
  {
    cat: 'pertencimento',
    score: 0,
    pergunta: 'Não é certo ganhar mais dinheiro que meus pais',
  },
  {
    cat: 'pertencimento',
    score: 0,
    pergunta: 'Minha imagem perante os outros é muito importante',
  },
  {
    cat: 'pertencimento',
    score: 0,
    pergunta: 'Pessoas com pais pobres tem mais chances de se endividar',
  },
  {
    cat: 'pertencimento',
    score: 0,
    pergunta: 'Pessoas endividadas vem de famílias pobres',
  },
  {
    cat: 'pertencimento',
    score: 0,
    pergunta: 'Preciso acompanhar o estilo de vida dos meus amigos e parentes',
  },
  // ESPIRITUALIDADE
  {
    cat: 'espiritualidade',
    score: 0,
    pergunta: 'Deus vai me deixar rico, pobre ou de classe média',
  },
  {
    cat: 'espiritualidade',
    score: 0,
    pergunta: 'Ter muito dinheiro me fará sentir menos puro ou espiritualisado',
  },
  {
    cat: 'espiritualidade',
    score: 0,
    pergunta: 'Quando o homem se aproxima do dinheiro ele se distancia de Deus',
  },
  {
    cat: 'espiritualidade',
    score: 0,
    pergunta: 'É mais dignificante ser pobre que ser rico',
  },
  {
    cat: 'espiritualidade',
    score: 0,
    pergunta: 'A única razão para se trabalhar é para ganhar dinheiro',
  },
  {
    cat: 'espiritualidade',
    score: 0,
    pergunta: 'Juntar patrimônio é bobagem, pois quando eu morrer não levarei nada',
  },
  {
    cat: 'espiritualidade',
    score: 0,
    pergunta: 'Vai dar tudo certo, baster ter fé e mais nada',
  },
  {
    cat: 'espiritualidade',
    score: 0,
    pergunta: 'A minha sintuação financeira é da vontade de Deus',
  },
  {
    cat: 'espiritualidade',
    score: 0,
    pergunta:
      'É mais fácil um camelo passar pelo buraco de uma agulha que um rico entrar no reino dos céus',
  },
];

export default formCrencas;
