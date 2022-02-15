import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { genderValues, statusValues, typeCharacterValues, typeValues } from '../../../data/searchBarTypes'
import '../../../styles/search-bar.css'
import { useDispatch, useSelector } from 'react-redux'
import { searchCharacterRedux, searchEpisodeRedux, toggleFilter } from '../../../actions/home'
import { initSearchParams } from '../../../helpers/initSearchParams'

// I THINK THIS IS THE MOST HARD PARTE, BECAUSE IS A SEARCH NESTED IN SEARCH NESTED...
// I CAN REFACTOR ALL OF THIS CODE BECAUSE MORE OF 200 LINES OF CODE IS HARD TO READ AGAIN.

const SearchBar = () => {
  const dispatch = useDispatch()
  const { home } = useSelector(home => home)
  const { showAlertSearch } = home

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
    if (target.value === 'episodes') {
      dispatch(toggleFilter(true))
    }
    if (target.value === 'character') {
      dispatch(toggleFilter(false))
    }

    setSearchParameters(() => ({
      ...searchParameters,
      [target.name]: target.value
    }))
  }, [{ ...searchParameters }])

  const searchEpisode = async () => {
    hideAlert()
    dispatch(searchEpisodeRedux(specifyParameter))
  }

  const searchCharacter = async () => {
    hideAlert()
    dispatch(searchCharacterRedux(typeCharacterParameter, specifyParameter, secondaryCharacterParameter))
  }

  const hideAlert = () => {
    setShowAlert(false)
  }

  useEffect(() => {
    if (showAlertSearch) {
      setShowAlert(true)
    } else {
      setShowAlert(false)
    }
  }, [showAlertSearch])

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
