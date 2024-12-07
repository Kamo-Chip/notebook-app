import { db } from "@vercel/postgres";

const client = await db.connect();

async function seedPlaylists() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS playlists(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
}

async function seedPodcasts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
      CREATE TABLE IF NOT EXISTS podcasts(
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          playlist_id UUID NOT NULL REFERENCES playlists(id),
          title TEXT NOT NULL,
          key TEXT NOT NULL,
          length SMALLINT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `;
}

async function seedSources() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
        CREATE TABLE IF NOT EXISTS sources(
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            playlist_id UUID NOT NULL REFERENCES playlists(id),
            title TEXT NOT NULL,
            key TEXT NOT NULL,
            id_prefix TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;

    await seedPlaylists();
    await seedPodcasts();
    await seedSources();

    await client.sql`COMMIT`;
    return Response.json({ message: "Successfully seeded database" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
