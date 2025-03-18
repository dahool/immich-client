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
);

CREATE OR REPLACE FUNCTION insert_assets_for_person(person_id UUID)
RETURNS INTEGER AS $$
DECLARE
    inserted_count INTEGER;
BEGIN
    WITH inserted_rows AS (
        INSERT INTO albums_assets_assets ("albumsId", "assetsId")
        SELECT ap."albumId", af."assetId"
        FROM albums_persons ap
        INNER JOIN asset_faces af
        ON af."personId" = ap."personId"
        WHERE ap."personId" = person_id
        ON CONFLICT ("albumsId", "assetsId") DO NOTHING
        RETURNING 1
    )
    SELECT COUNT(*) INTO inserted_count FROM inserted_rows;
    RETURN inserted_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION person_assets_to_album_function()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW."personId" IS NOT NULL THEN
        PERFORM insert_assets_for_person(NEW."personId");
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER person_assets_to_album
AFTER INSERT OR UPDATE ON asset_faces
    FOR EACH ROW EXECUTE PROCEDURE person_assets_to_album_function();

