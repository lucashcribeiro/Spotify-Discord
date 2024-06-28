"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { favoriteArtists, newReleases } from "@/app/api/spotify/route";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Player } from "react-player";

interface IConteudo {
  title: string;
  page: string;
}

export const Conteudo = ({ title, page }: IConteudo) => {
  const [artists, setArtists] = useState<any>([]);

  const accessToken = localStorage.getItem("spotify_access_token");

  useEffect(() => {
    async function loadData() {
      if (page === "lancamentos") {
        if (accessToken) {
          const response = await newReleases(accessToken);

          return setArtists(response?.data.albums.items || []);
        }
      }

      if (page === "artistas-preferidos") {
        if (accessToken) {
          const response = await favoriteArtists(accessToken);

          return setArtists(response?.data.items || []);
        }
      }
    }

    loadData();
  }, [accessToken, page]);

  return (
    <section>
      <h1>{title}</h1>
      <Swiper spaceBetween={50} slidesPerView={3}>
        {page === "lancamentos"
          ? artists.map((artist: any) => (
            <SwiperSlide key={artist.id} className="bg-blue-500">
              <Image
                src={artist.images[2].url}
                alt="Nome da image"
                width={250}
                height={250}
                className="w-[1200px] h-[600px] object-cover"
              />
              <p>{artist.name}</p>
              <p>{artist.artists[0].name}</p>
            </SwiperSlide>
          ))
          : artists.map((artist: any) => (
            <SwiperSlide key={artist.id} className="bg-blue-500">
              <Image
                src={artist.images[0].url}
                alt="Nome da image"
                width={100}
                height={100}
                className="w-[1200px] h-[600px] object-cover"
              />
              <p>{artist.name}</p>
              {/* <p>{artist.artists[0].name}</p> */}
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
