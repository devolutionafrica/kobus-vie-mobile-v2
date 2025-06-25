import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nsiavie.chapchap',
  appName: 'NSIA ChapChap',
  webDir: 'www',
  plugins: {
    SocialLogin: {
      google: {
        webClientId: '670607738663-c1ko5tevgb70s18uslkba553rhesrrv2.apps.googleusercontent.com',
        mode: 'offline', // or 'offline' if you have the server client ID set
        scopes: ['profile', 'email'], // Optional: specify additional scopes if needed    
      }
    }
  }
};
export default config;

