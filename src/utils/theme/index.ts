import Cookies from 'js-cookie';
const THEME_ITEM = 'crashed_theme';

export const toggleTheme = () => {
    const dark = document.documentElement.classList.toggle('dark');
    Cookies.set(THEME_ITEM, dark ? '1' : '0', {
        expires: 365,
    });
};

export const setTheme = () => {
    const setting = Number(Cookies.get(THEME_ITEM));
    const settingIsDark = setting === 1;
    const settingIsLight = setting === 0;
    const hasDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const dark = settingIsLight ? false : (settingIsDark || hasDarkMode);

    !dark && document.documentElement.classList.remove('dark');
};
