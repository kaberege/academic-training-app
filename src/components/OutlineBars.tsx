import { AiOutlineBars } from "react-icons/ai";

const OutlineBars = () => {
  return (
    <div className="fixed top-20 left-0 px-2 py-3 bg-zinc-300 flex items-center justify-center rounded-r-3xl cursor-pointer hover:bg-zinc-500 hover:pr-4 transition-all">
      <AiOutlineBars className="text-xl text-zinc-900" />
    </div>
  );
};

export default OutlineBars;
