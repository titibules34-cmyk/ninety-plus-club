import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "90Plus — Sports Betting Login" },
      { name: "description", content: "Log in or sign up to 90Plus to follow live matches and odds." },
      { property: "og:title", content: "90Plus — Sports Betting Login" },
      { property: "og:description", content: "Log in or sign up to 90Plus to follow live matches and odds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const matches = [
  ["Real Madrid", "Barcelona", "2.10", "3.40", "3.20"],
  ["Man City", "Arsenal", "1.85", "3.60", "4.10"],
  ["Inter", "Juventus", "2.30", "3.10", "3.05"],
  ["PSG", "Marseille", "1.55", "4.20", "5.50"],
];

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}*</span>
      <input required type={type} className="mt-1 w-full rounded-md border border-input bg-input/30 px-3 py-2 text-foreground outline-none focus:border-primary" />
    </label>
  );
}

function Index() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [msg, setMsg] = useState("");
  return (
    <div className="min-h-screen pitch-bg">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="font-display text-3xl text-primary">90<span className="text-foreground">PLUS</span></div>
        <span className="text-sm text-muted-foreground">Live · Sports · Casino</span>
      </header>
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_420px]">
        <section>
          <h1 className="font-display text-6xl leading-none">EVERY MINUTE <span className="text-primary">COUNTS</span></h1>
          <p className="mt-4 max-w-md text-muted-foreground">Top football odds, live updates, and instant results — right to the 90th minute and beyond.</p>
          <div className="mt-8 space-y-2">
            {matches.map(([h, a, ...o]) => (
              <div key={h} className="flex items-center justify-between rounded-lg bg-card px-4 py-3">
                <span className="text-sm">{h} <span className="text-muted-foreground">vs</span> {a}</span>
                <div className="flex gap-2">
                  {o.map((v, i) => (
                    <button key={i} className="w-16 rounded bg-secondary py-1 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition">
                      <span className="block text-[10px] opacity-60">{["1", "X", "2"][i]}</span>{v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside className="rounded-xl border border-border bg-card p-6 shadow-glow">
          <div className="mb-6 grid grid-cols-2 rounded-md bg-secondary p-1">
            {(["login", "signup"] as const).map((t) => (
              <button key={t} onClick={() => { setTab(t); setMsg(""); }} className={`rounded py-2 text-sm font-semibold ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                {t === "login" ? "Login" : "Sign up"}
              </button>
            ))}
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setMsg(tab === "login" ? "Username or password incorrect" : "Thanks! Your request was received."); }}>
            {tab === "login" ? (
              <>
                <p className="text-sm text-muted-foreground">Welcome | Please login</p>
                <Field label="Username" />
                <Field label="Password" type="password" />
                <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" className="accent-primary" /> Save device for 30 days</label>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Username" /><Field label="Full name" />
                <Field label="Password" type="password" /><Field label="Retype password" type="password" />
                <Field label="Address" /><Field label="Tel mob" type="tel" />
                <div className="col-span-2"><Field label="E-mail" type="email" /></div>
              </div>
            )}
            {msg && <p className="text-sm text-primary">{msg}</p>}
            <button className="w-full rounded-md bg-primary py-3 font-display text-xl tracking-wide text-primary-foreground hover:opacity-90">{tab === "login" ? "LOGIN" : "SIGN UP"}</button>
          </form>
        </aside>
      </main>
    </div>
  );
}
