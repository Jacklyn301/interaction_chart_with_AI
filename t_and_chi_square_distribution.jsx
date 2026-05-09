import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// ==== Math utils ==========================================================
// Lanczos approximation for log Gamma to keep PDFs stable in tails
function logGamma(z: number): number {
  const p = [
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  const g = 7;
  if (z < 0.5) {
    // Reflection formula
    return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
  }
  z -= 1;
  let x = 0.99999999999980993;
  for (let i = 0; i < p.length; i++) x += p[i] / (z + i + 1);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

function stdNormalPdf(x: number) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

// Student-t PDF with df = v
function tPdf(x: number, v: number) {
  const logC = logGamma((v + 1) / 2) - logGamma(v / 2) - 0.5 * (Math.log(v) + Math.log(Math.PI));
  const logVal = logC - ((v + 1) / 2) * Math.log(1 + (x * x) / v);
  return Math.exp(logVal);
}

// Chi-square PDF with k degrees of freedom
function chi2Pdf(x: number, k: number) {
  if (x <= 0) return 0;
  const logC = - (k / 2) * Math.log(2) - logGamma(k / 2);
  const logVal = logC + (k / 2 - 1) * Math.log(x) - x / 2;
  return Math.exp(logVal);
}

// Prepare curve data for charts
function buildCurve({ kind, df, step = 0.02 }: { kind: "t" | "chi2"; df: number; step?: number }) {
  const data: { x: number; y: number; y2?: number }[] = [];
  if (kind === "t") {
    const xMin = -5, xMax = 5;
    for (let x = xMin; x <= xMax; x += step) {
      data.push({ x, y: tPdf(x, df), y2: stdNormalPdf(x) });
    }
  } else {
    // chi-square
    const mean = df;
    const xMax = Math.max(0, mean + 6 * Math.sqrt(2 * df)); // wide enough
    const localStep = Math.max(0.01, xMax / 600);
    for (let x = 0; x <= xMax; x += localStep) {
      data.push({ x, y: chi2Pdf(x, df) });
    }
  }
  return data;
}

export default function DistPlayground() {
  // UI state
  const [tab, setTab] = useState<"t" | "chi2">("t");
  const [df, setDf] = useState(2); // df = n-1
  const [autoPlay, setAutoPlay] = useState(false);
  const [speed, setSpeed] = useState(400);

  // autoplay degrees of freedom just for flair
  useEffect(() => {
    if (!autoPlay) return;
    const id = window.setInterval(() => {
      setDf((d) => (d >= 60 ? 1 : d + 1));
    }, speed);
    return () => clearInterval(id);
  }, [autoPlay, speed]);

  const curve = useMemo(() => buildCurve({ kind: tab, df }), [tab, df]);

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">t 分布 & χ² 分布：看自由度（df = n − 1）怎麼改變曲線</h1>
            <p className="text-neutral-400 mt-1">
              左上角選擇分布類型；用滑桿改 df。t 分布會隨 df 變大貼近標準常態；χ² 分布則變得更寬、更往右移。
            </p>
          </div>
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2 mt-2">
            <button onClick={() => setAutoPlay((v) => !v)} className={`px-4 py-2 rounded-2xl font-medium shadow ${autoPlay ? "bg-rose-600 hover:bg-rose-500" : "bg-emerald-600 hover:bg-emerald-500"}`}>
              {autoPlay ? "停止動畫" : "自動遞增 df"}
            </button>
            <input
              type="number"
              className="w-24 bg-neutral-800 rounded-xl p-2 outline-none"
              value={speed}
              min={80}
              step={20}
              onChange={(e) => setSpeed(Math.max(40, parseInt(e.target.value) || 0))}
            />
          </motion.div>
        </header>

        {/* Controls */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="bg-neutral-900 rounded-2xl p-3 shadow">
              <div className="flex gap-2">
                <button onClick={() => setTab("t")} className={`flex-1 px-3 py-2 rounded-xl ${tab === "t" ? "bg-white/10" : "bg-neutral-800 hover:bg-neutral-700"}`}>t 分布</button>
                <button onClick={() => setTab("chi2")} className={`flex-1 px-3 py-2 rounded-xl ${tab === "chi2" ? "bg-white/10" : "bg-neutral-800 hover:bg-neutral-700"}`}>χ² 分布</button>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-2xl p-4 shadow grid gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">自由度 df = n − 1</span>
                <span className="font-mono">{df}</span>
              </div>
              <input type="range" min={1} max={60} value={df} onChange={(e) => setDf(parseInt(e.target.value))} className="accent-emerald-500" />
              <div className="text-xs text-neutral-500">n = {df + 1}</div>
              {tab === "chi2" && (
                <div className="text-xs text-neutral-500">χ² 的平均 = df，方差 = 2·df。右側橘線顯示平均。</div>
              )}
              {tab === "t" && (
                <ul className="text-xs text-neutral-400 list-disc pl-4">
                  <li>df=1（Cauchy 尾超重）；df≈30 後已非常接近常態。</li>
                  <li>白色曲線：標準常態 N(0,1) 參考。</li>
                </ul>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="md:col-span-2 bg-neutral-900 rounded-2xl p-4 shadow">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-semibold">{tab === "t" ? `t 分布（df=${df})` : `χ² 分布（df=${df})`}</h2>
            </div>
            <div className="h-[420px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={curve} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="x" type="number" stroke="#bbb" tickFormatter={(v) => (tab === "chi2" ? v.toFixed(0) : v.toFixed(1))} label={{ value: tab === "t" ? "x" : "x (≥ 0)", position: "insideBottom", offset: -10, fill: "#aaa" }} />
                  <YAxis stroke="#bbb" width={60} tickFormatter={(v) => v.toFixed(2)} />
                  <Tooltip cursor={{ stroke: "#555" }} formatter={(v: any, n) => [v, n === "y2" ? "N(0,1)" : "pdf"]} labelFormatter={(l) => `${tab === "t" ? "x" : "x"} = ${(+l).toFixed(tab === "t" ? 2 : 0)}`} />
                  <Line type="monotone" dataKey="y" stroke="#60a5fa" strokeWidth={2.2} dot={false} name="pdf" />
                  {tab === "t" && <Line type="monotone" dataKey="y2" stroke="#ffffff" strokeDasharray="4 4" dot={false} name="N(0,1)" />}
                  {tab === "chi2" && <ReferenceLine x={df} stroke="#f97316" strokeDasharray="4 4" />}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <footer className="text-xs text-neutral-500">Made by your emotionally exhausted TA — Weary Will.</footer>
      </div>
    </div>
  );
}
