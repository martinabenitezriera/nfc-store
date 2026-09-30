"use client";

import { useEffect, useState } from "react";
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

const cardColors: Record<string, string> = {
  emerald: "bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600",
  black: "bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-600",
  blue: "bg-gradient-to-br from-slate-950 via-blue-900 to-blue-600",
  white: "bg-gradient-to-br from-white via-zinc-100 to-zinc-300 text-zinc-950",
};

const colorLabels: Record<string, string> = {
  emerald: "Esmeralda",
  black: "Negra",
  blue: "Azul",
  white: "Blanca",
};

const styleLabels: Record<string, string> = {
  minimal: "Minimal",
  logo: "Con logo",
  premium: "Premium",
};

export default function PedidosPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [orderDate, setOrderDate] = useState("");

  useEffect(() => {
    const completedOrder = window.localStorage.getItem("nfc-order-complete");
    const savedOrder = window.localStorage.getItem("nfc-order");
    const trackingStart = window.localStorage.getItem("nfc-tracking-start");

    try {
      if (completedOrder) {
        setOrder(JSON.parse(completedOrder));
      } else if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    } catch {
      setOrder(null);
    }

    if (trackingStart) {
      const date = new Date(trackingStart);
      if (!Number.isNaN(date.getTime())) {
        setOrderDate(
          date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        );
      }
    }
  }, []);

  const total = order ? order.quantity * PRICE : 0;
  const cardClass =
    cardColors[order?.cardColor ?? "emerald"] ?? cardColors.emerald;
  const cardColorLabel =
    colorLabels[order?.cardColor ?? "emerald"] ?? "Esmeralda";
  const cardStyleLabel =
    styleLabels[order?.cardStyle ?? "minimal"] ?? "Minimal";

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <nav className="flex items-center justify-between border-b border-zinc-100 px-6 py-5 md:px-12">
        <Link href="/" className="text-2xl font-black tracking-tight">
          NFC.
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-zinc-600 transition hover:text-black"
        >
          ← Volver al inicio
        </Link>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12 md:px-12 md:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Cuenta
        </p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">
          Mis pedidos.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          Consulta tus pedidos y su estado en un solo lugar.
        </p>

        {!order ? (
          <div className="mt-12 rounded-[2rem] border border-zinc-200 p-8 text-center md:p-12">
            <p className="text-xl font-bold">Todavía no tienes pedidos.</p>
            <p className="mt-2 text-zinc-500">
              Cuando prepares tu primera tarjeta, aparecerá aquí.
            </p>
            <Link
              href="/personalizar"
              className="mt-7 inline-flex rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:scale-[1.01]"
            >
              Comprar mi tarjeta
            </Link>
          </div>
        ) : (
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-zinc-200 shadow-sm">
            <div className="grid md:grid-cols-[0.75fr_1.25fr]">
              <div className="flex min-h-[310px] items-center justify-center bg-zinc-50 p-8">
                <div
                  className={`relative flex aspect-[1.58/1] w-[280px] max-w-full shrink-0 flex-col justify-between overflow-hidden rounded-[1.5rem] p-7 text-white shadow-2xl transition-all ${
                    cardClass
                  } ${
                    order.cardStyle === "premium"
                      ? "ring-2 ring-white/30"
                      : ""
                  }`}
                >
                  {order.cardStyle !== "minimal" && (
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-black ${
                        order.cardStyle === "premium"
                          ? "border-white/50 bg-white/15"
                          : "border-white/30 bg-white/10"
                      }`}
                    >
                      {order.cardStyle === "logo" ? "LOGO" : "✦"}
                    </div>
                  )}

                  {order.cardStyle === "premium" && (
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
              </div>

              <div className="p-7 md:p-9">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                      Pedido #NFC-001
                    </p>
                    <h2 className="mt-3 text-2xl font-black">
                      Tu tarjeta NFC
                    </h2>
                    <p className="mt-1 text-zinc-500">
                      {order.businessName || "Tu negocio"}
                    </p>
                  </div>

                  <span className="inline-flex w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                    Preparando pedido
                  </span>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-5 border-y border-zinc-100 py-6">
                  <div>
                    <p className="text-sm text-zinc-400">Fecha</p>
                    <p className="mt-1 font-semibold">
                      {orderDate || "Pendiente"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-zinc-400">Cantidad</p>
                    <p className="mt-1 font-semibold">
                      {order.quantity}{" "}
                      {order.quantity === 1 ? "tarjeta" : "tarjetas"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-zinc-400">Color</p>
                    <p className="mt-1 font-semibold">{cardColorLabel}</p>
                  </div>

                  <div>
                    <p className="text-sm text-zinc-400">Estilo</p>
                    <p className="mt-1 font-semibold">{cardStyleLabel}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-zinc-400">Total</p>
                    <p className="mt-1 text-2xl font-black">
                      {total.toFixed(2).replace(".", ",")} €
                    </p>
                  </div>

                  <Link
                    href="/pedidos/detalle"
                    className="inline-flex rounded-full bg-zinc-950 px-6 py-3 font-semibold text-white transition hover:scale-[1.01] hover:bg-zinc-800"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-100 bg-white px-7 py-7 md:px-9">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold">Seguimiento</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Tu pedido está siendo preparado.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                    ✓
                  </span>
                  <span className="h-px w-8 bg-black" />
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    2
                  </span>
                  <span className="h-px w-8 bg-zinc-200" />
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-sm text-zinc-300">
                    3
                  </span>
                  <span className="h-px w-8 bg-zinc-200" />
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-sm text-zinc-300">
                    4
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
