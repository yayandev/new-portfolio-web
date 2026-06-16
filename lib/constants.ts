export const SITE = {
  name: "YD",
  fullName: "YayanDev",
  tagline: "Full-Stack Engineer",
  email: "faturrohman0311@gmail.com",
  github: "https://github.com/yayandev",
  whatsapp: "https://wa.me/6281234567890",
  location: "Banten, Indonesia",
  timezone: "Asia/Jakarta",
} as const;

export const NAV_ITEMS = [
  { key: "nav.home", href: "#home" },
  { key: "nav.capabilities", href: "#capabilities" },
  { key: "nav.portfolio", href: "#portfolio" },
  { key: "nav.why-us", href: "#why-us" },
  { key: "nav.contact", href: "#contact" },
] as const;

export const CAPABILITIES = [
  {
    key: "web",
    icon: "Globe",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    key: "mobile",
    icon: "Smartphone",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    key: "maintenance",
    icon: "Server",
    gradient: "from-emerald-500 to-teal-400",
  },
] as const;

export const WHY_US_ITEMS = [
  {
    key: "custom",
    icon: "Code",
    gradient: "from-amber-500 to-orange-400",
  },
  {
    key: "pricing",
    icon: "Tag",
    gradient: "from-blue-500 to-indigo-400",
  },
  {
    key: "support",
    icon: "Headphones",
    gradient: "from-emerald-500 to-green-400",
  },
] as const;

export const CASE_STUDIES: {
  id: number;
  title: string;
  challenge: string;
  solution: string;
  techStack: string[];
}[] = [
  {
    id: 1,
    title: "SIMPRO DPUPR Banten",
    challenge:
      "Kebutuhan sistem informasi manajemen proyek yang terintegrasi untuk Dinas Pekerjaan Umum dan Penataan Ruang Provinsi Banten. Data tersebar di banyak spreadsheet, tidak ada visibilitas real-time.",
    solution:
      "Membangun sistem berbasis web dengan modul perencanaan, penganggaran, pelaporan progres fisik dan keuangan, serta dashboard real-time untuk pimpinan.",
    techStack: ["Laravel", "MySQL", "Tailwind CSS", "Livewire", "REST API"],
  },
  {
    id: 2,
    title: "E-Renja DPUPR Banten",
    challenge:
      "Proses perencanaan kerja tahunan masih manual dan tidak terstandarisasi. Sulti memonitor capaian program antar-bidang.",
    solution:
      "Membangun platform perencanaan elektronik yang mencakup input rencana kerja, verifikasi atasan, monitoring capaian, dan integrasi dengan data anggaran.",
    techStack: ["Laravel", "MySQL", "Tailwind CSS", "Alpine.js", "Chart.js"],
  },
  {
    id: 3,
    title: "Sistem Informasi & Monitoring BAP",
    challenge:
      "Dokumen Berita Acara Pemeriksaan (BAP) masih dalam bentuk fisik dan tidak terpusat, menyulitkan pelacakan status tindak lanjut.",
    solution:
      "Sistem informasi untuk digitalisasi BAP, workflow persetujuan, tracking tindak lanjut, dan dashboard monitor capaian per-unit kerja.",
    techStack: ["Laravel", "MySQL", "Tailwind CSS", "Livewire", "Bootstrap"],
  },
];
