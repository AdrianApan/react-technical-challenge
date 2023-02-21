export type CustomEvent = React.KeyboardEvent &
  React.FormEvent<HTMLInputElement> &
  React.FormEvent<HTMLLIElement> &
  React.MouseEvent<HTMLDivElement, MouseEvent> &
  React.MouseEvent<HTMLLIElement, MouseEvent>;
