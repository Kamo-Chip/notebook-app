export type Dialogue = {
  speaker: string;
  text: string;
};

export type Source = {
  id: string;
  playlist_id: string;
  title: string;
  key: string;
  id_prefix: string;
  created_at: string;
  updated_at: string;
};

export type Podcast = {
  id: string;
  playlist_id: string;
  title: string;
  key: string;
  length: number;
  created_at: string;
  updated_at: string;
};

export type Playlist = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};
