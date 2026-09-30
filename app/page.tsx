"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showCard, setShowCard] = useState(false);

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
              <span className="inline-flex items-center gap-3">
                Tu negocio.
                <button
                  type="button"
                  aria-label="Ver cómo aparece tu tarjeta NFC"
                  onClick={() => setShowCard(true)}
                  className="group mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-400 hover:text-black md:h-12 md:w-12"
                >
                  <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                    ✦
                  </span>
                </button>
              </span>
              <br />
              Un toque.
            </h1>

            {showCard && (
              <button
                type="button"
                aria-label="Cerrar animación"
                onClick={() => setShowCard(false)}
                className="fixed inset-0 z-50 cursor-pointer bg-black/5 backdrop-blur-[1px]"
              >
                <span
                  className="absolute left-1/2 top-1/2 h-56 w-80 rounded-[2rem] border border-white/70 bg-white p-7 text-left shadow-[0_30px_100px_rgba(0,0,0,0.22)] md:h-64 md:w-[28rem]"
                  style={{
                    animation: "nfcCardPop 2.2s cubic-bezier(.22,.8,.25,1) forwards",
                  }}
                >
                  <span className="absolute -inset-10 -z-10 rounded-full bg-zinc-400/20 blur-3xl"
                    style={{ animation: "nfcGlow 2.2s ease-out forwards" }}
                  />
                  <span className="flex h-full flex-col justify-between">
                    <span className="flex items-start justify-between">
                      <span className="text-lg font-black tracking-tight">NFC.</span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        Smart card
                      </span>
                    </span>
                    <span>
                      <span className="block text-2xl font-bold">Tu negocio</span>
                      <span className="mt-1 block text-sm text-zinc-500">
                        Acerca tu móvil y conecta.
                      </span>
                    </span>
                    <span className="flex items-center justify-between text-xs font-medium text-zinc-400">
                      <span>WhatsApp · Web · Reviews</span>
                      <span className="text-lg text-black">⌁</span>
                    </span>
                  </span>
                </span>
              </button>
            )}
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
