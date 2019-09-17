import { TrendRepo } from '../../trends/models/trend-repo.model';
import { GithubRepo } from '../models/github-repo.model';

export const mapToGithubRepo = (trend: TrendRepo): GithubRepo => {
  return {
    owner: {
      login: trend.author,
      avatar_url: trend.avatar,
    },
    stargazers_count: trend.stars,
    language: trend.language,
    languageColor: trend.languageColor,
    description: trend.description,
    name: trend.name,
    full_name: `${trend.author}/${trend.name}`,
  } as GithubRepo;
};
