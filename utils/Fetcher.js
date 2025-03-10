const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchData = async () => {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',}
        });

        const result = await response.json();
        console.log('[RESPONSE]', JSON.stringify(result));

        return result;
    } catch (err) {
        console.log('[ERROR]', err);
    }
};

export const fetchDataPerPage = async (page = 1, name = "") => {
    try {
        const query = name ? `&name=${encodeURIComponent(name)}` : "";
        const response = await fetch(`${BASE_URL}/?page=${page}${query}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("[ERROR]", err);
        return null;
    }
};