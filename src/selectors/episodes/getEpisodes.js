export const getEpisodes = async (page = 1) => {
  const urlEpisodes = `https://rickandmortyapi.com/api/episode?page=${page}`;

  try {
    const resp = await fetch(urlEpisodes);
    return await resp.json();
  } catch (e) {
    console.log(e)
  }
}
