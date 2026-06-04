import type { Dispatch, SetStateAction } from 'react';

export function createOverlayState(
  isOpen: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
) {
  return {
    isOpen,
    setOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen((value) => !value),
  };
}
