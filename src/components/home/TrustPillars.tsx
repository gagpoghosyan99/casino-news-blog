import { translations } from "@/lib/translations";
import GlassCard from "@/components/ui/GlassCard";

export default function TrustPillars() {
  const t = translations.en;

  const pillars = [
    { title: t.featured1Title, desc: t.featured1Desc, icon: "🛡️" },
    { title: t.featured2Title, desc: t.featured2Desc, icon: "📊" },
    { title: t.featured3Title, desc: t.featured3Desc, icon: "⚡" },
    { title: t.featured4Title, desc: t.featured4Desc, icon: "🌏" },
  ];

  return (
    <section className="bg-navy-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-white">
          {t.featuredTitle}
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <GlassCard key={p.title} className="p-6 text-center">
              <span className="text-3xl">{p.icon}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
