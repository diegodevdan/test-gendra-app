
export const getCharacters = async (page = 1) => {
  const urlCharacters = `https://rickandmortyapi.com/api/character?page=${page}`

  try {
    const resp = await fetch(urlCharacters)
    return await resp.json()
  } catch (e) {
    console.log(e)
  }
}
