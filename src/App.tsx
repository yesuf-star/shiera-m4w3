import { useEffect, useState } from "react";

import RepoSearch from "./components/RepoSearch";
import SortDropdown from "./components/SortDropdown";
import RepoCard from "./components/RepoCard";
import type { SortOption } from "./types";
import type { Repo } from "./types";

type ApiStatus =| "idle" | "loading"| "success" | "error";

function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [sort, setSort] = useState<SortOption>("stars");
  const [status, setStatus] = useState<ApiStatus>("idle");
  const [error, setError] = useState("");

  // Fetch repositories
  useEffect(() => {
    if (!username.trim()) {
      setRepos([]);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();

    const fetchRepos = async () => {
      try {
        setStatus("loading");
        setError("");

        const response = await fetch(`https://api.github.com/users/${username}/repos`,{ signal: controller.signal});

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              "GitHub user not found."
            );
          }

          throw new Error("Failed to fetch repositories.");
        }

        const data: Repo[] =await response.json();

        setRepos(data);
        setStatus("success");
      } catch (error) {
        // Ignore intentionally cancelled requests
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        setError( error instanceof Error? error.message : "Something went wrong.");
        setStatus("error");
      }
    };

    fetchRepos();

    // Cancel previous request when
    // username changes or component unmounts
    return () => { controller.abort();};
    
        }, [username]);

  // Sort repositories
  const sortedRepos = [...repos].sort((a, b) => {
      if (sort === "stars") {return (b.stargazers_count - a.stargazers_count);}
      if (sort === "name") {return a.name.localeCompare(b.name);}
      return ( new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime() );
    } );

  return (
    <main className="min-h-screen flex flex-col bg-gray-100">

      {/* Header */}

      <header className="bg-gray-900 px-4 py-8 text-white sm:py-10">
        <div className="mx-auto max-w-6xl text-center">

          <h1 className="text-3xl font-bold sm:text-4xl">
            GitHub Repo Explorer
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            Search for a GitHub username and
            explore their public repositories.
          </p>

        </div>
      </header>


      {/* Main content */}

      <section className="mx-auto max-w-6xl px-4 py-8 flex-1">

        {/* Search and sort */}

        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">

          <div className="flex flex-col gap-3 sm:flex-row" >

            <div className="flex-1 ">
              <RepoSearch  username={username} setUsername={setUsername}/>
            </div>

            <SortDropdown sort={sort} setSort={setSort}/>
          </div>

        </div>


        {/* Loading state */}

        {status === "loading" && (
          <div className="py-16 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-l-green-500 border-t-yellow-500 border-r-red-600 border-b-blue-500" />
            <p className="mt-4 text-gray-600">
              Loading repositories...
            </p>
          </div>
        )}

        {/* Error state */}

        {status === "error" && (
          <div className="mx-auto mt-8 max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-700">
              Unable to load repositories
            </h2>
            <p className="mt-2 text-sm text-red-600"> {error}</p>
          </div>
        )}

        {/* Initial state */}

        {status === "idle" && (
          <div className="py-16 text-center">
          <p className="text-lg font-medium text-gray-700">
              Search for a GitHub user </p>

            <p className="mt-2 text-sm text-gray-500">
              Enter a username above to get started.</p>

          </div>
        )}


        {/* Empty state */}

        {status === "success" &&
          repos.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg font-medium text-gray-700">
                No repositories found
              </p>

              <p className="mt-2 text-sm text-gray-500">
                This user has no public repositories.
              </p>

            </div>
          )}

        {/* Repository cards */}

        {status === "success" &&
          repos.length > 0 && (
            <div className="mt-8">

              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Repositories:
                </h2>

                <span className="text-sm text-gray-500">
                  {repos.length}{" "}
                  {repos.length === 1? "repository" : "repositories"}
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {sortedRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo}/>
                ))}

              </div>

            </div>
          )}

      </section>
<footer className="w-full px-4 py-5 bg-gray-700 text-white text-center text-xs sm:text-sm">
  React Typescript + Tailwind &copy; {new Date().getFullYear()} Yusuf All right reserved
</footer>
    </main>
  );
}

export default App;