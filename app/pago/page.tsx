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

const paymentOptions = [
  {
    id: "card",
    label: "Tarjeta bancaria",
    description: "Visa, Mastercard o similar",
    icon: "💳",
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Paga con tu cuenta de PayPal",
    icon: "P",
  },
  {
    id: "apple",
    label: "Apple Pay",
    description: "Paga rápidamente con Apple Pay",
    icon: "",
  },
];

export default function PagoPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [purchaseComplete, setPurchaseComplete] = useState(false);

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

  const total = order ? order.quantity * PRICE : 0;

  const completePurchase = () => {
    const savedOrder = window.localStorage.getItem("nfc-order");

    if (savedOrder) {
      window.localStorage.setItem("nfc-order-complete", savedOrder);
      window.localStorage.setItem(
        "nfc-tracking-start",
        new Date().toISOString()
      );
    }

    setPurchaseComplete(true);
  };

  if (purchaseComplete) {
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
            Volver al inicio
          </Link>
        </nav>

        <section className="mx-auto flex min-h-[calc(100vh-82px)] max-w-4xl items-center px-6 py-16 md:px-12">
          <div className="w-full rounded-[2.5rem] bg-zinc-950 px-7 py-12 text-white shadow-2xl md:px-14 md:py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-black">
              ✓
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Pedido preparado
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              Tu tarjeta está lista.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              Hemos preparado tu compra. El cobro real se activará cuando
              conectemos el proveedor de pagos.
            </p>

            <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Resumen del pedido
                  </p>
                  <h2 className="mt-3 text-xl font-bold">Tu tarjeta NFC</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    Personalizada · {order?.quantity ?? 1} unidad
                    {(order?.quantity ?? 1) !== 1 ? "es" : ""}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-2xl font-black">
                    {total.toFixed(2).replace(".", ",")} €
                  </p>
                  <p className="mt-2 inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300">
                    Pago pendiente de conexión
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["✓", "Tarjeta configurada"],
                ["✓", "Pedido preparado"],
                ["✓", "Pago pendiente"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5"
                >
                  <p className="text-xl">{icon}</p>
                  <p className="mt-3 text-sm font-semibold">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="rounded-full bg-white px-7 py-4 text-center font-semibold text-black transition hover:scale-[1.01]"
              >
                Volver al inicio
              </Link>
              <Link
                href="/personalizar"
                className="rounded-full border border-white/15 px-7 py-4 text-center font-semibold transition hover:bg-white/10"
              >
                Crear otra tarjeta
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-white text-zinc-950">
        <nav className="flex items-center justify-between border-b border-zinc-100 px-6 py-5 md:px-12">
          <Link href="/" className="text-2xl font-black tracking-tight">
            NFC.
          </Link>
          <Link
            href="/resumen"
            className="text-sm font-medium text-zinc-600 transition hover:text-black"
          >
            ← Volver al resumen
          </Link>
        </nav>

        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="text-4xl font-black tracking-tight">
            No hay ningún pedido preparado.
          </h1>
          <Link
            href="/personalizar"
            className="mt-8 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white"
          >
            Crear mi tarjeta
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <nav className="flex items-center justify-between border-b border-zinc-100 px-6 py-5 md:px-12">
        <Link href="/" className="text-2xl font-black tracking-tight">
          NFC.
        </Link>
        <Link
          href="/resumen"
          className="text-sm font-medium text-zinc-600 transition hover:text-black"
        >
          ← Volver al resumen
        </Link>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Paso 3 · Pago
            </p>

            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              ¿Cómo quieres pagar?
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Elige tu método de pago. Por ahora, esta pantalla es una
              simulación.
            </p>

            <div className="mt-10 space-y-4">
              {paymentOptions.map((option) => {
                const selected = selectedPayment === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedPayment(option.id)}
                    className={`flex w-full items-center gap-5 rounded-[1.75rem] border p-5 text-left transition-all duration-200 md:p-6 ${
                      selected
                        ? "border-zinc-950 bg-zinc-950 text-white shadow-xl"
                        : "border-zinc-200 bg-white hover:border-zinc-400 hover:bg-zinc-50"
                    }`}
                  >
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-black ${
                        selected
                          ? "bg-white text-black"
                          : "bg-zinc-100 text-zinc-950"
                      }`}
                    >
                      {option.icon}
                    </div>

                    <div className="flex-1">
                      <p className="font-bold">{option.label}</p>
                      <p
                        className={`mt-1 text-sm ${
                          selected ? "text-zinc-300" : "text-zinc-500"
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>

                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        selected
                          ? "border-white bg-white text-black"
                          : "border-zinc-300"
                      }`}
                    >
                      {selected && (
                        <span className="text-xs font-black">✓</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 rounded-[1.75rem] bg-zinc-50 p-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
                  🔒
                </div>
                <div>
                  <p className="font-bold">Pago seguro</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    El pago real se conectará más adelante. Ningún cobro se
                    realizará durante esta simulación.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={completePurchase}
              className="mt-7 w-full rounded-[1.75rem] bg-zinc-950 px-7 py-5 text-lg font-bold text-white transition hover:scale-[1.01] hover:bg-zinc-800"
            >
              Finalizar compra · {total.toFixed(2).replace(".", ",")} €
            </button>
          </div>

          <aside className="h-fit rounded-[2rem] bg-zinc-950 p-7 text-white shadow-2xl md:sticky md:top-8 md:p-9">
            <p className="text-sm text-zinc-400">Tu pedido</p>

            <div className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold">
                    {order.businessName || "Tu negocio"}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Tarjeta NFC personalizada
                  </p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                  ×{order.quantity}
                </span>
              </div>
            </div>

            <div className="mt-7 space-y-4 border-b border-white/10 pb-7">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-400">Tarjetas</span>
                <span>{total.toFixed(2).replace(".", ",")} €</span>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-400">Envío</span>
                <span>Calculado al finalizar</span>
              </div>
            </div>

            <div className="mt-7 flex items-end justify-between gap-4">
              <span className="text-zinc-400">Total</span>
              <span className="text-4xl font-black">
                {total.toFixed(2).replace(".", ",")} €
              </span>
            </div>

            <Link
              href="/resumen"
              className="mt-7 block text-center text-sm font-semibold text-zinc-400 transition hover:text-white"
            >
              ← Editar pedido
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
