export const normalizeDialogue = (dialogue) => {
  if (typeof dialogue === 'string') {
    return { english: dialogue, vietnamese: '' };
  }

  return {
    english: dialogue?.english || dialogue?.en || '',
    vietnamese: dialogue?.vietnamese || dialogue?.vi || ''
  };
};

export const normalizeVocabulary = (vocabulary) => {
  if (!vocabulary) return { items: [], note: '' };
  if (typeof vocabulary === 'string') return { items: [], note: vocabulary };
  if (Array.isArray(vocabulary)) return { items: vocabulary, note: '' };
  if (typeof vocabulary === 'object') {
    const items = Array.isArray(vocabulary.items) ? vocabulary.items : [];
    return { items, note: vocabulary.note || '' };
  }
  return { items: [], note: '' };
};
