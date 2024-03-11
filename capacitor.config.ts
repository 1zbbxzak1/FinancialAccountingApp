import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'FinancialAccountingApp',
  webDir: 'dist/financial-accounting-app/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
