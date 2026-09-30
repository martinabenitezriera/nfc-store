"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProductoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
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

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-black"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-12 grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Tarjeta NFC
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Tu negocio.
              <br />
              Un toque.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-600 md:text-xl">
              Una tarjeta NFC elegante para que tus clientes accedan a lo que
              quieras con solo acercar el móvil.
            </p>

            <div className="mt-9 flex flex-wrap items-end gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-500">Desde</p>
                <p className="text-4xl font-black tracking-tight">29,90 €</p>
              </div>
              <span className="mb-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                Personalizable
              </span>
            </div>

            <Link
              href="/personalizar"
              className="mt-9 inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition hover:scale-[1.01] md:w-auto"
            >
              Personalizar mi tarjeta
              <span className="ml-3">→</span>
            </Link>
          </div>

          <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-[2.5rem] bg-zinc-950 p-8 shadow-2xl">
            <div className="absolute h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="relative w-full max-w-[390px]">
              <div
                className="relative aspect-[1.58/1] overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600 p-8 text-white shadow-[0_35px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
                style={{
                  animation: "productCardFloat 5s ease-in-out infinite",
                }}
              >
                <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{ animation: "productShine 4s ease-in-out infinite" }}
                />

                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xl font-black tracking-tight">NFC.</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      Smart card
                    </span>
                  </div>

                  <div>
                    <p className="text-3xl font-black tracking-tight">
                      Tu negocio
                    </p>
                    <p className="mt-2 text-sm text-white/60">
                      Acerca tu móvil y conecta.
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium text-white/50">
                    <span>WhatsApp · Web · Reviews</span>
                    <span className="text-xl text-white">⌁</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3 text-sm font-semibold text-white/70">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                  ✓
                </span>
                Funciona con un toque
              </div>
            </div>
          </div>
        </div>

        <section className="mt-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Todo incluido
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              Todo lo que necesitas.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Personaliza tu tarjeta y elige exactamente qué quieres que
              ocurra cuando tu cliente la acerque a su móvil.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["⌁", "Tarjeta NFC", "Una tarjeta física preparada para compartir tu enlace."],
              ["✦", "Personalización", "Elige el color, estilo y nombre de tu negocio."],
              ["↗", "Tu enlace", "Google Reviews, WhatsApp, Instagram, web o cualquier URL."],
              ["✓", "Sin app", "Tu cliente no necesita descargar ninguna aplicación."],
              ["⚡", "Un solo toque", "Acerca el móvil y accede directamente al destino."],
              ["♡", "Diseño premium", "Una tarjeta pensada para verse bien en cualquier negocio."],
            ].map(([icon, title, description]) => (
              <div
                key={title}
                className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-700">
                  {icon}
                </div>
                <h3 className="mt-6 text-xl font-black tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-zinc-500">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Preguntas frecuentes
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              Todo lo que necesitas saber.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Resolvemos las dudas más habituales antes de que personalices tu tarjeta.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
            {[
              ["01", "¿Cómo funciona la tarjeta NFC?", "Solo tienes que acercar un móvil compatible con NFC a la tarjeta. Se abrirá directamente el enlace que hayas elegido, sin necesidad de descargar ninguna aplicación."],
              ["02", "¿Qué puedo poner en mi tarjeta?", "Puedes elegir Google Reviews, WhatsApp, Instagram, tu página web, Spotify o cualquier otro enlace que quieras compartir con tus clientes."],
              ["03", "¿El cliente necesita una aplicación?", "No. Tu cliente solo tiene que acercar su móvil a la tarjeta. La experiencia funciona directamente desde el teléfono."],
              ["04", "¿Puedo personalizar la tarjeta?", "Sí. Puedes elegir el color, el estilo, el nombre de tu negocio y el destino que quieres compartir."],
              ["05", "¿Cuánto cuesta la tarjeta?", "El precio parte de 29,90 €. El precio final se muestra antes de completar el pedido."],
              ["06", "¿Puedo cambiar el enlace más adelante?", "La tarjeta se configura con el enlace elegido durante el pedido. Si necesitas cambiarlo, podremos gestionar esa modificación según el servicio disponible."],
            ].map(([number, question, answer], index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={question}
                  className="border-b border-zinc-200 px-6 last:border-b-0 md:px-8"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 ${
                        isOpen
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {number}
                    </span>

                    <span className="flex-1 text-base font-bold tracking-tight text-zinc-950 md:text-lg">
                      {question}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg font-light transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-zinc-200 text-zinc-500"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pb-7 pl-14 pr-12 md:pl-14 md:pr-16">
                        <p className="text-sm leading-7 text-zinc-500 md:text-base">
                          {answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-24 rounded-[2.5rem] bg-emerald-50/70 px-6 py-12 text-center md:px-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Empieza ahora
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight md:text-5xl">
            Haz que tu negocio empiece con un toque.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-600">
            Personaliza tu tarjeta en pocos pasos y decide qué quieres
            conseguir con ella.
          </p>
          <Link
            href="/personalizar"
            className="mt-8 inline-flex rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:scale-[1.01]"
          >
            Personalizar mi tarjeta →
          </Link>
        </section>
      </section>

      <style>{`
        @keyframes productCardFloat {
          0%, 100% {
            transform: translateY(0) rotateZ(-1deg);
          }
          50% {
            transform: translateY(-12px) rotateZ(1deg);
          }
        }

        @keyframes productShine {
          0%, 20% {
            transform: translateX(-180%) skewX(-12deg);
            opacity: 0;
          }
          35% {
            opacity: 1;
          }
          65%, 100% {
            transform: translateX(420%) skewX(-12deg);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
