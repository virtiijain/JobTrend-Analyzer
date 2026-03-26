"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Trend {
  id: string;
  tag: string;
  category: string;
  count: number;
  source: string;
}

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#ec4899", "#f43f5e", "#f97316", "#eab308", "#22c55e"];

export default function Home() {
  const [trends, setTrends] = useState<Trend[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/trends")
      .then((res) => res.json())
      .then((data) => setTrends([...data].sort((a, b) => b.count - a.count)));
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">⚡ TechTrendly</h1>
        <nav className="flex gap-6 text-sm text-gray-400">
          <a href="/" className="hover:text-white">Languages</a>
          <a href="/" className="hover:text-white">Jobs</a>
          <a href="/" className="hover:text-white">Domains</a>
        </nav>
      </header>

      <section className="text-center py-16 px-4">
        <h2 className="text-5xl font-bold mb-4">
          Track What's <span className="text-blue-500">Trending</span> in Tech
        </h2>
        <p className="text-gray-400 text-lg">
          Real-time trends for jobs, languages, domains & technologies
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-8 pb-12">
        <h3 className="text-2xl font-semibold mb-6">📊 Language Popularity</h3>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={trends} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
              <XAxis dataKey="tag" stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 13 }} />
              <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#f9fafb", fontWeight: "bold" }}
                formatter={(value: number) => [`${value.toLocaleString()} repos`, "GitHub Repos"]}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {trends.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 pb-20">
        <h3 className="text-2xl font-semibold mb-6">🔥 Live Rankings</h3>
        <div className="flex flex-col gap-3">
          {trends.map((trend, index) => (
            <div key={trend.id}
              className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 flex items-center justify-between hover:border-blue-500 transition">
              <div className="flex items-center gap-4">
                <span className="text-gray-500 w-6">#{index + 1}</span>
                <span className="font-semibold capitalize">{trend.tag}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-40 bg-gray-800 rounded-full h-2">
                  <div className="h-2 rounded-full transition-all"
                    style={{
                      width: `${(trend.count / trends[0]?.count) * 100}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }} />
                </div>
                <span className="text-gray-400 text-sm w-24 text-right">
                  {trend.count.toLocaleString()} repos
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}