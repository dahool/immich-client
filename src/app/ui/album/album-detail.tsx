import { Album, getAlbum, listPeople, People } from "@/server/api";
import { FaPlus } from "react-icons/fa6";
import PeopleItem from "../people/item";
import { AlbumItemSkeleton } from "./item";
import { Suspense } from "react";
import { listAlbumPeople } from "@/server/repository";

export default async function AlbumDetail({ albumId }: { albumId: string }) {
    const album = await getAlbum(albumId)
    const albumPersons = await listAlbumPeople(albumId)
    return (
        <section id="asset-grid">
        <section>
            <section className="pt-8 md:pt-24">
            <span className="w-[99%] mb-2 text-2xl md:text-4xl lg:text-6xl text-black">
                {album.albumName}
            </span>
            <span className="my-2 flex gap-2 text-sm font-medium text-gray-500">
                <span>{album.assetCount} items</span>
            </span>
            <div className="my-3 flex gap-x-1">
                <button
                    type="button"
                    title="Add People"
                    className="flex place-content-center place-items-center rounded-full bg-[#d3d3d3] hover:bg-[#e2e7e9] p-3 transition-all">
                    <FaPlus />
                </button>
            </div>
            </section>
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-8">
                {albumPersons.map((person, index) => (
                    <div key={index} className="rounded w-[178]">
                        <Suspense fallback={<AlbumItemSkeleton />}>
                            <PeopleItem people={person} />
                        </Suspense>
                    </div>
                ))}
            </section>
        </section>
        </section>
    );
}
