"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <style>{`
        @keyframes nfcCardIntro {
          0% { opacity: 0; transform: translate3d(80px, 70px, 0) rotateZ(-14deg) rotateY(-18deg) scale(1.45); }
          35% { opacity: 1; transform: translate3d(-12px, -18px, 0) rotateZ(8deg) rotateY(10deg) scale(1.12); }
          60% { transform: translate3d(8px, 8px, 0) rotateZ(-5deg) rotateY(-6deg) scale(0.96); }
          80% { transform: translate3d(-3px, -4px, 0) rotateZ(3deg) rotateY(4deg) scale(0.90); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) rotateZ(-2deg) rotateY(0deg) scale(0.88); }
        }

        @keyframes nfcCardFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotateZ(-2deg) rotateY(0deg); }
          25% { transform: translate3d(0, -12px, 0) rotateZ(1.5deg) rotateY(3deg); }
          50% { transform: translate3d(0, -20px, 0) rotateZ(-1.5deg) rotateY(-3deg); }
          75% { transform: translate3d(0, -9px, 0) rotateZ(1deg) rotateY(2deg); }
        }

        @keyframes nfcShine { 0% { transform: translateX(-180%) skewX(-12deg); opacity: 0; } 15% { opacity: 1; } 55% { opacity: .45; } 100% { transform: translateX(420%) skewX(-12deg); opacity: 0; } }\n\n        @keyframes nfcCardGlow {
          0% { opacity: 0; transform: scale(0.75); }
          45% { opacity: 0.22; transform: scale(1); }
          100% { opacity: 0.12; transform: scale(0.92); }
        }

        .nfcShine { animation: nfcShine 3.8s ease-in-out 2.7s infinite; }\n\n        @keyframes nfcCardPop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.18) rotate(-8deg);
          }
          45% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.08) rotate(2deg);
          }
          70% {
            transform: translate(-50%, -50%) scale(0.96) rotate(-1deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2) rotate(6deg);
          }
        }

        @keyframes nfcGlow {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          35%, 65% { opacity: 0.35; transform: scale(1); }
        }
      `}</style>

      <nav className="flex items-center justify-between border-b border-zinc-100 px-6 py-5 md:px-12">
        <Link href="/" className="text-2xl font-black tracking-tight">
          NFC.
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/pedidos"
            className="text-sm font-medium text-zinc-600 transition hover:text-black"
          >
            Mis pedidos
          </Link>
          <Link
            href="/personalizar"
            className="text-sm font-medium text-zinc-600 transition hover:text-black"
          >
            Personalizar
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-32">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            NFC · Tu tarjeta inteligente
          </p>

          <div className="relative">
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Tu negocio.
              <br />
              Un toque.
            </h1>

            <div
              className="pointer-events-none absolute left-[calc(100%+3rem)] top-[30%] z-10 hidden h-72 w-44 md:block"
              aria-hidden="true"
            >
              <div
                className="absolute -inset-4 rounded-[1.75rem] bg-emerald-900/20 blur-2xl"
                style={{ animation: "nfcCardGlow 2.4s cubic-bezier(.22,.8,.25,1) forwards" }}
              />
              <div
                className="absolute inset-0 overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600 p-5 text-white shadow-[0_35px_100px_rgba(0,0,0,0.42)] ring-1 ring-white/10"
                style={{
                  animation: "nfcCardIntro 2.5s cubic-bezier(.18,.78,.22,1) forwards, nfcCardFloat 5s ease-in-out 2.5s infinite",
                  transformOrigin: "center center",
                  perspective: "1000px",
                }}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.35rem]"><div className="nfcShine absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" /></div><div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-lg font-black tracking-tight">NFC.</span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      Smart card
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold tracking-tight">Tu negocio</p>
                    <p className="mt-1 text-xs text-zinc-400">Acerca tu móvil y conecta.</p>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-medium text-zinc-500">
                    <span>WhatsApp · Web · Reviews</span>
                    <span className="text-base text-white">⌁</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
            Una tarjeta NFC que permite a tus clientes acceder a tu enlace,
            WhatsApp, Instagram, reseñas o cualquier destino con solo acercar
            el móvil.
          </p>

          <Link
            href="/personalizar"
            className="mt-10 inline-flex rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:scale-[1.01]"
          >
            Comprar mi tarjeta
          </Link>
        </div>

        <section className="mt-28 overflow-hidden rounded-[2.5rem] bg-emerald-50/70 px-6 py-12 md:px-12 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Cómo funciona
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              Un toque. Tres pasos.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Tu cliente no necesita descargar nada. Solo acerca el móvil y la acción ocurre.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Acercar", "El cliente acerca su móvil a tu tarjeta NFC.", "⌁"],
              ["02", "Abrir", "Se abre automáticamente tu enlace elegido.", "↗"],
              ["03", "Conseguir", "El cliente hace la acción que buscas.", "✓"],
            ].map(([number, title, description, icon]) => (
              <div
                key={number}
                className="group relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-emerald-700">{number}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-800 transition group-hover:scale-110">
                    {icon}
                  </span>
                </div>
                <h3 className="mt-10 text-2xl font-black tracking-tight">{title}</h3>
                <p className="mt-3 leading-7 text-zinc-500">{description}</p>
                {number !== "03" && (
                  <div className="mt-8 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600 md:flex">
                    <span>Después</span>
                    <span className="transition group-hover:translate-x-1">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
