import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'assets', 'product')

mkdirSync(outDir, { recursive: true })

const navy = '#08243b'
const navy2 = '#041525'
const cyan = '#17d7ff'
const blue = '#1b7cff'
const orange = '#ff8a1f'
const yellow = '#ffd35f'
const green = '#12ad58'
const cream = '#f8f3e7'
const paper = '#ffffff'
const ink = '#09243d'
const muted = '#7c92a3'

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function textLines(lines, x, y, size, fill = paper, weight = 900, anchor = 'middle', gap = size * 1.15) {
  return lines
    .map((line, index) => `<text x="${x}" y="${y + index * gap}" text-anchor="${anchor}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(line)}</text>`)
    .join('\n')
}

function badge(x, y, w, h, label, fill = orange, color = paper, size = 22) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>
${textLines([label], x + w / 2, y + h / 2 + size * 0.36, size, color)}`
}

function device(x, y, w, h, title, subtitle, accent = cyan) {
  return `<g filter="url(#softShadow)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="#0d314f" stroke="${accent}" stroke-width="5"/>
    <rect x="${x + 24}" y="${y + 28}" width="${w - 48}" height="${h - 70}" rx="20" fill="#f7fbff"/>
    <rect x="${x + 24}" y="${y + 28}" width="${w - 48}" height="78" rx="20" fill="${navy}"/>
    ${textLines([title], x + w / 2, y + 78, 24, paper)}
    ${textLines([subtitle], x + w / 2, y + 137, 15, orange, 800)}
    <path d="M${x + 58} ${y + 190}h${w - 116}M${x + 58} ${y + 250}h${w - 160}M${x + 58} ${y + 310}h${w - 128}" stroke="${ink}" stroke-width="14" stroke-linecap="round"/>
    <g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round">
      <path d="M${x + 80} ${y + 410}h${w - 160}"/>
      <path d="M${x + 80} ${y + 470}h${w - 230}"/>
      <path d="M${x + 80} ${y + 530}h${w - 190}"/>
    </g>
    <circle cx="${x + w / 2}" cy="${y + h - 28}" r="12" fill="${muted}"/>
  </g>`
}

function miniPage(x, y, w, h, title, lines = [], accent = cyan, rotate = 0) {
  const cx = x + w / 2
  const cy = y + h / 2
  const lineSvg = lines
    .map((line, index) => `<path d="M${x + 34} ${y + 150 + index * 52}h${line}" stroke="${index % 2 ? muted : ink}" stroke-width="14" stroke-linecap="round" opacity="${index % 2 ? '.75' : '.95'}"/>`)
    .join('\n')
  return `<g transform="rotate(${rotate} ${cx} ${cy})" filter="url(#softShadow)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${paper}" stroke="#d6e3eb" stroke-width="4"/>
    <rect x="${x}" y="${y}" width="${w}" height="94" rx="18" fill="${navy}"/>
    ${textLines([title], cx, y + 59, 20, paper)}
    ${lineSvg}
    <g fill="${accent}" opacity=".96">
      <circle cx="${x + 58}" cy="${y + h - 80}" r="18"/>
      <circle cx="${x + 116}" cy="${y + h - 80}" r="18"/>
      <circle cx="${x + 174}" cy="${y + h - 80}" r="18"/>
    </g>
  </g>`
}

function cover(x, y, w, h, titleLines, kicker, icon, accent = cyan, rotate = 0) {
  const cx = x + w / 2
  const cy = y + h / 2
  const titleSize = Math.min(33, Math.max(18, w / 8.8))
  const titleGap = titleSize * 1.16
  return `<g transform="rotate(${rotate} ${cx} ${cy})" filter="url(#softShadow)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="${navy2}" stroke="${accent}" stroke-width="5"/>
    <path d="M${x + 22} ${y + 94}h${w - 44}M${x + 22} ${y + h - 90}h${w - 44}" stroke="${accent}" stroke-width="3" opacity=".45"/>
    <circle cx="${x + w - 70}" cy="${y + 82}" r="42" fill="${orange}" opacity=".18"/>
    ${textLines([kicker], cx, y + 75, 18, yellow, 900)}
    ${textLines(titleLines, cx, y + h * 0.31, titleSize, paper, 900, 'middle', titleGap)}
    ${icon}
    ${badge(x + 54, y + h - 70, w - 108, 42, 'LISTO PARA USAR', green, paper, Math.min(18, Math.max(12, w / 15)))}
  </g>`
}

const defs = `<defs>
  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
    <feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="#000000" flood-opacity=".32"/>
  </filter>
  <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
    <stop stop-color="#08243b"/>
    <stop offset="1" stop-color="#03111f"/>
  </linearGradient>
  <linearGradient id="cold" x1="0" x2="1" y1="0" y2="1">
    <stop stop-color="#17d7ff"/>
    <stop offset="1" stop-color="#1b7cff"/>
  </linearGradient>
</defs>`

function svg(width, height, body, bg = `url(#bg)`) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${defs}
<rect width="${width}" height="${height}" rx="${width === height ? 54 : 34}" fill="${bg}"/>
${body}
</svg>
`
}

function fridgeIcon(cx, cy, scale = 1, accent = cyan) {
  const x = cx - 70 * scale
  const y = cy - 125 * scale
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <rect x="0" y="0" width="140" height="250" rx="22" fill="#e9f7ff" stroke="${accent}" stroke-width="8"/>
    <path d="M0 92h140" stroke="${accent}" stroke-width="8"/>
    <path d="M106 38v34M106 126v76" stroke="${navy}" stroke-width="9" stroke-linecap="round"/>
    <circle cx="70" cy="176" r="34" fill="${accent}" opacity=".2"/>
    <path d="M56 176h28M70 162v28" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
  </g>`
}

function toolIcon(cx, cy, scale = 1, accent = orange) {
  const x = cx - 92 * scale
  const y = cy - 72 * scale
  return `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M34 118l58-58" stroke="${accent}" stroke-width="18"/>
    <path d="M87 31c22-14 51-11 70 8l-42 18 22 22 42-18c3 25-8 50-30 64-23 15-53 14-75-1l-33 33-32-32 33-33c-15-22-16-52-1-75z" fill="#e9f7ff" stroke="${cyan}" stroke-width="8"/>
  </g>`
}

function circuitIcon(cx, cy, scale = 1, accent = cyan) {
  const x = cx - 90 * scale
  const y = cy - 76 * scale
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <rect x="0" y="0" width="180" height="152" rx="18" fill="#09243d" stroke="${accent}" stroke-width="7"/>
    <g stroke="${accent}" stroke-width="7" stroke-linecap="round" fill="none">
      <path d="M32 38h46v34h70"/>
      <path d="M32 108h54v-26h62"/>
      <path d="M92 38v-22M126 108v28"/>
    </g>
    <g fill="${orange}">
      <circle cx="32" cy="38" r="9"/><circle cx="32" cy="108" r="9"/><circle cx="148" cy="72" r="9"/><circle cx="148" cy="82" r="9"/>
    </g>
  </g>`
}

function heroMockup() {
  const body = `
  <circle cx="1012" cy="182" r="145" fill="${orange}" opacity=".16"/>
  <circle cx="166" cy="1012" r="190" fill="${cyan}" opacity=".12"/>
  ${miniPage(142, 248, 285, 405, 'NO ENFRIA', [178, 145, 198, 118], cyan, -10)}
  ${miniPage(768, 232, 278, 392, 'NO ARRANCA', [174, 126, 190, 140], orange, 9)}
  ${cover(330, 116, 540, 690, ['50 MAPAS', 'VISUALES'], 'DIAGNOSTICO RAPIDO', fridgeIcon(600, 490, 1.32), cyan)}
  ${device(688, 472, 220, 360, 'INDICE', 'POR SINTOMA', blue)}
  ${cover(124, 742, 245, 298, ['CHECKLIST', 'COMPRESOR'], 'BONUS 1', toolIcon(247, 950, .42), orange, -4)}
  ${cover(388, 786, 245, 298, ['TABLA DE', 'SINTOMAS'], 'BONUS 2', circuitIcon(510, 980, .42), cyan)}
  ${cover(652, 742, 245, 298, ['RUTA', 'NO FROST'], 'BONUS 4', fridgeIcon(775, 950, .38), blue, 4)}
  <rect x="260" y="1032" width="680" height="72" rx="36" fill="${green}"/>
  ${textLines(['PARA TECNICOS DE REFRIGERADORES'], 600, 1078, 29, paper)}
  `
  return svg(1200, 1200, body)
}

const mapData = [
  ['NO ENFRIA', 'Refrigerador no baja temperatura', ['Ventilacion', 'Empaques', 'Temperatura', 'Compresor']],
  ['FREEZER OK', 'Pero el refrigerador no conserva', ['Ductos', 'Ventilador', 'Damper', 'Sensor']],
  ['NO ENCIENDE', 'O se apaga solo', ['Tension', 'Termostato', 'Placa', 'Proteccion']],
  ['COMPRESOR', 'Intenta arrancar y corta', ['Relay', 'Capacitor', 'Amperaje', 'Bobinas']],
  ['EXCESO DE HIELO', 'Escarcha y evaporador bloqueado', ['Resistencia', 'Bimetal', 'Timer', 'Drenaje']],
  ['FUGA DE AGUA', 'Drenaje y condensacion anormal', ['Charola', 'Manguera', 'Nivelacion', 'Sello']],
]

function mapPage([title, subtitle, steps], index) {
  const flowY = [525, 670, 815, 960]
  const cards = flowY.map((y, i) => `
    <rect x="112" y="${y}" width="676" height="92" rx="20" fill="${i % 2 ? '#eef7fb' : '#fff8eb'}" stroke="${i % 2 ? '#b9ddeb' : '#ead0a8'}" stroke-width="3"/>
    <circle cx="158" cy="${y + 46}" r="25" fill="${i % 2 ? cyan : orange}"/>
    ${textLines([String(i + 1)], 158, y + 55, 23, paper)}
    ${textLines([steps[i]], 210, y + 57, 30, ink, 900, 'start')}
    <path d="M706 ${y + 30}l30 16-30 16" fill="none" stroke="${ink}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  `).join('\n')

  return svg(900, 1350, `
  <rect x="42" y="42" width="816" height="1266" rx="30" fill="${paper}" stroke="#d7e0e7" stroke-width="5"/>
  <rect x="42" y="42" width="816" height="178" rx="30" fill="${navy}"/>
  ${textLines([`MAPA ${index + 1}`], 108, 112, 26, yellow, 900, 'start')}
  ${textLines([title], 450, 141, 46, paper)}
  ${textLines([subtitle], 450, 184, 21, '#bcefff', 800)}
  <rect x="92" y="272" width="260" height="164" rx="22" fill="#eef7fb" stroke="${cyan}" stroke-width="5"/>
  ${fridgeIcon(222, 354, .45)}
  <rect x="408" y="272" width="360" height="164" rx="22" fill="#fff8eb" stroke="#ead0a8" stroke-width="5"/>
  <path d="M456 332h242M456 382h178" stroke="${ink}" stroke-width="18" stroke-linecap="round"/>
  ${cards}
  <rect x="104" y="1132" width="692" height="82" rx="22" fill="${navy}"/>
  ${textLines(['SINTOMA  >  CAUSA  >  PRUEBA  >  PROXIMO PASO'], 450, 1183, 24, paper)}
  <rect x="248" y="1248" width="404" height="50" rx="25" fill="${green}"/>
  ${textLines(['50 MAPAS VISUALES'], 450, 1281, 22, paper)}
  `, cream)
}

const bonuses = [
  ['CHECKLIST', ['ANTES DE', 'CAMBIAR EL', 'COMPRESOR'], toolIcon(600, 625, .86), orange],
  ['TABLA RAPIDA', ['SINTOMAS Y', 'CAUSAS'], circuitIcon(600, 625, .92), cyan],
  ['GUIA DE', ['HERRAMIENTAS', 'EN CAMPO'], toolIcon(600, 625, .86, cyan), blue],
  ['RUTA', ['REVISION', 'NO FROST'], fridgeIcon(600, 625, .88), cyan],
  ['FORMATO', ['REGISTRO DE', 'SERVICIO'], device(488, 508, 224, 300, 'FICHA', 'SERVICIO', orange), orange],
  ['ERRORES', ['COMUNES DE', 'DIAGNOSTICO'], circuitIcon(600, 625, .9, orange), yellow],
]

function bonusCover([kicker, title, icon, accent], index) {
  return svg(1200, 1200, `
  <circle cx="990" cy="190" r="150" fill="${orange}" opacity=".15"/>
  <circle cx="180" cy="1030" r="180" fill="${cyan}" opacity=".10"/>
  <rect x="110" y="102" width="980" height="996" rx="48" fill="${navy2}" stroke="${accent}" stroke-width="7"/>
  <path d="M174 218h852M174 982h852" stroke="${accent}" stroke-width="4" opacity=".5"/>
  ${textLines([`BONUS #${index + 1}`], 600, 190, 34, yellow)}
  ${textLines([kicker], 600, 276, 40, '#bcefff')}
  ${textLines(title, 600, 342, 64, paper, 900, 'middle', 70)}
  ${icon}
  <g transform="translate(285 780)">
    <rect width="630" height="92" rx="46" fill="${green}"/>
    ${textLines(['MATERIAL COMPLEMENTARIO'], 315, 59, 28, paper)}
  </g>
  <g opacity=".78">
    <circle cx="430" cy="934" r="18" fill="${accent}"/>
    <circle cx="500" cy="934" r="18" fill="${orange}"/>
    <circle cx="570" cy="934" r="18" fill="${cyan}"/>
    <circle cx="640" cy="934" r="18" fill="${green}"/>
    <circle cx="710" cy="934" r="18" fill="${yellow}"/>
    <circle cx="780" cy="934" r="18" fill="${blue}"/>
  </g>
  `)
}

function packageMockup() {
  return svg(1200, 1200, `
  <circle cx="1020" cy="210" r="150" fill="${orange}" opacity=".14"/>
  <circle cx="160" cy="1010" r="160" fill="${cyan}" opacity=".12"/>
  ${miniPage(125, 240, 248, 350, 'MAPA 1', [150, 118, 172], cyan, -9)}
  ${miniPage(830, 246, 248, 350, 'MAPA 6', [146, 126, 174], orange, 9)}
  ${cover(308, 116, 584, 682, ['50 MAPAS', 'VISUALES'], 'BIBLIOTECA DE DIAGNOSTICO', fridgeIcon(600, 482, 1.22), cyan)}
  ${cover(162, 790, 238, 270, ['CHECKLIST', 'COMPRESOR'], 'BONUS 1', toolIcon(281, 966, .34), orange, -2)}
  ${cover(430, 812, 238, 270, ['TABLA', 'SINTOMAS'], 'BONUS 2', circuitIcon(549, 984, .34), cyan)}
  ${cover(698, 790, 238, 270, ['RUTA', 'NO FROST'], 'BONUS 4', fridgeIcon(817, 966, .3), blue, 2)}
  ${badge(296, 1060, 608, 62, 'MAPAS + 6 BONUS DE CAMPO', green, paper, 25)}
  `)
}

function planMockup(kind) {
  const complete = kind === 'complete'
  const title = complete ? ['PLANO', 'COMPLETO'] : ['PLANO', 'BASICO']
  const included = complete ? '50 MAPAS + 6 BONUS' : '50 MAPAS VISUALES'
  const extras = complete
    ? `${cover(122, 744, 212, 252, ['CHECKLIST'], 'BONUS', toolIcon(228, 922, .28), orange, -6)}
       ${cover(494, 790, 212, 252, ['TABLA'], 'BONUS', circuitIcon(600, 960, .28), cyan)}
       ${cover(866, 744, 212, 252, ['NO FROST'], 'BONUS', fridgeIcon(972, 922, .25), blue, 6)}`
    : `${miniPage(182, 780, 240, 300, 'MAPA 2', [140, 110, 160], cyan, -5)}
       ${miniPage(778, 780, 240, 300, 'MAPA 5', [136, 118, 152], orange, 5)}`

  return svg(1200, 1200, `
  <circle cx="990" cy="190" r="140" fill="${complete ? orange : cyan}" opacity=".16"/>
  <circle cx="175" cy="1010" r="155" fill="${complete ? cyan : blue}" opacity=".11"/>
  ${cover(318, 116, 564, 626, title, included, complete ? fridgeIcon(600, 462, 1.08) : device(470, 340, 260, 330, 'INDICE', 'POR SINTOMA'), complete ? cyan : blue)}
  ${miniPage(112, 285, 226, 320, 'NO ENFRIA', [124, 102, 142], cyan, -10)}
  ${miniPage(862, 285, 226, 320, 'COMPRESOR', [124, 98, 150], orange, 10)}
  ${extras}
  ${badge(300, 1054, 600, 62, complete ? 'PAQUETE MAS COMPLETO' : 'ACCESO ESENCIAL', complete ? green : blue, paper, 25)}
  `)
}

function proofImage() {
  return svg(1200, 1500, `
  <rect width="1200" height="1500" fill="#dfe7ed"/>
  <rect x="0" y="930" width="1200" height="570" fill="#bcc8d0"/>
  <rect x="108" y="980" width="984" height="360" rx="42" fill="#8b969d" opacity=".35"/>
  <rect x="690" y="820" width="330" height="104" rx="52" fill="#1e2f3d"/>
  <rect x="182" y="340" width="836" height="770" rx="72" fill="#111820" filter="url(#softShadow)"/>
  <rect x="222" y="394" width="756" height="640" rx="36" fill="${paper}"/>
  <rect x="222" y="394" width="756" height="126" rx="36" fill="${navy}"/>
  ${textLines(['MAPA DE DIAGNOSTICO'], 600, 470, 39, paper)}
  ${textLines(['Refrigerador no enfria'], 600, 510, 22, '#bcefff', 800)}
  <rect x="284" y="575" width="260" height="250" rx="28" fill="#eef7fb" stroke="${cyan}" stroke-width="5"/>
  ${fridgeIcon(414, 700, .58)}
  <rect x="606" y="575" width="300" height="82" rx="18" fill="#fff8eb" stroke="#ead0a8" stroke-width="4"/>
  <rect x="606" y="688" width="300" height="82" rx="18" fill="#eef7fb" stroke="#b9ddeb" stroke-width="4"/>
  <rect x="606" y="801" width="300" height="82" rx="18" fill="#fff8eb" stroke="#ead0a8" stroke-width="4"/>
  <path d="M650 619h185M650 732h150M650 845h190" stroke="${ink}" stroke-width="17" stroke-linecap="round"/>
  <rect x="310" y="910" width="580" height="62" rx="31" fill="${green}"/>
  ${textLines(['CONSULTA RAPIDA EN CAMPO'], 600, 951, 24, paper)}
  <rect x="148" y="1136" width="400" height="126" rx="63" fill="#b48664"/>
  <rect x="668" y="1134" width="382" height="126" rx="63" fill="#b48664"/>
  <g transform="translate(92 1068) rotate(-10 150 80)">
    <rect width="300" height="160" rx="22" fill="#1b2633"/>
    <circle cx="86" cy="80" r="38" fill="${orange}"/>
    <path d="M142 54h100M142 88h74M142 122h112" stroke="${cyan}" stroke-width="13" stroke-linecap="round"/>
  </g>
  <g transform="translate(824 1048) rotate(8 112 92)">
    <rect width="224" height="184" rx="24" fill="#26394a"/>
    <circle cx="70" cy="82" r="31" fill="${cyan}" opacity=".35"/>
    <path d="M52 82h36M70 64v36" stroke="${cyan}" stroke-width="10" stroke-linecap="round"/>
    <path d="M126 62h56M126 104h74" stroke="${paper}" stroke-width="11" stroke-linecap="round"/>
  </g>
  `, '#dfe7ed')
}

writeFileSync(join(outDir, 'hero-mockup.svg'), heroMockup())
writeFileSync(join(outDir, 'package-mockup.svg'), packageMockup())
writeFileSync(join(outDir, 'plan-basic.svg'), planMockup('basic'))
writeFileSync(join(outDir, 'plan-complete.svg'), planMockup('complete'))
writeFileSync(join(outDir, 'veja-como-sao.svg'), proofImage())

mapData.forEach((data, index) => {
  writeFileSync(join(outDir, `mapa-${index + 1}.svg`), mapPage(data, index))
})

bonuses.forEach((data, index) => {
  writeFileSync(join(outDir, `bonus-${index + 1}.svg`), bonusCover(data, index))
})
