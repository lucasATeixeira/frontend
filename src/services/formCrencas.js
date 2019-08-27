const formCrencas = [
  {
    cat: 'ambiente',
    ress:
      'Eu atraio mais dinheiro à medida que aprendo a cuidar melhor do que já tenho',
    score: 0,
    pergunta: 'Dinheiro que vem fácil, vai fácil',
  },
  {
    cat: 'ambiente',
    ress:
      'Ganhar dinheiro é uma questão de desenvolver novas habilidades e tomar decisões inteligentes',
    score: 0,
    pergunta: 'Ficar rico é uma questão de sorte ou destino',
  },
  {
    cat: 'ambiente',
    ress: 'Se eu me preparar, as melhores oportunidades estão por vir',
    score: 0,
    pergunta: 'As melhores oportunidades já passaram',
  },
  {
    cat: 'ambiente',
    ress:
      'O quanto antes iniciar, mais próximo estarei da minha independência financeira',
    score: 0,
    pergunta:
      'Agora não é o momento certo "para ir atrás" de riqueza financeira',
  },
  {
    cat: 'ambiente',
    ress: 'Dinheiro soluciona muitos problemas',
    score: 0,
    pergunta: 'Dinheiro causa muitos problemas',
  },
  {
    cat: 'ambiente',
    ress:
      'Uma das coisas mais importantes e que escolho todos os dias é me planejar financeiramente',
    score: 0,
    pergunta: 'Tenho coisas mais importantes para fazer que me planejar',
  },
  {
    cat: 'ambiente',
    ress:
      'A quantia de dinheiro que ganharei no meu futuro depende das minhas ações no presente',
    score: 0,
    pergunta: 'Dado meu passado, seria muito difícil ficar rico.',
  },
  {
    cat: 'ambiente',
    ress: 'Poupar é a chave para a liberdade financeira',
    score: 0,
    pergunta: 'Juntar dinheiro para quê se não fui eu que "espalhei"',
  },
  {
    cat: 'ambiente',
    ress: 'Quando faço o que amo é mais fácil ganhar dinheiro',
    score: 0,
    pergunta: 'É difícil ganhar dinheiro hoje em dia',
  },
  {
    cat: 'ambiente',
    ress:
      'Segurança financeira é algo que eu posso construir com qualquer tipo de trabalho',
    score: 0,
    pergunta:
      'Segurança financeira vem de um bom emprego e de um salário garantido',
  },
  {
    cat: 'ambiente',
    ress: 'Quando estou financeiramente planejado coisas boas acontecem',
    score: 0,
    pergunta: 'Toda vez que estou bem financeiramente algo ruim acontece',
  },
  {
    cat: 'ambiente',
    ress:
      'Quanto antes eu começar a investir mais fácil será ser financeiramente livre',
    score: 0,
    pergunta: 'Posso gastar hoje, pois amanhã eu recupero tudo novamente',
  },
  {
    cat: 'ambiente',
    ress: 'É preciso conhecimento para ganhar dinheiro',
    score: 0,
    pergunta: 'É preciso dinheiro para ganhar dinheiro',
  },
  {
    cat: 'ambiente',
    ress: 'A chances de tudo dar certo são bem maiores se eu me planejar',
    score: 0,
    pergunta: 'Tudo vai dar certo, não preciso me planejar',
  },
  // CAUSA E EFEITO
  {
    cat: 'causa e efeito',
    ress: 'Lutar por dinheiro pode causar stress e problemas de saúde',
    score: 0,
    pergunta: 'Lutar por dinheiro pode causar stress e problemas de saúde',
  },
  {
    cat: 'causa e efeito',
    ress: 'Quem sabe cuidar de pouco dinheiro, sabe cuidar de muito',
    score: 0,
    pergunta: 'Não preciso cuidar do meu dinheiro, porque tenho pouco',
  },
  {
    cat: 'causa e efeito',
    ress: 'Ganhar dinheiro é divertido e empolgante',
    score: 0,
    pergunta: 'Tentar ganhar dinheiro é luta e inquietação',
  },
  {
    cat: 'causa e efeito',
    ress: 'Ter dinheiro em abundância torna a vida mais abundante',
    score: 0,
    pergunta: 'Ter muito dinheiro é uma grande responsabilidade',
  },
  {
    cat: 'causa e efeito',
    ress:
      'A conquista do dinheiro me trará ainda mais tempo para curtir com qualidade minha vida',
    score: 0,
    pergunta:
      'O esforço para ganhar dinheiro de verdade, não me dará tempo livre para mais nada na vida',
  },
  // {
  //   cat: 'causa e efeito',
  //   ress: '',
  //   score: 0,
  //   pergunta: 'Não gosto de assumir muita responsabilidade',
  // },
  {
    cat: 'causa e efeito',
    ress:
      'Prefiro pagar mais imposto porque estou ganhando muito, que pouco imposto porque não ganho nada.',
    score: 0,
    pergunta:
      'Não adianta ganhar muito dinheiro porque terei que pagar muito mais impostos',
  },
  {
    cat: 'causa e efeito',
    ress:
      'Investir é um hábito. Quanto antes eu começar a investir mais impacto isso terá no futuro.',
    score: 0,
    pergunta:
      'Não preciso guardar dinheiro agora pois no futuro vou ganhar bem mais e o que juntar agora não fara diferença',
  },
  {
    cat: 'causa e efeito',
    ress:
      'Se tenho tempo para ganhar dinheiro eu encontro tempo para gerir meu dinheiro',
    score: 0,
    pergunta:
      'Sou muito ocupado para colocar tanto tempo em energia para aprender a gerir melhor meu dinheiro',
  },
  {
    cat: 'causa e efeito',
    ress: 'Uma nova dívida via me distanciar do meu sucesso financeiro',
    score: 0,
    pergunta:
      'Se eu tenho várias dívidas, uma nova dívida pequena não fará diferença',
  },
  {
    cat: 'causa e efeito',
    ress:
      'Quando pesquiso preço estou valorizando o meu dinheiro, meu trabalho e minha dedicação;',
    score: 0,
    pergunta: 'Só pesquisa preço quem ganha pouco ou precisa economizar',
  },
  {
    cat: 'causa e efeito',
    ress:
      'Se eu gastar tudo agora e "estiver vivo amanhã" posso não ter condições de manter o estilo de vida que desejo.',
    score: 0,
    pergunta: 'Eu gasto dinheiro "agora" pois não sei se estarei vivo amanhã',
  },
  // CAPACIDADE
  {
    cat: 'capacidade',
    ress: 'Eu sou capaz de aprender a ganhar muito dinheiro',
    score: 0,
    pergunta: 'Ficar rico não é uma habilidade que se aprende',
  },
  {
    cat: 'capacidade',
    ress:
      'Posso desenvolver hoje os conhecimentos e as habilidades para ficar rico',
    score: 0,
    pergunta: 'Não tive uma boa educação para poder ficar rico',
  },
  {
    cat: 'capacidade',
    ress:
      'Quando faço o que amo minhas chances de ganhar dinheiro aumentam ainda mais',
    score: 0,
    pergunta: 'Não dá para ficar rico fazendo exatamente o que você ama',
  },
  {
    cat: 'capacidade',
    ress: 'Qualquer pessoa é capaz de investir, mesmo começando com pouco',
    score: 0,
    pergunta: 'Investimentos são para as pessoas que têm dinheiro',
  },
  {
    cat: 'capacidade',
    ress:
      'Quando eu tiver muito dinheiro, serei capaz de mantê-lo e aumentá-lo',
    score: 0,
    pergunta: 'Se eu tiver muito dinehiro, provavelmente vou perdê-lo',
  },
  {
    cat: 'capacidade',
    ress:
      'Estou sempre disposto a fazer o que for necessário para sair das dívidas e conquistar o futuro que mereço',
    score: 0,
    pergunta:
      'Se eu realmente lutar para sair das dívidas e não conseguir, vou me sentir fracassado',
  },
  {
    cat: 'capacidade',
    ress:
      'A forma mais eficiente de ter as coisas que desejo é investindo todos os meses',
    score: 0,
    pergunta: 'Se eu for esperar ter dinheiro nunca terei nada',
  },
  {
    cat: 'capacidade',
    ress:
      'Confio na minha capacidade de aprender novas habilidades e conhecimentos que eu preciso para ter sucesso financeiro',
    score: 0,
    pergunta: 'Não sou esperto ou inteligente o suficiente para ficar rico',
  },
  {
    cat: 'capacidade',
    ress: 'Quando amo o que faço ganho dinheiro com muito mais facilidade',
    score: 0,
    pergunta: 'Dinheiro é algo difícil de ser adquirido',
  },
  {
    cat: 'capacidade',
    ress:
      'A melhor forma de comprar algo é investindo uma parte todos os meses, recebendo juros ao invés de pagar para alguém',
    score: 0,
    pergunta:
      'Só consigo comprar algo de maior valor se for financiado ou parcelando',
  },
  {
    cat: 'capacidade',
    ress:
      'Sou 100% de aprender a cuidar melhor do meu dinheiro e das minhas finanças',
    score: 0,
    pergunta: 'Eu naõ sou bom em matéria de dinheiro e finanças',
  },
  {
    cat: 'capacidade',
    ress: 'Eu sou capaz de me planejar para atingir os meus objetivos',
    score: 0,
    pergunta: 'Planejamento é algo complicado de se fazer',
  },
  // VALOR
  {
    cat: 'valor',
    ress: 'Sendo rico, posso ajudar aqueles que não tem nada',
    score: 0,
    pergunta: 'Não é justo eu ser rico, enquanto outros não tem nada',
  },
  {
    cat: 'valor',
    ress:
      'Quando faço o que amo tenho ainda mais chances de ganhar muito dinheiro',
    score: 0,
    pergunta:
      'Não dá para lutar para ser rico e ser feliz e realizado ao mesmo tempo',
  },
  {
    cat: 'valor',
    ress:
      'O dinheiro não consegue tornar uma pessoa desonesta, ele só amplia o que a pessoa já tem dentro de si',
    score: 0,
    pergunta:
      'A maioria dos ricos provavelmente fez algo ruim ou desonesto para obter seu dinheiro',
  },
  {
    cat: 'valor',
    ress:
      'Há dinheiro suficiente pra todos. O que eu ganho não interfere no que os outros podem ganhar.',
    score: 0,
    pergunta: 'Se eu tenho muito dinheiro, significa que alguém tem de menos',
  },
  {
    cat: 'valor',
    ress:
      'Dinheiro é tão importante para a minha qualidade de vida quanto amor, saúde e felicidade.',
    score: 0,
    pergunta:
      'Se vocë for rico em amor, saúde e felicidade, vocë não precisará de dinheiro',
  },
  {
    cat: 'valor',
    ress:
      'Ter muito dinheiro é sobre criar abundancia financeira e viver de acordo com o meu potencial.',
    score: 0,
    pergunta: 'Ter dinheiro em excesso significa que vocë é ganancioso',
  },
  {
    cat: 'valor',
    ress:
      'Dinheiro é importante para atender minhas necessidades e realizar os meus objetivos',
    score: 0,
    pergunta: 'Dinheiro não é assim tão importante',
  },
  {
    cat: 'valor',
    ress:
      'Tenho segurança quando utilizo meu dinheiro com inteligência e planejamento',
    score: 0,
    pergunta:
      'Assim que eu tiver bastante dinheiro, vou finalmente estar seguro',
  },
  {
    cat: 'valor',
    ress: 'Mereço ter dinheiro suficiente para ter a vida que desejo',
    score: 0,
    pergunta:
      'As pessoas deveriam ter somente o dinheiro suficiente para se ter uma vida confortável',
  },
  {
    cat: 'valor',
    ress:
      'Para ser rico terei que contar com o apoio de outras pessoas e agregar valor à vida delas',
    score: 0,
    pergunta:
      'Para ser rico, você terá que usar as pessoas e tirar vantagem delas',
  },
  {
    cat: 'valor',
    ress: 'É possível comprar algo barato e de boa qualidade',
    score: 0,
    pergunta: 'Se algo alguma coisa é barata ela é de má qualidade',
  },
  {
    cat: 'valor',
    ress:
      'O dinheiro não consegue tornar uma pessoa desonesta, ele só amplia o que a pessoa já tem dentro de si',
    score: 0,
    pergunta: 'Dinheiro torna as pessoas desonestas e gananciosas',
  },
  {
    cat: 'valor',
    ress: '',
    score: 0,
    pergunta: 'Dinheiro corrompre o empenho artístico e criativo',
  },
  {
    cat: 'valor',
    ress:
      'Posso utilizar meu empenho artístico e criativo para ganhar dinheiro',
    score: 0,
    pergunta: 'Quando você pensa muito em dinheiro você se esquece das pessoas',
  },
  // IDENTIDADE
  {
    cat: 'identidade',
    ress:
      'Ser rico é uma questão de aprendizado e eu posso aprender a ganhar muito dinheiro',
    score: 0,
    pergunta: 'Não "fui feito" para ser rico',
  },
  {
    cat: 'identidade',
    ress:
      'Pessoas ricas podem ter a vida que desejam, isso significa que podem ser felizes',
    score: 0,
    pergunta: 'Pessoas ricas não são felizes',
  },
  {
    cat: 'identidade',
    ress: 'Eu nunca serei velho ou novo demais para gerir meu dinheiro',
    score: 0,
    pergunta: 'Sou velho ou jovem demais para me preocupar com dinheiro',
  },
  {
    cat: 'identidade',
    ress: 'Sou um doador generoso e um recebedor excelente',
    score: 0,
    pergunta: 'Sou um bom doador, mas não um bom recebedor',
  },
  {
    cat: 'identidade',
    ress:
      'Uma mulher é capaz de aprender o se tornar o que quiser, assim como um homem.',
    score: 0,
    pergunta:
      'Uma mulher para ficar rica, ou precisa receber uma herança ou se casar com um homem rico',
  },
  {
    cat: 'identidade',
    ress: 'Eu sou plenamente capaz para ganhar muito dinheiro',
    score: 0,
    pergunta: 'Não me sinto "bom" o suficiente para ficar rico',
  },
  {
    cat: 'identidade',
    ress:
      'Nem todo rico já nasceu rico, e eu também posso aprender o necessário para me tornar rico',
    score: 0,
    pergunta: 'Se você já não nasceu rico, provavelmente você nunca será rico',
  },
  {
    cat: 'identidade',
    ress: 'Se me plenejar posso comprar o que quiser sem peso na consciência',
    score: 0,
    pergunta:
      'Fazer e adquirir coisas que dão prazer sem peso na consciência é coisa de gente rica',
  },
  {
    cat: 'identidade',
    ress: 'Posso ter dinheiro e ser simples e humilde ao mesmo tempo.',
    score: 0,
    pergunta:
      'Prefiro ser uma pessoa simples e humilde que alguém com dinheiro',
  },
  {
    cat: 'identidade',
    ress:
      'Por ser mulher tenho habilidades que posso explorar e me tornar bem sucedida financeiramente',
    score: 0,
    pergunta: 'Sendo mulher, é muito mais difícil ficar rica',
  },
  {
    cat: 'identidade',
    ress:
      'Tenho a força necessária para assumir minhas fraquezas e pedir ajuda.',
    score: 0,
    pergunta: 'Se eu pedir ajuda, vão me achar fraco',
  },
  {
    cat: 'identidade',
    ress:
      'Posso ganhar muito dinheiro como qualquer outra pessoa. Só depende de mim e das minhas escolhas',
    score: 0,
    pergunta: 'Ficar rico não é para pessoas como eu',
  },
  {
    cat: 'identidade',
    ress:
      'As chances de eu me tornar rico aumentam quando eu faço o necessário para me tornar rico',
    score: 0,
    pergunta: 'Sendo realista, não há chances de eu me tornar rico',
  },
  {
    cat: 'identidade',
    ress: 'Sendo eu mesmo posso ganhar muito dinheiro e ser ainda melhor',
    score: 0,
    pergunta: 'Se ganhar muito dinheiro posso me tornar aquilo que não desejo',
  },
  // PERTENCIMENTO
  {
    cat: 'pertencimento',
    ress:
      'Não preciso provar nada pra ninguém, pois sou aceito exatamente do jeio que sou pelas pessoas que importam',
    score: 0,
    pergunta: 'Vou me provar ficando rico',
  },
  {
    cat: 'pertencimento',
    ress:
      'Meus pais fizeram o melhor que pudiam. Acredito que posso traçar meu próprio caminho.',
    score: 0,
    pergunta: 'No fundo acredito que vou acabar como os meus pais',
  },
  {
    cat: 'pertencimento',
    ress:
      'O dinheiro que ganho é capaz de realizar os sonhos de quem eu amo e tornar a vida de todos mais feliz',
    score: 0,
    pergunta: 'Dinheiro prejudica os relacionamentos e destrói famílias',
  },
  {
    cat: 'pertencimento',
    ress:
      'Amigos de verdade podem se ajudar quando sabem lidar com dinheiro de maneira inteligente',
    score: 0,
    pergunta: 'Onde há amizade não se envolve dinheiro',
  },
  {
    cat: 'pertencimento',
    ress:
      'As pessoas que realmente se importam comigo vão continuar me amando e apreciando, quando eu me tornar rico e bem sucedido',
    score: 0,
    pergunta: 'Se eu ficar rico, certas pessoas não vão gostar de mim',
  },
  {
    cat: 'pertencimento',
    ress:
      'Ganhar mais dinheiro que meus pais é uma forma de honrá-los e valorizar tudo que fizeram por mim',
    score: 0,
    pergunta: 'Não é certo ganhar mais dinheiro que meus pais',
  },
  {
    cat: 'pertencimento',
    ress:
      'Utilizar meu dinheiro para ter a vida que quero, é mais importante que viver a vida que os outros esperam que eu viva',
    score: 0,
    pergunta: 'Minha imagem perante os outros é muito importante',
  },
  {
    cat: 'pertencimento',
    ress:
      'Meus pais fizeram o melhor que pudiam. Acredito que posso aprender a lidar com o dinheiro de uma maneira diferente',
    score: 0,
    pergunta: 'Pessoas com pais pobres tem mais chances de se endividar',
  },
  {
    cat: 'pertencimento',
    ress:
      'O que diferencia o investidor do endividado é a forma como cada um gasta o que ganha, e não a quantidade que cada um ganha.',
    score: 0,
    pergunta: 'Pessoas endividadas vem de famílias pobres',
  },
  {
    cat: 'pertencimento',
    ress:
      'Meus amigos verdadeiros conhecem minha realidade e também em acompanham ',
    score: 0,
    pergunta: 'Preciso acompanhar o estilo de vida dos meus amigos e parentes',
  },
  // ESPIRITUALIDADE
  {
    cat: 'espiritualidade',
    ress:
      'A minha situação financeira é resultado das minhas ações. Posso mudar mantendo a minha fé em Deus.',
    score: 0,
    pergunta: 'Deus vai me deixar rico, pobre ou de classe média',
  },
  {
    cat: 'espiritualidade',
    ress:
      'Ter muito dinheiro me permitir exercer ainda mais a minha generosidade e espiritualidade',
    score: 0,
    pergunta: 'Ter muito dinheiro me fará sentir menos puro ou espiritualizado',
  },
  {
    cat: 'espiritualidade',
    ress: 'Quando me aproximo de Deus eu me aproximo do dinheiro',
    score: 0,
    pergunta: 'Quando o homem se aproxima do dinheiro ele se distancia de Deus',
  },
  {
    cat: 'espiritualidade',
    ress: 'Posso ajudar quem precisa se eu tiver dinheiro',
    score: 0,
    pergunta: 'É mais dignificante ser pobre que ser rico',
  },
  {
    cat: 'espiritualidade',
    ress: 'Posso fazer o que amo e ganhar dinheiro com isso',
    score: 0,
    pergunta: 'A única razão para se trabalhar é para ganhar dinheiro',
  },
  {
    cat: 'espiritualidade',
    ress:
      'Acumular patrimônio é importante pra ter a vida que desejo, afinal não sei até quando vou viver',
    score: 0,
    pergunta:
      'Juntar patrimônio é bobagem, pois quando eu morrer não levarei nada',
  },
  {
    cat: 'espiritualidade',
    ress: 'Abundância só existe quando a fé está associada à ação',
    score: 0,
    pergunta: 'Vai dar tudo certo, baster ter fé e mais nada',
  },
  {
    cat: 'espiritualidade',
    ress:
      'A minha situação financeira é resultado das minhas ações. Posso mudar mantendo a minha fé em Deus.',
    score: 0,
    pergunta: 'A minha sintuação financeira é da vontade de Deus',
  },
  {
    cat: 'espiritualidade',
    ress:
      'Quanto mais dinheiro eu tenho, mais eu posso contribuir com aqueles que necessitam e isso alimenta a minha fé.',
    score: 0,
    pergunta:
      'É mais fácil um camelo passar pelo buraco de uma agulha que um rico entrar no reino dos céus.',
  },
];

export default formCrencas;
