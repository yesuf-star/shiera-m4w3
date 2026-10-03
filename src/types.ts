export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}
export type  SortOption ="stars"| "recent"| "name"

export interface SortDropdownProps {
  sort: SortOption;
  setSort: (value: SortOption) => void;
}