"use client";

import { useState } from "react";
import Link from "next/link";

type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
};

export default function PagoPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: "card-1",
      brand: "VISA",
      last4: "4242",
      expiry: "12/28",
    },
  ]);
  const [defaultId, setDefaultId] = useState("card-1");
  const [showForm, setShowForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const addCard = () => {
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 4) return;

    const id = `card-${Date.now()}`;
    const newCard: PaymentMethod = {
      id,
      brand: "VISA",
      last4: digits.slice(-4),
      expiry: expiry || "12/28",
    };

    setMethods((current) => [...current, newCard]);
    setDefaultId(id);
    setCardNumber("");
    setExpiry("");
    setShowForm(false);
  };

  const removeCard = (id: string) => {
    setMethods((current) => {
      const next = current.filter((method) => method.id !== id);
      if (defaultId === id && next.length > 0) {
        setDefaultId(next[0].id);
      }
      return next;
    });
  };

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

      <section className="mx-auto max-w-4xl px-6 py-12 md:px-12 md:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Paso 3 · Pago
        </p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">
          Métodos de pago.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          Guarda tu tarjeta para tenerla lista cuando conectemos el pago real.
        </p>

        <div className="mt-12 space-y-5">
          {methods.map((method) => (
            <div
              key={method.id}
              className="rounded-[2rem] border border-zinc-200 p-6 transition hover:border-zinc-300 md:p-7"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-20 items-center justify-center rounded-xl bg-zinc-950 text-sm font-black tracking-widest text-white">
                    {method.brand}
                  </div>
                  <div>
                    <p className="font-bold">•••• •••• •••• {method.last4}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Caduca {method.expiry}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {defaultId === method.id && (
                    <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700">
                      Predeterminada
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeCard(method.id)}
                    className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold transition hover:border-red-200 hover:text-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              {defaultId !== method.id && (
                <button
                  type="button"
                  onClick={() => setDefaultId(method.id)}
                  className="mt-5 text-sm font-semibold underline underline-offset-4"
                >
                  Usar como predeterminada
                </button>
              )}
            </div>
          ))}

          {showForm ? (
            <div className="rounded-[2rem] bg-zinc-950 p-7 text-white shadow-2xl md:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Nueva tarjeta
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_160px]">
                <input
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  placeholder="Número de tarjeta"
                  inputMode="numeric"
                  className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 outline-none placeholder:text-zinc-500 focus:border-white/40"
                />
                <input
                  value={expiry}
                  onChange={(event) => setExpiry(event.target.value)}
                  placeholder="MM/AA"
                  className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 outline-none placeholder:text-zinc-500 focus:border-white/40"
                />
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={addCard}
                  className="rounded-full bg-white px-7 py-3.5 font-semibold text-black transition hover:scale-[1.01]"
                >
                  Guardar tarjeta
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-full border border-white/15 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="flex w-full items-center justify-center rounded-[2rem] border border-dashed border-zinc-300 px-6 py-8 font-semibold transition hover:border-zinc-500 hover:bg-zinc-50"
            >
              + Añadir método de pago
            </button>
          )}
        </div>

        <div className="mt-10 rounded-[2rem] bg-zinc-50 p-6 md:p-7">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
              🔒
            </div>
            <div>
              <p className="font-bold">Pago seguro</p>
              <p className="mt-1 text-sm leading-6 text-zinc-500">
                Esta pantalla es una simulación. El cobro real se conectará
                posteriormente mediante el proveedor de pagos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
