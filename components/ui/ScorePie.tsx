

interface ScorePieProps {
    score: number;
    size?: number;
    strokeWidth?: number;
}

export default function ScorePie({ score, size = 40, strokeWidth = 3 }: ScorePieProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    let colorClass = 'text-red-500';
    if (score >= 90) colorClass = 'text-green-500';
    else if (score >= 80) colorClass = 'text-blue-500';
    else if (score >= 70) colorClass = 'text-yellow-500';
    else if (score >= 60) colorClass = 'text-orange-500';

    return (
        <div className="relative flex items-center justify-center font-bold" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90 w-full h-full">
                <circle
                    className="text-zinc-800"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className={`${colorClass} transition-all duration-1000 ease-out`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <span className={`absolute text-xs ${colorClass}`}>{score}</span>
        </div>
    );
}
