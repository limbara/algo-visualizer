import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import debounce from 'lodash/debounce';

export type NullableDOMRect = DOMRect | null | undefined;

function useElementRect<T extends HTMLElement = HTMLDivElement>(): [
  MutableRefObject<T | null>,
  NullableDOMRect
] {
  const ref = useRef<T | null>(null);

  const [domRect, setDomRect] = useState<NullableDOMRect>(undefined);

  const handleResize = debounce(() => {
    setDomRect(ref.current?.getBoundingClientRect());
  }, 100);

  useMemo(() => {
    handleResize();
  }, [ref]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return [ref, domRect];
}

export default useElementRect;
