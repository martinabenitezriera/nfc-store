"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <nav className="flex items-center justify-between border-b border-zinc-100 px-6 py-5 md:px-12">
        <Link href="/" className="text-2xl font-black tracking-tight">
          NFC.
        </Link>
        <Link
          href="/personalizar"
          className="text-sm font-medium text-zinc-600 transition hover:text-black"
        >
          Personalizar
        </Link>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-32">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            NFC · Tu tarjeta inteligente
          </p>
          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
            Tu negocio.
            <br />
            Un toque.
          </h1>
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
