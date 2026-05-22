import toast, { Toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { LuPlay, LuPause, LuX } from 'react-icons/lu';
import { useAzan } from '../../contexts/AzanContext';

const AzanToastContent = ({ prayerKey, toastObj }: { prayerKey: string; toastObj: Toast }) => {
    const { t } = useTranslation();
    const { playAzanSound, stopAzanSound } = useAzan();

    return (
        <div className={`${toastObj.visible ? 'animate-enter' : 'animate-leave'} 
            w-[320px] bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-gray-100 p-5 flex flex-col gap-4`}>
            
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-50 p-2.5 rounded-2xl text-indigo-600 text-xl">🕌</div>
                    <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{t('azan.title')}</p>
                        <p className="text-lg font-bold text-gray-900">{t(`prayers.${prayerKey}`)}</p>
                    </div>
                </div>
                <button 
                onClick={() => {
                    toast.dismiss(toastObj.id); 
                    stopAzanSound();           
                }}
                className="text-gray-400 hover:text-gray-600 transition">
                    <LuX size={20} />
                </button>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => playAzanSound()}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition"
                >
                    <LuPlay size={18} /> {t('azan.play')}
                </button>
                <button
                    onClick={() => stopAzanSound()}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition"
                >
                    <LuPause size={18} /> {t('azan.stop')}
                </button>
            </div>
        </div>
    );
};

export default AzanToastContent;