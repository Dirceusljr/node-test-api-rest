import { describe, expect, it } from '@jest/globals';
import AluguelLivroService from '../../services/aluguelLivroService';

const aluguelLivroService = new AluguelLivroService();

describe('Testando AluguelLivroService', () => {
  it('Retornar a data de devolução do livro validando a quantidade de dias alugados', async () => {
    const dataAluguel = new Date('2024-01-01');
    const numeroDiasAlugados = 5;
    const dataDevolucaoMock = new Date('2024-01-06');

    // eslint-disable-next-line max-len
    const dataDevolucao = await aluguelLivroService.calcularDataDevolucao(dataAluguel, numeroDiasAlugados);
    expect(dataDevolucao).toStrictEqual(dataDevolucaoMock);
  });
});
