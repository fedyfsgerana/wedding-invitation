"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionTitle, SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn, getLucideIcon } from "@/lib/utils";
import { RSVPData, WishItem } from "@/types";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const MAX_GUEST_COUNT = 5;
const MAX_MESSAGE = 500;

type Attendance = RSVPData["attendance"];

const ATTENDANCE: Record<
  Attendance,
  { label: string; short: string; icon: string; badge: string }
> = {
  hadir: {
    label: "Hadir",
    short: "Hadir",
    icon: "CircleCheck",
    badge: "bg-success-soft text-success",
  },
  tidak_hadir: {
    label: "Tidak hadir",
    short: "Tidak",
    icon: "CircleX",
    badge: "bg-danger-soft text-danger",
  },
  masih_ragu: {
    label: "Masih ragu",
    short: "Ragu",
    icon: "CircleHelp",
    badge: "bg-warning-soft text-warning",
  },
};

const ATTENDANCE_KEYS = Object.keys(ATTENDANCE) as Attendance[];

const ICONS = Object.fromEntries(
  ATTENDANCE_KEYS.map((key) => [key, getLucideIcon(ATTENDANCE[key].icon)]),
) as Record<Attendance, React.ElementType>;

const MinusIcon = getLucideIcon("Minus");
const PlusIcon = getLucideIcon("Plus");
const AlertIcon = getLucideIcon("CircleAlert");
const CheckIcon = getLucideIcon("CircleCheck");
const UsersIcon = getLucideIcon("Users");
const MessageIcon = getLucideIcon("MessageCircle");

const inputClass =
  "w-full rounded-xl border border-border bg-card px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25 disabled:cursor-not-allowed disabled:opacity-60";

const stepperClass =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-primary transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40";

interface RSVPSectionProps {
  guestName: string | null;
}

const EMPTY_FORM: RSVPData = {
  name: "",
  attendance: "hadir",
  guestCount: 1,
  message: "",
};

export function RSVPSection({ guestName }: RSVPSectionProps) {
  const [form, setForm] = useState<RSVPData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  useEffect(() => {
    const loadWishes = async () => {
      try {
        const res = await fetch("/api/wishes");
        const data = await res.json();
        setWishes(data.wishes || []);
      } catch {
        setWishes([]);
      }
    };
    loadWishes();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: guestName,
          name: form.name,
          message: form.message,
          attendance: form.attendance,
          guestCount: form.attendance === "hadir" ? form.guestCount : 1,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal mengirim ucapan. Silakan coba lagi.");
        return;
      }
      if (data.wish) setWishes((current) => [data.wish, ...current]);
      setSubmitted(true);
    } catch {
      setError("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setSubmitted(false);
    setError(null);
  };

  return (
    <SectionWrapper
      id="rsvp"
      ornaments={[
        { variant: "babysbreath", corner: "top-right" },
        { variant: "blossom", corner: "bottom-left", size: "sm" },
      ]}
    >
      <div className="container-wedding">
        <SectionTitle
          eyebrow="Doa & Ucapan"
          title="Konfirmasi Kehadiran"
          subtitle="Doa dan kehadiran Anda adalah hadiah terindah bagi kami."
        />

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-6">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card-wedding px-5.5 py-6"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-6 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success">
                    <CheckIcon className="h-7 w-7" />
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    Terima Kasih
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Konfirmasi dan ucapan Anda telah kami terima.
                  </p>
                  <Button onClick={handleReset} variant="outline" className="mt-2">
                    Kirim Ucapan Lain
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        ref={errorRef}
                        role="alert"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-start gap-2.5 rounded-xl border border-danger-border bg-danger-soft px-3.5 py-3 text-danger"
                      >
                        <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                        <p className="text-[13px] leading-relaxed">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rsvp-name" className="text-[13px] font-semibold text-foreground">
                      Nama
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      value={form.name}
                      maxLength={100}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nama Anda"
                      disabled={loading}
                      className={cn(inputClass, "h-11.5")}
                    />
                  </div>

                  <fieldset className="flex flex-col gap-1.5" disabled={loading}>
                    <legend className="mb-1.5 text-[13px] font-semibold text-foreground">
                      Kehadiran
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
                      {ATTENDANCE_KEYS.map((key) => {
                        const Icon = ICONS[key];
                        const active = form.attendance === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setForm({ ...form, attendance: key })}
                            className={cn(
                              "flex h-11 items-center justify-center gap-1.5 rounded-xl border px-1.5 text-[13px] font-semibold transition disabled:opacity-60",
                              active
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-gold-line bg-card text-primary hover:bg-accent",
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            {ATTENDANCE[key].short}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {form.attendance === "hadir" && (
                    <div className="flex items-center justify-between gap-3">
                      <span id="rsvp-count" className="text-[13px] font-semibold text-foreground">
                        Jumlah tamu
                      </span>
                      <div className="flex items-center gap-2.5" role="group" aria-labelledby="rsvp-count">
                        <button
                          type="button"
                          aria-label="Kurangi jumlah tamu"
                          onClick={() =>
                            setForm({ ...form, guestCount: Math.max(1, form.guestCount - 1) })
                          }
                          disabled={loading || form.guestCount <= 1}
                          className={stepperClass}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-serif text-lg font-semibold text-foreground" aria-live="polite">
                          {form.guestCount}
                        </span>
                        <button
                          type="button"
                          aria-label="Tambah jumlah tamu"
                          onClick={() =>
                            setForm({
                              ...form,
                              guestCount: Math.min(MAX_GUEST_COUNT, form.guestCount + 1),
                            })
                          }
                          disabled={loading || form.guestCount >= MAX_GUEST_COUNT}
                          className={stepperClass}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rsvp-message" className="text-[13px] font-semibold text-foreground">
                      Ucapan &amp; doa
                    </label>
                    <textarea
                      id="rsvp-message"
                      value={form.message}
                      maxLength={MAX_MESSAGE}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tulis ucapan untuk kedua mempelai"
                      rows={4}
                      disabled={loading}
                      className={cn(inputClass, "resize-none py-3")}
                    />
                    <span className="text-right text-[11.5px] text-muted-foreground">
                      {form.message.length}/{MAX_MESSAGE}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    icon="Send"
                    size="lg"
                    fullWidth
                    loading={loading}
                    disabled={!form.name.trim() || !form.message.trim()}
                  >
                    {loading ? "Mengirim..." : "Kirim Ucapan"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Ucapan Tamu</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                <UsersIcon className="h-3.5 w-3.5" />
                {wishes.length} ucapan
              </span>
            </div>

            {wishes.length === 0 ? (
              <div className="card-wedding flex flex-col items-center gap-2 px-6 py-10 text-center">
                <MessageIcon className="h-7 w-7 text-gold-line" />
                <p className="text-sm text-muted-foreground">
                  Belum ada ucapan. Jadilah yang pertama!
                </p>
              </div>
            ) : (
              <ul className="scrollbar-hide flex max-h-120 flex-col gap-2.5 overflow-y-auto pr-0.5">
                <AnimatePresence initial={false}>
                  {wishes.map((wish) => {
                    const meta = ATTENDANCE[wish.attendance];
                    const Icon = ICONS[wish.attendance];
                    return (
                      <motion.li
                        key={wish.id}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card-wedding flex gap-3 p-4"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-serif font-semibold text-primary">
                          {wish.name.trim().charAt(0).toUpperCase()}
                        </span>
                        <div className="flex min-w-0 flex-col gap-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-[14.5px] font-semibold text-foreground">
                              {wish.name}
                            </p>
                            <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold", meta.badge)}>
                              <Icon className="h-3.5 w-3.5" />
                              {meta.label}
                              {wish.attendance === "hadir" && wish.guestCount > 0
                                ? ` · ${wish.guestCount} orang`
                                : ""}
                            </span>
                          </div>
                          <p className="wrap-break-word text-[13.5px] leading-normal text-foreground/80">
                            {wish.message}
                          </p>
                          <span className="text-[11.5px] text-muted-foreground">
                            {wish.timestamp}
                          </span>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}