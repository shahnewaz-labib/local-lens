"use client"

import React, { useState } from "react"

export function Combobox({ suggestions, onSelectedChange }) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [input, setInput] = useState("")

  const onChange = (e) => {
    const userInput = e.target.value
    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.formatted.toLowerCase().indexOf(userInput.toLowerCase()) >
        -1,
    )

    setInput(userInput)
    setFilteredSuggestions(filtered)
    setActiveSuggestionIndex(0)
    setShowSuggestions(true)
  }

  const onClick = (e) => {
    setFilteredSuggestions([])
    setInput(e.target.innerText)
    setActiveSuggestionIndex(0)
    setShowSuggestions(false)
    onSelectedChange(e.target.innerText)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      // Enter key
      setInput(filteredSuggestions[activeSuggestionIndex])
      setFilteredSuggestions([])
      setShowSuggestions(false)
      setActiveSuggestionIndex(0)
    } else if (e.keyCode === 38) {
      // Up arrow
      if (activeSuggestionIndex === 0) {
        return
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1)
    } else if (e.keyCode === 40) {
      // Down arrow
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1)
    }
  }

  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {showSuggestions && input && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className
            if (index === activeSuggestionIndex) {
              className = "suggestion-active"
            }

            return (
              <li className={className} key={index} onClick={onClick}>
                {suggestion.formatted}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
