import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xzenpress.app',
  appName: 'XZenPress',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    allowNavigation: [
      'xzenpress.com',
      '*.xzenpress.com'
    ]
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#059669",
      showSpinner: false,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    },
    StatusBar: {
      style: 'DEFAULT',
      backgroundColor: "#059669"
    },
    App: {
      launchUrl: 'https://xzenpress.com'
    }
  }
};

export default config;