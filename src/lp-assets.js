const local = '/assets/panorama/'
const cloudflare = 'https://pub-4d8c6aa6a7554bbca9c84f3e351de5f0.r2.dev/assets-lp/'
const pages = [1, 2, 3, 4, 5, 6].map(n => `${local}carrossel-0${n}.webp`)

export const lpAssets = {
  heroMockup: `${local}panorama-das-escrituras-capa.png`, diagnosticsMainImage: pages[2], diagnosticsCarouselImages: pages, urgencyCarouselImages: pages,
  checklistIcons: { printer: `${cloudflare}impressora.webp`, organization: `${cloudflare}icone%20organiza%C3%A7%C3%A3o.webp`, checklistPaper: `${cloudflare}icone%20papel%20checklist.webp`, calendar: `${cloudflare}icone%20calendario.webp` },
  packageMockup: pages[0], bonusImages: [pages[1], pages[2], pages[3]], planBasicMockup: pages[0], planCompleteMockup: pages[1],
  paymentIcons: `${cloudflare}icons-meio-de-pagamento-e1738718378460-2-1.webp`,
}
