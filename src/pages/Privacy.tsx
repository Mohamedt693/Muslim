import { useTranslation } from "react-i18next";

export default function Privacy() {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 py-6 animate-fade-in">
            <div className="bg-white border border-neutral-200/50 rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-100 pb-4 mb-6 gap-2">
                    <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                        {t("staticPages.privacy.title")}
                    </h1>
                    <span className="text-xs text-neutral-400 font-sans">
                        {t("staticPages.privacy.updated")}
                    </span>
                </div>
                <div className="space-y-4 text-neutral-600 leading-relaxed text-lg">
                    <p>{t("staticPages.privacy.p1")}</p>
                    <p>{t("staticPages.privacy.p2")}</p>
                </div>
            </div>
        </div>
    );
}