import { WeddingData } from "@/types";

export const weddingData: WeddingData = {
    groom: {
        name: "Rizky Pratama",
        fullName: "Muhammad Rizky Pratama, S.T.",
        nickname: "Rizky",
        role: "Mempelai Pria",
        photo: "/images/groom.jpg",
        instagram: "@rizky.pratama",
        bio: "Putra dari Bapak Ahmad Fauzi & Ibu Siti Rahayu",
    },
    bride: {
        name: "Annisa Putri",
        fullName: "Annisa Putri Maharani, S.Pd.",
        nickname: "Annisa",
        role: "Mempelai Wanita",
        photo: "/images/bride.jpg",
        instagram: "@annisa.putri",
        bio: "Putri dari Bapak Budi Santoso & Ibu Dewi Lestari",
    },
    groomParents: {
        father: "Bapak Ahmad Fauzi",
        mother: "Ibu Siti Rahayu",
    },
    brideParents: {
        father: "Bapak Budi Santoso",
        mother: "Ibu Dewi Lestari",
    },
    akad: {
        date: "2025-09-13",
        time: "08:00",
        endTime: "10:00",
        venue: "Masjid Al-Ikhlas",
        address: "Jl. Mawar No. 12, Jakarta Selatan",
        mapsUrl: "https://maps.google.com/?q=Masjid+Al-Ikhlas+Jakarta",
        wazeUrl: "https://waze.com/ul?q=Masjid+Al-Ikhlas+Jakarta",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322295!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNiJTIDEwNsKwNDknMTAuNCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid",
        calendarTitle: "Akad Nikah Rizky & Annisa",
    },
    reception: {
        date: "2025-09-13",
        time: "11:00",
        endTime: "15:00",
        venue: "Gedung Serbaguna Melati",
        address: "Jl. Melati No. 45, Jakarta Selatan",
        mapsUrl: "https://maps.google.com/?q=Gedung+Serbaguna+Melati+Jakarta",
        wazeUrl: "https://waze.com/ul?q=Gedung+Serbaguna+Melati+Jakarta",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322295!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNiJTIDEwNsKwNDknMTAuNCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid",
        calendarTitle: "Resepsi Pernikahan Rizky & Annisa",
    },
    loveStory: [
        {
            id: 1,
            date: "Januari 2020",
            title: "Pertama Bertemu",
            description:
                "Kami pertama kali bertemu di sebuah seminar kampus. Pertemuan yang sederhana namun penuh makna.",
            icon: "Users",
        },
        {
            id: 2,
            date: "Juni 2020",
            title: "Mulai Dekat",
            description:
                "Dari teman menjadi sahabat. Kami mulai sering berbagi cerita dan mimpi bersama.",
            icon: "MessageCircle",
        },
        {
            id: 3,
            date: "Desember 2021",
            title: "Jatuh Cinta",
            description:
                "Di penghujung tahun yang indah, kami menyadari perasaan yang telah lama tersimpan.",
            icon: "Heart",
        },
        {
            id: 4,
            date: "Maret 2023",
            title: "Lamaran",
            description:
                "Dengan penuh keyakinan dan doa, kami memantapkan langkah menuju ikatan yang suci.",
            icon: "Gem",
        },
        {
            id: 5,
            date: "September 2025",
            title: "Hari Pernikahan",
            description:
                "Hari yang paling dinantikan. Kami bersatu dalam ikatan pernikahan yang penuh berkah.",
            icon: "PartyPopper",
        },
    ],
    gallery: [
        { id: 1, src: "/images/gallery-1.jpg", alt: "Foto prewedding 1", width: 800, height: 600 },
        { id: 2, src: "/images/gallery-2.jpg", alt: "Foto prewedding 2", width: 600, height: 800 },
        { id: 3, src: "/images/gallery-3.jpg", alt: "Foto prewedding 3", width: 800, height: 600 },
        { id: 4, src: "/images/gallery-4.jpg", alt: "Foto prewedding 4", width: 600, height: 800 },
        { id: 5, src: "/images/gallery-5.jpg", alt: "Foto prewedding 5", width: 800, height: 800 },
        { id: 6, src: "/images/gallery-6.jpg", alt: "Foto prewedding 6", width: 800, height: 600 },
    ],
    agenda: [
        {
            id: 1,
            time: "08:00 - 10:00",
            title: "Akad Nikah",
            description: "Prosesi ijab kabul",
            icon: "BookOpen",
        },
        {
            id: 2,
            time: "10:00 - 11:00",
            title: "Sesi Foto",
            description: "Foto bersama keluarga",
            icon: "Camera",
        },
        {
            id: 3,
            time: "11:00 - 13:00",
            title: "Resepsi Sesi 1",
            description: "Penerimaan tamu undangan",
            icon: "UtensilsCrossed",
        },
        {
            id: 4,
            time: "13:00 - 15:00",
            title: "Resepsi Sesi 2",
            description: "Penerimaan tamu undangan",
            icon: "Music",
        },
    ],
    bankAccounts: [
        {
            id: 1,
            bank: "Bank Mandiri",
            accountNumber: "1234567890",
            accountName: "Muhammad Rizky Pratama",
            logo: "/images/mandiri-logo.png",
        },
    ],
    qris: {
        image: "/images/qris-bca.png",
        name: "Annisa Putri Maharani",
    },
    verse: {
        text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
        source: "QS. Ar-Rum: 21",
    },
    music: "/audio/wedding-music.mp3",
};

export const siteConfig = {
    title: "Rizky & Annisa Wedding",
    description:
        "Dengan penuh rasa syukur, kami mengundang Anda untuk menjadi saksi momen bahagia kami.",
    url: "https://rizky-annisa.vercel.app",
    ogImage: "/images/og-image.jpg",
    favicon: "/favicon.ico",
};