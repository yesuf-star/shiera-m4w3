import type { Repo } from "../types";

interface RepoCardProps {
  repo: Repo;
}

function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between gap-3">
        <h2 className="break-words text-lg font-bold text-gray-900">
          {repo.name}
        </h2>

        <span className="shrink-0 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
          ★ {repo.stargazers_count}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
        {repo.description || "No description available."}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-500">
        {repo.language && (<span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{repo.language}</span> )}

        <span>Updated{" "}{new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 rounded-lg bg-gray-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-600">
        View Repository
      </a>

    </article>
  );
}

export default RepoCard;