/**
 * Quiz bank used by the Interactive Quizzes page.
 * Add more quizzes or connect to an API for dynamic question sets.
 */
export const quizzes = [
  {
    id: 'english-for-science-quiz',
    subjectId: 'english-for-science',
    title: 'English for Science Communication',
    description: 'Check your understanding of key English phrases for explaining experiments and data.',
    questions: [
      {
        prompt: 'Which sentence uses a clear sequence word?',
        options: [
          'Mix the solution carefully.',
          'The temperature increased.',
          'First, measure 10 milliliters of water.',
          'We learned a lot from this lab.'
        ],
        answerIndex: 2,
        explanation: 'Sequence words such as "first" help the audience follow the order of experiment steps.'
      },
      {
        prompt: 'Choose the best phrase to explain the reason for a result.',
        options: ['In conclusion', 'As a result of', 'For example', 'To summarize'],
        answerIndex: 1,
        explanation: '"As a result of" links evidence to outcomes and shows cause and effect in English writing.'
      }
    ]
  },
  {
    id: 'physics-quiz',
    subjectId: 'physics',
    title: 'Physics Essentials (Extension)',
    description: 'Extend your English practice by reviewing motion, forces, and energy.',
    questions: [
      {
        prompt: 'What word describes an object resisting a change in motion?',
        options: ['Momentum', 'Inertia', 'Friction', 'Velocity'],
        answerIndex: 1,
        explanation: 'Inertia is the tendency of an object to resist changes in its motion.'
      },
      {
        prompt: 'Which form of energy is stored because of an object\'s position?',
        options: ['Potential energy', 'Thermal energy', 'Sound energy', 'Nuclear energy'],
        answerIndex: 0,
        explanation: 'Potential energy is stored energy related to position or condition.'
      }
    ]
  },
  {
    id: 'chemistry-quiz',
    subjectId: 'chemistry',
    title: 'Chemistry Basics (Extension)',
    description: 'Use English vocabulary to review atoms, elements, and chemical reactions.',
    questions: [
      {
        prompt: 'Which particle has a positive charge inside the atom?',
        options: ['Electron', 'Neutron', 'Proton', 'Photon'],
        answerIndex: 2,
        explanation: 'Protons carry a positive charge and are found in the nucleus.'
      },
      {
        prompt: 'In a chemical reaction, the substances at the start are called what?',
        options: ['Products', 'Reactants', 'Solvents', 'Mixtures'],
        answerIndex: 1,
        explanation: 'Reactants are the starting materials that change during a chemical reaction.'
      }
    ]
  },
  {
    id: 'biology-quiz',
    subjectId: 'biology',
    title: 'Biology Checkup (Extension)',
    description: 'Practice English while testing key ideas about cells and ecosystems.',
    questions: [
      {
        prompt: 'Which organelle controls the cell?',
        options: ['Chloroplast', 'Nucleus', 'Cell wall', 'Vacuole'],
        answerIndex: 1,
        explanation: 'The nucleus acts like the control center of the cell.'
      },
      {
        prompt: 'What do decomposers do in an ecosystem?',
        options: ['Make food using sunlight', 'Break down dead matter', 'Control the climate', 'Produce oxygen'],
        answerIndex: 1,
        explanation: 'Decomposers break down dead matter and recycle nutrients back into the soil.'
      }
    ]
  },
  {
    id: 'earth-science-quiz',
    subjectId: 'earth-science',
    title: 'Earth Science Explorer (Extension)',
    description: 'Explain rocks, weather, and climate in English as you review the science ideas.',
    questions: [
      {
        prompt: 'Which rock forms when melted rock cools and hardens?',
        options: ['Sedimentary', 'Metamorphic', 'Igneous', 'Fossil'],
        answerIndex: 2,
        explanation: 'Igneous rocks form from cooled magma or lava.'
      },
      {
        prompt: 'Climate describes weather patterns over what period of time?',
        options: ['Hours', 'Days', 'Months only', 'Many years'],
        answerIndex: 3,
        explanation: 'Climate is the average weather conditions over many years.'
      }
    ]
  }
];
