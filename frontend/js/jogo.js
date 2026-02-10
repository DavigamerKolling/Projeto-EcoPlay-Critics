// Ícones (coloque esses arquivos em frontend/img/platforms/)
const PLATFORM_ICONS = {
  steam: "img/platforms/steam.png",
  epic: "img/platforms/epic.png",
  linux: "img/platforms/linux.png",
  apple: "img/platforms/apple.png",
  playstation: "img/platforms/playstation.png",
  xbox: "img/platforms/xbox.png",
  switch: "img/platforms/switch.png",
  android: "img/platforms/android.png"
};

// Base de dados local (depois você pode trocar por MySQL)
const GAMES = {
  "beyond-blue": {
    title: "Beyond Blue",
    cover: "img/beyond-blue.jpg",

    // ✅ GALERIA: imagens + vídeo (youtube OU arquivo local)
    media: [
      { type: "video", youtube: "pOAWBCXpo6k" },
      { type: "video", youtube: "Ci2s6aXjRyI" },
      { type: "image", src: "img/beyondblue/beyond1.png" },
      { type: "image", src: "img/beyondblue/beyond2.png" },
      { type: "image", src: "img/beyondblue/beyond3.png" },
      { type: "image", src: "img/beyondblue/beyond4.png" },
      { type: "image", src: "img/beyondblue/beyond5.png" },
      { type: "image", src: "img/beyondblue/beyond6.png" },
      { type: "image", src: "img/beyondblue/beyond7.png" },
      { type: "image", src: "img/beyondblue/beyond8.png" },
      { type: "image", src: "img/beyondblue/beyond9.png" },
      { type: "image", src: "img/beyondblue/beyond10.png" },
      { type: "image", src: "img/beyondblue/beyond11.png" },
      { type: "image", src: "img/beyondblue/beyond12.png" },
      { type: "image", src: "img/beyondblue/beyond13.png" },
      { type: "image", src: "img/beyondblue/beyond14.png" },
      { type: "image", src: "img/beyondblue/beyond15.png" },
      { type: "image", src: "img/beyondblue/beyond16.png" },
      { type: "image", src: "img/beyondblue/beyond17.png" },
      { type: "image", src: "img/beyondblue/beyond18.png" },
      { type: "image", src: "img/beyondblue/beyond19.png" },
      { type: "image", src: "img/beyondblue/beyond20.png" },
      // YouTube: use só o ID do vídeo
      { type: "video", youtube: "kN1PcV7vwyU" },
      { type: "video", youtube: "2HZ5-2jok5Y" }
    ],

    platforms: ["steam", "epic", "linux", "playstation", "xbox", "switch"],

    textHtml: `
      <p><b>Beyond Blue</b> é uma narrativa de aventura individual que leva você ao fundo do coração azul do nosso planeta.</p>

      <p>
        Em um futuro próximo, Beyond Blue explora os mistérios do nosso oceano através dos olhos de Mirai,
        cientista e exploradora do fundo do mar. Faça parte de uma nova equipe de pesquisa e use
        tecnologias inovadoras para ver, ouvir e interagir com o oceano de forma mais reveladora do que nunca.
      </p>

      <p><b>Incluindo:</b></p>
      <ul>
        <li>Uma narrativa intrigante totalmente dublada</li>
        <li>Exploração e aventura em um mundo jamais tocado</li>
        <li>Trilha sonora envolvente e composições originais</li>
        <li>Minidocumentários com imagens e entrevistas de especialistas</li>
      </ul>

      <p>
        Adotando um processo de desenvolvimento inclusivo, o jogo foi criado em parceria com especialistas
        para trazer uma experiência que reflete o mistério infinito e as maravilhas incríveis do coração azul do nosso planeta.
      </p>
    `
  },

  // Exemplos mínimos pros outros (você pode editar depois)
  "plasticity": {
    title: "Plasticity",
    cover: "img/plasticity.jpg",
    media: [
      { type: "video", youtube: "iDxRe_7rUQE" },
      { type: "image", src: "img/plasticity/plasticity1.png" },
      { type: "image", src: "img/plasticity/plasticity2.png" },
      { type: "image", src: "img/plasticity/plasticity3.png" },
      { type: "image", src: "img/plasticity/plasticity4.png" },
      { type: "image", src: "img/plasticity/plasticity5.png" }
    ],
    platforms: ["steam", "linux"],
    textHtml: `<p>2140. A future where plastic consumption has never ended, leaving lifeless lands, flooded cities, and widespread debris in its wake…</p>
    
    <p>Plasticity is an innovative puzzle-platformer about a plastic-ridden world and the choices you make to save it. Play as Noa, a curious young girl who leaves her home in search of a better life. Embark on an emotional journey as your actions dynamically change both gameplay and the story. While each decision carries consequence, few are irreversible—you may stumble, you may fall, but only you can save the world.</p>
    
    <p>This free game was created by students from the renowned USC Games Program and contains 20-40 minutes of content.</p>`
  },

  "terra-nil": {
    title: "Terra Nil",
    cover: "img/terra-nil.jpg",
    media: [
      { type: "video", youtube: "CFw7lPW6WOA" },
      { type: "video", youtube: "4qHI5xBa5q0" },
      { type: "image", src: "img/terranil/terranil1.png" },
      { type: "image", src: "img/terranil/terranil2.png" },
      { type: "image", src: "img/terranil/terranil3.png" },
      { type: "image", src: "img/terranil/terranil4.png" },
      { type: "image", src: "img/terranil/terranil5.png" },
      { type: "image", src: "img/terranil/terranil6.png" },
      { type: "image", src: "img/terranil/terranil7.png" },
      { type: "image", src: "img/terranil/terranil8.png" },
      { type: "image", src: "img/terranil/terranil9.png" },
      { type: "image", src: "img/terranil/terranil10.png" },
      { type: "image", src: "img/terranil/terranil11.png" },
      { type: "image", src: "img/terranil/terranil12.png" },
      { type: "image", src: "img/terranil/terranil3.png" },
      { type: "image", src: "img/terranil/terranil4.png" },
      { type: "video", youtube: "mzVkzahcepY" }
    ],
    platforms: ["steam", "epic", "linux", "switch", "android", "apple"],
    textHtml: `<p><b>Terra Nil</b> é um jogo que explora a transformação de paisagens devastadas, sem vida, em ecossistemas vibrantes e férteis. Transforme o solo morto em vegetações ricas, limpe oceanos poluídos, plante florestas verdejantes e crie o hábitat natural para animais chamarem de lar. Em seguida, recicle suas construções sem deixar vestígios da sua presença. Recupere terras inférteis.</p>
    <p><b>Um construtor de cidades inverso</b></p>
    <p>Use tecnologia avançada para purificar o solo, produzindo planícies, brejos, praias, florestas tropicais, flores silvestres e mais. Em seguida, recicle tudo que construiu, deixando o ambiente virgem para os animais que serão seus novos habitantes.</p>`
  },

  "alba": {
    title: "Alba: A Wildlife Adventure",
    cover: "img/Alba.jpg",
    media: [
      { type: "video", youtube: "a-Eu9WE3grA" },
      { type: "video", youtube: "rqO0CQDNGxM" },
      { type: "image", src: "img/alba/alba1.png" },
      { type: "image", src: "img/alba/alba2.png" },
      { type: "image", src: "img/alba/alba3.png" },
      { type: "image", src: "img/alba/alba4.png" },
      { type: "image", src: "img/alba/alba5.png" }
    ],
    platforms: ["steam", "epic", "linux", "playstation", "xbox", "switch", "android", "apple"],
    textHtml: `<p>From the BAFTA-Award winning studio behind Monument Valley and Assemble with Care comes something entirely new.</p>
    
    <p>Join Alba as she visits her grandparents on a Mediterranean island. She is ready for a peaceful summer of wildlife exploration with her friend Ines, but when she sees an animal in danger, she realises she needs to do something about it.</p>
    
    <p>This is truly a Mediterranean paradise if you ignore all the litter! From the idyllic beaches to the ancient castle overlooking the town a whole island is ready to be explored. With Ines and your grandfather - who is a total bird nerd - by your side, you can start the movement to save the island. Maybe even the world after that.</p>

    <ul>
        <li>Handcrafted visuals. Every little corner of the island has been looked after with great detail. Trust me, it took us a while to make it</li>
        <li>Join Alba and Ines to found the AIWRL (really rolls off the tongue doesn't it?), an organisation that can save the island</li>
        <li>You will need to gather a bunch of volunteers and the town is full of good people. Help them out and convince them to join you</li>
        <li>There are animals everywhere, can you find all the species?</li>
      </ul>
      
      <p><b>What you can expect:</b></p>
      <ul>
        <li>Great music. We worked with Lorena Alvarez, to make a soundtrack that is equal parts Spain and Amazing</li>
        <li>This is a Chillectathon. Make your time on the island your own and experience the adventure at your own pace. No rush</li>
        <li>A place you want to stay. We based this on our childhood summers and, well, we wish we could go back. This island is the next best thing</li>
        <li>Honestly, a feel-good game about running around and doing good deeds</li>
      </ul>`
  },

  "endling": {
    title: "Endling - Extinction is Forever",
    cover: "img/endling.jpg",
    media: [
      { type: "video", youtube: "kiM2_XB_HZE" },
      { type: "video", youtube: "vrqLqywyyug" },
      { type: "image", src: "img/endling/endling1.png" },
      { type: "image", src: "img/endling/endling2.png" },
      { type: "image", src: "img/endling/endling3.png" },
      { type: "image", src: "img/endling/endling4.png" },
      { type: "image", src: "img/endling/endling5.png" },
      { type: "image", src: "img/endling/endling6.png" },
      { type: "image", src: "img/endling/endling7.png" },
      { type: "image", src: "img/endling/endling8.png" },
      { type: "image", src: "img/endling/endling9.png" },
      { type: "image", src: "img/endling/endling10.png" },
      { type: "image", src: "img/endling/endling11.png" },
      { type: "image", src: "img/endling/endling12.png" },
      { type: "image", src: "img/endling/endling13.png" },
      { type: "image", src: "img/endling/endling14.png" },
      { type: "image", src: "img/endling/endling15.png" },
      { type: "image", src: "img/endling/endling16.png" },
      { type: "image", src: "img/endling/endling17.png" },
      { type: "image", src: "img/endling/endling18.png" },
      { type: "image", src: "img/endling/endling19.png" },
      { type: "video", youtube: "3_0ZcJVAucY" },
      { type: "video", youtube: "oqj__NZXb58" }
    ],
    platforms: ["steam", "epic", "linux", "playstation", "xbox", "switch", "android", "apple"],
    textHtml: `<p><b>Será que uma raposa mãe conseguirá manter seus filhotes vivos?</b>
    
    <p><b>Experimente</b> um mundo devastado pela humanidade pelos olhos da última raposa da Terra nesta aventura ecológica.</p>
    
    <p><b>Descubra</b> a força destrutiva da raça humana, que corrompe, polui e explora os recursos mais preciosos e valiosos do ambiente natural dia após dia.</p>
    
    <p><b>Explore</b> várias áreas de rolagem lateral em 3D e defenda suas pequenas bolas de pelo, alimente-as, veja-as crescer, observe suas personalidades e medos únicos e, o mais importante, ajude-as a sobreviver.</p>
    
    <p>Use a cobertura da noite para guiar furtivamente sua ninhada para um lugar mais seguro. Passe o dia descansando em um abrigo improvisado e planeje seu próximo passo com cuidado, pois pode ser o último para você e seus filhotes.</p>
    
    <p><b>Características:</b></p>
      <ul>
        <li>Explore ambientes devastados com base em problemas atuais reais.</li>
        <li>Cace outros animais para alimentar seus filhotes e evite se tornar uma presa.</li>
        <li>Teste seu instinto de sobrevivência e envolva-se em decisões emocionalmente desgastantes.</li>
        <li>Encontre novos covis para se proteger de ameaças naturais e não naturais.</li>
        <li>Cuide de seus filhotes, alimente-os e ensine-lhes novas habilidades para torná-los menos vulneráveis.</li>
        <li>Sobreviva!</li>
      </ul>`
  },

  "seeds-of-resilience": {
    title: "Seeds of Resilience",
    cover: "img/seeds.jpg",
    media: [
      { type: "video", youtube: "BrLUHKkthdY" },
      { type: "image", src: "img/seeds/seeds1.png" },
      { type: "image", src: "img/seeds/seeds2.png" },
      { type: "image", src: "img/seeds/seeds3.png" },
      { type: "image", src: "img/seeds/seeds4.png" },
      { type: "image", src: "img/seeds/seeds5.png" },
      { type: "image", src: "img/seeds/seeds6.png" },
      { type: "image", src: "img/seeds/seeds7.png" },
      { type: "image", src: "img/seeds/seeds8.png" }
    ],
    platforms: ["steam", "linux", "switch"],
    textHtml: `<p><b>Build a new village from scratch</b></p>
    
    <p>Build a village on a deserted island, and prepare for merciless natural disasters! Learn to choose the right items, understand nature's patterns, use real medieval construction and craft techniques in this turn-based management game.</p>
    
    <p><b>Features</b></p>
      <ul>
        <li>Turn based: Take all the time you need to plan your actions. When you're done, click the end turn button and start a new day.</li>
        <li>Detailed building construction: Choose natural resources according to their properties. Use them to craft the materials needed to assemble a building.</li>
        <li>Realistic medieval construction and craft techniques. Everything could be made in real life the same way.</li>
        <li>Observe the environment response to human activity. Maybe you should avoid fishing everyday at the same spot or cut down the whole forest.</li>
        <li>Survive in a harsh environment where storms and other natural disasters occur way too often.</li>
      </ul>

    <p><b>Harvest, craft, build</b></p>
    
    <p>Build your civilization step-by-step: From stone axes and stick shelters to waterwheel powered mechanized workshops! All with realistic technologies and constructions.</p>
    
    <p><b>Inspired by real medieval techniques</b></p>
    
    <p>We made extensive research about medieval construction and craftsmanship, as well as survival techniques. We simplified and balanced data to fit the game’s needs, while remaining consistent with how things work in real life.</p>
    
    <p>To learn more, read our survival guides illustrated with the work of archaeological designer Francesco Corni.</p>`
  },

  "eco": {
    title: "Eco",
    cover: "img/Eco.jpg",
    media: [
      { type: "video", youtube: "d6zvBdUDMPY" },
      { type: "video", youtube: "b4h39KivbOE" },
      { type: "image", src: "img/eco/eco1.png" },
      { type: "image", src: "img/eco/eco2.png" },
      { type: "image", src: "img/eco/eco3.png" },
      { type: "image", src: "img/eco/eco4.png" },
      { type: "image", src: "img/eco/eco5.png" },
      { type: "image", src: "img/eco/eco6.png" },
      { type: "image", src: "img/eco/eco7.png" },
      { type: "image", src: "img/eco/eco8.png" },
      { type: "image", src: "img/eco/eco9.png" },
      { type: "image", src: "img/eco/eco10.png" },
      { type: "image", src: "img/eco/eco11.png" },
      { type: "image", src: "img/eco/eco12.png" },
      { type: "image", src: "img/eco/eco13.png" },
      { type: "image", src: "img/eco/eco14.png" },
      { type: "image", src: "img/eco/eco15.png" },
      { type: "image", src: "img/eco/eco16.png" },
      { type: "image", src: "img/eco/eco17.png" },
      { type: "image", src: "img/eco/eco18.png" },
      { type: "image", src: "img/eco/eco19.png" },
      { type: "image", src: "img/eco/eco20.png" },
      { type: "image", src: "img/eco/eco21.png" },
      { type: "image", src: "img/eco/eco22.png" },
      { type: "image", src: "img/eco/eco23.png" },
      { type: "image", src: "img/eco/eco24.png" },
      { type: "image", src: "img/eco/eco25.png" },
      { type: "image", src: "img/eco/eco26.png" },
      { type: "image", src: "img/eco/eco27.png" },
      { type: "image", src: "img/eco/eco28.png" },
      { type: "video", youtube: "ud_refZuQoA" }
    ],
    platforms: ["steam", "linux"],
    textHtml: `<p><b>A Tragédia Do Povo, O Jogo</b></p>
    
    <p>Entre no mundo de Eco, um ecossistema totalmente simulado fervilhando com milhares de plantas e animais em crescimento vivendo as suas vidas. Construa, colha e pegue recursos em ambiente em que cada ação sua afeta o mundo ao seu redor. A iminente queda de um meteoro ameaça destruir o mundo. Você é capaz de salvar o mundo sem destruí-lo no processo?</p>
    
    <p>Construa edifícios e cidades, cuide da sua fazenda, cace animais selvagens, construa infraestruturas e transporte, fabrique roupas, construa usinas e pesquise novas tecnologias. Especialize-se em um ofício e troque suas mercadorias com outros jogadores. Desenvolva sua civilização e esculpa o seu planeta.</p>
    
    <p>Com o crescimento da sua civilização, você precisará analisar dados da simulação e avaliar o impacto que você tem no mundo. Use esses dados como evidência nas leis propostas, restringindo atividades prejudiciais sem perturbar o avanço da tecnologia. Equilibre suas necessidades individuais com as necessidades da comunidade, tudo isso enquanto mantém o estado do ecossistema. O futuro do seu mundo está nas suas mãos.</p>
    
    <b>Uma Simulação Detalhada</b>
    <p>Todo organismo em Eco existe como parte de uma simulação detalhada. Uma perturbação em uma espécie pode provocar um efeito cascata em todo o planeta. Corte todas as árvores e os habitats das criaturas serão destruídos. Polua os rios com resíduos de mineração e suas fazendas ficarão envenenadas e morrerão. O ecossistema fornece os recursos que você e sua comunidade precisarão para deter o meteoro. Administre sua poluição, seus resíduos de mineração, sua caça e sua coleta de recursos para equilibrar seu efeito no sistema.</p>
    
    <b>Respaldado Pela Ciência</b>
    <p>Eco é construído com base em uma detalhada simulação ecológica. Todos os dados gerados pela interação de plantas, animais, clima e jogadores pode ser buscada e analizada usando gráficos do jogo e mapas de calor. Use as informações coletadas como evidência científica para as leis propostas. A capacidade de debater com sucesso usando evidências científicas é sua maior arma contra a destruição do seu mundo.</p>
    
    <b>Governo Controlado Pelo Jogador</b>
    <p>Estabeleça e mantenha seu próprio conjunto de leis e seu governo, que são aplicados automaticamente pelo jogo. Crie uma proposta para limitar a abertura de clareiras em uma floresta protegida e incentivar soluções de energia limpa em vez de combustíveis fósseis através da criação de subsídios fiscais e multas. Participe em eleições pela liderança mundial, permitindo que você defina taxas e aloque os fundos comunitários. Use um sistema de leis programáveis para criar regras dinâmicas e flexíveis para a comunidade, aprovando-as por voto. Forme uma grande variedade de governos: desde estados rigidamente controlados por ditadores até programas de subsídio por receitas e despesas ou comunidades sem lei com base na confiança.</p>
    
    <b>Aprenda E Especialize-se</b>
    <p>Suas habilidades aumentam com base na sua comida e abrigos. Consumindo comidas variadas e altamente nutritivas e construindo uma casa elaborada, você vai rapidamente aumentar seus pontos de habilidade. Pontos de habilidade podem ser gastos em habilidades como agricultura, caça, comércio, engenharia, pesquisa e mais. Contribua para o bem maior e aumente seu próprio sucesso pessoal.</p>
    
    <b>Uma Economia Impulsionada Pela Comunidade</b>
    <p>Na economia administrada pelo jogador, você conquista mais quando se especializa e negocia mercadorias e serviços. Crie armazéns para comprar e vender mercadorias que você precisa em momentos diferentes dos outros jogadores. Assine contratos dentro do mercado de trabalho em formato de aventura do jogo, solicitando que outros jogadores executem trabalhos especializados para você em troca de pagamento. Construa complexas máquinas de produção e cobre uma taxa para os jogadores usá-las. Uma economia vibrante em Eco pode ser tanto uma poderosa ferramenta para o progresso quanto uma perigosa ameaça para o meio-ambiente.</p>
    <p>Para engraxar as engrenagens do comércio, você pode criar suas próprias moedas, apoiadas por decreto ou com lastro em recursos. Administre o valor da sua moeda em relação às outras definindo taxas cambiais em conversões de moedas fora de sincronia. Venda itens nas lojas e colete créditos de outros jogadores. Eco é projetado para ser jogado fora de sincronia, permitindo que muitos jogadores de muitas modalidades contribuam para os objetivos do outro em momentos diferentes ou simultaneamente.</p>
    
    <b>Um Mundo Com Consequências</b>
    <p>Todos os recursos originais do mundo se originam do seu meio-ambiente, que é afetado pelas suas ações. Enquanto um meteoro paira sobre a sua cabeça — pronto para atingir o planeta em 30 dias — uma ameaça mais sutil que surge a partir da interação do jogador com o meio-ambiente. Sem a devida cautela, a destruição ecológica pode pode acabar com a civilização antes até da colisão com o meteoro. Para ter sucesso definitivo, você e sua comunidade precisarão usar as ferramentas do governo e da economia para encontrar um equilíbrio entre progresso e proteção.</p>
    
    <p><b>Recursos Inclusos</b></p>
      <ul>
        <li>Multijogador on-line — Colabore em rede com uma comunidade de jogadores.</li>
        <li>Jogo individual local — Construa seu próprio mundo, com a opção de convidar amigos.</li>
        <li>Servidor dedicado incluído — Seja host dos seus próprios mundos de Eco.</li>
        <li>Mais de 30 plataformas de construção diferentes, com centenas de receitas.</li>
        <li>Centenas de itens, habilidades, plataformas de construção e blocos de edifícios.</li>
        <li>Um ecossistema simulado com dezenas de espécies únicas.</li>
        <li>Com uma capacidade de transporte limitada, os jogadores devem criar veículos e redes de estradas para transportar materiais.</li>
        <li>Crie suas próprias moedas por decreto ou por lastro, usando-as como meio de troca na economia.</li>
        <li>Construa lojas onde você pode vender seus itens em excesso para lucrar.</li>
        <li>Coma comidas variadas e nutritivas e construa casas ainda maiores para aumentar suas habilidades.</li>
        <li>Crie contratos para trabalhos que você gostaria que jogadores com diferentes habilidades e especialidades realizem para você. Receba contratos de outros jogadoes que precisam das habilidades que você possui.</li>
        <li>Crie leis usando um sistema de modelo programável para proteger seu mundo ou aumentar seus lucros, validadas pelo jogo se aplicadas pela população.</li>
        <li>Seja candidato na eleição e tome decisões que afetam o globo.</li>
        <li>Veja e compile dados abundantes da simulação e use-os para defender decisões do grupo.</li>
        <li>Reivindique terras como sua propriedade e compartilhe os direitos de acesso.</li>
        <li>Conceda e remova reputação de outros jogadores.</li>
        <li>Encontre um equilíbrio entre progresso e proteção, entre necessidades individuais e as do grupo, ter sucesso ou fracassar juntos.</li>
      </ul>`
  },

  "fate-of-the-world": {
    title: "Fate of the World",
    cover: "img/fate-of-the-world.jpg",
    media: [
      { type: "video", youtube: "pDU-g947NJk" },
      { type: "image", src: "img/fotw/fate1.png" },
      { type: "image", src: "img/fotw/fate2.png" },
      { type: "image", src: "img/fotw/fate3.png" },
      { type: "image", src: "img/fotw/fate4.png" },
      { type: "image", src: "img/fotw/fate5.png" },
      { type: "image", src: "img/fotw/fate6.png" },
      { type: "image", src: "img/fotw/fate7.png" },
      { type: "image", src: "img/fotw/fate8.png" },
      { type: "image", src: "img/fotw/fate9.png" },
      { type: "image", src: "img/fotw/fate10.png" }
    ],
    platforms: ["steam", "linux", "apple"],
    textHtml: `<p>Fate of the World is a dramatic global strategy game that puts all our futures in your hands. The game features a dramatic set of scenarios based on the latest science covering the next two centuries. You must manage a balancing act of protecting the Earth's resources and climate versus the needs of an ever-growing world population, who are demanding ever more food, power, and living space. Will you help the whole planet or will you be an agent of destruction?</p>
    
    <p>Fate of the World is brought to you by the award-winning Red Redemption games team and Battlestations: Midway Producer Klaude Thomas with climate science by Dr. Myles Allen (University of Oxford), writing by David Bishop (Dr. Who, 2000AD) and music composed by Richard Jacques (<b>Mass Effect, Alice in Wonderland) with game design by veteran game designer Matthew Miles Griffiths (Conflict: Desert Storm, Battlestations: Midway).</p>
    
    <p>Fate of the World has been nominated for the 2011 Index: Design Awards and as a Top 10 Social Impact Games of 2010-11 by Games for Change</p>
    
    <p><b>Key Features:</b></p>
      <ul>
        <li>Covers 2020 to 2200 - Two centuries years of possible futures</li>
        <li>12 regions - China, Europe, India, Japan, Latin America, Middle East, North America, Northern Africa, Oceania, Russia, South Asia, Southern Africa</li>
        <li>Scientific Model - by Dr Myles Allen of Oxford University</li>
        <li>Detailed real-world data - gathered over years of research</li>
        <li>Over 100 major policies - including geoengineering, technological research, international aid, diplomacy, economics, emergency defences, species protection, forestry, health, energy choices, population, politics, and clandestine operations</li>
        <li>More than 1,000 impacts - including storms, floods, heatwaves, flash fires, desertification, glacial melt, sea level rise, resource wars, drought, famine, dissidence, extinctions, epidemics, technological break-throughs, energy shortages, and political backlash</li>
        <li>50 signature animal species to save - against the backdrop of enormous biodiversity loss</li>
        <li>40 specific future technologies to develop - including nuclear fusion, biofuels, nanotech, robots, AI, smart grids, advanced medicine, synthetic food, and space exploration</li>
        <li>6 'tipping points' - world-changing events such as the Amazon collapse and the Antarctic ice shelf collapse</li>
        <li>3D Earth globe - showing climate related changes with Earth 'telemetry' - visually graphing past and future change</li>
        <li>Earth overlays - revealing local temperature change, devastation, and population</li>
      </ul>`
  },
  
  "flower": {
    title: "Flower",
    cover: "img/flower.jpg",
    media: [
      { type: "video", youtube: "0IS9sGGuvYo" },
      { type: "image", src: "img/flower/flower1.png" },
      { type: "image", src: "img/flower/flower2.png" },
      { type: "image", src: "img/flower/flower3.png" },
      { type: "image", src: "img/flower/flower4.png" },
      { type: "image", src: "img/flower/flower5.png" },
      { type: "image", src: "img/flower/flower6.png" },
      { type: "image", src: "img/flower/flower7.png" }
    ],
    platforms: ["steam", "linux"],
    textHtml: `<p>Experimente o premiado Flower, agora disponível para PC. Flower permite que você assuma o controle do vento enquanto explora ambientes lindos e exuberantes usando controles de movimento. Aventure-se por várias paisagens no seu próprio ritmo, interagindo e alterando o ambiente e encontre o equilíbrio e a harmonia de seus arredores.</p>
    
    <p>Essa é uma fuga interativa que vai levar você em uma jornada cativante como nenhum outro jogo.</p>
    
    <p><b>Principais recursos:</b></p>
    <ul>
        <li>Controles de interação simples: controlar o jogo é simples, bastando guiar o vendo na direção que deseja ir.</li>
        <li>Ambientes exuberantes e interativos: campos gramados vastos, soprados pela brisa, criam um ambiente imersivo exuberante.</li>
        <li>Imersivo e cativante: acessível tanto para jogadores como não jogadores, o jogo leva os jogadores em uma experiência pessoal e cativante incrível.</li>
    </ul>`
  }
};

// ---------- helpers ----------
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// ---------- main ----------
const id = getQueryParam("id");
const game = GAMES[id];

if (!game) {
  document.title = "EcoPlay Critics - Jogo não encontrado";
  const text = document.getElementById("gameText");
  if (text) text.innerHTML = "<p>Jogo não encontrado.</p>";
} else {
  document.title = `EcoPlay Critics - ${game.title}`;

  // Capa
  const coverImg = document.getElementById("coverImg");
  if (coverImg) coverImg.src = game.cover;

  // Plataformas
  const platformsWrap = document.getElementById("platforms");
  if (platformsWrap) {
    platformsWrap.innerHTML = "";
    (game.platforms || []).forEach((p) => {
      const div = document.createElement("div");
      div.className = "platform";
      const icon = PLATFORM_ICONS[p];

      // se não achar ícone, mostra texto
      div.innerHTML = icon
        ? `<img src="${icon}" alt="${p}">`
        : `<span style="font-family: Arial, sans-serif; font-size: 12px;">${p}</span>`;

      platformsWrap.appendChild(div);
    });
  }

  // Texto
  const gameText = document.getElementById("gameText");
  if (gameText) gameText.innerHTML = game.textHtml || "<p>Sem descrição.</p>";

  // ---------- GALERIA (imagem + vídeo) ----------
  const mediaFrame = document.getElementById("mediaFrame");
  const prevBtn = document.getElementById("prevBanner");
  const nextBtn = document.getElementById("nextBanner");

  // compatibilidade: se ainda existir game.banners antigo, converte para imagens
  const mediaList =
    game.media ??
    (game.banners ? game.banners.map((src) => ({ type: "image", src })) : []);

  let mediaIndex = 0;

  function renderMedia(item) {
    if (!mediaFrame) return;
    mediaFrame.innerHTML = "";

    if (!item) {
      mediaFrame.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Arial,sans-serif;">Sem mídia</div>`;
      return;
    }

    // IMAGEM
    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "Mídia do jogo";
      mediaFrame.appendChild(img);
      return;
    }

    // VÍDEO YOUTUBE (ID)
    if (item.type === "video" && item.youtube) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${item.youtube}`;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      mediaFrame.appendChild(iframe);
      return;
    }

    // VÍDEO LOCAL (mp4/webm)
    if (item.type === "video" && item.src) {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.playsInline = true;
      mediaFrame.appendChild(video);
      return;
    }

    // fallback
    mediaFrame.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Arial,sans-serif;">Mídia inválida</div>`;
  }

  // render inicial
  renderMedia(mediaList[0]);

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (mediaList.length === 0) return;
      mediaIndex = (mediaIndex - 1 + mediaList.length) % mediaList.length;
      renderMedia(mediaList[mediaIndex]);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (mediaList.length === 0) return;
      mediaIndex = (mediaIndex + 1) % mediaList.length;
      renderMedia(mediaList[mediaIndex]);
    });
  }
}
