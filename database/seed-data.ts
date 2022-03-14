interface ISeedData {
  entries: ISeedEntry[]
}

interface ISeedEntry {
  description: string;
  status: string;
  createAt: number;
}

export const seedData: ISeedData = {
  entries: [
    {
      description: 'Pendiente: Exercitation amet non excepteur nostrud aliquip eiusmod anim nostrud sunt reprehenderit pariatur voluptate.',
      status: 'pending',
      createAt: Date.now()
    },
    {
      description: 'In- Progress: Esse laborum officia dolore consectetur irure non eu.',
      status: 'in-progress',
      createAt: Date.now() - 10000000000
    },
    {
      description: 'Finished: Ut incididunt ex duis duis consectetur ex ea eiusmod mollit.',
      status: 'finished',
      createAt: Date.now() - 1000000
    }
  ]
}