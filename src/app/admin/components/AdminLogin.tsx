"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { FormEvent } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/ui/Monogram";
import { Floral } from "@/components/ui/Ornament";
import { getLucideIcon } from "@/lib/utils";
import { siteConfig, weddingData } from "@/lib/weddingData";

interface Props {
  password: string;
  setPassword: (v: string) => void;
  passwordError: boolean;
  setPasswordError: (v: boolean) => void;
  loginLoading: boolean;
  handleLogin: () => void;
}

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

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(90%_55%_at_50%_45%,var(--color-card)_0%,var(--color-ivory)_60%,var(--color-warm)_100%)] px-5 py-16">
      <div className="pointer-events-none fixed inset-3.5 overflow-hidden rounded-[30px] border border-gold-line/60">
        <Floral
          variant="eucalyptus"
          size={120}
          className="absolute -top-2 -left-2 h-32 w-32 -scale-y-100 md:h-44 md:w-44"
        />
        <Floral
          variant="blossom"
          size={120}
          className="absolute -right-2 -bottom-2 h-32 w-32 -scale-x-100 md:h-44 md:w-44"
        />
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/90 text-primary shadow-sm backdrop-blur-md transition hover:bg-accent"
        aria-label={theme === "light" ? "Mode gelap" : "Mode terang"}
      >
        {theme === "light" ? (
          <MoonIcon className="h-4.5 w-4.5" />
        ) : (
          <SunIcon className="h-4.5 w-4.5" />
        )}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-sm"
      >
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Monogram size={72} title={`${groom.nickname} & ${bride.nickname}`} />
          <p className="eyebrow">Halaman Admin</p>
          <h1 className="font-serif text-[32px] font-semibold leading-tight text-foreground">
            {siteConfig.title}
          </h1>
        </div>

        <form
          onSubmit={submit}
          className="card-wedding flex flex-col gap-4 px-5.5 py-6"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-password"
              className="text-[13px] font-semibold text-foreground"
            >
              Password
            </label>
            <div className="relative">
              <KeyIcon className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="Masukkan password"
                aria-invalid={passwordError || undefined}
                className={
                  "h-11.5 w-full rounded-xl border bg-card pr-3.5 pl-10 text-sm text-foreground transition placeholder:text-muted-foreground/70 focus:ring-2 focus:outline-none " +
                  (passwordError
                    ? "border-danger focus:border-danger focus:ring-danger/20"
                    : "border-border focus:border-gold focus:ring-gold/25")
                }
              />
            </div>
            <AnimatePresence>
              {passwordError && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-danger"
                >
                  Password salah, coba lagi.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Button
            type="submit"
            icon="LogIn"
            size="lg"
            fullWidth
            loading={loginLoading}
            disabled={!password}
          >
            {loginLoading ? "Memeriksa..." : "Masuk"}
          </Button>
        </form>
      </motion.div>
    </main>
  );
}
