"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { favoriteArtists, newReleases } from "@/app/api/spotify/route";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


interface IConteudo {
  title: string;
  page: string;
}

export const Conteudo = ({ title, page }: IConteudo) => {
  const [artists, setArtists] = useState<any>([]);
  const [selectedArtist, setSelectedArtist] = useState<any>({});

  console.log(selectedArtist);

  const accessToken = localStorage.getItem("spotify_access_token");
  const moreInfomation = (artist: any) => {
    setSelectedArtist(artist);
  }

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
    <section className="bg-black">
      <h1>{title}</h1>
      <Swiper spaceBetween={50} slidesPerView={3}>
        {page === "lancamentos"
          ? artists.map((artist: any) => (
            <SwiperSlide key={artist.id} className="bg-black text-white" onClick={() => moreInfomation(artist)}>
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
            <SwiperSlide key={artist.id} className="bg-black text-white" onClick={() => moreInfomation(artist)}>
              <Image
                src={artist.images[1].url}
                alt="Nome da image"
                width={1400}
                height={1400}
                className="w-[1200px] h-[600px] object-cover"
              />
              <p className=" text-black">.</p>
              <p>{artist.name}</p>
              {/* <p>{artist.artists[0].name}</p> */}
            </SwiperSlide>


          ))}
      </Swiper>

      {selectedArtist !== "" && (
        <div className="absolute h-full w-full  flex justify-center items-center top-0 left-0 z-10 " >
          <div className="bg-black bg-opacity-75 w-[600px] rounded-lg  h-[600px] border-solid border-4 border-green-500">
            <h1>{selectedArtist.name}</h1>
            {/* <h2>{selectedArtist?.artists[0].name}</h2> */}
            <button onClick={() =>
              setSelectedArtist({})
            }>X</button>
          </div>
        </div>
      )}


    </section>
  );
};
