"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  favoriteArtists,
  findArtist,
  newReleases,
} from "@/app/api/spotify/route";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface IConteudo {
  title: string;
  page: string;
}

export const Conteudo = ({ title, page }: IConteudo) => {
  const [artists, setArtists] = useState<any>([]);
  const [selectedArtist, setSelectedArtist] = useState<any>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [artistInfo, setArtistInfo] = useState<any>({});

  const accessToken = localStorage.getItem("spotify_access_token");
  const moreInfomation = (artist: any) => {
    setIsOpen(true);
    setSelectedArtist(artist);
  };

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

  useEffect(() => {
    async function loadData() {
      if (page === "lancamentos") {
        if (selectedArtist && selectedArtist.artists?.[0] && accessToken) {
          const response = await findArtist(
            accessToken,
            selectedArtist.artists[0].id
          );

          return setArtistInfo(response?.data || {});
        }
      }

      if (page === "artistas-preferidos") {
        if (selectedArtist && accessToken) {
          const response = await findArtist(
            accessToken,
            selectedArtist.id
          );

          return setArtistInfo(response?.data || {});
        }
      }
    }
    loadData();
  }, [selectedArtist]);
  console.log("teste", artistInfo);
  console.log("SelectedArtist", selectedArtist);

  return (
    <section className="bg-black">
      <h1>{title}</h1>
      <Swiper spaceBetween={50} slidesPerView={3}>
        {page === "lancamentos"
          ? artists.map((artist: any) => (
            <SwiperSlide
              key={artist.id}
              className="bg-black text-white"
              onClick={() => moreInfomation(artist)}
            >
              <Image
                src={artist.images[2].url}
                alt="Nome da image"
                width={1400}
                height={1400}
                className="w-[1200px] h-[600px] object-cover"
              />
              <p>{artist.name}</p>
              <p>{artist.artists[0].name}</p>
            </SwiperSlide>
          ))
          : artists.map((artist: any) => (
            <SwiperSlide
              key={artist.id}
              className="bg-black text-white"
              onClick={() => moreInfomation(artist)}
            >
              <Image
                src={artist.images[1].url}
                alt="Nome da image"
                width={1400}
                height={1400}
                className="w-[1200px] h-[600px] object-cover"
              />
              <p className=" text-black">.</p>
              <p>{artist.name}</p>
            </SwiperSlide>
          ))}
      </Swiper>

      {isOpen && page === "lancamentos" && (
        <div className="absolute h-full w-full  flex justify-center items-center top-0 left-0 z-10 ">
          <div className="bg-black bg-opacity-75 relative w-[360px] rounded-lg  h-[360px] border-solid border-4 border-green-500 p-4">
            <h1 className="text-white pb-2 ">
              Nome da música - {selectedArtist.name}
            </h1>
            <p className="text-white pb-2">
              Nome do Cantor - {selectedArtist.artists[0].name}
            </p>
            <p className="text-white">
              Gênero -{" "}
              {artistInfo?.genres?.map((genre: any) => (
                <span className="text-white pb-2" key={genre}>
                  {genre}
                </span>
              ))}
            </p>

            <button
              className="text-white absolute top-[10px] right-[10px] text-[20px]"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      {isOpen && page === "artistas-preferidos" && (
        <div className="absolute h-full w-full flex justify-center items-center top-0 left-0 z-10 ">
          <div className="bg-black bg-opacity-75 relative w-[600px] rounded-lg  h-[600px] border-solid border-4 border-green-500 p-4">
            <h1 className="text-white pb-2">
              Nome do Cantor - {artistInfo.name}
            </h1>
            <p className="text-white">
              Gênero -{" "}
              {artistInfo.genres?.map((genre: any) => (
                <span className="text-white pb-2" key={genre}>
                  {genre}
                </span>
              ))}
            </p>

            <button
              className="text-white absolute top-[10px] right-[10px] text-[20px]"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </section>
  );
};