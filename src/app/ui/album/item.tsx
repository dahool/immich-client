import { Album, getAssetThumbnail } from "@/server/api";

export const NoCoverImg = '/images/no-thumbnail.png'

export default async function AlbumItem({ album }: { album: Album }) {
    const image = album.albumThumbnailAssetId ? await getAssetThumbnail(album.albumThumbnailAssetId) : NoCoverImg
    return (
        <>
        <img
            className="h-40 w-full max-w-full rounded-lg object-cover object-center"
            src={image}
            loading="lazy"
            alt="gallery-photo"
        />
        <span className="block text-black mt-2">
            {album.albumName}
            <span className="block text-gray-500 text-xs">{album.assetCount} items</span>
        </span>
        </>
    );
}

export const AlbumItemSkeleton = () => {
    return (
        <>
        <img
            className="h-40 w-full max-w-full rounded-lg object-cover object-center"
            src={NoCoverImg}
            loading="eager"
            alt="gallery-photo"
        />
        <span className="block bg-gray-300 h-4 mt-2 rounded w-3/4"></span>
        <span className="block bg-gray-300 h-3 mt-1 rounded w-1/2"></span>
        </>
    )
}