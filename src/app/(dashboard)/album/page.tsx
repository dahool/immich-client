import AlbumGallery, { AlbumGallerySkeleton } from "@/app/ui/album/gallery";
import { Suspense } from "react";

export default async function Page() {
    return (
      <>
        <Suspense fallback={AlbumGallerySkeleton()}>
          <AlbumGallery/>
        </Suspense>
      </>
    );
}
