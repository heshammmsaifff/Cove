"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaArrowLeft,
  FaUser,
  FaCheckCircle,
  FaHome,
} from "react-icons/fa";
import Link from "next/link";

export default function OffersPage() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || formData.phone.length !== 11) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          message: `SUBSCRIPTION_REQUEST: +2${formData.phone}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[radial-gradient(circle_at_top,_#4a0404_0%,_#0a0a0a_100%)] overflow-hidden">
      {/* Back Button - يختفي عند النجاح لتركيز الانتباه على رسالة الشكر */}
      <AnimatePresence>
        {status !== "success" && (
          <motion.div exit={{ opacity: 0, x: -20 }}>
            <Link
              href="/"
              className="absolute top-10 left-6 text-[#d4a373] flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-white transition-colors"
            >
              <FaArrowLeft /> Back
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-sm relative">
        <AnimatePresence mode="wait">
          {/* الحالة الأولى: فورم الاشتراك */}
          {status !== "success" ? (
            <motion.div
              key="form-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              className="bg-[#1a0505] border border-[#800000]/30 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#800000] blur-[60px] opacity-20" />

              <div className="text-center mb-8">
                <h2 className="text-[#d4a373] text-2xl font-black mb-2 tracking-tighter uppercase">
                  Offers Subscription
                </h2>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                  The finest deals, straight to you
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative flex items-center">
                  <FaUser className="absolute left-4 text-[#d4a373] text-sm opacity-50" />
                  <input
                    type="text"
                    placeholder="YOUR FULL NAME"
                    required
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:outline-none focus:border-[#d4a373]/50 transition-all placeholder:text-white/10"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="relative flex items-center">
                  <span className="absolute left-4 text-[#d4a373] font-bold text-sm pointer-events-none">
                    +2
                  </span>
                  <input
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    minLength={11}
                    maxLength={11}
                    required
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:outline-none focus:border-[#d4a373]/50 transition-all placeholder:text-white/10"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-gradient-to-r from-[#800000] to-[#b11226] rounded-2xl text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(177,18,38,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe Now <FaPaperPlane className="text-[10px]" />
                    </>
                  )}
                </button>
              </form>

              {status === "error" && (
                <p className="text-[10px] text-red-500 mt-4 text-center uppercase font-bold tracking-[0.2em]">
                  Connection error. Please try again.
                </p>
              )}
            </motion.div>
          ) : (
            /* الحالة الثانية: صفحة النجاح (Thank You Page) */
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-[#1a0505] border border-[#d4a373]/20 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden text-center flex flex-col items-center"
            >
              {/* عناصر زينة خلفية */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#d4a373] blur-[70px] opacity-10" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6 relative"
              >
                <div className="absolute inset-0 bg-[#d4a373] blur-2xl opacity-20 animate-pulse" />
                <FaCheckCircle className="text-6xl text-[#d4a373] relative" />
              </motion.div>

              <h2 className="text-white text-3xl font-black mb-3 tracking-tighter uppercase">
                You're In!
              </h2>

              <p className="text-[#d4a373] text-[11px] uppercase tracking-[0.3em] font-bold mb-8 leading-relaxed">
                Thank you,{" "}
                <span className="text-white">
                  {formData.name.split(" ")[0]}
                </span>
                .<br />
                Your subscription is confirmed.
              </p>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4a373]/30 to-transparent mb-8" />

              <Link
                href="/"
                className="group w-full z-50 py-4 bg-white rounded-2xl text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#d4a373] hover:text-white transition-all duration-300"
              >
                <FaHome className="group-hover:-translate-y-1 transition-transform" />
                Return to Home
              </Link>

              <p className="mt-6 text-[9px] text-white/20 uppercase tracking-[0.1em]">
                Prepare for something special
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
