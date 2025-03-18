import { listPeople } from "@/server/api";
import { Suspense } from "react";
import PeopleItem from "./item";
import { AlbumItemSkeleton } from "../album/item";

export default async function PeopleGallery() {
    const peopleResponse = await listPeople()
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-8">
            {peopleResponse.map((people, index) => (
                <div key={index} className="rounded w-[178]">
                    <Suspense fallback={<AlbumItemSkeleton />}>
                        <PeopleItem people={people} key={index} />
                    </Suspense>
                </div>
            ))}
        </div>
    );
}


/*<Link href="/people/[id]" as={`/people/${people.id}`} key={index}>
<div key={index} className="transition-transform transform hover:scale-105 hover:shadow-2xl rounded w-[178]">
<Suspense fallback={<AlbumItemSkeleton />}>
    <PeopleItem people={people} />
</Suspense>
</div>
</Link>*/