import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'Finance',
    webDir: 'dist/financial-accounting-app/browser',
    server: {
        androidScheme: 'https'
    }
};

export default config;
