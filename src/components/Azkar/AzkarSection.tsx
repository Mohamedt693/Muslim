import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import data from "../../assets/data/Azkar.json";
import { useTranslation } from "react-i18next";
import { LuRotateCcw } from "react-icons/lu";
import Counterbtn from "../buttons/Counterbtn";

const categoryMap: {
  [key: string]: { jsonKey: string; translationKey: string };
} = {
  morning: {
    jsonKey: "أذكار الصباح",
    translationKey: "azkarPage.categories.morning",
  },
  night: {
    jsonKey: "أذكار المساء",
    translationKey: "azkarPage.categories.night",
  },
  sleeping: {
    jsonKey: "أذكار النوم",
    translationKey: "azkarPage.categories.sleeping",
  },
  wakeup: {
    jsonKey: "أذكار الاستيقاظ",
    translationKey: "azkarPage.categories.wakeup",
  },
  prayer: {
    jsonKey: "أذكار بعد السلام من الصلاة المفروضة",
    translationKey: "azkarPage.categories.prayer",
  },
  tasbeeh: {
    jsonKey: "تسابيح",
    translationKey: "azkarPage.categories.tasbeeh",
  },
};

export default function AzkarSection() {
  const { t } = useTranslation();
  const { category } = useParams<{ category: string }>();
  const [counts, setCounts] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    setCounts({});
  }, [category]);

  const currentCategory = category ? categoryMap[category] : null;
  if (!currentCategory) {
    return (
      <div className="text-center py-10 text-neutral-400">
        {t("azkarPage.messages.notFound")}
      </div>
    );
  }

  const handleCounterChange = (index: number, newValue: number) => {
    setCounts((prev) => ({ ...prev, [index]: newValue }));
  };

  const handleResetAll = () => setCounts({});

  const azkarList = (data as any)[currentCategory.jsonKey] || [];

  return (
    <div className="w-full space-y-6 select-none animate-fade-in">
      <div className="w-full flex items-center justify-between border-b border-neutral-100 pb-4">
        <h1 className="font-serif text-xl md:text-2xl font-bold text-primary">
          {t(currentCategory.translationKey)}
        </h1>

        <button
          onClick={handleResetAll}
          className="p-2.5 rounded-xl bg-white border border-neutral-200/60 hover:border-primary text-secondary hover:text-primary transition-all active:scale-95 shadow-sm flex items-center gap-2 text-xs font-bold"
        >
          <LuRotateCcw className="w-4 h-4" />
          <span>{t("azkarPage.buttons.resetAll")}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {azkarList.map((d: any, index: number) => {
          const currentCount =
            counts[index] !== undefined ? counts[index] : Number(d.count);
          if (currentCount <= 0) return null;

          return (
            <div
              key={index}
              className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-neutral-200/50 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="space-y-4">
                <p className="font-serif text-lg md:text-xl text-neutral-800 leading-relaxed text-right">
                  {d.content}
                </p>
                {d.description && (
                  <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed text-right bg-neutral-50/50 p-3 rounded-xl border border-neutral-100">
                    {d.description}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-50 w-full">
                <Counterbtn
                  count={currentCount}
                  onCountChange={(newCount) =>
                    handleCounterChange(index, newCount)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}