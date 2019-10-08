import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginPage from '../../components/LoginPage';
import { Container } from './style';

export default function LaudoFreeMmd() {
  const laudos = {
    conjuntural: {
      title: 'Conjuntural',
      content: `Dívidas conjunturais surgem de um pensamento bastante comum: “Não preciso me preocupar com o futuro”. Muitas podem ser suas motivações. Desde uma esperança cega de que nada precisa ser feito pois tudo dará certo, até uma insegurança negligente de quem evita preocupar-se com o próprio orçamento, para não descobrir a dimensão do problema que já sabe que tem.
      A pessoa com esse padrão de pensamento busca não pensar no futuro, ou quando pensa, evita tudo que pode causar algum desconforto. É bastante comum pessoas com esse Modelo Mental sobre Dinheiro passarem por períodos no azul, mas têm a sensação de que “sempre acontece algo que as jogam no vermelho”.
      Endividados conjunturais costumam se complicar financeiramente e muitas vezes de forma recorrente com os gastos eventuais, isto é, com aqueles gastos que normalmente as pessoas não têm todos os meses, como IPVA, Seguro do Carro, uma troca repentina de celular ou um grave problema da saúde. Grandes ou pequenas, as eventualidades fazem com que suas finanças saiam do eixo e normalmente acabe se endividando.`,
    },
    estrutural: {
      title: 'Estrutural',
      content: `As Dívidas Estruturais, diferentemente das Conjunturais e de Oportunidade, surgem decorrente de uma sucessão de pequenos hábitos, comportamentos e desculpas que a pessoa que padece desse tipo de dívida se conta. Enquanto as Dívidas Conjunturais e de Oportunidade surgem mediante grandes eventualidades, como a decisão de comprar um carro, comprar uma casa de forma equivocada ou até mesmo um problema de saúde grave, as Dívidas Estruturais são fruto um padrão de consumo desenfreado, refletido em decisões impensadas de compra e motivado por questões emocionais bastante profundas.
      Normalmente, este comportamento desregrado de consumo é desencadeado em função de uma dor emocional aguda, seja ela ocasionada por relacionamentos ruins, por uma insatisfação contínua com o trabalho ou local onde vive, ou pela chamada identificação externa. Um processo onde a pessoa, para se sentir pertencente ao grupo com qual convive, incorpora itens de consumo no seu orçamento que não condizem com a renda da própria pessoa. A pessoa que sofre desse MMD de Identificação Externa começa a atribuir aos itens que compra a sua própria identidade, de tal forma que abrir mão de uma roupa de marca ou do celular do ano faz com que esta pessoa não se sinta pertencente ao grupo social do qual faz parte, deixando de reconhecer a si própria.
      É comum a pessoa com Dívidas Estruturais tentar recorrer à ferramentas de controle de gastos com a expectativa de ajustarem suas finanças. Baixa aplicativos, faz planilhas ou utiliza a velha caderneta de gastos, tudo acreditando que se souber “o que já foi”, vai conseguir evitar novos gastos e consequentemente o descontrole. Mas aqui, vale o velho ditado:
      “Águas passadas não movem moinhos”.
      Analisar os gastos passados não é a resposta. É o mesmo, para uma pessoa com dor de dente, anotar todos os doces que comeu ao longo do último mês e esperar que isso elimine a cárie.
      `,
    },
    oportunidade: {
      title: 'Oportunidade',
      content: `As Dívidas de Oportunidade são o produto final da pessoa que não pode deixar passar “uma grande oportunidade”. Quando vê um financiamento travestido de “pegar ou largar”, não pensa duas vezes. Descontos são sua maior isca e para essa pessoa, os famosos gatilhos de escassez (“vai acabar”) e urgência (“vai acabar agora”) do marketing funcionam com perfeição.
      Outra característica da pessoa que tem Dívida de Oportunidade é o excesso de auto confiança. Em muitos casos, essa pessoa costuma acreditar que não importa o quanto ela se comprometa financeiramente, ela sempre encontrará (ou encontrarão por ela) um jeito de reduzir o impacto do endividamento e organizar suas finanças.
      Quando essa pessoa se encontra diante da decisão de trocar o carro por um outro (muito) acima do próprio padrão de renda ou de trocar o pequeno apartamento por uma casa maior, ela normalmente encontra uma série de justificativas que não se sustentam por muito tempo como: “Vou reduzir todos os meus gastos na semana que vem”, “Vou para de comer fora e levar comida todos os dias”, “Vou começar a ganhar bem mais daqui a um mês e todos os meus outros gastos não vão aumentar”...
      `,
    },
  };

  const query = new URLSearchParams(window.location.search);
  const mmd = query.get('mmd');

  const laudo = laudos[mmd];

  return laudo ? (
    <LoginPage logoHref="/mmd">
      <div className="container">
        <div className="card">
          <Container>
            <span className="mmd">
              Tipo de Dívida: <span className="red">{laudo.title}</span>
            </span>

            {laudo.content.split(/[\n|\n\r]/).map(c => (
              <p key={c}>{c}</p>
            ))}

            <span className="information text-info">
              Mais informações no seu email
            </span>
          </Container>
        </div>
      </div>
    </LoginPage>
  ) : (
    <Redirect to="/mmd" />
  );
}
