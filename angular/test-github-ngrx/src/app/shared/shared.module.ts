import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubRepoComponent } from './components/github-repo/github-repo.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from './components/loader/loader.component';
import { SaveRepoButtonComponent } from './components/save-repo-button/save-repo-button.component';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { RemoveRepoButtonComponent } from './components/remove-repo-button/remove-repo-button.component';
import { RepoStarsComponent } from './components/repo-stars/repo-stars.component';
import { RepoLanguageComponent } from './components/repo-language/repo-language.component';

@NgModule({
  declarations: [
    GithubRepoComponent,
    PageTitleComponent,
    LoaderComponent,
    SaveRepoButtonComponent,
    EmptyListComponent,
    RepoListComponent,
    RemoveRepoButtonComponent,
    RepoStarsComponent,
    RepoLanguageComponent,
  ],
  exports: [
    GithubRepoComponent,
    PageTitleComponent,
    LoaderComponent,
    EmptyListComponent,
    RepoListComponent,
    RepoStarsComponent,
    RepoLanguageComponent,
    SaveRepoButtonComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
})
export class SharedModule {}
