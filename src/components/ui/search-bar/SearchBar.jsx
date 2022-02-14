import React, { useCallback, useMemo, useState } from 'react'
import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { genderValues, statusValues, typeCharacterValues, typeValues } from '../../../data/searchBarTypes'
import '../../../styles/search-bar.css'

const initSearchParams = {
  typeParameter: '',
  typeCharacterParameter: '',
  secondaryCharacterParameter: '',
  specifyParameter: ''
}

const SearchBar = () => {
  console.log("rerender");

  const [searchParameters, setSearchParameters] = useState(initSearchParams);
  const [pages, setPages] = useState(0)
  const [showAlert, setShowAlert] = useState(false)

  const {
    typeParameter,
    typeCharacterParameter,
    specifyParameter,
    secondaryCharacterParameter
  } = searchParameters

  // TODO custom hook
  const handleChange = useCallback(({ target }) => {
    if(target.value === 'episode')
      setSearchParameters(initSearchParams);

    setSearchParameters(() => ({
      ...searchParameters,
      [target.name]: target.value
    }))
  }, [{ ...searchParameters }])

  const searchEpisode = async () => {
    hideAlert();
    const urlSpecifyCharacters = `https://rickandmortyapi.com/api/episode/?name=${specifyParameter}`;

    try {
      const resp = await fetch(urlSpecifyCharacters)
      const data = await resp.json();
      setSearchParameters(initSearchParams);
      if(!data.results && !data.info){
        setShowAlert(true);
        return;
      }
      setPages(data.info.pages)
      console.log(pages)
    } catch (e) {
      console.log(e)
    }
  }

  const searchCharacter = async () => {
    hideAlert();
    let url;
    if(!secondaryCharacterParameter.length)
      url = `https://rickandmortyapi.com/api/character/?${typeCharacterParameter}=${specifyParameter}`;
    else
      url = `https://rickandmortyapi.com/api/character/?${typeCharacterParameter}=${secondaryCharacterParameter}`;
    try {
      const resp = await fetch(url)
      const data = await resp.json();
      console.log(data)
      setSearchParameters(initSearchParams);
      if(!data.results && !data.info){
        setShowAlert(true);
        return;
      }
      setPages(data.info.pages)
      console.log(pages)
    } catch (e) {
      console.log(e);
    }
  }

  const hideAlert = () => {
    setShowAlert(false);
  }

  //TODO REFACTOR
  return (
    <div className="search-bar-main" >
      {JSON.stringify(pages)}
      { showAlert && (
        <Alert
          severity="warning"
          onClose={hideAlert}
        >
          No coincidences in your search, try again with another parameters
        </Alert>)
      }


      <div className="search-bar-main cont-inputs">

        <FormControl
          className="cont-inputs form-container"
        >

          <InputLabel id="type-search">Type</InputLabel>
          <Select
            name="typeParameter"
            labelId="type-search"
            value={typeParameter}
            label="Type"
            onChange={handleChange}
          >
            {typeValues.map(({value, name }) => (
              <MenuItem
                key={value}
                value={value}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {
          typeParameter === 'character' && (
            <FormControl
              className="cont-inputs form-container"
            >

              <InputLabel id="search-character">Type</InputLabel>
              <Select
                name="typeCharacterParameter"
                labelId="search-character"
                value={typeCharacterParameter}
                label="Search parameter"
                onChange={handleChange}
              >

                {typeCharacterValues.map(({value, name }) => (
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
          typeCharacterParameter === 'status' && (
            <FormControl
              className="cont-inputs form-container"
            >

              <InputLabel id="search-character">Status</InputLabel>
              <Select
                name="secondaryCharacterParameter"
                labelId="search-character"
                value={secondaryCharacterParameter}
                label="Search parameter"
                onChange={handleChange}
              >
                {statusValues.map(({value, name }) => (
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
          typeCharacterParameter === 'gender' && (
            <FormControl
              className="cont-inputs form-container"
            >

              <InputLabel id="search-character">Gender</InputLabel>
              <Select
                name="secondaryCharacterParameter"
                labelId="search-character"
                value={secondaryCharacterParameter}
                label="Search parameter"
                onChange={handleChange}
              >
                {genderValues.map(({value, name }) => (
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
              name="specifyParameter"
              id="outlined-basic"
              label="Something on specific?"
              variant="outlined"
              value={specifyParameter}
              onChange={handleChange}
              className="cont-inputs form-container"
            />
          )
        }

      </div>


      {
        typeParameter === 'character'
        ? (
            <Button
              sx={{ ml: 5 }}
              className="search-bar-main button-submit"
              variant="outlined"
              endIcon={<SearchIcon />}
              onClick={searchCharacter}
              disabled={
                typeParameter.length <= 0 || typeCharacterParameter.length <= 0
                || (typeCharacterParameter === 'status' && !secondaryCharacterParameter.length)
                || (typeCharacterParameter === 'gender' && !secondaryCharacterParameter.length)
              }
            >
            Search Character
            </Button>
          )
        : (
            <Button
              sx={{ ml: 5 }}
              className="search-bar-main button-submit"
              variant="outlined"
              endIcon={<SearchIcon />}
              onClick={searchEpisode}
              disabled={typeParameter.length <= 0 || specifyParameter.length <= 3}
            >
              Search Episode
            </Button>
          )
      }
    </div>
  )
}

export default SearchBar
