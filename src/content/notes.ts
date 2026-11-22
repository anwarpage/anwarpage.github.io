export const contentNavLinks = [
  { slug: 'about', label: 'Know me better' },
  { slug: 'work', label: 'See my work' },
  { slug: 'writing', label: 'Things I wrote' },
  { slug: 'beliefs', label: 'Things I believe' },
  { slug: 'contact', label: 'Say hello' }
] as const;

export const favoritePoemQuote = {
  lines: [
    'Funny it seems, but by keeping its dreams,',
    'it learned to breathe fresh air.',
    'Long live the rose that grew from concrete',
    'when no one else ever cared.'
  ],
  author: 'Tupac Shakur',
  title: 'The Rose That Grew from Concrete'
} as const;

export interface BeliefSection {
  heading: string;
  bullets: readonly string[];
}

export const beliefsSections: readonly BeliefSection[] = [
  {
    heading: 'I believe in God',
    bullets: [
      'He is the one who approves and determines the path we choose.',
      'Plan carefully and give your best effort, then leave the outcome to Him.',
      'Closed doors and slow seasons usually make sense later.',
      'Gratitude keeps ambition in check.'
    ]
  },
  {
    heading: 'Perseverance',
    bullets: [
      'Showing up on ordinary days beats bursts of motivation.',
      'Hard problems rarely open up on the first try.',
      'Small progress kept up for months beats one intense weekend.',
      'Falling short is feedback. Quitting is the only real stop.'
    ]
  },
  {
    heading: 'Be genuine',
    bullets: [
      'Be honest about what you know and what you do not know yet.',
      'Build things because you actually care about them, not to look smart online.',
      'Sincerity lasts longer than any image you try to maintain.',
      'Treat people with the same respect regardless of title or status.'
    ]
  },
  {
    heading: 'Stay a student',
    bullets: [
      'Curiosity opens more doors than credentials.',
      'Learn fundamentals well. Tools change, basic principles stick around.',
      'Trying to explain something is the fastest way to see what you missed.'
    ]
  },
  {
    heading: 'Useful beats clever',
    bullets: [
      'Start with the actual problem before picking a complex model or stack.',
      'A simple tool someone uses every day beats an impressive demo nobody touches.',
      'Small details matter. People can tell when something was rushed.'
    ]
  },
  {
    heading: 'Test your assumptions',
    bullets: [
      'Measure before guessing, and accept it when the data proves you wrong.',
      'Writing things down exposes weak ideas quickly.',
      'Change your mind when better evidence shows up.'
    ]
  },
  {
    heading: 'Protect your focus',
    bullets: [
      'Doing fewer things well beats chasing everything half-heartedly.',
      'Quiet, uninterrupted time produces work that busyness never will.',
      'Leave room to pause and reflect, not just produce.'
    ]
  },
  {
    heading: 'Share what you learn',
    bullets: [
      'Write down notes and share them openly. Knowledge grows when passed along.',
      'Listen to understand before rushing to reply.',
      'Spend time with people who keep you honest and grounded.'
    ]
  }
];
