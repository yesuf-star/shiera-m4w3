import type { SortOption,SortDropdownProps } from "../types";


function SortDropdown({sort, setSort,}: SortDropdownProps) {
  return (
    <select
      value={sort}
      onChange={(event) => setSort(event.target.value as SortOption)}
      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none  focus:ring-2 focus:ring-green-300"
    >
      <option value="stars">Stars</option>
      <option value="recent">Recent</option>
      <option value="name">Name</option>
    </select>
  );
}

export default SortDropdown;