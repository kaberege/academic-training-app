export default function ProgressBar({
  value,
  max,
}: {
  value: number;
  max: number;
}) {
  const percent = Math.round(((value + 1) / max) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-1 my-4">
      <div
        className="bg-blue-600 h-1 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
