"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type OrderData = {
  businessName: string;
  linkType: string;
  url: string;
  quantity: number;
};

const PRICE = 29.9;

export default function PedidosPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const completedOrder = window.localStorage.getItem("nfc-order-complete");
    const savedOrder = window.localStorage.getItem("nfc-order");

    if (completedOrder) {
      setOrder(JSON.parse(completedOrder));
      setCompleted(true);
    } else if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  const total = order ? order.quantity * PRICE : 0;

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
          <div className="mt-12 rounded-[2rem] border border-zinc-200 p-7 md:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Pedido #NFC-001
                </p>
                <h2 className="mt-3 text-2xl font-black">Tu tarjeta NFC</h2>
                <p className="mt-1 text-zinc-500">
                  Personalizada · {order.quantity} {order.quantity === 1 ? "unidad" : "unidades"}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-2xl font-black">
                  {total.toFixed(2).replace(".", ",")} €
                </p>
                <span className="mt-2 inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                  Pago pendiente de conexión
                </span>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-4">
              {[
                ["✓", "Pedido creado", true],
                ["✓", "Tarjeta personalizada", true],
                ["✓", "Pedido preparado", completed],
                ["○", "Pago pendiente de conexión", false],
              ].map(([icon, label, active]) => (
                <div
                  key={String(label)}
                  className={`rounded-2xl border px-5 py-5 ${active ? "border-zinc-200 bg-zinc-50" : "border-zinc-100"}`}
                >
                  <p className={`text-xl ${active ? "text-black" : "text-zinc-300"}`}>
                    {icon}
                  </p>
                  <p className="mt-3 text-sm font-semibold">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-zinc-100 pt-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-zinc-400">Negocio</p>
                  <p className="mt-1 font-semibold">{order.businessName || "Sin nombre"}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Destino</p>
                  <p className="mt-1 font-semibold">{order.linkType}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
