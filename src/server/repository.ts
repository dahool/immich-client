"use server"
import { environment } from '@/env/environment';
import pg from 'pg';

const { Pool } = pg;
const client = new Pool({
    database: environment.database.databaseName,
    user: environment.database.username,
    password: environment.database.password,
    host: environment.database.host,
    port: parseInt(environment.database.port)
});

export interface AlbumPerson {
    id: string;
    albumId: string;
    name?: string;
}

export async function createRelTable() {
    await client.query(`
        CREATE TABLE IF NOT EXISTS albums_persons
        (
            "albumId" uuid NOT NULL,
            "personId" uuid NOT NULL,
            PRIMARY KEY ("albumId", "personId"),
            CONSTRAINT fk_albums FOREIGN KEY ("albumId")
                REFERENCES public.albums (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE,
            CONSTRAINT fk_persons FOREIGN KEY ("personId")
                REFERENCES public.person (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
        )
      `)
}

export async function listAlbumPeople(albumId: string): Promise<AlbumPerson[]> {

	const data = await client.query(`
    SELECT ap."albumId", ap."personId", p."name"
    FROM albums_persons ap
    INNER JOIN person p
    ON p.id = ap."personId"
    WHERE ap."albumId" = $1
  `, [albumId]);

	return data.rows.map((row) => ({
        id: row.personId,
        albumId: row.albumId,
        name: row.name
    }));

}

export async function addToAlbum(personIds: string[], albumId: string) {
    const query = `
        INSERT INTO albums_persons ("albumId", "personId")
        SELECT $1, unnest($2::uuid[])
        ON CONFLICT ("albumId", "personId") DO NOTHING
    `;
    await client.query(query, [albumId, personIds]);
}

export async function removeFromAlbum(personId: string, albumId: string) {
    const query = `
        DELETE FROM albums_persons
        WHERE "albumId" = $1 AND "personId" = $2
    `;
    await client.query(query, [albumId, personId]);
}