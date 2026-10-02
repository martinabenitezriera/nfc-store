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

const trackingSteps = [
  { label: "Pedido recibido", description: "Hemos recibido tu pedido y toda la configuración de tu tarjeta." },
  { label: "Preparando", description: "Estamos preparando tu tarjeta NFC con las opciones que elegiste." },
  { label: "Enviado", description: "Tu tarjeta ha salido y ya está en camino hacia ti." },
  { label: "Entregado", description: "Tu tarjeta ha llegado. Ya puedes empezar a usarla." },
];

function getTrackingStep(start: Date, now = new Date()) {
  const elapsed = now.getTime() - start.getTime();

  if (elapsed >= 4 * 24 * 60 * 60 * 1000) return 3;
  if (elapsed >= 24 * 60 * 60 * 1000) return 2;
  return 1;
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function PedidoDetallePage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [trackingStep, setTrackingStep] = useState(1);
  const [trackingTimes, setTrackingTimes] = useState<Date[]>([]);
  const [isTestingNfc, setIsTestingNfc] = useState(false);
  const [nfcTested, setNfcTested] = useState(false);

  useEffect(() => {
    const completedOrder = window.localStorage.getItem("nfc-order-complete");
    const savedOrder = window.localStorage.getItem("nfc-order");
    const trackingStart =
      window.localStorage.getItem("nfc-tracking-start") ??
      new Date().toISOString();

    if (!window.localStorage.getItem("nfc-tracking-start")) {
      window.localStorage.setItem("nfc-tracking-start", trackingStart);
    }

    try {
      if (completedOrder) {
        setOrder(JSON.parse(completedOrder));
      } else if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    } catch {
      setOrder(null);
    }

    const base = new Date(trackingStart);

    if (!Number.isNaN(base.getTime())) {
      setTrackingTimes([
        new Date(base),
        new Date(base),
        new Date(base.getTime() + 24 * 60 * 60 * 1000),
        new Date(base.getTime() + 4 * 24 * 60 * 60 * 1000),
      ]);
      setTrackingStep(getTrackingStep(base));

      const interval = window.setInterval(() => {
        setTrackingStep(getTrackingStep(base));
      }, 30000);

      return () => window.clearInterval(interval);
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
          href="/pedidos"
          className="text-sm font-medium text-zinc-600 transition hover:text-black"
        >
          ← Mis pedidos
        </Link>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12 md:px-12 md:py-20">
        {!order ? (
          <div className="rounded-[2rem] border border-zinc-200 p-10 text-center">
            <p className="text-xl font-bold">No hay ningún pedido disponible.</p>
            <Link
              href="/personalizar"
              className="mt-7 inline-flex rounded-full bg-black px-8 py-4 font-semibold text-white"
            >
              Comprar mi tarjeta
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Pedido #NFC-001
            </p>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                  Detalles del pedido.
                </h1>
                <p className="mt-3 text-lg text-zinc-600">
                  Toda la información de tu tarjeta NFC.
                </p>
              </div>

              <span className="inline-flex w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                {trackingSteps[trackingStep].label}
              </span>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[2rem] border border-zinc-200 p-7 md:p-9">
                <h2 className="text-xl font-bold">Detalles</h2>

                <div className="mt-7 space-y-5">
                  <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                    <span className="text-zinc-500">Producto</span>
                    <span className="font-semibold">Tarjeta NFC</span>
                  </div>

                  <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                    <span className="text-zinc-500">Negocio</span>
                    <span className="text-right font-semibold">
                      {order.businessName || "Sin nombre"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                    <span className="text-zinc-500">Destino</span>
                    <span className="text-right font-semibold">{order.linkType}</span>
                  </div>

                  <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                    <span className="text-zinc-500">Enlace</span>
                    <span className="max-w-[60%] truncate text-right font-semibold">
                      {order.url || "Sin enlace"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                    <span className="text-zinc-500">Color</span>
                    <span className="font-semibold">
                      {colorLabels[order.cardColor ?? "emerald"] ?? "Esmeralda"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-6 border-b border-zinc-100 pb-5">
                    <span className="text-zinc-500">Estilo</span>
                    <span className="font-semibold">
                      {styleLabels[order.cardStyle ?? "minimal"] ?? "Minimal"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-6">
                    <span className="text-zinc-500">Cantidad</span>
                    <span className="font-semibold">{order.quantity}</span>
                  </div>
                </div>
              </div>

              <div className="h-fit rounded-[2rem] bg-zinc-950 p-7 text-white shadow-2xl md:p-9">
                <p className="text-sm text-zinc-400">Resumen del pedido</p>

                <div className="mt-8 flex items-end justify-between gap-4">
                  <span className="text-zinc-400">
                    {order.quantity} × {PRICE.toFixed(2).replace(".", ",")} €
                  </span>
                  <span className="text-4xl font-black">
                    {total.toFixed(2).replace(".", ",")} €
                  </span>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Envío</span>
                    <span>Calculado al finalizar</span>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-6 text-zinc-400">
                  El pago real se activará cuando conectemos el proveedor de pagos.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-zinc-200 p-7 md:p-9">
              <h2 className="text-xl font-bold">Seguimiento del pedido</h2>
              <p className="mt-2 text-sm text-zinc-500">
                Estado actual de tu tarjeta NFC.
              </p>

              <div className="mt-8">
                <div className="mb-6 rounded-2xl bg-zinc-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Estado actual</p>
                  <p className="mt-2 text-lg font-black text-zinc-950">{trackingSteps[trackingStep].label}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-500">{trackingSteps[trackingStep].description}</p>
                  {trackingTimes[trackingStep] ? (
                    <p className="mt-3 text-xs font-medium text-zinc-400">
                      Actualizado el {formatDateTime(trackingTimes[trackingStep])}
                    </p>
                  ) : null}
                </div>
                <div className="mb-8 h-2 overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                    style={{ width: `${(trackingStep / (trackingSteps.length - 1)) * 100}%` }}
                  />
                </div>
                <div className="hidden items-start sm:flex">
                  {trackingSteps.map((step, index) => {
                    const active = index <= trackingStep;
                    const current = index === trackingStep;

                    return (
                      <div key={step.label} className="flex flex-1 items-start">
                        <div className="flex flex-1 flex-col items-center text-center">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                              active
                                ? "bg-black text-white"
                                : "border border-zinc-200 bg-white text-zinc-300"
                            }`}
                          >
                            {active ? "✓" : "○"}
                          </div>

                          <p
                            className={`mt-3 text-xs font-semibold ${
                              current ? "text-emerald-700" : active ? "text-zinc-950" : "text-zinc-400"
                            }`}
                          >
                            {step.label}
                          </p>

                          {trackingTimes[index] && active ? (
                            <p className="mt-1 text-[11px] text-zinc-400">
                              {formatDateTime(trackingTimes[index])}
                            </p>
                          ) : null}
                        </div>

                        {index < trackingSteps.length - 1 && (
                          <div
                            className={`mt-5 h-px flex-1 ${
                              index < trackingStep
                                ? "bg-black"
                                : "bg-zinc-200"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3 sm:hidden">
                  {trackingSteps.map((step, index) => {
                    const active = index <= trackingStep;

                    return (
                      <div
                        key={step.label}
                        className={`flex items-center gap-4 rounded-2xl border p-4 ${
                          active
                            ? "border-zinc-200 bg-zinc-50"
                            : "border-zinc-100"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            active
                              ? "bg-black text-white"
                              : "border border-zinc-200 text-zinc-300"
                          }`}
                        >
                          {active ? "✓" : "○"}
                        </div>

                        <span
                          className={`text-sm font-semibold ${
                            active ? "text-zinc-950" : "text-zinc-400"
                          }`}
                        >
                          {step.label}
                        </span>

                        {trackingTimes[index] && active ? (
                          <span className="ml-auto text-xs text-zinc-400">
                            {formatDateTime(trackingTimes[index])}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>


            <div className="mt-8 grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
              <div className="flex items-center justify-center rounded-[2rem] bg-zinc-50 p-8">
                {order.url ? (
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(order.url)}`}
                    alt="Código QR de tu tarjeta NFC"
                    className="h-48 w-48 rounded-2xl bg-white p-3"
                  />
                ) : (
                  <div className="flex h-48 w-48 items-center justify-center rounded-2xl border border-dashed border-zinc-200 text-center text-sm text-zinc-400">
                    No hay un enlace configurado
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center rounded-[2rem] border border-zinc-200 p-7 md:p-9">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Tu tarjeta está activa
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
                  Prueba el mismo enlace con QR.
                </h2>
                <p className="mt-3 leading-7 text-zinc-600">
                  Escanea este código con tu móvil para comprobar que abre exactamente el destino que elegiste para tu tarjeta NFC.
                </p>

                <div className="mt-6 rounded-2xl bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Destino
                  </p>
                  <p className="mt-2 truncate text-sm font-semibold text-zinc-900">
                    {order.url || "Sin enlace"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-zinc-200 p-7 md:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Prueba NFC
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
                Simula cómo funcionará tu tarjeta.
              </h2>
              <p className="mt-3 leading-7 text-zinc-600">
                Acerca el móvil virtualmente a la tarjeta para comprobar la experiencia antes de recibirla.
              </p>

              <div className="mt-7 overflow-hidden rounded-[1.75rem] bg-zinc-950 p-6">
                <div className="flex min-h-[250px] flex-col items-center justify-center">
                  <div className={`relative flex h-36 w-24 items-center justify-center rounded-[1.5rem] border border-white/15 bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-900 shadow-2xl transition duration-700 ${isTestingNfc ? "translate-y-8 rotate-3 scale-95" : ""}`}>
                    <span className="relative text-xs font-black tracking-widest text-white">NFC.</span>
                    {isTestingNfc ? (
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-700 shadow-lg">
                        ✓
                      </span>
                    ) : null}
                  </div>

                  <div className={`mt-3 h-28 w-20 rounded-[1.4rem] border-2 border-white/20 bg-white/10 p-2 transition duration-700 ${isTestingNfc ? "-translate-y-24 opacity-100" : "translate-y-2 opacity-80"}`}>
                    <div className="h-full rounded-[1rem] bg-white p-2">
                      <div className="mx-auto mt-2 h-2 w-8 rounded-full bg-zinc-200" />
                      <div className="mt-5 h-9 rounded-lg bg-emerald-50" />
                      <div className="mt-2 h-2 w-10 rounded bg-zinc-100" />
                    </div>
                  </div>

                  <div className={`mt-4 text-center text-xs font-semibold ${nfcTested ? "text-emerald-300" : "text-zinc-500"}`}>
                    {nfcTested ? "¡Enlace detectado! Tu tarjeta funciona." : isTestingNfc ? "Detectando NFC…" : "Pulsa para probar"}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsTestingNfc(true);
                    setNfcTested(false);
                    window.setTimeout(() => {
                      setIsTestingNfc(false);
                      setNfcTested(true);
                    }, 1200);
                  }}
                  className="mt-5 w-full rounded-full bg-white px-6 py-4 text-sm font-bold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-emerald-50 disabled:cursor-wait disabled:opacity-70"
                  disabled={isTestingNfc}
                >
                  {isTestingNfc ? "Probando tarjeta…" : "Probar mi tarjeta"}
                </button>

                {nfcTested && order.url ? (
                  <a
                    href={order.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Abrir el enlace
                  </a>
                ) : null}
              </div>
            </div>

            <Link
              href="/pedidos"
              className="mt-8 inline-flex rounded-full bg-zinc-950 px-8 py-4 font-semibold text-white transition hover:scale-[1.01] hover:bg-zinc-800"
            >
              ← Volver a mis pedidos
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
