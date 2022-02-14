import React, { useCallback, useState } from 'react'
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { genderValues, statusValues, typeCharacterValues, typeValues } from '../../../data/searchBarTypes'
import '../../../styles/search-bar.css'

// I THINK THIS IS THE MOST HARD PARTE, BECAUSE IS A SEARCH NESTED IN SEARCH NESTED...
// I CAN REFACTOR ALL OF THIS CODE BECAUSE MORE OF 200 LINES OF CODE IS HARD TO READ AGAIN.

const initSearchParams = {
  typeParameter: '',
  typeCharacterParameter: '',
  secondaryCharacterParameter: '',
  specifyParameter: ''
}

const SearchBar = ({ setSearchResults }) => {
  const [searchParameters, setSearchParameters] = useState(initSearchParams)
  const [showAlert, setShowAlert] = useState(false)

  const {
    typeParameter,
    typeCharacterParameter,
    specifyParameter,
    secondaryCharacterParameter
  } = searchParameters

  // TODO custom hook
  const handleChange = useCallback(({ target }) => {
    if (target.value === 'episode') { setSearchParameters(initSearchParams) }

    setSearchParameters(() => ({
      ...searchParameters,
      [target.name]: target.value
    }))
  }, [{ ...searchParameters }])

  // TODO separate into selector
  const searchEpisode = async () => {
    hideAlert()
    const urlSpecifyCharacters = `https://rickandmortyapi.com/api/episode/?name=${specifyParameter}`

    try {
      const resp = await fetch(urlSpecifyCharacters)
      const data = await resp.json()
      setSearchParameters(initSearchParams)
      if (!data.results && !data.info) {
        setShowAlert(true)
        return
      }
      // IUGH
      setSearchResults(data.info.pages, data.results, true)
    } catch (e) {
      console.log(e)
    }
  }

  // TODO separate into selector
  const searchCharacter = async () => {
    hideAlert()
    let url
    if (!secondaryCharacterParameter.length) { url = `https://rickandmortyapi.com/api/character/?${typeCharacterParameter}=${specifyParameter}` } else { url = `https://rickandmortyapi.com/api/character/?${typeCharacterParameter}=${secondaryCharacterParameter}` }
    try {
      const resp = await fetch(url)
      const data = await resp.json()
      setSearchParameters(initSearchParams)
      if (!data.results && !data.info) {
        setShowAlert(true)
        return
      }
      // MORE IUGH
      setSearchResults(data.info.pages, data.results, false)
    } catch (e) {
      console.log(e)
    }
  }

  const hideAlert = () => {
    setShowAlert(false)
  }

  // TODO REFACTOR PLEASE
  return (
    <div className='search-bar-main'>
      {showAlert && (
        <Alert
          severity='warning'
          onClose={hideAlert}
        >
          No coincidences in your search, try again with another parameters
        </Alert>)}

      <div className='search-bar-main cont-inputs'>

        {/* I MAKE COMPONENT FORM CONTROL, I ALREADY START WITH THIS BUT */}
        {/* I DON'T END THIS. */}
        <FormControl
          className='cont-inputs form-container'
        >

          <InputLabel id='type-search'>Type</InputLabel>
          <Select
            name='typeParameter'
            labelId='type-search'
            value={typeParameter}
            label='Type'
            onChange={handleChange}
          >
            {typeValues.map(({ value, name }) => (
              <MenuItem
                key={value}
                value={value}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* SORRY FOR THIS */}
        {
          typeParameter === 'character' && (
            <FormControl
              className='cont-inputs form-container'
            >

              <InputLabel id='search-character'>Type Parameters</InputLabel>
              <Select
                name='typeCharacterParameter'
                labelId='search-character'
                value={typeCharacterParameter}
                label='Search parameter'
                onChange={handleChange}
              >

                {typeCharacterValues.map(({ value, name }) => (
                  <MenuItem
                    key={value}
                    value={value}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        }

        {/* AND FOR THIS */}
        {
          typeCharacterParameter === 'status' && (
            <FormControl
              className='cont-inputs form-container'
            >

              <InputLabel id='search-character'>Status</InputLabel>
              <Select
                name='secondaryCharacterParameter'
                labelId='search-character'
                value={secondaryCharacterParameter}
                label='Search parameter'
                onChange={handleChange}
              >
                {statusValues.map(({ value, name }) => (
                  <MenuItem
                    key={value}
                    value={value}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        }

        {/* AND FOR THIS :( */}
        {
          typeCharacterParameter === 'gender' && (
            <FormControl
              className='cont-inputs form-container'
            >

              <InputLabel id='search-character'>Gender</InputLabel>
              <Select
                name='secondaryCharacterParameter'
                labelId='search-character'
                value={secondaryCharacterParameter}
                label='Search parameter'
                onChange={handleChange}
              >
                {genderValues.map(({ value, name }) => (
                  <MenuItem
                    key={value}
                    value={value}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        }

        {
          (typeCharacterParameter !== 'status' && typeCharacterParameter !== 'gender') &&
          (
            <TextField
              name='specifyParameter'
              id='outlined-basic'
              label='Something on specific?'
              variant='outlined'
              value={specifyParameter}
              onChange={handleChange}
              className='cont-inputs form-container'
            />
          )
        }

      </div>

      {
        typeParameter === 'character'
          ? (
            <Button
              sx={{ ml: 5 }}
              className='search-bar-main button-submit'
              variant='outlined'
              endIcon={<SearchIcon />}
              onClick={searchCharacter}
              disabled={
                typeParameter.length <= 0 || typeCharacterParameter.length <= 0 ||
                (typeCharacterParameter === 'status' && !secondaryCharacterParameter.length) ||
                (typeCharacterParameter === 'gender' && !secondaryCharacterParameter.length)
              }
            >
              Search Character
            </Button>
            )
          : (
            <Button
              sx={{ ml: 5 }}
              className='search-bar-main button-submit'
              variant='outlined'
              endIcon={<SearchIcon />}
              onClick={searchEpisode}
              disabled={typeParameter.length <= 0}
            >
              Search Episode
            </Button>
            )
      }
    </div>
  )
}

export default SearchBar
