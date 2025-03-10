import React, { useEffect, useState } from "react";

const Modal = ({ character, onClose }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isFav = favorites.some(fav => fav.id === character.id);
        setIsFavorite(isFav);
    }, [character]);

    const handleFavoriteToggle = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (isFavorite) {
            const updatedFavorites = favorites.filter(fav => fav.id !== character.id);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } else {
            favorites.push(character);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full transform scale-95 transition-all duration-300 ease-in-out animate-modal">
                <h2 className="text-2xl font-semibold mb-4 text-center">{character.name}</h2>
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-40 h-40 rounded-full mb-4 mx-auto border-4 border-gray-600"
                />
                <p className="text-gray-300">Status: {character.status}</p>
                <p className="text-gray-300">Species: {character.species}</p>
                <p className="text-gray-300">Gender: {character.gender}</p>
                <p className="text-gray-300">Origin: {character.origin.name}</p>
                <p className="text-gray-300">Location: {character.location.name}</p>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleFavoriteToggle}
                        className={`px-6 py-2 border-2 w-full rounded-lg text-lg font-semibold transition-colors duration-300 
                                    ${isFavorite ? "bg-yellow-500 border-yellow-500 text-gray-800" : "border-yellow-500 text-yellow-500 hover:bg-yellow-100"}`}>
                        {isFavorite ? (
                            <>
                                <span className="mr-2">Quitar favorito</span>
                            </>
                        ) : (
                            "Agregar favorito"
                        )}
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg w-full">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;
