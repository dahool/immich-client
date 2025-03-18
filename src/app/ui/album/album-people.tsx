'use client'
import { Album, getAlbum, listPeople, People } from "@/server/api"
import { useEffect, useState } from "react"
import AddPeopleDialog from "../people/add-people"
import { addAssetsToAlbum, addToAlbum, AlbumPerson, listAlbumPeople, removeFromAlbum } from "@/server/repository"
import { FaPlus } from "react-icons/fa6"
import PeopleItem from "../people/item"
import { MdOutlinePersonRemove } from "react-icons/md"

export default function AlbumPeople({albumId}: {albumId: string}) {

    const [openDialog, setOpenDialog] = useState(false)
    const [peopleList, setPeopleList] = useState<People[]>([])
    const [album, setAlbum] = useState<Album | null>(null)
    const [albumPersons, setAlbumPersons] = useState<AlbumPerson[]>([])

    const fetchPeople = async () => {
        const people = await listPeople(true)
        // remove people without name
        setPeopleList(people.filter(p => p.name))
    }
    const fetchAlbum = async () => {
        setAlbum(await getAlbum(albumId))
    }
    const fetchPersons = async () => {
        setAlbumPersons(await listAlbumPeople(albumId))
    }

    useEffect(() => {
        fetchAlbum()
        fetchPersons()
        fetchPeople()
    }, [ albumId ])

    const handleClose = async (ids: []) => {
      setOpenDialog(false)
      if (ids) {
        await addToAlbum(ids, albumId)
        fetchPersons()
        await Promise.all(ids.map(id => addAssetsToAlbum(id)))
      }
    };
    const handleRemove = async (id: string) => {
      await removeFromAlbum(id, albumId)
      fetchPersons()
    }

    if (!album) return Skeleton()

    return (
        <>
        <AddPeopleDialog data={peopleList} filter={albumPersons} show={openDialog} onClose={handleClose} />
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
                <button onClick={() => setOpenDialog(true)}
                    type="button"
                    title="Add People"
                    className="flex place-content-center place-items-center rounded-full bg-[#d3d3d3] hover:bg-[#e2e7e9] p-3 transition-all">
                    <FaPlus />
                </button>
            </div>
            </section>
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-8 p-4">
                {albumPersons.map((person, index) => (
                  <div key={index} className="flex justify-center items-center relative group">
                    <div className="rounded w-[178]">
                      <PeopleItem people={person} />
                    </div>
                    <button className="absolute top-2 right-2 bg-gray-200 text-black hover:bg-red-500 hover:text-white p-1 rounded-full transition-all duration-300"
                        onClick={() => handleRemove(person.id)}>
                      <MdOutlinePersonRemove/>
                    </button>
                  </div>
                ))}
            </section>
        </section>
        </section>
        </>
    )

}


const Skeleton = () => {
  return (
    <section id="asset-grid" className="bg-white">
      <section>
        <section className="pt-8 md:pt-24">
          <span className="w-[99%] mb-2 h-8 bg-gray-300 animate-pulse rounded"></span>
          <span className="my-2 flex gap-2 text-sm font-medium text-gray-500">
            <span className="h-4 bg-gray-300 animate-pulse rounded w-24"></span>
          </span>
          <div className="my-3 flex gap-x-1">
            <button
              type="button"
              title="Add People"
              className="flex place-content-center place-items-center rounded-full bg-gray-300 animate-pulse p-3 transition-all"
            ></button>
          </div>
        </section>
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-8">
          <div className="rounded w-[178px]">
            <div className="object-cover rounded-full bg-gray-300 animate-pulse aspect-square w-full"></div>
            <span className="block bg-gray-300 animate-pulse h-4 rounded mt-2 text-center w-3/4 mx-auto"></span>
          </div>
        </section>
      </section>
    </section>
  );
};