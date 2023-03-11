type TimeUnit = 'hours' | 'minutes' | 'seconds' | 'milliseconds'

const MILLISECONDS_PER_SECOND = 1000
const MILLISECONDS_PER_MINUTE = 60 * MILLISECONDS_PER_SECOND
const MILLISECONDS_PER_HOUR = 60 * MILLISECONDS_PER_MINUTE

export function convertTime(
  amount: number,
  fromUnit: TimeUnit,
  toUnit: TimeUnit,
): number {
  const timeInMilliseconds = {
    hours: MILLISECONDS_PER_HOUR,
    minutes: MILLISECONDS_PER_MINUTE,
    seconds: MILLISECONDS_PER_SECOND,
    milliseconds: 1,
  }

  const milliseconds = amount * timeInMilliseconds[fromUnit]
  return milliseconds / timeInMilliseconds[toUnit]
}
