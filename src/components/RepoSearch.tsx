interface RepoSearchProps {
  username: string;
  setUsername: (value: string) => void;
}

function RepoSearch({username,setUsername,}: RepoSearchProps) {
  return (
    <input
      type="text"
      value={username}
      onChange={(event) =>setUsername(event.target.value)}
      placeholder="Enter GitHub username..."
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition  focus:ring-2 focus:ring-blue-300"
    />
  );
}

export default RepoSearch;