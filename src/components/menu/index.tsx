import Link from "next/link";
import { useState } from "react";

interface IMenu {
  user: any;
  logoutFunction: () => void;
}

export const Menu = ({ user, logoutFunction }: IMenu) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-5 items-center ">
      <div className="relative">


        <button
          className="text-white active:text-green-500 focus:text-green-500"
          onClick={() => setIsOpen(!isOpen)}>
          Menu
        </button>
        <div>
          {isOpen && (
            <div className="absolute right-[0px] top-[20px] bg-green-500 rounded-xl flex justify-center items-center py-2 z-10">
              <ul className="flex gap-8 mx-16 flex-col w-100 max-h-32 items-center  ">
                <li className="text-white active:text-green-500 focus:text-green-500">
                  <Link href={"/lancamentos"}>
                    <button>Lançamentos</button>
                  </Link>
                </li>
                <li className="text-white active:text-green-500 focus:text-green-500">
                  <Link href={"/artistas-preferidos"}>
                    <button>Artistas Preferidos</button>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
      </div>



      <p className="text-white">{user.display_name}</p>




      <button className="text-white active:text-green-500" onClick={() => logoutFunction()}>Logout</button>



    </div>
  );
};



