import { LuSend, LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

export default function TelegramBotCard() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-0">
            <div className="relative overflow-hidden w-full bg-white border border-neutral-200/80 dark:border-neutral-800/80 bg-gradient-to-br from-white to-neutral-50/50 dark:from-neutral-950 dark:to-neutral-900/30 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700">
                
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/10 transition-colors duration-500" />
                
                <div className="flex items-start sm:items-center gap-4 relative z-10">
                    <div className="p-3 bg-sky-500/10 text-sky-500 dark:bg-sky-500/5 dark:text-sky-400 rounded-xl shrink-0 shadow-inner relative">
                        <div className="relative group-hover:scale-110 transition-transform duration-300">
                            <LuSend className={`w-5 h-5 ${isRtl ? 'rotate-[-30deg]' : 'rotate-[30deg]'}`} />
                        </div>
                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                    </div>
                    
                    <div className="space-y-0.5">
                        <h3 className="text-sm md:text-base font-bold text-neutral-800 dark:text-neutral-200">
                            {t("telegramCard.title")}
                        </h3>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-md leading-relaxed">
                            {t("telegramCard.description")}
                        </p>
                    </div>
                </div>

                <a 
                    href="https://t.me/MuslimTimesBot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#161B19] hover:bg-[#242C29] text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 text-xs font-semibold rounded-xl transition-all duration-300 shadow-sm shadow-neutral-950/5 group/btn"
                >
                    <span>{t("telegramCard.cta")}</span>
                    {isRtl ? (
                        <LuArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-1" />
                    ) : (
                        <LuArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    )}
                </a>

            </div>
        </div>
    );
}