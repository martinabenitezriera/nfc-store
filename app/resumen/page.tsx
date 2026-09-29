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

export default function ResumenPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("nfc-order");
    if (saved) setOrder(JSON.parse(saved));
  }, []);

  const total = order ? order.quantity * PRICE : 0;

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <nav className="flex items-center justify-between border-b border-zinc-100 px-6 py-5 md:px-12">
        <Link href="/" className="text-2xl font-black tracking-tight">NFC.</Link>
        <Link href="/personalizar" className="text-sm font-medium text-zinc-600 transition hover:text-black">
          ← Editar personalización
        </Link>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12 md:px-12 md:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Paso 2 · Resumen
        </p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">Tu pedido.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          Revisa los datos antes de pasar al pago.
        </p>

        {!order ? (
          <div className="mt-12 rounded-[2rem] border border-zinc-200 p-8 text-center">
            <p className="text-lg font-semibold">No hay ningún pedido preparado.</p>
            <Link href="/personalizar" className="mt-6 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white">
              Personalizar tarjeta
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-zinc-200 p-7 md:p-9">
              <h2 className="text-xl font-bold">Configuración</h2>
              <div className="mt-7 space-y-5">
                <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                  <span className="text-zinc-500">Negocio</span>
                  <span className="font-semibold text-right">{order.businessName || "Sin nombre"}</span>
                </div>
                <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                  <span className="text-zinc-500">Destino</span>
                  <span className="font-semibold text-right">{order.linkType}</span>
                </div>
                <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                  <span className="text-zinc-500">Enlace</span>
                  <span className="max-w-[60%] truncate font-semibold text-right">{order.url}</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-zinc-500">Cantidad</span>
                  <span className="font-semibold">{order.quantity}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-zinc-950 p-7 text-white shadow-2xl md:p-9">
              <p className="text-sm text-zinc-400">Resumen del precio</p>
              <div className="mt-8 flex items-end justify-between gap-4">
                <span className="text-zinc-400">{order.quantity} × {PRICE.toFixed(2).replace(".", ",")} €</span>
                <span className="text-4xl font-black">{total.toFixed(2).replace(".", ",")} €</span>
              </div>
              <p className="mt-5 text-sm leading-6 text-zinc-400">
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
