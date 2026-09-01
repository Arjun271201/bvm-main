import { describe, expect, it } from 'vitest'
import { normalizeText } from '@/app/(frontend)/videos/language/[languageId]/LanguageVideosClient'

describe('video search normalization', () => {
  it('handles missing title and description safely', () => {
    expect(normalizeText(undefined)).toBe('')
    expect(normalizeText(null)).toBe('')
    expect(normalizeText('Bhagavad Gita')).toBe('bhagavad gita')
  })
})
