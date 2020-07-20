import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'outcome' && type !== 'income') {
      throw Error('Invalid transaction type');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw Error(`Insuficient funds to complete transaction`);
    }

    const transacation = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transacation;
  }
}

export default CreateTransactionService;
