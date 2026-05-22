import { useState } from "react";
import { useTranslation } from "react-i18next";
import { contactService, type ContactData } from '../services/contactService';

export default function Contact() {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData);

        const contactData: ContactData = {
            name: rawData.name as string,
            email: rawData.email as string,
            message: rawData.message as string,
        };

        try {
            await contactService.sendForm(contactData);
            setSubmitted(true);
        } catch (err) {
            console.error("Formspree Error:", err);
            setError(t("staticPages.contact.error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto py-6 animate-fade-in">
            <div className="bg-white border border-neutral-200/50 rounded-2xl p-6 md:p-8 shadow-sm">
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
                    {t("staticPages.contact.title")}
                </h1>
                <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                    {t("staticPages.contact.subtitle")}
                </p>

                {submitted ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-center font-bold text-sm">
                        {t("staticPages.contact.success")}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center text-xs font-bold">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-neutral-500 mb-2">
                                {t("staticPages.contact.name")}
                            </label>
                            <input
                            type="text"
                            name="name"
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm disabled:opacity-60"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-neutral-500 mb-2">
                                {t("staticPages.contact.email")}
                            </label>
                            <input
                            type="email"
                            name="email"
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm disabled:opacity-60"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-neutral-500 mb-2">
                                {t("staticPages.contact.message")}
                            </label>
                            <textarea
                            name="message"
                            rows={4}
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm resize-none disabled:opacity-60"
                            />
                        </div>

                        <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-(--primary) text-white font-bold rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98] text-sm flex items-center justify-center disabled:opacity-70"
                        >
                            {loading ? t("staticPages.contact.loading") : t("staticPages.contact.send")}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}