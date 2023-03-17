import {create} from 'zustand';

type DoL = 'dark' | 'light';
interface ThemeI {
  theme: DoL;
  toggleTheme: () => void;
  setTheme: (t: DoL) => void;
}

const useTheme = create<ThemeI>(set => ({
  theme: 'dark',
  toggleTheme: () =>
    set(state => ({theme: state.theme === 'dark' ? 'light' : 'dark'})),
  setTheme: (theme: DoL) => set(() => ({theme})),
}));

export default useTheme;
