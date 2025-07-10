import { type LessonContentItem } from "../types";

export const renderLessonBlock = (block: LessonContentItem, index: number) => {
  switch (block.type) {
    case "heading":
      if (block.level === 1)
        return (
          <h1
            key={index}
            id={`block-${index}`}
            className="text-2xl font-bold my-4"
          >
            {block.text}
          </h1>
        );
      if (block.level === 2)
        return (
          <h2
            key={index}
            id={`block-${index}`}
            className="text-xl font-semibold my-3"
          >
            {block.text}
          </h2>
        );
      return (
        <h3
          key={index}
          id={`block-${index}`}
          className="text-lg font-medium my-2"
        >
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p
          key={index}
          id={`block-${index}`}
          className="my-2 text-gray-700 leading-relaxed"
        >
          {block.text}
        </p>
      );
    case "list":
      return block.ordered ? (
        <ol
          key={index}
          id={`block-${index}`}
          className="list-decimal ml-6 space-y-1"
        >
          {block.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul
          key={index}
          id={`block-${index}`}
          className="list-disc ml-6 space-y-1"
        >
          {block.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};
