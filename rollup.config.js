import replace from '@rollup/plugin-replace';

export default {
  input: 'src/lib/buildTime.js',
  output: {
    dir: 'src/lib/build/',
  },
  plugins: [
    replace({
      currentTime: () => JSON.stringify(new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }))
    })
  ]
};
