export interface GithubUser {
  id: number;
  login: string;
  href: string;
  avatar: string;
  avatar_url: string;
  events_url: string;
  followersLoaded: boolean;
  followers: GithubUser[];
}
