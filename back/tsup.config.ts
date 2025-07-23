import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],      // ponto de entrada da aplicação
  outDir: 'dist',                // saída, já compatível com seu tsconfig
  target: 'node18',
  bundle: false,              // ou node20 se preferir
  format: ['cjs'],               // CommonJS é o padrão para usar com `node`
  splitting: false,              // desativa code splitting
  sourcemap: true,               // útil para debugging
  clean: true,                   // limpa o dist antes de buildar
  dts: false,                    // não precisa de .d.ts aqui
  esbuildOptions(options) {
    options.alias = {
      '@Routers': './src/Routers',
      '@Types': './src/Types',
      '@Domain': './src/Domain',
      '@Infrastructure': './src/Infrastructure'
    }
  }
})
