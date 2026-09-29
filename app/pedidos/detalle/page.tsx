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

export default function PedidoDetallePage() {
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
        <Link href="/" className="text-2xl font-black tracking-tight">NFC.</Link>
        <Link href="/pedidos" className="text-sm font-medium text-zinc-600 transition hover:text-black">← Mis pedidos</Link>
      </nav>
      <section className="mx-auto max-w-5xl px-6 py-12 md:px-12 md:py-20">
        {!order ? (
          <div className="rounded-[2rem] border border-zinc-200 p-10 text-center">
            <p className="text-xl font-bold">No hay ningún pedido disponible.</p>
            <Link href="/personalizar" className="mt-7 inline-flex rounded-full bg-black px-8 py-4 font-semibold text-white">Comprar mi tarjeta</Link>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Pedido #NFC-001</p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-4xl font-black tracking-tight md:text-6xl">Tu pedido.</h1>
                <p className="mt-3 text-lg text-zinc-600">Detalle completo de tu tarjeta NFC.</p>
              </div>
              <span className="inline-flex w-fit rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">Pago pendiente de conexión</span>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[2rem] border border-zinc-200 p-7 md:p-9">
                <h2 className="text-xl font-bold">Configuración</h2>
                <div className="mt-7 space-y-5">
                  <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5"><span className="text-zinc-500">Producto</span><span className="font-semibold">Tarjeta NFC</span></div>
                  <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5"><span className="text-zinc-500">Negocio</span><span className="font-semibold text-right">{order.businessName || "Sin nombre"}</span></div>
                  <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5"><span className="text-zinc-500">Destino</span><span className="font-semibold text-right">{order.linkType}</span></div>
                  <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5"><span className="text-zinc-500">Enlace</span><span className="max-w-[60%] truncate font-semibold text-right">{order.url}</span></div>
                  <div className="flex justify-between gap-6"><span className="text-zinc-500">Cantidad</span><span className="font-semibold">{order.quantity}</span></div>
                </div>
              </div>

              <div className="rounded-[2rem] bg-zinc-950 p-7 text-white shadow-2xl md:p-9">
                <p className="text-sm text-zinc-400">Resumen</p>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <span className="text-zinc-400">{order.quantity} × {PRICE.toFixed(2).replace(".", ",")} €</span>
                  <span className="text-4xl font-black">{total.toFixed(2).replace(".", ",")} €</span>
                </div>
                <p className="mt-5 text-sm leading-6 text-zinc-400">El cobro real se activará cuando conectemos el proveedor de pagos.</p>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-zinc-200 p-7 md:p-9">
              <h2 className="text-xl font-bold">Seguimiento del pedido</h2>
              <p className="mt-2 text-sm text-zinc-500">Estado actual de tu tarjeta NFC.</p>
              <div className="mt-8">
                <div className="hidden items-start sm:flex">
                  {[
                    ["✓", "Pedido recibido", true],
                    ["✓", "En preparación", completed],
                    ["✓", "Fabricando", false],
                    ["○", "Enviado", false],
                    ["○", "Entregado", false],
                  ].map(([icon, label, active], index, items) => (
                    <div key={String(label)} className="flex flex-1 items-start">
                      <div className="flex flex-1 flex-col items-center text-center">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${active ? "bg-black text-white" : "border border-zinc-200 bg-white text-zinc-300"}`}>
                          {icon}
                        </div>
                        <p className={`mt-3 text-xs font-semibold ${active ? "text-zinc-950" : "text-zinc-400"}`}>{label}</p>
                      </div>
                      {index < items.length - 1 && (
                        <div className={`mt-5 h-px flex-1 ${completed && index === 0 ? "bg-black" : "bg-zinc-200"}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="space-y-3 sm:hidden">
                  {[
                    ["✓", "Pedido recibido", true],
                    [completed ? "✓" : "○", "En preparación", completed],
                    ["○", "Fabricando", false],
                    ["○", "Enviado", false],
                    ["○", "Entregado", false],
                  ].map(([icon, label, active]) => (
                    <div key={String(label)} className={`flex items-center gap-4 rounded-2xl border p-4 ${active ? "border-zinc-200 bg-zinc-50" : "border-zinc-100"}`}>
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${active ? "bg-black text-white" : "border border-zinc-200 text-zinc-300"}`}>{icon}</div>
                      <span className={`text-sm font-semibold ${active ? "text-zinc-950" : "text-zinc-400"}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-zinc-200 p-7 md:p-9">
              <h2 className="text-xl font-bold">Estado del pedido</h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-4">
                {[
                  ["✓", "Pedido creado", true],
                  ["✓", "Tarjeta personalizada", true],
                  [completed ? "✓" : "○", "Pedido preparado", completed],
                  ["○", "Pago pendiente de conexión", false],
                ].map(([icon, label, active]) => (
                  <div key={String(label)} className={`rounded-2xl border px-5 py-5 ${active ? "border-zinc-200 bg-zinc-50" : "border-zinc-100"}`}>
                    <p className={`text-xl ${active ? "text-black" : "text-zinc-300"}`}>{icon}</p>
                    <p className="mt-3 text-sm font-semibold">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}