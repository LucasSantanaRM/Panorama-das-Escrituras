# Slots de assets da LP

Edite os links em `src/lp-assets.js`. A skill deve preservar esses nomes de slots e substituir somente os valores das URLs.

## Regras de formato

- `heroMockup`: imagem quadrada, preferencialmente 1200x1200, fundo transparente ou no mesmo azul do hero.
- `diagnosticsMainImage`: imagem vertical, preferencialmente 1200x1500, usada na seção "VEJA COMO SÃO OS DIAGNÓSTICOS QUE VOCÊ VAI RECEBER".
- `diagnosticsCarouselImages`: imagens verticais, preferencialmente 900x1350, uma página/entregável por imagem.
- `urgencyCarouselImages`: imagens verticais, preferencialmente 900x1350, uma página/entregável por imagem.
- `packageMockup`: imagem quadrada, preferencialmente 1200x1200.
- `bonusImages`: imagens quadradas, preferencialmente 700x700 ou 1200x1200. A capa deve estar inteira dentro da arte, com margem de segurança. O template usa `object-fit: contain` para exibir a imagem completa.
- `planBasicMockup` e `planCompleteMockup`: imagens quadradas, preferencialmente 1200x1200.
- `paymentIcons`: imagem horizontal dos meios de pagamento.
- `guaranteeSeal`: selo quadrado ou circular.
- `accessSteps`: quatro ícones/ilustrações para "Conclua sua compra", "Entre na área de membros", "Baixe os arquivos" e "Use no atendimento".

## Comportamento esperado da skill

Ao clonar esta LP, a skill deve perguntar pelos links dos principais assets. Para `bonusImages`, se o usuário não tiver as capas prontas, a skill pode oferecer gerar imagens quadradas em 700x700, exibir o resultado e só então preencher os links quando o usuário subir os arquivos no CDN.
