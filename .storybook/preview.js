import '@src/styles/reset.css';
import '@src/styles/global.scss';
import '@src/styles/markdown.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    darkClass: 'dark',
    lightClass: 'light',
    classTarget: 'html',
    stylePreview: true,
  }
}