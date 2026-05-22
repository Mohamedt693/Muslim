import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 py-6 animate-fade-in">
            <div className="bg-white border border-neutral-200/50 rounded-2xl p-6 md:p-8 shadow-sm">
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary border-b border-neutral-100 pb-4 mb-6">
                    {t("staticPages.about.title")}
                </h1>
                <div className="space-y-4 text-neutral-600 leading-relaxed text-lg">
                    <p>{t("staticPages.about.p1")}</p>
                    <p>{t("staticPages.about.p2")}</p>
                </div>
            </div>
        </div>
    );
}