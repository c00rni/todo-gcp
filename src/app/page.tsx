"use client";
import Image from "next/image";
import lightBg from '../../public/bg-desktop-light.jpg';
import darkBg from '../../public/bg-desktop-dark.jpg';
import ThemeSwitcher from "./ui/themeSwitcher";
import { useEffect, useState } from "react";
import TaskManager from "./ui/taskManager";
import { ThemeContext } from "./themeContext";
import SignIn from "./ui/sign-in";
import { User } from "firebase/auth";
import { onAuthStateChangedHelper } from "./firebase/firebase";

export default function Home() {

  const [theme, setTheme] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubcribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    //Clearnup subscript user on unmont
    return () => unsubcribe()
  }, [])

  return (
    <>
    <ThemeContext.Provider value={theme}>
      <div className="flex flex-col h-full">
        <div className="relative h-[200px] sm:h-[35vh]">
          <Image className="object-cover" fill src={theme ? lightBg : darkBg} alt="background image of montaignes" />
          <main className={`flex flex-col gap-5 px-5 w-full absolute top-10 sm:top-16 lg:top-20 xl:top-24 left-1/2 transform -translate-x-1/2 pb-10 max-w-[580px]`}>
            <div className="flex justify-between mb-2 items-center">
              <p className="text-white text-title xl:text-[3rem] tracking-[10px] xl:tracking-[15px] font-semibold md:font-extrabold">TODO</p>
              <div className="flex justify-end items-center gap-5">
                <SignIn user={user}/>
                <ThemeSwitcher theme={theme} setTheme={setTheme}/>
              </div>
            </div>
            <TaskManager />
          </main>
        </div>
        <div className={`flex-1 ${!theme && "bg-dark"}`}>
        </div>
      </div>
    </ThemeContext.Provider>
    </>
  );
}
