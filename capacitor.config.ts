import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.vercel.barbermanager',
  appName: 'barber-manager',
  webDir: 'dist/barber-manager',
  server: {
    androidScheme: 'https'
  }
};

export default config;
