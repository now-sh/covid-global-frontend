import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Home from '@/components/Home.vue'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Home.vue', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('shows loading state initially', () => {
    mockFetch.mockImplementation(() => new Promise(() => {})) // Never resolves
    const wrapper = mount(Home)
    expect(wrapper.text()).toContain('Loading global data...')
  })

  it('renders global stats after loading', async () => {
    const mockData = {
      population: 8000000000,
      cases: 500000000,
      recovered: 400000000,
      deaths: 10000000,
      tests: 2000000000,
      todayCases: 100000,
      todayDeaths: 5000,
      updated: Date.now(),
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const wrapper = mount(Home)
    await flushPromises()

    expect(wrapper.text()).toContain('Global COVID-19 Statistics')
    expect(wrapper.text()).toContain('8,000,000,000')
    expect(wrapper.text()).toContain('500,000,000')
  })

  it('handles API errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('API Error'))

    const wrapper = mount(Home)
    await flushPromises()

    expect(wrapper.text()).toContain('Error: API Error')
  })

  it('formats dates correctly', async () => {
    const testDate = new Date('2023-12-25T10:30:00Z').getTime()
    const mockData = {
      population: 1000000,
      cases: 500000,
      recovered: 400000,
      deaths: 10000,
      tests: 2000000,
      todayCases: 1000,
      todayDeaths: 50,
      updated: testDate,
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const wrapper = mount(Home)
    await flushPromises()

    expect(wrapper.text()).toContain('December')
    expect(wrapper.text()).toContain('25')
  })
})
