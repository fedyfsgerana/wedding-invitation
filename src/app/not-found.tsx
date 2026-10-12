import { StatusScreen } from "@/components/ui/StatusScreen";

export default function NotFound() {
  return (
    <StatusScreen
      eyebrow="Halaman tidak ditemukan"
      title="Undangan Tidak Tersedia"
      message={
        <>
          Maaf, undangan yang Anda buka tidak ditemukan. Pastikan tautan sama
          persis dengan yang dikirimkan kepada Anda, atau hubungi kami untuk
          mendapatkan tautan yang benar.
        </>
      }
    />
  );
}
