
export const getSearchedCharacters = (async (page = 1, {type, specifyName}) => {

  const urlCharacters = `https://rickandmortyapi.com/api/character?page=${page}`;
  // const urlSpecifyCharacters = `https://rickandmortyapi.com/api/character/?name=rick&status=alive`;
  const urlSpecifyCharacters = `https://rickandmortyapi.com/api/character/?name=${specifyName}`;

  try {
    const resp = await fetch(urlSpecifyCharacters)
    return await resp.json();
  } catch (e) {
    console.log(e)
  }
})
