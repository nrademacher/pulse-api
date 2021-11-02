import { redis } from '#internal/services';

export async function tryFromCache<T, U>(
  function_: (...arguments_: T[]) => Promise<U>,
  ...arguments_: T[]
): Promise<U> {
  const key = function_.name + JSON.stringify(arguments_);

  const cached = await redis.get(key);

  if (!cached) {
    const data = await function_(...arguments_);

    await redis.set(key, JSON.stringify(data));

    return data;
  }

  return JSON.parse(cached);
}
