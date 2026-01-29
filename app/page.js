"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GrMapLocation } from "react-icons/gr";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaTimes,
} from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";

import { CiLocationOn } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function HomePage() {
  const logoRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    // حركة اللوجو العائم
    gsap.to(logoRef.current, {
      y: 8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const closeModal = () => setActiveModal(null);

  // إعدادات ظهور العناصر بالترتيب
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
    <main className="min-h-screen flex items-center justify-center px-6 overflow-hidden bg-[radial-gradient(circle_at_top,_#4a0404_0%,_#0a0a0a_100%)]">
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
            href="https://www.facebook.com/profile.php?id=61587289618847&mibextid=wwXIfr&rdid=dx46vV2rnazVuFP7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1MrS5t8v3K%2F%3Fmibextid%3DwwXIfr#"
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
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="w-full grid grid-cols-2 gap-4"
          variants={itemVariants}
        >
          <button
            onClick={() => setActiveModal("location")}
            className="flex flex-col items-center justify-center gap-2 py-6 rounded-2xl bg-gradient-to-b from-[#5a0505] to-[#2a0101] border border-[#800000] shadow-lg active:scale-95 transition-transform"
          >
            <GrMapLocation className="text-2xl text-[#d4a373]" />
            <span className="text-[11px] uppercase tracking-widest font-black text-white">
              Branches
            </span>
          </button>

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
                  {activeModal === "location"
                    ? "Our Locations"
                    : "Direct Contact"}
                </h3>
                {activeModal === "location" ? (
                  <>
                    <ModalItem
                      title="Branch 1"
                      sub="Sharqia – Faqous"
                      href="https://www.google.com/maps/place/Baleno+Cafe+Fakos/@30.727814,31.789743,749m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14f8259719820a55:0x8f394f75ecf36542!8m2!3d30.727814!4d31.789743!16s%2Fg%2F11k6f3mws6!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                      icon={<CiLocationOn />}
                    />
                    <ModalItem
                      title="Branch 2 'take away'"
                      sub="Sharqia – Faqous"
                      href="#" //wait for branch 2 link
                      icon={<CiLocationOn />}
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ... (نفس الـ imports)

function SocialLink({ label, href, icon }) {
  const handleClick = (e) => {
    // إذا كان الرابط مجرد # لا تفعل شيئاً
    if (href === "#") {
      e.preventDefault();
      return;
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      // إضافة خاصية تخبر بعض المتصفحات بفتح الرابط خارج التطبيق
      data-rel="external"
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
