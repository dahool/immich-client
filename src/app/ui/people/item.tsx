'use client'
import { getPeopleThumbnail, People } from "@/server/api";
import { AlbumItemSkeleton } from "../album/item";
import { useEffect, useState } from "react";
/*
export default async function PeopleItem({ people }: { people: People }) {
    const image = await getPeopleThumbnail(people.id)
    return (
        <>
        <img
            className="object-cover rounded-full shadow-lg aspect-square w-full"
            src={image}
            loading="lazy"
            alt="gallery-photo"
        />
        <span className="block text-black mt-2 text-center">
            {people.name ? people.name : '[No name]'}
        </span>
        </>
    );
}

*/

export default function PeopleItem({ people }: { people: People }) {

    const [image, setImage] = useState<string>('')

    const fetchImage = async (id: string) => {
        setImage(await getPeopleThumbnail(id))
    }

    useEffect(() => {
        fetchImage(people.id)
    }, [people])

    if (!image) return AlbumItemSkeleton()

    return (
        <>
        <img
            className="object-cover rounded-full shadow-lg aspect-square w-full"
            src={image}
            loading="lazy"
            alt="gallery-photo"
        />
        <span className="block text-black mt-2 text-center">
            {people.name ? people.name : '[No name]'}
        </span>
        </>
    );
}