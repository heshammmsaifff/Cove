"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaTimes,
  FaPaperPlane,
  FaGift,
  FaLocationArrow,
} from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function HomeContent() {
  const logoRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);

  const searchParams = useSearchParams();
  const table = searchParams.get("table");

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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

        {/* Social Media Links & Buttons */}
        <motion.div
          className="w-full flex flex-col gap-3"
          variants={itemVariants}
        >
          {/* زر العروض المميز - يمرر رقم الطاولة */}
          <Link
            href={table ? `/offers?table=${table}` : "/offers"}
            className="w-full relative flex items-center gap-5 px-6 py-6 rounded-2xl bg-gradient-to-r from-[#b11226] to-[#600000] border border-[#d4a373]/30 shadow-[0_0_20px_rgba(177,18,38,0.3)] active:scale-95 transition-all overflow-hidden group"
          >
            <span className="absolute right-0 top-0 w-24 h-full bg-white/5 skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-700" />
            <div className="relative">
              <div className="absolute inset-0 bg-[#d4a373] blur-lg opacity-40 animate-pulse" />
              <FaGift className="relative text-2xl text-[#d4a373]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-black tracking-[0.15em] uppercase text-white">
                Exclusive Offers
              </span>
              <span className="text-[9px] font-bold text-[#d4a373] uppercase tracking-widest opacity-80">
                Join our VIP club
              </span>
            </div>
          </Link>

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
            href="https://www.tiktok.com/@cove.cafe8?_r=1&_t=ZS-93VJzTjT9K3"
            icon={<FaTiktok />}
          />
          <SocialLink
            label="Digital Menu"
            href="https://drive.google.com/file/d/1Sk8ugGPC8KjuB_XU59za7PC_jej-P-nS/view?usp=drivesdk"
            icon={<MdRestaurantMenu />}
          />

          {/* زر التعليقات - يمرر رقم الطاولة */}
          <SocialLink
            label="Leave a Comment"
            href={table ? `/comment?table=${table}` : "/comment"}
            icon={<BiCommentDetail />}
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="w-full grid grid-cols-2 gap-4"
          variants={itemVariants}
        >
          {/* contact modal */}
          <button
            onClick={() => setActiveModal("contact")}
            className="flex flex-col items-center justify-center gap-2 py-6 rounded-2xl bg-gradient-to-b from-[#1a0505] to-[#0a0a0a] border border-[#800000]/30 shadow-lg active:scale-95 transition-transform"
          >
            <FaPhoneAlt className="text-xl text-[#d4a373]" />
            <span className="text-[11px] uppercase tracking-widest font-black text-white">
              Contact Us
            </span>
          </button>

          {/* location modal */}
          <button
            onClick={() => setActiveModal("location")}
            className="flex flex-col items-center justify-center gap-2 py-6 rounded-2xl bg-gradient-to-b from-[#1a0505] to-[#0a0a0a] border border-[#800000]/30 shadow-lg active:scale-95 transition-transform"
          >
            <FaLocationArrow className="text-xl text-[#d4a373]" />
            <span className="text-[11px] uppercase tracking-widest font-black text-white">
              Location
            </span>
          </button>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-[10px] text-white/30 tracking-[0.3em] uppercase"
        >
          Cove Official Socials {table && `| Table ${table}`}
        </motion.p>
      </motion.div>

      {/* Contact Modal */}
      <AnimatePresence>
        {activeModal === "contact" && (
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

      {/* location modal */}
      <AnimatePresence>
        {activeModal === "location" && (
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
                  Our Location
                </h3>
                <ModalItem
                  title="Branch 1"
                  sub="Faqous - Sharkia"
                  href=" https://maps.app.goo.gl/n9qdXSzBEvuhGCyg9?g_st=iw"
                  icon={<FaLocationArrow color="wheat" />}
                  color="text-green-500"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  );
}

function SocialLink({ label, href, icon }) {
  const isInternal = href.startsWith("/");
  const content = (
    <>
      <span className="text-2xl text-[#d4a373]">{icon}</span>
      <span className="text-xs font-bold tracking-widest uppercase text-white">
        {label}
      </span>
    </>
  );
  const classes =
    "w-full flex items-center gap-5 px-6 py-5 rounded-2xl bg-[#1a0505] border border-white/5 active:bg-[#2a0101] transition-colors shadow-md";

  return isInternal ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {content}
    </a>
  );
}

function ModalItem({ title, sub, href, icon, color = "text-[#d4a373]" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-r from-[#2a0101] to-[#0a0a0a] border border-[#800000]/40 active:border-[#b11226] shadow-inner transition-all"
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
