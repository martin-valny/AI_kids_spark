import { neoBrutalist } from '@/constants/landingColors';

const STATS = [
  { value: '12,347', label: 'ACTIVE STUDENTS' },
  { value: '$847K+', label: 'EARNED BY STUDENTS' },
  { value: '4.9/5', label: 'AVERAGE RATING' },
];

export default function SocialProofBar() {
  return (
    <div
      className="w-full py-4 px-6 font-mono"
      style={{ backgroundColor: neoBrutalist.lime, color: neoBrutalist.black }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-4 md:gap-8 flex-wrap text-center">
        {STATS.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 md:gap-8">
            <div>
              <span className="font-extrabold text-sm md:text-base">{stat.value}</span>
              <span className="font-bold text-xs md:text-sm ml-1 opacity-80">{stat.label}</span>
            </div>
            {i < STATS.length - 1 && (
              <span className="font-bold text-lg opacity-40 hidden md:inline">•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
