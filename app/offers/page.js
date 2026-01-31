"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGift,
  FaArrowLeft,
  FaCheckCircle,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function OffersContent() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState("idle");

  const searchParams = useSearchParams();
  const tableNumber = searchParams.get("table");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // هنا نرسل الكلمة المفتاحية SUBSCRIPTION_REQUEST ليتعرف عليها الـ API
    const payload = {
      name: formData.name,
      message: tableNumber
        ? `TABLE_ID: ${tableNumber} | SUBSCRIPTION_REQUEST: ${formData.phone}`
        : `SUBSCRIPTION_REQUEST: ${formData.phone}`,
    };

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-sm"
    >
      <Link
        href={tableNumber ? `/?table=${tableNumber}` : "/"}
        className="inline-flex items-center gap-2 text-[#d4a373] mb-6 text-sm hover:opacity-70 transition-opacity uppercase tracking-widest"
      >
        <FaArrowLeft size={12} /> Back
      </Link>

      <div className="bg-[#1a0505]/80 backdrop-blur-xl border border-[#d4a373]/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* زينة في الخلفية */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4a373]/5 rounded-full blur-3xl -mr-16 -mt-16" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#d4a373] to-[#b11226] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
            <FaGift className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-white">
            VIP Club
          </h2>
          <p className="text-[#d4a373]/60 text-[10px] mt-2 uppercase tracking-[0.2em]">
            Join for exclusive member offers
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6"
            >
              <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-white">
                Welcome to the Club!
              </h3>
              <p className="text-white/50 text-xs mb-6">
                You will receive our latest offers soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-[#d4a373] text-xs font-bold uppercase border-b border-[#d4a373] pb-1"
              >
                Register another?
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div className="space-y-4">
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4a373]/40 text-sm" />
                  <input
                    type="text"
                    required
                    placeholder="FULL NAME"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 pl-12 text-sm focus:outline-none focus:border-[#d4a373] transition-all text-white placeholder:text-white/20"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4a373]/40 text-xs font-bold">
                    <FaWhatsapp size={18} />
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="WHATSAPP NUMBER"
                    minLength={11}
                    maxLength={11}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 pl-12 text-sm focus:outline-none focus:border-[#d4a373] transition-all text-white placeholder:text-white/20"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-5 bg-gradient-to-r from-[#d4a373] to-[#b48c5e] text-[#1a0505] rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all disabled:opacity-50 mt-2"
              >
                {status === "loading" ? "Processing..." : "Get Special Access"}
              </button>

              <p className="text-[8px] text-center text-white/30 uppercase tracking-widest mt-2">
                By joining, you agree to receive promotional messages
              </p>

              {status === "error" && (
                <p className="text-red-500 text-[10px] text-center uppercase font-bold">
                  Connection error. Try again.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function OffersPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[radial-gradient(circle_at_top,_#4a0404_0%,_#0a0a0a_100%)] text-white">
      <Suspense
        fallback={
          <div className="text-[#d4a373] animate-pulse uppercase text-xs tracking-widest">
            Loading Offers...
          </div>
        }
      >
        <OffersContent />
      </Suspense>
    </main>
  );
}
