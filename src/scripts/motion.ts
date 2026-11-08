// Animaciones de scroll sin librerías: solo transform y opacity.
// - [data-reveal]: aparece al entrar en pantalla (la transición está en global.css).
// - .scroll-zoom: zoom suave al hacer scroll; CSS scroll-driven donde existe y,
//   si no, un respaldo con requestAnimationFrame.

const reduce = matchMedia('(prefers-reduced-motion: reduce)');

function reveals() {
	const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
	if (!('IntersectionObserver' in window) || reduce.matches) {
		els.forEach((el) => el.classList.add('is-in'));
		return;
	}
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				e.target.classList.add('is-in');
				io.unobserve(e.target);
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
	);
	els.forEach((el) => io.observe(el));
}

function zoomFallback() {
	if (reduce.matches || CSS.supports('animation-timeline: view()')) return;
	const els = [...document.querySelectorAll<HTMLElement>('.scroll-zoom')];
	if (!els.length) return;
	let queued = false;
	const ease = (t: number) => 1 - Math.pow(1 - t, 3);
	const update = () => {
		queued = false;
		const vh = innerHeight;
		for (const el of els) {
			const r = el.getBoundingClientRect();
			// 0 cuando el borde superior está abajo del todo; 1 al llegar al 30 % de la ventana.
			const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.7)));
			const k = ease(p);
			el.style.transformOrigin = '50% 0';
			el.style.transform =
				k >= 1 ? '' : `perspective(1800px) rotateX(${(1 - k) * 10}deg) scale(${0.9 + 0.1 * k})`;
		}
	};
	const onScroll = () => {
		if (!queued) {
			queued = true;
			requestAnimationFrame(update);
		}
	};
	addEventListener('scroll', onScroll, { passive: true });
	addEventListener('resize', onScroll, { passive: true });
	update();
}

reveals();
zoomFallback();
