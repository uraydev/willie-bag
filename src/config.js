export default {
  default: {
    hasTrainer: true,
    batchCount: 2,
    batchSpeed: 10,
    batchTimeoutDuration: 5,
    hasRounds: true,
    hasRoundsSounds: true,
    roundsCount: 3,
    roundsDuration: 180,
    roundsTimeoutDuration: 60,
    roundsWarnBeforeEndingDuration: 10,
    locale: 'en',
    voice: 'june',
  },

  languages: [
    { value: 'en', text: 'English' },
    { value: 'ru', text: 'Русский' }
  ],

  voices: {
    en: [
      { value: 'allison', text: 'Allison' },
      { value: 'callie', text: 'Callie' },
      { value: 'june', text: 'June' },
      { value: 'mike', text: 'Mike' },
    ],
    ru: [
      { value: 'vika', text: 'Вика' },
      { value: 'elena', text: 'Елена' },
      { value: 'kirill', text: 'Кирилл' }
    ]
  },

  rules: {
    batchCount: { min: 1, max: 8, step: 1 },
    batchSpeed: { min: 5, max: 40, step: 1 },
    batchTimeoutDuration: { min: 1, max: 10, step: 1 },
    roundsCount: { min: 1, max: 15, step: 1 },
    roundsDuration: { min: 10, max: 1800, step: 5 },
    roundsTimeoutDuration: { min: 10, max: 600, step: 5 }
  }
}
