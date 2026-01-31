"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function CommentContent() {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [status, setStatus] = useState("idle");

  const searchParams = useSearchParams();
  const tableNumber = searchParams.get("table");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const payload = {
      name: formData.name,
      message: tableNumber
        ? `TABLE_ID: ${tableNumber} | COMMENT: ${formData.message}`
        : formData.message,
    };

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm"
    >
      <Link
        href={tableNumber ? `/?table=${tableNumber}` : "/"}
        className="inline-flex items-center gap-2 text-[#d4a373] mb-6 text-sm hover:opacity-70 transition-opacity uppercase tracking-widest"
      >
        <FaArrowLeft size={12} /> Back
      </Link>

      <div className="bg-[#1a0505]/80 backdrop-blur-xl border border-[#800000]/50 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <h2 className="text-2xl font-black mb-2 uppercase tracking-widest text-center text-white">
          Guest Book
        </h2>
        <p className="text-[#d4a373]/60 text-[10px] mb-8 uppercase tracking-[0.2em] text-center">
          {tableNumber
            ? `Sharing from Table ${tableNumber}`
            : "Share your experience"}
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-white">
                Message Sent!
              </h3>
              <p className="text-white/50 text-xs mb-6">
                Thank you for your feedback.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-[#d4a373] text-xs font-bold uppercase border-b border-[#d4a373] pb-1"
              >
                Send another?
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full bg-black/40 border border-[#800000]/30 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#d4a373] transition-all"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              <textarea
                required
                rows="4"
                placeholder="Tell us something..."
                className="w-full bg-black/40 border border-[#800000]/30 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#d4a373] transition-all resize-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-gradient-to-r from-[#5a0505] to-[#800000] text-white rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 border border-white/5 shadow-xl uppercase tracking-widest text-xs"
              >
                {status === "loading" ? (
                  "Sending..."
                ) : (
                  <>
                    Send to Cove <FaPaperPlane size={14} />
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-red-500 text-[10px] text-center uppercase font-bold">
                  Error! Try again later.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function CommentPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[radial-gradient(circle_at_top,_#4a0404_0%,_#0a0a0a_100%)] text-white">
      <Suspense
        fallback={
          <div className="text-[#d4a373] animate-pulse">Loading...</div>
        }
      >
        <CommentContent />
      </Suspense>
    </main>
  );
}
