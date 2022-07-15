import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";

const ToggleLightDark = () => {
  const { theme, systemTheme, resolvedTheme, setTheme } = useTheme();

  console.log("theme is:", theme);
  console.log("systemTheme is:", systemTheme);
  console.log("resolvedTheme is:", resolvedTheme);

  return (
    <Switch
      checked={`${theme === "dark" ? true : false}`}
      onChange={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className='relative inline-flex h-6 w-12 items-center rounded-full bg-white'
    >
      <span className='sr-only'>Enable notifications</span>
      <span
        aria-hidden='true'
        className={`${
          theme === "dark" ? "translate-x-[30px]" : "translate-x-[5px]"
        } inline-block h-[14px] w-[14px] transform rounded-full bg-violet transition duration-100 ease-in-out hover:bg-lightviolet`}
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      />
    </Switch>
  );
};

export default ToggleLightDark;
