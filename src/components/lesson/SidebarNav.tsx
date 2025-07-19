import { NavLink, useParams } from "react-router";
import { useLessonStore } from "../../store/lessonStore";

export default function SidebarNav() {
  const { lesson, completedIds } = useLessonStore();
  const { sectionIndex } = useParams();
  const activeIndex = parseInt(sectionIndex || "0", 10);

  if (!lesson) return null;

  return (
    <aside className="hidden md:block w-64 bg-white">
      <h2 className="text-base text-white font-bold py-2 pl-2 pr-4 bg-blue-700 truncate">
        {lesson.title}
      </h2>
      <ul className="h-96 overflow-y-auto text-base">
        {lesson.content.map((section, index) => (
          <li key={index}>
            <NavLink
              to={`/lesson/${index}`}
              className={({ isActive }) =>
                `flex items-center justify-between gap-4 py-2 pl-4 pr-1 border-b border-b-zinc-400 ${
                  isActive || index === activeIndex
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-zinc-700"
                }`
              }
            >
              <span className="truncate">{section.title}</span>
              <input type="radio" readOnly checked={completedIds.has(index)} />
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink
            to={`/lesson/${lesson.content.length}`}
            className={({ isActive }) =>
              `flex items-center gap-2 py-2 pl-4 pr-1  rounded text-base border-b border-b-zinc-400 ${
                isActive || activeIndex === lesson.content.length
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-zinc-700"
              }`
            }
          >
            <input
              type="radio"
              readOnly
              checked={completedIds.has(lesson.content.length)}
            />
            Quiz
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
