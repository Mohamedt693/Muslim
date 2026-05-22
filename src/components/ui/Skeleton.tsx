const Skeleton = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded-3xl ${className}`} />
);

export default Skeleton;