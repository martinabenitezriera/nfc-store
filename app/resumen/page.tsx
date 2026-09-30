"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type OrderData = {
  businessName: string;
  linkType: string;
  url: string;
  quantity: number;
  cardColor?: string;
  cardStyle?: string;
};

const PRICE = 29.9;

const colorOptions = [
  {
    id: "emerald",
    label: "Esmeralda",
    className: "bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600",
  },
  {
    id: "black",
    label: "Negra",
    className: "bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-600",
  },
  {
    id: "blue",
    label: "Azul",
    className: "bg-gradient-to-br from-slate-950 via-blue-900 to-blue-600",
  },
  {
    id: "white",
    label: "Blanca",
    className: "bg-gradient-to-br from-white via-zinc-100 to-zinc-300 text-zinc-950",
  },
];

const styleOptions = [
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

export default function ResumenPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("nfc-order");

    if (saved) {
      try {
        setOrder(JSON.parse(saved));
      } catch {
        setOrder(null);
      }
    }
  }, []);

  const selectedColor = useMemo(
    () =>
      colorOptions.find((item) => item.id === order?.cardColor) ??
      colorOptions[0],
    [order?.cardColor]
  );

  const selectedStyle = useMemo(
    () =>
      styleOptions.find((item) => item.id === order?.cardStyle) ??
      styleOptions[0],
    [order?.cardStyle]
  );

  const total = order ? order.quantity * PRICE : 0;

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
          ← Editar personalización
        </Link>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12 md:px-12 md:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Paso 2 · Resumen
        </p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">
          Tu pedido.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          Revisa los datos antes de pasar al pago.
        </p>

        {!order ? (
          <div className="mt-12 rounded-[2rem] border border-zinc-200 p-8 text-center">
            <p className="text-lg font-semibold">
              No hay ningún pedido preparado.
            </p>
            <Link
              href="/personalizar"
              className="mt-6 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white"
            >
              Personalizar tarjeta
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-zinc-200 p-7 md:p-9">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold">Tu tarjeta</h2>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                  {selectedStyle.label}
                </span>
              </div>

              <div
                className={`relative mt-7 flex aspect-[1.58/1] flex-col justify-between overflow-hidden rounded-[1.5rem] p-7 shadow-xl ring-1 ring-white/10 ${selectedColor.className} ${selectedStyle.id === "premium" ? "ring-2 ring-white/30" : ""}`}
              >
                {selectedStyle.id !== "minimal" && (
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-black ${
                      selectedStyle.id === "premium"
                        ? "border-white/50 bg-white/15"
                        : "border-white/30 bg-white/10"
                    }`}
                  >
                    {selectedStyle.id === "logo" ? "LOGO" : "✦"}
                  </div>
                )}

                {selectedStyle.id === "premium" && (
                  <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white/15 via-transparent to-black/20" />
                )}

                <div className="relative">
                  <div className="text-xl font-black tracking-tight">NFC.</div>
                  <div className="mt-2 h-px w-10 bg-current opacity-30" />
                </div>

                <div className="relative">
                  <p className="text-lg font-semibold">
                    {order.businessName || "Tu negocio"}
                  </p>
                  <p className="mt-1 text-sm opacity-60">{order.linkType}</p>
                </div>
              </div>

              <div className="mt-7 space-y-5">
                <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                  <span className="text-zinc-500">Negocio</span>
                  <span className="text-right font-semibold">
                    {order.businessName || "Sin nombre"}
                  </span>
                </div>

                <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                  <span className="text-zinc-500">Destino</span>
                  <span className="text-right font-semibold">
                    {order.linkType}
                  </span>
                </div>

                <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                  <span className="text-zinc-500">Enlace</span>
                  <span className="max-w-[60%] truncate text-right font-semibold">
                    {order.url || "Sin enlace"}
                  </span>
                </div>

                <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                  <span className="text-zinc-500">Color</span>
                  <span className="font-semibold">{selectedColor.label}</span>
                </div>

                <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                  <span className="text-zinc-500">Estilo</span>
                  <span className="font-semibold">{selectedStyle.label}</span>
                </div>

                <div className="flex justify-between gap-6">
                  <span className="text-zinc-500">Cantidad</span>
                  <span className="font-semibold">{order.quantity}</span>
                </div>
              </div>

              <Link
                href="/personalizar"
                className="mt-8 inline-block text-sm font-semibold text-zinc-600 transition hover:text-black"
              >
                Editar personalización →
              </Link>
            </div>

            <div className="h-fit rounded-[2rem] bg-zinc-950 p-7 text-white shadow-2xl md:p-9">
              <p className="text-sm text-zinc-400">Resumen del precio</p>

              <div className="mt-8 flex items-end justify-between gap-4">
                <span className="text-zinc-400">
                  {order.quantity} × {PRICE.toFixed(2).replace(".", ",")} €
                </span>
                <span className="text-4xl font-black">
                  {total.toFixed(2).replace(".", ",")} €
                </span>
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Tarjetas</span>
                  <span>{total.toFixed(2).replace(".", ",")} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Envío</span>
                  <span>Calculado al finalizar</span>
                </div>
              </div>

              <p className="mt-6 text-sm leading-6 text-zinc-400">
                El pago real con Shopify lo conectaremos en el siguiente paso.
              </p>

              <Link
                href="/pago"
                className="mt-8 block w-full rounded-full bg-white px-8 py-4 text-center font-semibold text-black transition hover:scale-[1.01]"
              >
                Continuar al pago
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
