const finances = [
  {
    id: 1,
    userId: 1,
    value: 400,
    type: 'gain',
    description: 'Recebendo aluguel',
  },
  {
    id: 2,
    userId: 2,
    value: 400,
    type: 'gain',
    description: 'Recebendo aluguel',
  },
  {
    id: 3,
    userId: 1,
    value: 50,
    type: 'spent',
    description: 'Conta de telefone',
  },
  {
    id: 4,
    userId: 2,
    value: 90,
    type: 'spent',
    description: 'Conta de luz',
  },
];

const financesUser = [
  {
    id: 1,
    userId: 1,
    value: 400,
    type: 'gain',
    description: 'Recebendo aluguel',
  },
  {
    id: 3,
    userId: 1,
    value: 50,
    type: 'spent',
    description: 'Conta de telefone',
  },
]

const newFinance = {
  id: 5,
  userId: 1,
  value: 90,
  type: 'spent',
  description: 'Conta de luz',
}

export {
  finances,
  newFinance,
  financesUser,
}