import axios from "axios";

export const userAuthorization = async (code: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SPOTIFY_URL_TOKEN}`,
      {
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:3000",
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const me = async (access_token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SPOTIFY_URL}/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const newReleases = async (access_token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SPOTIFY_URL}/browse/new-releases`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const favoriteArtists = async (access_token: string) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          time_range: "medium_term",
          limit: 20,
          offset: 0,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};


export const findArtist = async (access_token: string, id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SPOTIFY_URL}/artists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
;}
