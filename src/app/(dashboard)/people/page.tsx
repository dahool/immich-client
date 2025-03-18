import { AlbumGallerySkeleton } from "@/app/ui/album/gallery";
import PeopleGallery from "@/app/ui/people/gallery";
import { Suspense } from "react";

export default async function Page() {
    return (
      <>
        <Suspense fallback={AlbumGallerySkeleton()}>
          <PeopleGallery/>
        </Suspense>
      </>
    );
}
