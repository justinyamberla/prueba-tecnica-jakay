'use client'

import {useEffect, useState} from "react";
import {fetchData, fetchDataPerPage} from "@/utils/Fetcher";
import Modal from "@/components/CharacterModal";

export default function Home() {

    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageInfo, setPageInfo] = useState({ next: null, prev: null, pages: 0 });
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const getData = async () => {
        setLoading(true);
        const data = await fetchDataPerPage(currentPage, searchTerm);

        if (data) {
            setCharacters(data.results || []);
            setPageInfo({
                next: data.info.next,
                prev: data.info.prev,
                pages: data.info.pages,
            });
        }

        setLoading(false);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handleCardClick = (character) => {
        setSelectedCharacter(character);
    };

    const handleCloseModal = () => {
        setSelectedCharacter(null);
    };

    useEffect(() => {
        getData();
    }, [currentPage, searchTerm]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Rick and Morty Characters</h1>

            <div className="flex justify-center items-center gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Buscar personaje..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white w-full max-w-md"
                />
                {searchTerm && (
                    <button
                        onClick={handleClearSearch}
                        className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition">
                        Borrar
                    </button>
                )}
            </div>

            {loading ? (
                <p className="text-center animate-pulse text-gray-400">Cargando personajes...</p>
            ) : characters.length === 0 ? (
                <p className="text-center text-red-400">No se encontraron personajes</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {characters.map((char) => (
                            <div
                                key={char.id}
                                className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center
                                           transform transition duration-300 hover:scale-105 cursor-pointer"
                                onClick={() => handleCardClick(char)}>
                                <img src={char.image} alt={char.name} className="w-32 h-32 rounded-full mb-4" />
                                <h2 className="text-xl font-semibold">{char.name}</h2>
                                <p className="text-sm text-gray-400">{char.species} - {char.status}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            disabled={!pageInfo.prev}
                            className={`px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition 
                                        ${!pageInfo.prev ? "opacity-50 cursor-not-allowed" : ""}`}>
                            Anterior
                        </button>

                        <button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={!pageInfo.next}
                            className={`px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition 
                                        ${!pageInfo.next ? "opacity-50 cursor-not-allowed" : ""}`}>
                            Siguiente
                        </button>
                    </div>

                    <div className="text-center mt-6 text-gray-400">
                        <p>
                            Página {currentPage} de {pageInfo.pages}
                        </p>
                    </div>
                </>
            )}

            {selectedCharacter && <Modal character={selectedCharacter} onClose={handleCloseModal} />}
        </div>
    );
}
