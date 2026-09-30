"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const linkTypes = [
  { id: "google", label: "Google Reviews", description: "Lleva a tus clientes directamente a tus reseñas." },
  { id: "whatsapp", label: "WhatsApp", description: "Abre una conversación con tu negocio." },
  { id: "instagram", label: "Instagram", description: "Muestra tu perfil de Instagram." },
  { id: "web", label: "Página web", description: "Comparte cualquier página de tu negocio." },
  { id: "spotify", label: "Spotify", description: "Comparte una canción, playlist o perfil." },
  { id: "otro", label: "Otro enlace", description: "Cualquier URL que quieras compartir." },
];

export default function PersonalizarPage() {
  const [businessName, setBusinessName] = useState("");
  const [linkType, setLinkType] = useState("google");
  const [url, setUrl] = useState("");
  const [quantity, setQuantity] = useState(1);

  const selectedType = useMemo(
    () => linkTypes.find((item) => item.id === linkType) ?? linkTypes[0],
    [linkType]
  );

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <nav className="flex items-center justify-between border-b border-zinc-100 px-6 py-5 md:px-12">
        <Link href="/" className="text-2xl font-black tracking-tight">
          NFC.
        </Link>
        <Link
          href="/producto"
          className="text-sm font-medium text-zinc-600 transition hover:text-black"
        >
          ← Volver al producto
        </Link>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-2 md:px-12 md:py-20">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Paso 1 · Personalización
          </p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Crea tu tarjeta.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600">
            Configura qué quieres que ocurra cuando un cliente acerque su móvil.
          </p>

          <div className="mt-10 space-y-8">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Nombre del negocio</span>
              <input
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="Ej. Café Madrid"
                className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black"
              />
            </label>

            <div>
              <span className="mb-3 block text-sm font-semibold">¿Qué quieres compartir?</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {linkTypes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLinkType(item.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      linkType === item.id
                        ? "border-black bg-black text-white"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <span className="block font-semibold">{item.label}</span>
                    <span
                      className={`mt-1 block text-sm ${
                        linkType === item.id ? "text-zinc-300" : "text-zinc-500"
                      }`}
                    >
                      {item.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Enlace</span>
              <input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://..."
                type="url"
                className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black"
              />
              <span className="mt-2 block text-sm text-zinc-500">
                Este será el enlace que abrirá la tarjeta NFC.
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Cantidad</span>
              <select
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 outline-none focus:border-black"
              >
                {[1, 2, 3, 5, 10, 25, 50, 100].map((amount) => (
                  <option key={amount} value={amount}>
                    {amount} {amount === 1 ? "tarjeta" : "tarjetas"}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => {
                window.localStorage.setItem(
                  "nfc-order",
                  JSON.stringify({
                    businessName,
                    linkType: selectedType.label,
                    url,
                    quantity,
                  })
                );
                window.location.href = "/resumen";
              }}
              className="w-full rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:scale-[1.01]"
            >
              Continuar con el pedido
            </button>
          </div>
        </div>

        <div className="md:sticky md:top-8 md:self-start">
          <div className="rounded-[2rem] bg-zinc-950 p-6 text-white shadow-2xl md:p-8">
            <p className="text-sm text-zinc-400">Vista previa</p>\n\n            <style>{`\n              @keyframes previewShine {\n                0% { transform: translateX(-180%) skewX(-15deg); opacity: 0; }\n                18% { opacity: 1; }\n                60% { opacity: .45; }\n                100% { transform: translateX(420%) skewX(-15deg); opacity: 0; }\n              }\n              .preview-shine { animation: previewShine 3.8s ease-in-out infinite; }\n            `}</style>

            <div className="relative mt-8 flex aspect-[1.58/1] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600 p-7 shadow-xl ring-1 ring-white/10">\n              <div className="preview-shine pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div>
                <div className="text-xl font-black tracking-tight">NFC.</div>
                <div className="mt-2 h-px w-10 bg-white/30" />
              </div>

              <div>
                <p className="text-lg font-semibold">
                  {businessName || "Tu negocio"}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{selectedType.label}</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 rounded-2xl bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Tarjetas</span>
                <span className="font-semibold">{quantity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Destino</span>
                <span className="max-w-[55%] truncate text-right font-semibold">
                  {url || "Pendiente"}
                </span>
              </div>
            </div>

            <p className="mt-6 text-sm leading-6 text-zinc-400">
              Después conectaremos este formulario con Shopify para crear el pedido y gestionar el pago.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
