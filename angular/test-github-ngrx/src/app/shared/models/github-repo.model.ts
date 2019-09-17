import { GithubUser } from './github-user.model';

export interface GithubRepo {
  id: number;
  owner: GithubUser;
  full_name: string;
  name: string;
  avatar_url: string;
  url: string;
  description: string;
  language: string;
  languageColor: string;
  stargazers_count: number;
}
