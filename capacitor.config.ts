import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xzenpress.app',
  appName: 'XZenPress',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#059669",
      showSpinner: false
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: "#059669"
    }
  }
};

export default config;