"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";

export default function HomePage() {
  const logoRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    gsap.to(logoRef.current, {
      y: 8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const closeModal = () => setActiveModal(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10 overflow-x-hidden bg-[radial-gradient(circle_at_top,_#4a0404_0%,_#0a0a0a_100%)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm flex flex-col items-center gap-5"
      >
        {/* Logo */}
        <motion.div
          ref={logoRef}
          variants={itemVariants}
          className="drop-shadow-[0_0_20px_rgba(180,0,0,0.4)]"
        >
          <Image
            src="/logo-cove.png"
            alt="Cove Logo"
            width={400}
            height={90}
            className="-mt-10 mb-2"
            priority
          />
        </motion.div>

        {/* --- الإضافة المطلوبة: حقل العروض --- */}
        <motion.div variants={itemVariants} className="w-full">
          <OffersInput />
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          className="w-full flex flex-col gap-3"
          variants={itemVariants}
        >
          <SocialLink
            label="Instagram"
            href="https://www.instagram.com/cove_cafe1?igsh=MXM1cXIwdDh3d25ndg=="
            icon={<FaInstagram />}
          />
          <SocialLink
            label="Facebook"
            href="https://www.facebook.com/profile.php?id=61587289618847&mibextid=wwXIfr"
            icon={<FaFacebookF />}
          />
          <SocialLink
            label="TikTok"
            href="https://www.tiktok.com/@cove.cafe8?_r=1&_t=ZS-93To7q5XBDk"
            icon={<FaTiktok />}
          />
          <SocialLink
            label="Menu"
            href="https://drive.google.com/file/d/1Sk8ugGPC8KjuB_XU59za7PC_jej-P-nS/view?usp=drivesdk"
            icon={<MdRestaurantMenu />}
          />
          <SocialLink
            label="Leave a Comment"
            href="/comment"
            icon={<BiCommentDetail />}
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="w-full grid grid-cols-1 gap-4"
          variants={itemVariants}
        >
          <button
            onClick={() => setActiveModal("contact")}
            className="flex flex-col items-center justify-center gap-2 py-6 rounded-2xl bg-gradient-to-b from-[#5a0505] to-[#2a0101] border border-[#800000] shadow-lg active:scale-95 transition-transform"
          >
            <FaPhoneAlt className="text-xl text-[#d4a373]" />
            <span className="text-[11px] uppercase tracking-widest font-black text-white">
              Contact
            </span>
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className="mt-4 text-[10px] text-white/30 tracking-[0.3em] uppercase"
        >
          Cove Official Socials
        </motion.p>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-sm bg-[#1a0505] border-t sm:border border-[#800000] p-8 rounded-t-[2.5rem] sm:rounded-[2.5rem] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6 sm:hidden" />
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-white/50 hover:text-white"
              >
                <FaTimes size={20} />
              </button>

              <div className="flex flex-col gap-4">
                <h3 className="text-[#d4a373] font-black text-center mb-4 tracking-widest uppercase text-sm">
                  Direct Contact
                </h3>
                <ModalItem
                  title="WhatsApp"
                  sub="01031006308"
                  href="https://wa.me/201031006308"
                  icon={<FaWhatsapp />}
                  color="text-green-500"
                />
                <ModalItem
                  title="Phone Call"
                  sub="01031006308"
                  href="tel:01031006308"
                  icon={<FaPhoneAlt />}
                  color="text-blue-400"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// --- Components ---

function OffersInput() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "OFFERS SUBSCRIPTION",
          message: `Phone: ${phone}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setPhone("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("idle");
      }
    } catch (err) {
      setStatus("idle");
    }
  };

  return (
    <div className="w-full bg-[#1a0505] border border-[#800000]/30 rounded-[2rem] p-5 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#800000] blur-[50px] opacity-20" />
      <label className="block text-[10px] text-[#d4a373] uppercase tracking-[0.2em] mb-3 ml-1 font-bold">
        To get our offers put your number
      </label>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        {/* كود الدولة الثابت */}
        <span className="absolute left-4 text-[#d4a373] font-bold text-sm pointer-events-none">
          +2
        </span>

        <input
          type="tel"
          placeholder="01xxxxxxxxx"
          minLength={11}
          maxLength={11}
          required
          className="w-full bg-black/40 border border-white/5 rounded-xl py-3.5 pl-10 pr-12 text-white text-sm focus:outline-none focus:border-[#d4a373]/50 transition-all placeholder:text-white/10"
          value={phone}
          onChange={(e) => {
            // منع المستخدم من كتابة أي شيء غير الأرقام
            const val = e.target.value.replace(/\D/g, "");
            setPhone(val);
          }}
        />

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="absolute right-1.5 p-2.5 bg-[#800000] rounded-lg text-white hover:bg-[#a00000] active:scale-90 transition-all disabled:bg-green-700 disabled:opacity-80"
        >
          {status === "loading" ? (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : status === "success" ? (
            <FaPaperPlane className="scale-90" />
          ) : (
            <FaPaperPlane />
          )}
        </button>
      </form>
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] text-green-500 mt-2 ml-1 uppercase font-bold tracking-widest"
        >
          Sent successfully!
        </motion.p>
      )}
    </div>
  );
}

function SocialLink({ label, href, icon }) {
  const isInternal = href.startsWith("/");

  const handleClick = (e) => {
    if (href === "#") {
      e.preventDefault();
      return;
    }
  };

  if (isInternal) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className="w-full flex items-center gap-5 px-6 py-5 rounded-2xl bg-[#1a0505] border border-white/5 active:bg-[#3a0505] transition-colors shadow-md"
      >
        <span className="text-2xl text-[#d4a373]">{icon}</span>
        <span className="text-xs font-bold tracking-widest uppercase text-white">
          {label}
        </span>
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center gap-5 px-6 py-5 rounded-2xl bg-[#1a0505] border border-white/5 active:bg-[#3a0505] transition-colors shadow-md"
    >
      <span className="text-2xl text-[#d4a373]">{icon}</span>
      <span className="text-xs font-bold tracking-widest uppercase text-white">
        {label}
      </span>
    </a>
  );
}

function ModalItem({ title, sub, href, icon, color = "text-[#d4a373]" }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-r from-[#2a0101] to-[#0a0a0a] border border-[#800000]/40 active:border-[#b11226] shadow-inner"
    >
      <div className={`text-2xl ${color}`}>{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-white tracking-wide">
          {title}
        </span>
        <span className="text-[10px] text-[#d4a373]/70 mt-1 uppercase tracking-wider">
          {sub}
        </span>
      </div>
    </a>
  );
}
