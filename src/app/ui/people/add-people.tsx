'use client'
import { People } from "@/server/api"
import { AlbumPerson } from "@/server/repository"
import { useEffect, useState } from "react"

export default function AddPeopleDialog({ data, filter, show, onClose }: { data: People[], filter: AlbumPerson[], show: boolean, onClose: any }) {

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIds, setSelectedIds] = useState<any[]>([])
  const [personList, setPersonList] = useState(data)

  const handleSearch = (e: any) => setSearchTerm(e.target.value)

  const toggleSelection = (id: any) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  };

  useEffect(() => {
    setSearchTerm("")
    setSelectedIds([])
    setPersonList(data.filter(p => !filter.some((elem: AlbumPerson) => elem.id == p.id)))
  }, [show]);

  const handleClose = () => {
    onClose(selectedIds);
  };
  const closeDialog = () => {
    onClose([])
  }

  if (!show) return (<></>)

  // filter data
  const filteredData = searchTerm === '' ? [] : personList.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center" onClick={closeDialog}>
      <div className="bg-white rounded-lg shadow-lg w-96 p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Add Person</h2>

        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Lista filtrada */}
        <div className="max-h-64 overflow-y-auto">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <label key={item.id} className="flex items-center space-x-4 mb-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                  className="form-checkbox h-5 w-5 text-blue-600 ml-1"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-full"
                />
                <span>{item.name}</span>
              </label>
            ))
          ) : (
            <p className="text-gray-500 text-center">{personList.length} persons</p>
          )}
        </div>

        {/* Botón de cierre */}
        <button
          onClick={handleClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
}
