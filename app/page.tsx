"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <style>{`
        @keyframes nfcCardPop {
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
              className="pointer-events-none absolute left-[78%] top-[44%] z-10 hidden h-72 w-44 -translate-y-1/2 md:block"
              aria-hidden="true"
            >
              <div
                className="absolute -inset-5 rounded-[3rem] bg-black/15 blur-2xl"
                style={{ animation: "nfcCardGlow 2.4s cubic-bezier(.22,.8,.25,1) forwards" }}
              />
              <div
                className="absolute inset-0 overflow-hidden rounded-[2rem] bg-black p-7 text-white shadow-[0_35px_100px_rgba(0,0,0,0.42)] ring-1 ring-white/10"
                style={{
                  animation: "nfcCardIntro 2.5s cubic-bezier(.18,.78,.22,1) forwards, nfcCardFloat 4s ease-in-out 2.5s infinite",
                  transformOrigin: "center center",
                  perspective: "1000px",
                }}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xl font-black tracking-tight">NFC.</span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      Smart card
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold tracking-tight">Tu negocio</p>
                    <p className="mt-1 text-sm text-zinc-400">Acerca tu móvil y conecta.</p>
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

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {[
            ["01", "Acerca el móvil", "Sin apps. Sin complicaciones."],
            ["02", "Abre tu destino", "Google, WhatsApp, Instagram o tu web."],
            ["03", "Hazlo tuyo", "Personaliza tu tarjeta y tu enlace."],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-[2rem] border border-zinc-200 p-7"
            >
              <p className="text-sm font-semibold text-zinc-400">{number}</p>
              <h2 className="mt-6 text-xl font-bold">{title}</h2>
              <p className="mt-2 leading-6 text-zinc-500">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
