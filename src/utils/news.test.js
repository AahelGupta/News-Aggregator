import { describe, it, expect } from 'vitest'
import { stripHtml, readMinutes, topKeywords } from './text'

describe('text utils', () => {
  it('strips tags and entities', () => {
    expect(stripHtml('<p>Tom &amp; Jerry&#39;s</p>')).toBe("Tom & Jerry's")
  })
  it('estimates at least one minute of reading', () => {
    expect(readMinutes('short')).toBe(1)
    expect(readMinutes('word '.repeat(440))).toBe(2)
  })
  it('finds repeated keywords and ignores stop words', () => {
    const words = topKeywords(['Markets rally as inflation cools', 'Inflation fears ease, markets steady', 'Football final tonight'])
    expect(words).toEqual(expect.arrayContaining(['markets', 'inflation']))
    expect(words).not.toContain('football')
  })
})
