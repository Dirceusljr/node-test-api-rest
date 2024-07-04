import { describe, expect, it } from '@jest/globals';
import AuthService from '../../services/authService';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  it('O usuário deve possuir um nome, email e senha', async () => {
    const usuarioMock = {
      nome: 'Dirceu',
      email: 'dirceu@teste.com.br',
    };

    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

    await expect(usuarioSalvo).rejects.toThrowError('A senha do usuario é obrigatório.');
  });
});
