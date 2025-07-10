import { useLessonStore } from "../store/lessonStore";

export default function SidebarNav() {
  const lesson = useLessonStore((s) => s.lesson);
  if (!lesson) return null;

  return (
    <nav className="sticky top-4 p-4 w-64 bg-gray-50 h-screen overflow-y-auto hidden md:block">
      <h2 className="text-lg font-bold mb-4">Lesson Outline</h2>
      <ul className="space-y-2">
        {lesson.content.map((item, index) =>
          item.type === "heading" && item.text ? (
            <li key={index}>
              <a
                href={`#block-${index}`}
                className="text-blue-600 hover:underline"
              >
                {item.text}
              </a>
            </li>
          ) : null
        )}
      </ul>
    </nav>
  );
}
