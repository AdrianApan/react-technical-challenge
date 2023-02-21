import * as React from 'react';

import { CustomEvent } from './ComboBoxTypes';

import useStyles from './ComboBox.styles';
import useComboBox from './useComboBox';

interface ComboBoxProps {
  options: string[];
}

export default function ComboBox({ options }: ComboBoxProps) {
  const classes = useStyles();
  const optionsList = React.useRef<any>(null);
  const {
    showSuggestions,
    matchingSuggestions,
    activeSuggestion,
    onClick,
    onChange,
    onKeyDown,
    ariaActiveDescendant,
    userInput,
  } = useComboBox(options);

  let suggestionsListComponent;

  if (showSuggestions) {
    if (matchingSuggestions.length) {
      suggestionsListComponent = (
        <ul
          className={classes.suggestions}
          id="countries"
          role="listbox"
          aria-label="Countries"
          ref={optionsList}
        >
          {matchingSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              id={index.toString()}
              className={index === activeSuggestion ? classes.suggestionActive : ''}
              role="option"
              aria-selected={index === activeSuggestion}
              onClick={(e) => onClick(e as CustomEvent)}
              onKeyDown={(e) => onKeyDown(e as CustomEvent)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className={classes.noSuggestions} data-testid="no-results">
          <em>No suggestions available.</em>
        </div>
      );
    }
  }

  return (
    <div className={classes.container}>
      <input
        type="text"
        role="combobox"
        id="combobox"
        className={classes.input}
        aria-controls="countries"
        aria-expanded={showSuggestions}
        aria-activedescendant={ariaActiveDescendant.toString()}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {suggestionsListComponent}
    </div>
  );
}
