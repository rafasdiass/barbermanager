module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/app/**/*.spec.ts' // Caminho para os seus arquivos de teste
    ],
    preprocessors: {
      'src/app/**/*.spec.ts': ['webpack'] // Utiliza o webpack para processar os arquivos de teste
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.ts$/, // Aplica as regras apenas em arquivos TypeScript
            use: 'ts-loader', // Utiliza o ts-loader para transpilar os arquivos TypeScript
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js']
      }
    },
    reporters: ['progress'],
    browsers: ['Chrome'],
    singleRun: true
  });
};
