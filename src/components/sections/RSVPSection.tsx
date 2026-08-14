"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { getLucideIcon } from "@/lib/utils";
import { RSVPData, WishItem } from "@/types";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const ATTENDANCE_OPTIONS = [
  { value: "hadir", label: "Hadir", icon: "CheckCircle" },
  { value: "tidak_hadir", label: "Tidak Hadir", icon: "XCircle" },
  { value: "masih_ragu", label: "Masih Ragu", icon: "HelpCircle" },
];

const CheckIcon = getLucideIcon("CheckCircle");
const UserIcon = getLucideIcon("User");
const UsersIcon = getLucideIcon("Users");
const MessageIcon = getLucideIcon("MessageCircle");
const AlertIcon = getLucideIcon("AlertCircle");

const attendanceIconMap = Object.fromEntries(
  ATTENDANCE_OPTIONS.map((option) => [option.icon, getLucideIcon(option.icon)]),
);

const attendanceBadgeStyle: Record<WishItem["attendance"], string> = {
  hadir: "text-green-600 border-green-500/30 bg-green-500/10",
  tidak_hadir: "text-red-600 border-red-500/30 bg-red-500/10",
  masih_ragu: "text-yellow-600 border-yellow-500/30 bg-yellow-500/10",
};

const attendanceBadgeLabel: Record<WishItem["attendance"], string> = {
  hadir: "Hadir",
  tidak_hadir: "Tidak Hadir",
  masih_ragu: "Masih Ragu",
};

function CornerOrnament({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
    >
      <path d="M4 4 Q4 16 16 16 Q4 16 4 28" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
      <path d="M9 9 Q13 11 12 16 Q10 12 6 13" strokeLinecap="round" />
      <path d="M9 9 Q11 13 16 12 Q12 10 13 6" strokeLinecap="round" />
    </svg>
  );
}

export function RSVPSection() {
  const [form, setForm] = useState<RSVPData>({
    name: "",
    attendance: "hadir",
    guestCount: 1,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWishes = async () => {
      try {
        const res = await fetch("/api/wishes");
        const data = await res.json();
        setWishes(data.wishes || []);
      } catch {
        console.error("Gagal memuat ucapan");
      }
    };
    loadWishes();
  }, []);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.message.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          message: form.message,
          attendance: form.attendance,
          guestCount: form.guestCount,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal mengirim ucapan. Silakan coba lagi.");
        return;
      }
      if (data.wish) setWishes([data.wish, ...wishes]);
      setSubmitted(true);
    } catch {
      setError(
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: "", attendance: "hadir", guestCount: 1, message: "" });
    setSubmitted(false);
    setError(null);
  };

  return (
    <SectionWrapper id="rsvp" variant="cream">
      <div className="container-wedding px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-primary mb-3 font-sans font-medium">
            RSVP
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Konfirmasi Kehadiran
          </h2>
          <p className="text-muted-foreground text-sm font-sans mt-3 max-w-sm mx-auto">
            Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i agar kami dapat
            mempersiapkan segalanya dengan baik
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative border border-primary/20 rounded-[1.75rem] px-2 py-2"
          >
            <CornerOrnament className="absolute top-3 left-3 w-8 h-8 text-primary/40" />
            <CornerOrnament className="absolute top-3 right-3 w-8 h-8 text-primary/40 -scale-x-100" />
            <CornerOrnament className="absolute bottom-3 left-3 w-8 h-8 text-primary/40 -scale-y-100" />
            <CornerOrnament className="absolute bottom-3 right-3 w-8 h-8 text-primary/40 -scale-x-100 -scale-y-100" />

            <div className="px-5 py-8 md:px-6">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-8 gap-4"
                  >
                    <div className="relative w-14 h-14">
                      <div className="absolute inset-0 rounded-full bg-green-500/15" />
                      <div className="absolute inset-0.75 rounded-full border border-green-500/30 bg-card flex items-center justify-center">
                        <CheckIcon className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-semibold text-foreground mb-1">
                        Terima Kasih!
                      </h4>
                      <p className="text-muted-foreground text-sm font-sans">
                        Konfirmasi dan ucapan Anda telah kami terima.
                      </p>
                    </div>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="sm"
                      className="rounded-full! text-[11px]! uppercase! tracking-widest! font-sans!"
                    >
                      Kirim Lagi
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-start gap-2.5 px-3.5 py-3 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-600"
                        >
                          <AlertIcon className="w-4 h-4 mt-0.5 shrink-0" />
                          <p className="text-xs leading-relaxed font-sans">
                            {error}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <label className="text-[11px] uppercase tracking-widest font-sans font-medium text-primary mb-2 flex items-center gap-1.5">
                        <UserIcon className="w-3.5 h-3.5" />
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Masukkan nama Anda"
                        className="w-full px-4 py-2.5 rounded-2xl border border-primary/20 bg-card text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-widest font-sans font-medium text-primary mb-2 block">
                        Konfirmasi Kehadiran
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {ATTENDANCE_OPTIONS.map((option) => {
                          const OptionIcon = attendanceIconMap[option.icon];
                          const active = form.attendance === option.value;
                          return (
                            <button
                              key={option.value}
                              onClick={() =>
                                setForm({
                                  ...form,
                                  attendance:
                                    option.value as RSVPData["attendance"],
                                })
                              }
                              className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-[11px] font-sans font-medium transition-all ${
                                active
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-primary/15 bg-card text-muted-foreground hover:border-primary/40"
                              }`}
                            >
                              <OptionIcon className="w-4 h-4" />
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {form.attendance === "hadir" && (
                      <div>
                        <label className="text-[11px] uppercase tracking-widest font-sans font-medium text-primary mb-2 flex items-center gap-1.5">
                          <UsersIcon className="w-3.5 h-3.5" />
                          Jumlah Tamu
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              setForm({
                                ...form,
                                guestCount: Math.max(1, form.guestCount - 1),
                              })
                            }
                            className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/5 transition-colors text-foreground font-medium"
                          >
                            -
                          </button>
                          <span className="font-serif text-lg font-semibold text-foreground w-6 text-center">
                            {form.guestCount}
                          </span>
                          <button
                            onClick={() =>
                              setForm({
                                ...form,
                                guestCount: Math.min(10, form.guestCount + 1),
                              })
                            }
                            className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/5 transition-colors text-foreground font-medium"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-[11px] uppercase tracking-widest font-sans font-medium text-primary mb-2 flex items-center gap-1.5">
                        <MessageIcon className="w-3.5 h-3.5" />
                        Ucapan &amp; Doa
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-2xl border border-primary/20 bg-card text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    <Button
                      onClick={handleSubmit}
                      variant="primary"
                      size="md"
                      icon="Send"
                      iconPosition="right"
                      fullWidth
                      disabled={
                        !form.name.trim() || !form.message.trim() || loading
                      }
                      className="rounded-full! text-[11px]! uppercase! tracking-widest! font-sans!"
                    >
                      {loading ? "Mengirim..." : "Kirim Ucapan"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative border border-primary/20 rounded-[1.75rem] px-2 py-2"
          >
            <CornerOrnament className="absolute top-3 left-3 w-8 h-8 text-primary/40" />
            <CornerOrnament className="absolute top-3 right-3 w-8 h-8 text-primary/40 -scale-x-100" />
            <CornerOrnament className="absolute bottom-3 left-3 w-8 h-8 text-primary/40 -scale-y-100" />
            <CornerOrnament className="absolute bottom-3 right-3 w-8 h-8 text-primary/40 -scale-x-100 -scale-y-100" />

            <div className="px-5 py-8 md:px-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary font-sans font-medium mb-4 text-center">
                Ucapan &amp; Doa
              </p>

              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
                {wishes.length === 0 ? (
                  <div className="rounded-2xl border border-primary/15 bg-card p-8 text-center">
                    <MessageIcon className="w-8 h-8 text-primary/25 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm font-sans">
                      Belum ada ucapan. Jadilah yang pertama!
                    </p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {wishes.map((wish) => (
                      <motion.div
                        key={wish.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-primary/15 bg-card p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative w-9 h-9 shrink-0">
                            <div className="absolute inset-0 rounded-full gradient-primary opacity-15" />
                            <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center">
                              <UserIcon className="w-4 h-4 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                              <p className="font-serif text-sm font-semibold text-foreground truncate">
                                {wish.name}
                              </p>
                              <span
                                className={`text-[10px] uppercase tracking-widest font-sans font-medium px-2.5 py-1 rounded-full border shrink-0 ${
                                  attendanceBadgeStyle[wish.attendance]
                                }`}
                              >
                                {attendanceBadgeLabel[wish.attendance]}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground font-sans leading-relaxed wrap-break-word">
                              {wish.message}
                            </p>
                            <p className="text-[11px] text-muted-foreground/60 font-sans mt-1.5">
                              {wish.timestamp}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
