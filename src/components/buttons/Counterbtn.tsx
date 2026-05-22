interface CounterbtnProps {
  count: number;
  onCountChange: (newValue: number) => void;
}

export default function Counterbtn({ count, onCountChange }: CounterbtnProps) {
    const handleCountClick = () => {
        if (count > 0) {
            onCountChange(count - 1);
        }
    };

    return (
        <div className="flex justify-center mt-4 w-full">
            <button 
            className="bg-(--primary) text-white rounded-xl py-3 w-full cursor-pointer font-mono font-bold tracking-wider hover:bg-primary/90 active:scale-[0.99] transition-all text-center" 
            onClick={handleCountClick}
            >
                {count}
            </button>
        </div>
    );
}