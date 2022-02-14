import React, { useCallback, useMemo, useState } from 'react'
import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { genderValues, statusValues, typeCharacterValues, typeValues } from '../../../data/searchBarTypes'

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
      if(!data.results && !data.info){
        setShowAlert(true);
        setSearchParameters(initSearchParams);
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
      if(!data.results && !data.info){
        setShowAlert(true);
        setSearchParameters(initSearchParams);
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
    <div style={{width: '400px', padding: '20px'}} >
      {JSON.stringify(pages)}
      { showAlert && (
        <Alert
          severity="warning"
          onClose={hideAlert}
        >
          No coincidences in your search, try again with another parameters
        </Alert>)
      }


      <FormControl
        margin={'dense'}
        fullWidth
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
              margin={'dense'}
              fullWidth
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
            margin={'dense'}
            fullWidth
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
            margin={'dense'}
            fullWidth
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
            margin={'dense'}
            name="specifyParameter"
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={specifyParameter}
            onChange={handleChange}
            fullWidth
          />
        )
      }

      {
        typeParameter === 'character'
        ? (
            <Button
              sx={{mt: '1rem'}}
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
              sx={{mt: '1rem'}}
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
