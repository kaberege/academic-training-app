import { NavLink, useParams } from "react-router";
import { useLessonStore } from "../store/lessonStore";

export default function SidebarNav() {
  const { lesson, completedIds } = useLessonStore();
  const { sectionIndex } = useParams();
  const activeIndex = parseInt(sectionIndex || "0", 10);

  if (!lesson) return null;

  return (
    <aside className="hidden md:block w-64 h-screen overflow-y-auto bg-gray-100 p-4 sticky top-0">
      <h2 className="text-lg font-bold mb-4">Outline</h2>
      <ul className="space-y-2">
        {lesson.sections.map((section, index) => (
          <li key={index}>
            <NavLink
              to={`/lesson/${index}`}
              className={({ isActive }) =>
                `flex items-center gap-2 p-1 rounded ${
                  isActive || index === activeIndex
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700"
                }`
              }
            >
              <input type="radio" readOnly checked={completedIds.has(index)} />
              {section.title}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink
            to={`/lesson/${lesson.sections.length}`}
            className={({ isActive }) =>
              `flex items-center gap-2 p-1 rounded ${
                isActive || activeIndex === lesson.sections.length
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700"
              }`
            }
          >
            <input
              type="radio"
              readOnly
              checked={completedIds.has(lesson.sections.length)}
            />
            Quiz
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
