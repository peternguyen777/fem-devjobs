import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ToggleLightDark = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <span
          aria-hidden='true'
          className='inline-block h-[14px] w-[14px] translate-x-[30px] transform rounded-full bg-violet transition duration-100 ease-in-out hover:bg-lightviolet'
        />
      );
    } else {
      return (
        <span
          aria-hidden='true'
          className='inline-block h-[14px] w-[14px] translate-x-[5px] transform rounded-full bg-violet transition duration-100 ease-in-out hover:bg-lightviolet'
        />
      );
    }
  };

  return (
    <Switch
      checked={`${theme === "dark" ? true : false}`}
      onChange={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className='relative inline-flex h-6 w-12 items-center rounded-full bg-white'
    >
      <span className='sr-only'>Enable notifications</span>

      {renderThemeChanger()}
    </Switch>
  );
};

export default ToggleLightDark;
