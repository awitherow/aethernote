export function createEntry(entry) {
  entry.type = 'journal';
  return {
    type: 'CREATE_ENTRY',
    entry
  };
}
