import React from 'react';

import type z from 'zod';

const isAvailable = typeof localStorage !== 'undefined';

const getLocalStorageItem = <Schema extends z.ZodTypeAny>(
  key: string,
  schema: Schema,
  initialValue: z.infer<Schema>
) => {
  try {
    const isString = typeof initialValue === 'string';
    const item = localStorage.getItem(key);
    if (!item) return initialValue;
    const toParse = isString ? item : JSON.parse(item);
    return schema.parse(toParse) as z.infer<Schema>;
  } catch (e) {
    isAvailable && localStorage.removeItem(key);
    return initialValue;
  }
};

export const useLocalStorage = <Schema extends z.ZodTypeAny>(
  key: string,
  schema: Schema,
  initialValue: z.infer<Schema>
) => {
  const [value, preSetValue] = React.useState(() => getLocalStorageItem(key, schema, initialValue));

  React.useEffect(() => {
    preSetValue(getLocalStorageItem(key, schema, initialValue));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = React.useCallback(
    (value: z.infer<Schema>) => {
      preSetValue(value);
      const isString = typeof initialValue === 'string';
      isAvailable && localStorage.setItem(key, isString ? value as string : JSON.stringify(value));
    },
    [key, initialValue]
  );

  return [value, setValue] as const;
};
