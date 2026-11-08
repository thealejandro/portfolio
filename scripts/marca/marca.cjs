/* MARCA de thealejandro__ (diseno/MARCA.md, Enmienda 2). Símbolo «GAFAS» y logotipo (símbolo + nombre en Bricolage 800), en la retícula de AZULEJO.
 *
 * El símbolo son las gafas de pasta del retrato de @SC.ASTRO como DOS TESELAS del azulejo: la de la izquierda del espectador
 * es la lente holográfica, una tesela maciza con el holograma dentro (disco de cobalto-claro separado por un anillo de interfaz);
 * la de la derecha es una ventana sin foco, solo contorno (relleno = encendida, contorno = apagada: la misma regla de forma que
 * usa el chat para la plataforma). Puente y patilla las hacen gafas, es decir, una persona que mira, y no una cámara.
 * Construcción en unidades (u): símbolo 60x24 (2,5:1), teselas de 24, puente y patilla de 6, trazo 5,5, radios 7,5 y 2,
 * disco r 4,5, anillo 3,5. Propuesta c3-lente-v2 de marca/propuestas/ (NOTAS.md tiene el porqué de cada medida).
 *
 * API global (window.Marca):
 *   Marca.svg(variante, { tam = 80, color = 'currentColor', lente, fondo, clase, id })
 *       → string '<svg …>'. Todo en <path> (montura en un solo path nonzero + disco), sin trazos ni efectos.
 *       variante: 'simbolo' (gafas, 60x24 u) · 'icono' (solo la tesela encendida, 24x24 u: huecos cuadrados y por debajo de 32 px de ancho)
 *                 · 'logotipo' (gafas a la altura de ascendentes, apoyadas en la línea base, 9 u de aire y thealejandro__)
 *                 · 'apilado' (gafas arriba, 10 u de aire y el nombre centrado debajo, ascendentes = 18 u con las gafas a 48 u de alto)
 *                 · 'lente' = 'icono' (nombre antiguo, se mantiene por compatibilidad).
 *       tam: ALTO del símbolo en px (las gafas miden 2,5 × tam de ancho; el icono, tam × tam). En 'logotipo' es además la altura de
 *            ascendentes del nombre (t, h, l, d); en 'apilado', el alto de las gafas (el nombre va a 18/48 de tam).
 *       lente: color del holograma. Si se omite, versión mono: el disco queda vacío (el ojo sigue ahí) y todo va en la tinta.
 *       fondo: color de placa opcional detrás (p. ej. var(--esmalte)); sin fondo = transparente.
 *   Marca.el(variante, opciones)          → el mismo SVG como elemento DOM.
 *   Marca.medidas(variante, tam)          → { w, h, u } en px (u = px por unidad). h incluye lo que bajan la «j» y los «_».
 *   Marca.path(variante, capa, u, mono)   → solo el atributo d de una capa ('tinta' | 'lente') con u px por unidad, origen (0,0).
 *   Marca.NOMBRE = 'thealejandro__'       → el nombre (minúsculas, tal cual el handle).  Marca.VERSION = 3 (Enmienda 2: Gafas).
 *   Marca.VARIANTES                        → nombres disponibles.
 * 'logotipo' y 'apilado' necesitan marca/nombre.js (contornos de Bricolage 800, generado por marca/trazar-nombre.py) cargado antes
 * (window.MarcaNombre; en Node se busca con require('./nombre.js')); si falta, devuelven solo el símbolo.
 * Colores recomendados (theme.css): tinta --loza sobre esmalte con holograma --lente (= cobalto-claro); sobre loza, tinta --esmalte
 * y holograma --cobalto, o mono. Nunca cobalto-claro sobre loza. La lente encendida va siempre a la izquierda: no se voltea.
 */
(function () {
  'use strict'

  var NOMBRE = 'thealejandro__'
  var VERSION = 3

  // Geometría en unidades. Tesela L, trazo S, radios R (exterior) y r (interior), disco rd con anillo de interfaz ra.
  var L = 24, S = 5.5, R = 7.5, r = 2, PUENTE = 6, PATILLA = 6, PY = 3, RD = 4.5, RA = 3.5
  var X2 = L + PUENTE, W = 2 * L + PUENTE + PATILLA, H = L, CX = L / 2, CY = L / 2
  var AIRE_LOGO = 9, AIRE_APILADO = 10, ASC_APILADO = 18, ALTO_APILADO = 48

  function f(n) { return +n.toFixed(3) }

  // Rectángulo redondeado; r = radio o [arriba-izq, arriba-der, abajo-der, abajo-izq]. Horario = relleno; antihorario = hueco (nonzero).
  function rrect(x0, y0, x1, y1, rad, hueco) {
    var q = typeof rad === 'number' ? [rad, rad, rad, rad] : rad, a = q[0], b = q[1], c = q[2], d = q[3]
    var A = function (rr, x, y, sw) { return rr ? 'A' + f(rr) + ' ' + f(rr) + ' 0 0 ' + sw + ' ' + f(x) + ' ' + f(y) : 'L' + f(x) + ' ' + f(y) }
    if (!hueco) {
      return 'M' + f(x0 + a) + ' ' + f(y0) + 'L' + f(x1 - b) + ' ' + f(y0) + A(b, x1, y0 + b, 1) +
        'L' + f(x1) + ' ' + f(y1 - c) + A(c, x1 - c, y1, 1) + 'L' + f(x0 + d) + ' ' + f(y1) + A(d, x0, y1 - d, 1) +
        'L' + f(x0) + ' ' + f(y0 + a) + A(a, x0 + a, y0, 1) + 'Z'
    }
    return 'M' + f(x0 + a) + ' ' + f(y0) + A(a, x0, y0 + a, 0) + 'L' + f(x0) + ' ' + f(y1 - d) + A(d, x0 + d, y1, 0) +
      'L' + f(x1 - c) + ' ' + f(y1) + A(c, x1, y1 - c, 0) + 'L' + f(x1) + ' ' + f(y0 + b) + A(b, x1 - b, y0, 0) + 'Z'
  }

  function circ(cx, cy, rr, hueco) {
    var sw = hueco ? 0 : 1
    return 'M' + f(cx - rr) + ' ' + f(cy) + 'A' + f(rr) + ' ' + f(rr) + ' 0 1 ' + sw + ' ' + f(cx + rr) + ' ' + f(cy) +
      'A' + f(rr) + ' ' + f(rr) + ' 0 1 ' + sw + ' ' + f(cx - rr) + ' ' + f(cy) + 'Z'
  }

  // Montura en unidades. Color: hueco del anillo (rd + ra) con el disco aparte; mono: hueco del tamaño del disco, sin disco.
  function montura(variante, mono) {
    var d = rrect(0, 0, L, L, R) + circ(CX, CY, mono ? RD : RD + RA, true)
    if (variante === 'icono') return d
    d += rrect(X2, 0, X2 + L, L, R) + rrect(X2 + S, S, X2 + L - S, L - S, r, true)
    d += rrect(L - R, PY, X2 + S, PY + S, 0)                                  // puente: entra en las dos teselas hasta pasar el radio
    d += rrect(X2 + L - S, PY, W, PY + S, [0, r, r, 0])                       // patilla, con el extremo redondeado
    return d
  }
  var disco = circ(CX, CY, RD, false)

  // Escala un path en unidades a px (todas las coordenadas son x y alternos salvo los arcos, que se reescriben enteros)
  function escalar(d, k, ox, oy) {
    if (k === 1 && !ox && !oy) return d
    return d.replace(/([MLA])([^MLAZ]*)/g, function (_, cmd, args) {
      var n = args.trim().split(/[\s,]+/).map(Number)
      if (cmd === 'A') return 'A' + f(n[0] * k) + ' ' + f(n[1] * k) + ' ' + n[2] + ' ' + n[3] + ' ' + n[4] + ' ' + f(n[5] * k + ox) + ' ' + f(n[6] * k + oy)
      return cmd + f(n[0] * k + ox) + ' ' + f(n[1] * k + oy)
    })
  }

  function path(variante, capa, u, mono) {
    variante = variante === 'lente' ? 'icono' : variante
    return escalar(capa === 'lente' ? disco : montura(variante, mono), u || 1, 0, 0)
  }

  // Contornos del nombre: navegador (window.MarcaNombre) o Node (require('./nombre.js'))
  function nombreTrazado() {
    if (typeof window !== 'undefined' && window.MarcaNombre) return window.MarcaNombre
    try { if (typeof require === 'function') return require('./nombre.js') } catch (e) {}
    return null
  }

  // Geometría en unidades: caja total, sitio del símbolo (x, y, escala) y del nombre (x de origen, y de la base, escala de fuente).
  // El aire se mide desde el borde real de la primera letra (caja[0]), no desde el avance.
  function geometria(variante) {
    var N_ = nombreTrazado(), sim = variante === 'icono' ? L : W
    if (variante === 'logotipo' && N_) {
      var k = L / N_.ascender, sube = Math.max(0, N_.caja[3] * k - L), baja = -N_.caja[1] * k
      return { w: W + AIRE_LOGO + (N_.caja[2] - N_.caja[0]) * k, h: sube + H + baja, alto: H,
               simbolo: { x: 0, y: sube, s: 1 }, nombre: { x: W + AIRE_LOGO - N_.caja[0] * k, base: sube + H, k: k } }
    }
    if (variante === 'apilado' && N_) {
      var s = ALTO_APILADO / H, kn = ASC_APILADO / N_.ascender, nw = (N_.caja[2] - N_.caja[0]) * kn
      var ancho = Math.max(nw, W * s), base = ALTO_APILADO + AIRE_APILADO + ASC_APILADO
      return { w: ancho, h: base - N_.caja[1] * kn, alto: ALTO_APILADO,
               simbolo: { x: (ancho - W * s) / 2, y: 0, s: s }, nombre: { x: (ancho - nw) / 2 - N_.caja[0] * kn, base: base, k: kn } }
    }
    return { w: sim, h: H, alto: H, simbolo: { x: 0, y: 0, s: 1 }, nombre: null }
  }

  function normal(variante) {
    if (variante === 'lente') return 'icono'
    return variante === 'icono' || variante === 'logotipo' || variante === 'apilado' ? variante : 'simbolo'
  }

  function medidas(variante, tam) {
    var g = geometria(normal(variante)), u = (tam || 80) / g.alto
    return { w: f(g.w * u), h: f(g.h * u), u: u }
  }

  function svg(variante, o) {
    o = o || {}
    variante = normal(variante)
    var g = geometria(variante), m = medidas(variante, o.tam), u = m.u
    var color = o.color || 'currentColor', mono = !o.lente
    var forma = variante === 'icono' ? 'icono' : 'simbolo', k = u * g.simbolo.s, ox = g.simbolo.x * u, oy = g.simbolo.y * u
    var out = '<svg xmlns="http://www.w3.org/2000/svg" width="' + m.w + '" height="' + m.h + '" viewBox="0 0 ' + m.w + ' ' + m.h + '"' +
      ' role="img" aria-label="thealejandro__" shape-rendering="geometricPrecision"' +
      (o.clase ? ' class="' + o.clase + '"' : '') + (o.id ? ' id="' + o.id + '"' : '') + '>'
    if (o.fondo) out += '<rect width="' + m.w + '" height="' + m.h + '" fill="' + o.fondo + '"/>'
    out += '\n<path fill="' + color + '" d="' + escalar(montura(forma, mono), k, ox, oy) + '"/>'
    if (!mono) out += '\n<path fill="' + o.lente + '" d="' + escalar(disco, k, ox, oy) + '"/>'
    if (g.nombre) {
      // Contornos de Bricolage: unidades de fuente → px con k·u; Y hacia arriba, de ahí scale(k, -k)
      var kn = g.nombre.k * u
      out += '\n<path fill="' + color + '" transform="translate(' + f(g.nombre.x * u) + ' ' + f(g.nombre.base * u) + ') scale(' + +kn.toFixed(5) + ' ' + +(-kn).toFixed(5) + ')" d="' + nombreTrazado().d + '"/>'
    }
    return out + '\n</svg>'
  }

  function el(variante, o) {
    var t = document.createElement('template')
    t.innerHTML = svg(variante, o)
    return t.content.firstChild
  }

  var api = { svg: svg, el: el, path: path, medidas: medidas, NOMBRE: NOMBRE, VERSION: VERSION, ANCHO: W, ALTO: H,
              VARIANTES: ['simbolo', 'icono', 'logotipo', 'apilado'] }
  if (typeof window !== 'undefined') window.Marca = api
  if (typeof module !== 'undefined' && module.exports) module.exports = api
})()
