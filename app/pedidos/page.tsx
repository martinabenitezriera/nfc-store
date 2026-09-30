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
  const [orderDate, setOrderDate] = useState("");

  useEffect(() => {
    const completedOrder = window.localStorage.getItem("nfc-order-complete");
    const savedOrder = window.localStorage.getItem("nfc-order");
    const trackingStart = window.localStorage.getItem("nfc-tracking-start");

    if (completedOrder) {
      try {
        setOrder(JSON.parse(completedOrder));
        setCompleted(true);
      } catch {
        setOrder(null);
      }
    } else if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch {
        setOrder(null);
      }
    }

    if (trackingStart) {
      const date = new Date(trackingStart);
      setOrderDate(
        date.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
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
          <div className="mt-12 rounded-[2rem] border border-zinc-200 p-7 shadow-sm md:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Pedido #NFC-001
                </p>
                <h2 className="mt-3 text-2xl font-black">Tu tarjeta NFC</h2>
                <p className="mt-1 text-zinc-500">
                  {order.businessName || "Tu negocio"}
                </p>
              </div>

              <span className="inline-flex w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 sm:ml-auto">
                Preparando pedido
              </span>
            </div>

            <div className="mt-10 grid gap-4 border-y border-zinc-100 py-6 sm:grid-cols-3">
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
                <p className="text-sm text-zinc-400">Precio</p>
                <p className="mt-1 font-semibold">
                  {total.toFixed(2).replace(".", ",")} €
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-zinc-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold">Estado del pedido</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Estamos preparando tu tarjeta personalizada.
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                  ✓
                </div>
              </div>
            </div>

            <Link
              href="/pedidos/detalle"
              className="mt-8 inline-flex rounded-full bg-zinc-950 px-7 py-4 font-semibold text-white transition hover:scale-[1.01]"
            >
              Ver detalles
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
