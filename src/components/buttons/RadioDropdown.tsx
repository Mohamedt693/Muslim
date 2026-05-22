import { useState, useRef, useEffect } from 'react';
import { LuChevronDown, LuRadio, LuSearch, LuX } from 'react-icons/lu';
import radioData from '../../assets/data/Ezaa.json';

interface RadioStation {
    id: number;
    name: string;
    url: string;
}

interface DropdownProps {
    currentStationId: number;                     
    onSelectStationById: (id: number) => void;    
    cleanName: (name: string) => string;
    isRtl: boolean;
}

export default function RadioDropdown({ currentStationId, onSelectStationById, cleanName, isRtl }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const stations: RadioStation[] = radioData.radios;

    const currentStation = stations.find(s => s.id === currentStationId) || stations[0];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredStations = stations.filter(station => 
        cleanName(station.name).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div ref={dropdownRef} className="relative w-full max-w-md mx-auto z-30">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white border border-neutral-200/80 rounded-2xl shadow-sm hover:border-neutral-300 transition-all text-start"
            >
                <div className="flex items-center gap-3 truncate">
                    <div className="p-2 bg-primary/5 text-primary rounded-xl shrink-0">
                        <LuRadio className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                            {isRtl ? 'الإذاعة المختارة' : 'Selected Station'}
                        </p>
                        <p className="text-sm font-medium text-primary truncate">
                            {currentStation ? cleanName(currentStation.name) : '---'}
                        </p>
                    </div>
                </div>
                <LuChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-neutral-200 rounded-2xl shadow-xl max-h-72 flex flex-col overflow-hidden animate-fade-in">
                    
                    <div className="p-2 border-b border-neutral-100 flex items-center gap-2 bg-neutral-50/50">
                        <LuSearch className="w-4 h-4 text-neutral-400 shrink-0 ml-1" />
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={isRtl ? 'ابحث عن إذاعة...' : 'Search station...'}
                            className="w-full bg-transparent border-none outline-none text-xs text-primary placeholder-neutral-400 py-1"
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="text-neutral-400 hover:text-neutral-600">
                                <LuX className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    <div className="overflow-y-auto overflow-x-hidden custom-scrollbar py-1 flex-1">
                        {filteredStations.length === 0 ? (
                            <div className="p-4 text-center text-xs text-neutral-400">
                                {isRtl ? 'لا توجد إذاعات مطابقة' : 'No stations found'}
                            </div>
                        ) : (
                            filteredStations.map((station) => {
                                const isSelected = station.id === currentStationId;
                                return (
                                    <button
                                        key={station.id}
                                        onClick={() => {
                                            onSelectStationById(station.id); 
                                            setIsOpen(false);
                                            setSearchTerm(''); 
                                        }}
                                        className={`w-full text-start px-4 py-3 text-sm transition-colors flex items-center justify-between ${
                                            isSelected 
                                                ? 'bg-primary/5 text-primary font-bold' 
                                                : 'text-secondary hover:bg-neutral-50'
                                        }`}
                                    >
                                        <span className="truncate block pr-2">{cleanName(station.name)}</span>
                                        <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                                            FM {87.5 + station.id * 0.4}
                                        </span>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}