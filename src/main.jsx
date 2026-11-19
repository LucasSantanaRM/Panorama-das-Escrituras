import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BookOpen, Check, ChevronDown, Download, Mail, ShieldCheck, ShoppingCart } from 'lucide-react'
import { lpAssets } from './lp-assets'
import './styles.css'

const CHECKOUTS = {
  essencial: 'https://checkout.lincelabs.online/c/iddxwej?offer=imnneyglk2',
  completa: 'https://checkout.lincelabs.online/c/iddxwej',
}
const PRODUCTS = {
  essencial: { name: 'Panorama das Escrituras — Plano Essencial', id: 'panorama_essencial', price: 5.90 },
  completa: { name: 'Panorama das Escrituras — Coleção Completa', id: 'panorama_completa', price: 13.90 },
}
function waitForAdTrack(timeoutMs = 2500) {
  if (window.adtrack) return Promise.resolve(window.adtrack)
  return new Promise((resolve) => {
    let done = false
    const timer = setTimeout(() => {
      if (done) return
      done = true
      resolve(window.adtrack || null)
    }, timeoutMs)
    window.addEventListener('adtrack:ready', () => {
      if (done) return
      done = true
      clearTimeout(timer)
      resolve(window.adtrack || null)
    }, { once: true })
  })
}

async function goToCheckout(event, checkoutKey) {
  event.preventDefault()
  const product = PRODUCTS[checkoutKey]
  const adtrack = await waitForAdTrack()
  if (!adtrack) {
    console.error('AdTrack nao carregou. Nao redirecione sem tracking. Corrija os scripts, CSP e VITE_API_URL antes de publicar.')
    return
  }

  const checkoutData = { product_name: product.name, product_id: product.id }
  const decoratedUrl = adtrack.decorateCheckoutUrl(CHECKOUTS[checkoutKey])
  try {
    await adtrack.saveCheckoutClick(product.name, product.id, checkoutData)
  } catch (error) {
    console.warn('AdTrack checkout click falhou, redirecionando mesmo assim', error)
  }
  adtrack.trackInitiateCheckout(product.price, 'BRL', 1, checkoutData)
  window.location.href = decoratedUrl
}

const Cta = ({ children, href = '#oferta', className = '', checkoutKey }) => {
  const product = PRODUCTS[checkoutKey]
  if (product) {
    return <button type="button" className={`cta ${className}`} onClick={(event) => goToCheckout(event, checkoutKey)} data-product-name={product.name} data-product-id={product.id}>{children}</button>
  }
  return <a className={`cta ${className}`} href={href}>{children}</a>
}
function CheckLine({ children, dark = false }) { return <li className={`check-line ${dark ? 'check-line-dark' : ''}`}><Check size={17} strokeWidth={3.2} /><span>{children}</span></li> }

const benefits = [
  ['01', 'Entenda melhor o contexto', 'Consulte mapas, cronologias e informações históricas que ajudam a situar a leitura bíblica.'],
  ['02', 'Conecte os acontecimentos', 'Visualize relações entre personagens, períodos, lugares e livros das Escrituras.'],
  ['03', 'Revise com facilidade', 'Encontre informações organizadas para retomar um tema sem refazer toda a pesquisa.'],
  ['04', 'Apoie o ensino bíblico', 'Use os recursos como referência na preparação de aulas de EBD, estudos em grupo e encontros familiares.'],
  ['05', 'Estude no seu ritmo', 'Tenha os materiais disponíveis para consultar no celular ou no computador.'],
]
const resources = ['Mapas e localizações bíblicas — acompanhe os lugares relacionados aos relatos.', 'Linhas do tempo — visualize a sequência dos principais acontecimentos.', 'Resumos visuais dos livros — consulte os temas e a organização dos textos.', 'Personagens e conexões — identifique figuras importantes e suas relações.', 'Contexto histórico — encontre referências para compreender melhor os períodos bíblicos.', 'Esquemas e quadros de revisão — retome informações durante o estudo ou a preparação de aulas.']
const faqs = [
  ['O Panorama das Escrituras substitui a Bíblia?', 'Não. É um material complementar, criado para apoiar a leitura, a revisão e o estudo das Escrituras.'],
  ['Preciso ter conhecimento avançado para usar?', 'Não. Os recursos visuais foram pensados para facilitar a consulta tanto de quem está começando quanto de quem já estuda e ensina.'],
  ['O material é físico?', 'Não. Os materiais são digitais.'],
  ['Posso acessar pelo celular?', 'Sim. O material digital pode ser consultado em dispositivos compatíveis, como celular ou computador.'],
  ['Posso usar na preparação de aulas de EBD?', 'Sim. A coleção pode servir como material de referência para você preparar seus estudos e aulas. A reprodução ou distribuição dos arquivos deve respeitar as condições da licença de uso.'],
  ['Qual a diferença entre o Essencial e a Coleção Completa?', 'O Essencial (R$ 5,90) inclui os 150 recursos visuais. A Coleção Completa (R$ 13,90) inclui os 150 recursos visuais mais os materiais “100 Perguntas Difíceis”, “Plano Cronológico em 365 Dias” e “100 Personagens Bíblicos”.'],
  ['Existe mensalidade?', 'Não. Os dois planos têm pagamento único.'],
  ['Quando recebo os materiais?', 'Após a confirmação do pagamento, conforme as orientações enviadas pela plataforma de compra.'],
  ['Posso imprimir?', '[CONFIRMAR] Se os arquivos forem fornecidos em PDF e a licença permitir impressão para uso pessoal, inserir essa informação na versão final.'],
  ['Existe garantia?', '[CONFIRMAR] Informar aqui o prazo de garantia efetivamente oferecido e as condições aplicáveis ao seu checkout.'],
]

function Hero() { return <section className="hero"><div className="urgency"><span>●</span> Essa oferta só é garantida agora <Cta checkoutKey="completa">Comprar agora</Cta></div><div className="hero-inner"><p className="eyebrow">ESTUDO BÍBLICO VISUAL • ACESSO DIGITAL</p><h1>Panorama das Escrituras</h1><h2 className="hero-headline">A Bíblia é uma só. Veja como seus livros, personagens e acontecimentos se conectam.</h2><p className="hero-lead">Explore as Escrituras com <strong>150 recursos visuais</strong>, reunindo mapas, resumos, linhas do tempo e esquemas para compreender o contexto bíblico e tornar seus momentos de estudo mais organizados.</p><div className="hero-product"><img src={lpAssets.heroMockup} alt="Capa do Panorama das Escrituras" /></div><div className="hero-copy"><p>Do Gênesis ao Apocalipse, tenha um material de consulta para acompanhar os acontecimentos, reconhecer as conexões entre os textos e preparar estudos com mais clareza.</p><ul className="hero-feature-list"><CheckLine dark>150 resumos e recursos visuais da Bíblia</CheckLine><CheckLine dark>Mapas, cronologias, personagens e contextos históricos</CheckLine><CheckLine dark>Para leitura pessoal, revisão e preparação de aulas</CheckLine><CheckLine dark>Pagamento único e acesso digital</CheckLine></ul><Cta checkoutKey="completa">CONHECER A COLEÇÃO</Cta><div className="hero-instant"><Mail size={15} /> A partir de R$ 5,90, sem mensalidade.</div></div></div></section> }

function Identification() { return <section className="intro section-dark"><div className="container two-col"><div><h2>Ler a Bíblia é importante. Entender seu contexto faz diferença.</h2><p>Uma passagem pode mencionar povos, lugares e acontecimentos que se relacionam com diversos outros textos. Sem uma visão organizada, é natural precisar interromper a leitura para procurar mapas, datas e explicações em diferentes fontes.</p><p>O <strong>Panorama das Escrituras</strong> reúne esses elementos em um só material visual, pensado para apoiar quem deseja estudar com atenção e consultar informações sem começar cada pesquisa do zero.</p></div><div className="intro-card"><ul><CheckLine dark>Quer saber onde os acontecimentos ocorreram e como os lugares se relacionam.</CheckLine><CheckLine dark>Deseja acompanhar a sequência histórica dos principais fatos bíblicos.</CheckLine><CheckLine dark>Precisa revisar livros, períodos e personagens sem se perder em anotações espalhadas.</CheckLine><CheckLine dark>Prepara aulas, encontros ou estudos e valoriza materiais de referência bem organizados.</CheckLine></ul><p>Você não precisa decorar tudo. Precisa ter boas referências ao seu alcance.</p></div></div></section> }

function Solution() { return <section className="preview beige"><div className="container center"><p className="section-kicker">APRESENTAÇÃO DA SOLUÇÃO</p><h2>Uma visão mais organizada das Escrituras, em 150 recursos visuais</h2><p className="section-intro">O <strong>Panorama das Escrituras</strong> é uma coleção digital feita para facilitar a consulta e a revisão de informações bíblicas por meio de recursos visuais.</p><img className="phone-preview" src={lpAssets.diagnosticsMainImage} alt="Página real do Panorama das Escrituras" /></div><div className="carousel-strip">{lpAssets.diagnosticsCarouselImages.map((src, i) => <figure key={src}><img src={src} alt={`Exemplo real do material ${i + 1}`} /><figcaption>{['Mapas bíblicos','Organização da Bíblia','Resumo visual','Linha de raciocínio','Contexto e personagens','Revisão das Escrituras'][i]}</figcaption></figure>)}</div><div className="container resource-list"><h3>O que você encontra no material principal:</h3>{resources.map(t => <CheckLine key={t}>{t}</CheckLine>)}<Cta>VER O QUE ESTÁ INCLUÍDO</Cta></div></section> }

function Benefits() { return <section className="benefits"><div className="container"><h2>Um material para abrir sempre que surgir uma dúvida ou uma nova preparação</h2><div className="benefit-grid">{benefits.map(([n, title, body]) => <article className="benefit-card" key={title}><span className="benefit-number">{n}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div><p className="benefit-close">Mais do que uma coleção de páginas, você recebe um <strong>acervo de apoio para estudar com continuidade.</strong></p></div></section> }

function Receive() { return <section className="receive beige"><div className="container"><h2>Conheça os materiais do Panorama das Escrituras</h2><div className="receive-panel"><div className="green-pill">MATERIAL PRINCIPAL — DISPONÍVEL NOS DOIS PLANOS</div><h3>Panorama das Escrituras: 150 Recursos Visuais</h3><p>Mapas, resumos, linhas do tempo, esquemas e referências organizadas para acompanhar a leitura bíblica, revisar conteúdos e preparar estudos.</p><img src={lpAssets.packageMockup} alt="Panorama das Escrituras: 150 Recursos Visuais" /><p><strong>Incluído no Plano Essencial e na Coleção Completa.</strong></p></div><div className="bonus-title"><h2>MATERIAIS ADICIONAIS — EXCLUSIVOS DA COLEÇÃO COMPLETA</h2></div><div className="bonus-grid"><Bonus i={0} title="100 Perguntas Difíceis da Bíblia Respondidas" text="Uma coleção de perguntas e respostas objetivas para consultar questões recorrentes da leitura e do estudo das Escrituras." /><Bonus i={1} title="Plano Cronológico da Bíblia em 365 Dias" text="Um roteiro de leitura para acompanhar a narrativa bíblica em sequência cronológica ao longo do ano." /><Bonus i={2} title="100 Personagens Bíblicos Explicados" text="Um material de consulta com informações sobre personagens bíblicos, suas histórias e suas relações com os acontecimentos registrados nas Escrituras." /></div><p className="transition-copy">Escolha apenas os 150 recursos visuais ou leve a coleção inteira para ampliar sua biblioteca de estudos.</p></div></section> }
function Bonus({ i, title, text }) { return <article className="bonus-card"><div className="bonus-image"><img src={lpAssets.bonusImages[i]} alt={title} /></div><h3>🎁 {title}</h3><p>{text}</p></article> }

function Audience() { return <section className="audience"><div className="container"><h2>O Panorama das Escrituras é para quem deseja estudar com mais contexto</h2><div className="audience-grid">{[['Leitores da Bíblia','que querem compreender melhor os cenários e a sequência dos relatos.'],['Professores de Escola Bíblica Dominical','que procuram mapas, esquemas e cronologias para apoiar suas aulas.'],['Líderes e responsáveis por estudos','que precisam revisar assuntos e organizar referências.'],['Famílias cristãs','que desejam explorar personagens e acontecimentos juntos.'],['Estudantes das Escrituras','iniciantes ou experientes, que valorizam materiais visuais de consulta.']].map(([a,b]) => <div key={a}><Check size={18}/><p><strong>{a}:</strong> {b}</p></div>)}</div><p className="positioning-note">O conteúdo é apresentado como material de apoio ao estudo bíblico, não como substituto da leitura da Bíblia, de uma boa interpretação do texto ou de orientação pastoral.</p></div></section> }

function Plan({ title, subtitle, items, price, img, cta, checkoutKey, featured }) { return <article className={`plan ${featured ? 'plan-featured' : ''}`}>{featured && <div className="best">COLEÇÃO COMPLETA</div>}<h3>{title}</h3><p className="plan-subtitle">{subtitle}</p><img src={img} alt={title} /><ul>{items.map(item => <CheckLine dark={featured} key={item}>{item}</CheckLine>)}</ul><div className="price">{price}</div><p className="one-time">pagamento único</p><Cta checkoutKey={checkoutKey}>{cta}</Cta><p className="plan-micro">{featured ? 'Todos os materiais em uma única compra.' : 'Acesso ao material principal, sem mensalidade.'}</p></article> }
function Pricing() { return <section id="oferta" className="pricing"><div className="container"><h2>Escolha como deseja começar</h2><div className="price-grid"><Plan title="PLANO ESSENCIAL — R$ 5,90" subtitle="Para quem deseja começar pelos recursos visuais." items={['Panorama das Escrituras — 150 Recursos Visuais','Acesso digital ao material principal','Pagamento único','Não inclui os 3 materiais adicionais da Coleção Completa.']} price="R$ 5,90" img={lpAssets.planBasicMockup} cta="QUERO O PLANO ESSENCIAL" checkoutKey="essencial" /><Plan title="COLEÇÃO COMPLETA — R$ 13,90" subtitle="Para quem quer uma biblioteca de consulta mais abrangente." items={['Panorama das Escrituras — 150 Recursos Visuais','100 Perguntas Difíceis da Bíblia Respondidas','Plano Cronológico da Bíblia em 365 Dias','100 Personagens Bíblicos Explicados','Acesso digital aos 4 materiais','Pagamento único']} price="R$ 13,90" img={lpAssets.planCompleteMockup} cta="QUERO A COLEÇÃO COMPLETA" checkoutKey="completa" featured /></div><div className="price-note">Por <strong>R$ 8,00 a mais</strong> que o Essencial, você adiciona os três materiais complementares à sua coleção.</div><div className="payment-card"><h3>Pagamento único • Material digital • Sem mensalidade</h3><img className="payment-icons" src={lpAssets.paymentIcons} alt="Meios de pagamento" /></div></div></section> }

function Decision() { return <section className="decision section-dark"><div className="container center"><h2>Para ler, estudar, revisar e preparar: uma coleção sempre à mão</h2><p>O valor de um bom material de referência está em poder consultá-lo mais de uma vez. Hoje você pode precisar localizar um acontecimento; amanhã, revisar uma linha do tempo ou preparar uma explicação para uma aula.</p><p>Com o <strong>Panorama das Escrituras</strong>, você organiza essas consultas em um mesmo lugar, com materiais que podem acompanhar seus estudos por muito tempo.</p><Cta>ESCOLHER MEU PLANO</Cta></div></section> }
function Access() { return <section className="access beige"><div className="container"><h2>Compra digital, pagamento único e acesso simples</h2><div className="steps"><Step icon={<ShoppingCart />} title="Escolha seu plano" text="Essencial, com os 150 recursos visuais, ou Coleção Completa, com os três materiais adicionais." /><Step icon={<Check />} title="Finalize o pagamento" text="Faça sua compra pelo checkout seguro utilizado na página." /><Step icon={<Mail />} title="Receba as orientações de acesso" text="Após a confirmação do pagamento, você receberá as instruções para acessar o conteúdo digital." /></div><div className="guarantee-box"><ShieldCheck size={38}/><div><strong>[VALIDAR ANTES DE PUBLICAR]</strong><p>A página utilizada como referência anuncia 30 dias de garantia. Exiba “Garantia de 30 dias” apenas se você realmente oferecer esse prazo e tiver a política correspondente configurada.</p></div></div><Faq /></div></section> }
function Step({ icon, title, text }) { return <article className="step"><div className="step-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article> }
function Faq() { const [open, setOpen] = useState(null); return <div className="faq"><h2>Dúvidas frequentes</h2>{faqs.map(([q,a],i) => <div className="faq-item" key={q}><button onClick={() => setOpen(open === i ? null : i)}>{q}<ChevronDown className={open === i ? 'rotate' : ''} size={20}/></button>{open === i && <p>{a}</p>}</div>)}</div> }
function FinalCta() { return <section className="final-cta"><div className="container center"><h2>Estude as Escrituras com referências mais organizadas</h2><p>Tenha mapas, linhas do tempo, resumos e esquemas visuais à disposição para acompanhar a leitura bíblica e preparar seus estudos.</p><div className="final-plans"><p><strong>Plano Essencial:</strong> 150 recursos visuais — R$ 5,90.</p><p><strong>Coleção Completa:</strong> os 150 recursos visuais + 3 materiais adicionais — R$ 13,90.</p></div><Cta checkoutKey="completa">QUERO A COLEÇÃO COMPLETA</Cta><Cta checkoutKey="essencial" className="secondary">PREFIRO O PLANO ESSENCIAL</Cta><small>Pagamento único • Material digital • Sem mensalidade</small></div></section> }
function Footer() { return <footer><strong>Panorama das Escrituras</strong><p>Material digital de apoio ao estudo bíblico.</p><p>© 2026. Todos os direitos reservados.</p><p>Termos de uso · Política de privacidade · Contato / Suporte</p></footer> }
function Home() { return <main><Hero/><Identification/><Solution/><Benefits/><Receive/><Audience/><Pricing/><Decision/><Access/><FinalCta/><Footer/></main> }
function App() { return <BrowserRouter><Routes><Route path="*" element={<Home/>}/></Routes></BrowserRouter> }
createRoot(document.getElementById('root')).render(<App/>)
