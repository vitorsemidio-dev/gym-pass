type ObjectWithAnyProperties = { [key: string]: any }

export function omit<T extends ObjectWithAnyProperties, K extends keyof T>(
  object: T,
  keysToOmit: K[],
): Omit<T, K> {
  const result: ObjectWithAnyProperties = {}
  for (const key in object) {
    if (!keysToOmit.includes(key as unknown as K)) {
      result[key] = object[key]
    }
  }
  return result as Omit<T, K>
}

export function pick<T extends ObjectWithAnyProperties, K extends keyof T>(
  object: T,
  keysToPick: K[],
): Pick<T, K> {
  const result: Partial<T> = {}
  for (const key of keysToPick) {
    result[key] = object[key]
  }
  return result as Pick<T, K>
}
