"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import { weddingData, siteConfig } from "@/lib/weddingData";

interface Props {
  password: string;
  setPassword: (v: string) => void;
  passwordError: boolean;
  setPasswordError: (v: boolean) => void;
  loginLoading: boolean;
  handleLogin: () => void;
}

const LogInIcon = getLucideIcon("LogIn");
const KeyIcon = getLucideIcon("KeyRound");
const SunIcon = getLucideIcon("Sun");
const MoonIcon = getLucideIcon("Moon");

export function AdminLogin({
  password,
  setPassword,
  passwordError,
  setPasswordError,
  loginLoading,
  handleLogin,
}: Props) {
  const { theme, toggleTheme } = useTheme();
  const { groom, bride } = weddingData;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 w-9 h-9 rounded-full border border-border bg-background/80 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all shadow-sm"
        aria-label="Ganti tema"
        title={theme === "light" ? "Mode Gelap" : "Mode Terang"}
      >
        {theme === "light" ? (
          <MoonIcon className="w-4 h-4" />
        ) : (
          <SunIcon className="w-4 h-4" />
        )}
      </motion.button>

      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 10% 10%, var(--color-gold) 0%, transparent 40%),
                             radial-gradient(circle at 90% 90%, var(--color-gold) 0%, transparent 40%)`,
          }}
        />
      </div>

      <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-primary/20 animate-pulse-soft" />
      <div className="absolute top-16 left-16 w-20 h-20 rounded-full border border-primary/10" />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border border-primary/20 animate-pulse-soft" />
      <div className="absolute bottom-16 right-16 w-24 h-24 rounded-full border border-primary/10" />
      <div className="absolute top-1/2 -translate-y-1/2 left-6 w-1.5 h-1.5 rounded-full bg-primary/40" />
      <div className="absolute top-1/2 -translate-y-1/2 right-6 w-1.5 h-1.5 rounded-full bg-primary/40" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="relative border border-primary/20 rounded-[1.75rem] px-2 py-2">
          <svg
            className="absolute top-3 left-3 w-9 h-9 text-primary/40"
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
          <svg
            className="absolute top-3 right-3 w-9 h-9 text-primary/40 -scale-x-100"
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
          <svg
            className="absolute bottom-3 left-3 w-9 h-9 text-primary/40 -scale-y-100"
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
          <svg
            className="absolute bottom-3 right-3 w-9 h-9 text-primary/40 -scale-x-100 -scale-y-100"
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

          <div className="px-6 py-10">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="relative mx-auto mb-5 w-16 h-16"
              >
                <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-pulse-soft" />
                <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center">
                  <span className="font-serif text-lg text-primary">
                    {groom.nickname.charAt(0)}&amp;{bride.nickname.charAt(0)}
                  </span>
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-xs uppercase tracking-widest text-muted-foreground"
              >
                {siteConfig.title}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="space-y-5"
            >
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <KeyIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    placeholder="Masukkan password"
                    className={
                      "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background " +
                      "text-foreground text-sm focus:outline-none focus:ring-2 " +
                      "focus:ring-primary/30 transition-all " +
                      (passwordError
                        ? "border-danger focus:ring-danger/20 focus:border-danger"
                        : "border-border focus:border-primary")
                    }
                  />
                </div>
                <AnimatePresence>
                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-danger mt-2 flex items-center gap-1"
                    >
                      ✕ Password salah, coba lagi.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogin}
                disabled={loginLoading}
                className="w-full py-3.5 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-widest font-sans font-medium flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm hover:shadow-md transition-shadow"
              >
                {loginLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                    Memeriksa...
                  </>
                ) : (
                  <>
                    <LogInIcon className="w-4 h-4" />
                    Masuk
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted-foreground/50 mt-6"
        >
          {siteConfig.title}·
        </motion.p>
      </motion.div>
    </div>
  );
}
