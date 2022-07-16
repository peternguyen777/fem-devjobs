import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ToggleLightDark = () => {
  const { systemTheme, theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Switch
      checked={`${resolvedTheme === "dark" ? true : false}`}
      onChange={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      className='relative inline-flex h-6 w-12 items-center rounded-full bg-white'
    >
      <span className='sr-only'>Enable notifications</span>
      <span
        aria-hidden='true'
        className={`inline-block h-[14px] w-[14px] ${
          currentTheme === "dark" ? `translate-x-[30px]` : `translate-x-[5px]`
        } transform rounded-full bg-violet transition duration-100 ease-in-out hover:bg-lightviolet`}
      />
    </Switch>
  );
};

export default ToggleLightDark;
