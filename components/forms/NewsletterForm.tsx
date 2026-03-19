"use client";

import { useState, FormEvent } from "react";
import { Send, Mail, CheckCircle, AlertCircle } from "lucide-react";

export type NewsletterStatus = "idle" | "success" | "error";

export interface NewsletterFormProps {
  onSubmit?: (email: string) => Promise<boolean> | boolean;
}

export function NewsletterForm({ onSubmit }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("E-posta adresi gerekli");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Geçerli bir email giriniz");
      return;
    }

    let result = true;
    if (onSubmit) {
      try {
        result = await onSubmit(email);
      } catch {
        result = false;
      }
    }

    if (result) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
      setErrorMessage("Bir hata oluştu, lütfen tekrar deneyin");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-background-light dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col items-center justify-center py-2">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <p className="font-semibold text-primary">Başarıyla abone oldunuz!</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Hoş geldiniz, topluluğumuza katıldığınız için mutluyuz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Mail className="w-4 h-4" />
          </span>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="E-posta adresiniz"
            className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 backdrop-blur-sm transition-all ${
              status === "error"
                ? "border-red-500 focus:ring-red-500"
                : "border-white/20 focus:ring-white/50"
            }`}
          />
        </div>
        <button
          type="submit"
          className="bg-white text-teal-700 font-bold px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors shadow-lg"
        >
          <span>Abone Ol</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
