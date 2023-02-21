import * as React from 'react';

import { CustomEvent } from './ComboBoxTypes';

const useComboBox = (options: string[]) => {
  const [activeSuggestion, setActiveSuggestion] = React.useState(-1);
  const [matchingSuggestions, setMatchingSuggestions] = React.useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [userInput, setUserInput] = React.useState('');
  const [ariaActiveDescendant, setAriaActiveDescendant] = React.useState(activeSuggestion);

  const filteredSuggestions = (e: CustomEvent) =>
    options.filter(
      (item) => item.toLowerCase().indexOf((e?.currentTarget?.value as string).toLowerCase()) > -1,
    );

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setActiveSuggestion(-1);
    setUserInput(e?.currentTarget?.value);
    setMatchingSuggestions(filteredSuggestions(e as CustomEvent));
    setShowSuggestions(true);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setActiveSuggestion(-1);
    setMatchingSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e?.currentTarget?.innerText);
  };

  const onKeyDown = (e: CustomEvent) => {
    if (e.key === 'ArrowDown') {
      setMatchingSuggestions(filteredSuggestions(e));
      setShowSuggestions(true);
      if (activeSuggestion + 1 === matchingSuggestions.length) {
        setActiveSuggestion(-1);
      }
      setActiveSuggestion((prevActiveSuggestion) =>
        showSuggestions ? prevActiveSuggestion + 1 : prevActiveSuggestion,
      );
    }

    if (e.key === 'ArrowUp') {
      if (activeSuggestion === 0) {
        setActiveSuggestion(matchingSuggestions.length);
      }
      setActiveSuggestion((prevActiveSuggestion) => prevActiveSuggestion - 1);
    }

    if (e.key === 'Enter') {
      setActiveSuggestion(-1);
      setShowSuggestions(false);
      setUserInput(matchingSuggestions[activeSuggestion]);
    }
  };

  React.useEffect(() => {
    if (userInput === '') {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
      setAriaActiveDescendant(-1);
    }
  }, [userInput]);

  React.useEffect(() => {
    if (activeSuggestion >= 0) {
      setAriaActiveDescendant(activeSuggestion);
    }
  }, [activeSuggestion]);

  return {
    showSuggestions,
    matchingSuggestions,
    activeSuggestion,
    onClick,
    onChange,
    onKeyDown,
    ariaActiveDescendant,
    userInput,
  };
};

export default useComboBox;
