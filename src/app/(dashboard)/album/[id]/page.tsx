import AlbumDetail from "@/app/ui/album/album-detail";
import AlbumPeople from "@/app/ui/album/album-people";

export default async function Page({params}: { params: Promise<{id: string}>}) {
    const { id } = await params
    return (
      <>
        <AlbumPeople albumId={id}/>
      </>
    );
}
