export const CATEGORIES = [
  { id: 'foryou', label: 'For you' }, { id: 'top', label: 'Top stories' }, { id: 'world', label: 'World' },
  { id: 'business', label: 'Business' }, { id: 'technology', label: 'Technology' }, { id: 'sport', label: 'Sport' },
  { id: 'science', label: 'Science' }, { id: 'politics', label: 'Politics' }, { id: 'culture', label: 'Culture' },
]
export const FOLLOWABLE = CATEGORIES.filter((c) => c.id !== 'foryou' && c.id !== 'top')
export const SOURCES = [{ id: 'guardian', label: 'The Guardian' }, { id: 'bbc', label: 'BBC News' }, { id: 'hn', label: 'Hacker News' }]
