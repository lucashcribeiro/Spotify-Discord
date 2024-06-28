"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { me, userAuthorization } from "@/app/api/spotify/route";
import { useRouter } from "next/navigation";
import { Menu } from "../menu";

interface IUserAuthorization {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: "Bearer";
}

export const HeaderComponent = () => {
  const [user, setUser] = useState<any>();
  const state = encodeURIComponent(Math.random().toString(36).substring(7));

  const params = useSearchParams();
  const router = useRouter();

  const codeParams = params.get("code");
  const stateParams = params.get("state");

  const accessToken =
    typeof window !== "undefined" &&
    localStorage.getItem("spotify_access_token");

  const scopes = [
    "streaming",
    "user-top-read",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
  ];

  const scopeString = scopes.join("%20");

  const href = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=${scopeString}&state=${state}&show_dialog=true`;

  function logoutFunction() {
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");

    router.refresh();
  }

  useEffect(() => {
    async function getUser() {
      if (codeParams) {
        const response = await userAuthorization(codeParams);
        const user: IUserAuthorization = response?.data;

        if (user) {
          localStorage.setItem("spotify_access_token", user.access_token);
          localStorage.setItem("spotify_refresh_token", user.refresh_token);

          router.replace("/");
        }
      }
    }

    getUser();
  }, [codeParams, router]);

  useEffect(() => {
    async function getUser(accessToken: string) {
      const userInfo = await me(accessToken);
      setUser(userInfo?.data);
    }

    getUser(accessToken || "");
  }, [accessToken]);

  return (
    <header className="items-center flex px-6 h-24 justify-between bg-black"> {/* Adiciona bg-black para fundo preto */}
      <Link href={"/"}>
        <img
          src="logo.svg"
          alt="logo do spotify"
          className="w-44 h-32"
        />
      </Link>

      {accessToken && user ? (
        <Menu user={user}
          logoutFunction={logoutFunction}
        />
      ) : (
        <Link href={href}>
          <button className="text-white px-4 py-2 rounded  active:text-green-500"> {/* Estiliza o botão */}
            Login
          </button>
        </Link>
      )}
    </header>

  );
};