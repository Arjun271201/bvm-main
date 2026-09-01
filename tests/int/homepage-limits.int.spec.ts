import { describe, expect, it } from 'vitest'
import { MAX_HOME_PAGE_VIDEOS } from '@/lib/homepageLimits'

describe('homepage limits', () => {
  it('caps the homepage video carousel at 10 videos', () => {
    expect(MAX_HOME_PAGE_VIDEOS).toBe(10)
  })
})
