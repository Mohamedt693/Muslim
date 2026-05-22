import { useParams } from "react-router-dom";
import data from '../../assets/data/Doaa.json';
import { useTranslation } from "react-i18next";

const categoryMap: {
    [key: string]: { jsonKey: string; translationKey: string };
} = {
    quranic: {
        jsonKey: "أدعية قرآنية",
        translationKey: "doaaPage.categories.quranic", 
    },
    prophets: {
        jsonKey: "أدعية الأنبياء",
        translationKey: "doaaPage.categories.prophets",
    },
};

export default function DoaaSection() {
    const { t } = useTranslation();
    const { category } = useParams<{ category: string }>();

    const currentCategory = category ? categoryMap[category] : null;

    if (!currentCategory) {
        return (
            <div className="text-center py-12 text-neutral-400 font-sans">القسم غير موجود</div>
        );
    }

    const doaaList = (data as any)[currentCategory.jsonKey] || [];

    return (
        <div className="w-full space-y-6 select-none animate-fade-in">
            <div className="w-full flex items-center justify-between border-b border-neutral-100 pb-4">
                <h1 className="font-serif text-xl md:text-2xl font-bold text-primary">
                    {t(currentCategory.translationKey)}
                </h1>
            </div>

            {doaaList.length === 0 ? (
                <div className="text-center py-10 text-neutral-400">لا توجد أدعية في هذا القسم حالياً</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {doaaList.map((d: any, index: number) => (
                            <div
                            key={index}
                            className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-neutral-200/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-neutral-200"
                            >
                                <div className="space-y-4">
                                    <p className="font-serif text-lg md:text-xl text-neutral-800 leading-relaxed text-right">
                                        {d.content}
                                    </p>
                        
                                    {d.description && (
                                        <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed text-right bg-neutral-50/50 p-3 rounded-xl border border-neutral-100/70">
                                            {d.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
            )}
        </div>
    );
}