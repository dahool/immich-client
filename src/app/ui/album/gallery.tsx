import { Album, listAlbums } from "@/server/api";
import Image from "next/image";
import Link from "next/link";
import AlbumItem, { AlbumItemSkeleton } from "./item";
import { Suspense } from "react";

export default async function AlbumGallery() {
    const albums = await listAlbums();
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {albums.map((album, index) => (
                <Link href="/album/[id]" as={`/album/${album.id}`} key={index}>
                    <div className="transition-transform transform hover:scale-105 hover:shadow-2xl p2 rounded">
                        <Suspense fallback={<AlbumItemSkeleton />}>
                            <AlbumItem album={album} key={index}/>
                        </Suspense>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export const AlbumGallerySkeleton = () => {
    return (
        <div className="bg-white p-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                <div className="animate-pulse transition-transform transform hover:scale-105 p-2 rounded">
                    <div className="h-40 w-full max-w-full rounded-lg bg-gray-300"></div>
                    <span className="block bg-gray-300 h-4 mt-2 rounded w-3/4"></span>
                    <span className="block bg-gray-300 h-3 mt-1 rounded w-1/2"></span>
                </div>
                <div className="animate-pulse transition-transform transform hover:scale-105 p-2 rounded">
                    <div className="h-40 w-full max-w-full rounded-lg bg-gray-300"></div>
                    <span className="block bg-gray-300 h-4 mt-2 rounded w-3/4"></span>
                    <span className="block bg-gray-300 h-3 mt-1 rounded w-1/2"></span>
                </div>
                <div className="animate-pulse transition-transform transform hover:scale-105 p-2 rounded">
                    <div className="h-40 w-full max-w-full rounded-lg bg-gray-300"></div>
                    <span className="block bg-gray-300 h-4 mt-2 rounded w-3/4"></span>
                    <span className="block bg-gray-300 h-3 mt-1 rounded w-1/2"></span>
                </div>
                <div className="animate-pulse transition-transform transform hover:scale-105 p-2 rounded">
                    <div className="h-40 w-full max-w-full rounded-lg bg-gray-300"></div>
                    <span className="block bg-gray-300 h-4 mt-2 rounded w-3/4"></span>
                    <span className="block bg-gray-300 h-3 mt-1 rounded w-1/2"></span>
                </div>
                <div className="animate-pulse transition-transform transform hover:scale-105 p-2 rounded">
                    <div className="h-40 w-full max-w-full rounded-lg bg-gray-300"></div>
                    <span className="block bg-gray-300 h-4 mt-2 rounded w-3/4"></span>
                    <span className="block bg-gray-300 h-3 mt-1 rounded w-1/2"></span>
                </div>
                <div className="animate-pulse transition-transform transform hover:scale-105 p-2 rounded">
                    <div className="h-40 w-full max-w-full rounded-lg bg-gray-300"></div>
                    <span className="block bg-gray-300 h-4 mt-2 rounded w-3/4"></span>
                    <span className="block bg-gray-300 h-3 mt-1 rounded w-1/2"></span>
                </div>
            </div>
        </div>
    );
};