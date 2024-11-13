"use server";

import { sql } from "@vercel/postgres";
import { Playlist, Podcast, Source } from "./types";

export const createPlaylist = async (title: string) => {
  const result = await sql<Playlist>`
        INSERT INTO playlists (title)
        VALUES (${title}) RETURNING id;
    `;

  return result.rows[0];
};

export const createSource = async (
  title: string,
  playlistId: string,
  key: string,
  id_prefix: string
) => {
  const result = await sql<Source>`
      INSERT INTO sources (title, playlist_id, key, id_prefix)
      VALUES (${title}, ${playlistId}, ${key}, ${id_prefix})
      RETURNING id;
    `;

  return result.rows[0];
};

export const createPodcastEpisode = async (
  title: string,
  playlistId: string,
  key: string,
  length: number
) => {
  const result = await sql<Podcast>`
    INSERT INTO podcasts (title, playlist_id, key, length )
    VALUES (${title}, ${playlistId}, ${key}, ${length});
  `;
  return result.rows;
};

export const fetchSources = async (playlistId: string) => {
  const result = await sql<Source>`
    SELECT * FROM sources
    WHERE playlist_id = ${playlistId};
  `;

  return result.rows;
};

export const fetchPlaylist = async (id: string) => {
  const result = await sql<Playlist>`
    SELECT * FROM playlists
    WHERE id = ${id};
  `;

  return result.rows[0];
};

export const fetchPlaylists = async () => {
  const result = await sql<Playlist>`
    SELECT * FROM playlists
    ORDER BY created_at;
  `;

  return result.rows;
};

export const fetchSourceCount = async (playlistId: string) => {
  const result = await sql`
    SELECT COUNT(*)
    FROM sources
    WHERE playlist_id = ${playlistId}
  `;

  return result.rows[0];
};

export const fetchPodcastCount = async (playlistId: string) => {
  const result = await sql`
    SELECT COUNT(*)
    FROM podcasts
    WHERE playlist_id = ${playlistId};
  `;

  return result.rows[0];
};
export const fetchPlaylistData = async (id: string) => {
  const data = await Promise.all([
    fetchPlaylist(id),
    fetchSources(id),
    fetchPodcasts(id),
  ]);
  return data;
};

export const fetchPodcasts = async (playlistId: string) => {
  const result = await sql<Podcast>`
    SELECT * FROM podcasts
    WHERE playlist_id = ${playlistId}
  `;

  return result.rows;
};

export const deletePodcast = async (id: string) => {
  await sql`
    DELETE FROM podcasts 
    WHERE id = ${id};
  `;
};

export const deleteSource = async (id: string) => {
  await sql`
    DELETE FROM sources 
    WHERE id = ${id};
  `;
};

export const deletePlaylist = async (id: string) => {
  await sql`
    DELETE FROM playlists 
    WHERE id = ${id};
  `;
};
