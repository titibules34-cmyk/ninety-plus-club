import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LoginApp" },
      { name: "description", content: "Welcome | Please login" },
      { property: "og:title", content: "LoginApp" },
      { property: "og:description", content: "Welcome | Please login" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState<"" | "user" | "pass" | "login">("");
  const submit = () => setErr(!u ? "user" : !p ? "pass" : "login");
  return (
    <div className="login-screen">
      <div className="login-box">
        <span className="login-title">Welcome &nbsp;| &nbsp;Please login</span>
        <div className="login-input">
          <input className={u ? "has-val" : ""} placeholder="Username" value={u} onChange={(e) => setU(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
          <i className="material-icons">account_circle</i>
        </div>
        <div className="login-error">{err === "user" && <span>*Enter your username</span>}</div>
        <div className="login-input">
          <input type="password" className={p ? "has-val" : ""} placeholder="Password" value={p} onChange={(e) => setP(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
          <i className="material-icons">lock_outline</i>
        </div>
        <div className="login-error">
          {err === "pass" && <span>*Enter your password</span>}
          {err === "login" && <span>*Username or password incorrect</span>}
        </div>
        <button className="login-btn" onClick={submit}>Login</button>
      </div>
    </div>
  );
}
