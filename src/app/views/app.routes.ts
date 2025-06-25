import { Routes } from '@angular/router';

import { AuthenticatedRouteGuard } from 'src/shared/guards/AuthenticatedRoute.Guard';
import { ConfigNavigateRouteGuard } from 'src/shared/guards/ConfigNavigateRoute.Guard';
import { FirstConnexionRouteGuard } from 'src/shared/guards/FirstConnexionRoute.Guard';
//import { StopGoBackRouteGuard } from 'src/shared/guards/StopGoBackRoute.Guard';
import { UnauthenticatedRouteGuard } from 'src/shared/guards/UnauthenticatedRoute.Guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'login',
    canActivate: [UnauthenticatedRouteGuard],
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'init-app',
    canActivate: [ConfigNavigateRouteGuard],
    loadComponent: () => import('./init-app/init-app.page').then( m => m.InitAppPage)
  },
  {
    path: 'cgu-page',
    canActivate: [FirstConnexionRouteGuard],
    loadComponent: () => import('./cgu-page/cgu-page.page').then( m => m.CguPagePage)
  },
 
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },
  
  {
    path: 'contracts',
    canActivate: [AuthenticatedRouteGuard],
    loadComponent: () => import('./client/contrats/contrats.page').then( m => m.ContratsPage)
  },
  {
    path: 'detail-contrat/:contratId',
    canActivate: [AuthenticatedRouteGuard],
    loadChildren: () => import('./client/detail-contrat/detail-contrat.page').then( m => m.DetailContratPage)
  },
  {
    path: 'country-selection',
    loadComponent: () => import('./settings/app-settings/country-selection/country-selection.page').then( m => m.CountrySelectionPage)
  },
  {
    path: 'language-selection',
    loadComponent: () => import('./settings/app-settings/language-selection/language-selection.page').then( m => m.LanguageSelectionPage)
  },
  
  {
    path: 'parrainage',
    loadComponent: () => import('./parrainage/parrainage.page').then( m => m.ParrainagePage)
  },
  {
    path: 'recup-compte',
    canActivate: [UnauthenticatedRouteGuard],
    loadComponent: () => import('./recup-compte/recup-compte.page').then( m => m.RecupComptePage)
  },
  {
    path: 'dashboard',
    canActivate: [AuthenticatedRouteGuard],
    loadComponent: () => import('./client/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'contrats',
    loadComponent: () => import('./client/contrats/contrats.page').then( m => m.ContratsPage)
  },
  {
    path: 'detail-contrat',
    canActivate: [AuthenticatedRouteGuard],
    loadComponent: () => import('./client/detail-contrat/detail-contrat.page').then( m => m.DetailContratPage)
  },
  {
    path: 'liste-impayes',
    canActivate: [AuthenticatedRouteGuard],
    loadComponent: () => import('./client/liste-impayes/liste-impayes.page').then( m => m.ListeImpayesPage)
  },
  {
    path: 'parametre',
    loadComponent: () => import('./client/parametre/parametre.page').then( m => m.ParametrePage)
  },
  {
    path: 'product-list/:typeFamille',
    loadComponent: () => import('./client/product-list/product-list.page').then( m => m.ProductListPage)
  },
  {
    path: 'products',
    loadComponent: () => import('./client/products/products.page').then( m => m.ProductsPage)
  },
  {
    path: 'propositions',
    loadComponent: () => import('./client/propositions/propositions.page').then( m => m.PropositionsPage)
  },
  {
    path: 'service-client',
    canActivate: [AuthenticatedRouteGuard],
    loadComponent: () => import('./client/service-client/service-client.page').then( m => m.ServiceClientPage)
  },
  {
    path: 'subscribe',
    loadComponent: () => import('./client/subscribe/subscribe.page').then( m => m.SubscribePage)
  },
  {
    path: 'profil',
    canActivate: [AuthenticatedRouteGuard],
    loadComponent: () => import('./client/user-profil/user-profil.page').then( m => m.UserProfilPage)
  },
  {
    path: 'config-country',
    canActivate: [ConfigNavigateRouteGuard],
    loadComponent: () => import('./config-country/config-country.page').then( m => m.ConfigCountryPage)
  },
  {
    path: 'config-lang',
    canActivate: [ConfigNavigateRouteGuard],
    loadComponent: () => import('./config-lang/config-lang.page').then( m => m.ConfigLangPage)
  },
  {
    path: 'change-default-password',
    canActivate: [FirstConnexionRouteGuard],
    loadComponent: () => import('./change-default-password/change-default-password.page').then( m => m.ChangeDefaultPasswordPage)
  },


];
