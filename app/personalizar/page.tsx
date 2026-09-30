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
  const [cardColor, setCardColor] = useState("emerald");
  const [cardStyle, setCardStyle] = useState("minimal");

  const cardColors = [
    { id: "emerald", label: "Esmeralda", className: "bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600" },
    { id: "black", label: "Negra", className: "bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-600" },
    { id: "blue", label: "Azul", className: "bg-gradient-to-br from-slate-950 via-blue-900 to-blue-600" },
    { id: "white", label: "Blanca", className: "bg-gradient-to-br from-white via-zinc-100 to-zinc-300 text-zinc-950" },
  ];

  const selectedColor = cardColors.find((item) => item.id === cardColor) ?? cardColors[0];

  const cardStyles = [
    {
      id: "minimal",
      label: "Minimal",
      description: "Limpia, sencilla y elegante.",
    },
    {
      id: "logo",
      label: "Con logo",
      description: "Destaca la identidad de tu negocio.",
    },
    {
      id: "premium",
      label: "Premium",
      description: "Un acabado más exclusivo y sofisticado.",
    },
  ];

  const selectedStyle =
    cardStyles.find((item) => item.id === cardStyle) ?? cardStyles[0];

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
          <div className="mb-5 flex items-center gap-3 text-sm font-semibold text-zinc-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs text-white">1</span>
            <span>Paso 1 de 3 · Personalización</span>
          </div>
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
                className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
              />
            </label>

            <div>
              <span className="mb-3 block text-sm font-semibold">¿Qué quieres conseguir?</span>
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
                className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
              />
              <span className="mt-2 block text-sm text-zinc-500">
                Este será el enlace que abrirá la tarjeta NFC.
              </span>
            </label>

            <div>
              <span className="mb-3 block text-sm font-semibold">Color de tu tarjeta</span>
              <div className="grid grid-cols-2 gap-3">
                {cardColors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setCardColor(color.id)}
                    className={`rounded-2xl border p-3 text-left transition ${cardColor === color.id ? "border-black ring-2 ring-black ring-offset-2" : "border-zinc-200 hover:border-zinc-400"}`}
                  >
                    <span className={`mb-2 block h-10 rounded-xl ${color.className}`} />
                    <span className="text-sm font-semibold">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="mb-3 block text-sm font-semibold">Estilo de tu tarjeta</span>
              <div className="grid gap-3 md:grid-cols-3">
                {cardStyles.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setCardStyle(style.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${cardStyle === style.id ? "border-black bg-black text-white" : "border-zinc-200 hover:border-zinc-400"}`}
                  >
                    <span className="block font-semibold">{style.label}</span>
                    <span className={`mt-1 block text-sm ${cardStyle === style.id ? "text-zinc-300" : "text-zinc-500"}`}>
                      {style.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Cantidad</span>
              <select
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
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
                    cardColor,
                    cardStyle,
                  })
                );
                window.location.href = "/resumen";
              }}
              className="w-full rounded-full bg-black px-8 py-4 font-semibold text-white shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Continuar con el pedido
            </button>
          </div>
        </div>

        <div className="md:sticky md:top-8 md:self-start">
          <div className="rounded-[2rem] bg-zinc-950 p-6 text-white shadow-2xl md:p-8">
            <div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-white">Vista previa</p><p className="mt-1 text-xs text-zinc-500">Así quedará tu tarjeta</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">En directo</span></div>

            <style>{`
              @keyframes previewShine {
                0% { transform: translateX(-180%) skewX(-15deg); opacity: 0; }
                18% { opacity: 1; }
                60% { opacity: .45; }
                100% { transform: translateX(420%) skewX(-15deg); opacity: 0; }
              }
              .preview-shine { animation: previewShine 3.8s ease-in-out infinite; }
            `}</style>

            <div className={`relative mt-8 flex aspect-[1.58/1] flex-col justify-between overflow-hidden rounded-[1.5rem] p-7 shadow-xl ring-1 ring-white/10 transition-all duration-500 ${selectedColor.className} ${cardStyle === "premium" ? "ring-2 ring-white/30" : ""}`}>
              {cardStyle !== "minimal" && (
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-black ${cardStyle === "premium" ? "border-white/50 bg-white/15" : "border-white/30 bg-white/10"}`}>
                  {cardStyle === "logo" ? "LOGO" : "✦"}
                </div>
              )}

              {cardStyle === "premium" && (
                <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white/15 via-transparent to-black/20" />
              )}

              <div className="relative">
                <div className="text-xl font-black tracking-tight">NFC.</div>
                <div className="mt-2 h-px w-10 bg-current opacity-30" />
              </div>

              <div className="relative">
                <p className="text-lg font-semibold">
                  {businessName || "Tu negocio"}
                </p>
                <p className="mt-1 text-sm opacity-60">{selectedType.label}</p>
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

            <div className="mt-6 flex items-start gap-3 text-sm leading-6 text-zinc-400"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">✓</span><p>Tu configuración se guardará antes de pasar al resumen del pedido.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
