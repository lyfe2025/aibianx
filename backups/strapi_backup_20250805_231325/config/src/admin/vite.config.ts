import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    server: {
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'bianx.local',
        '.local'
      ],
      host: '0.0.0.0',
      port: 1337
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};