"use client";

import { StatusScreen } from "@/components/ui/StatusScreen";
import { weddingData } from "@/lib/weddingData";

export function ExpiredScreen() {
  const { reception } = weddingData;
  const date = new Date(`${reception.date}T00:00:00`).toLocaleDateString(
    "id-ID",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <StatusScreen
      eyebrow="Alhamdulillah"
      title="Undangan Telah Berakhir"
      message={
        <>
          Terima kasih atas doa dan kehadiran Anda di hari bahagia kami. Acara
          telah selesai, sehingga undangan ini tidak dapat diakses lagi.
        </>
      }
      footnote={date}
    />
  );
}
