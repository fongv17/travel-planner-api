export const trips = [
  {
    id: 1,
    title: 'My First Post',
    content: 'This is my first post',
    createdAt: '2025-06-25T13:45:00.000Z',
  },
];
let nextId = posts.length;

export function getNextId() {
  nextId++;
  return nextId;
}