import { describe, expect, it } from '@jest/globals';
import AuthService from '../../services/authService';
import Usuario from '../../models/usuario';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  it('O usuário deve possuir um nome, email e senha', async () => {
    const usuarioMock = {
      nome: 'Dirceu',
      email: 'dirceu@teste.com.br',
    };

    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

    await expect(usuarioSalvo).rejects.toThrowError('A senha de usuário é obrigatório!');
  });

  it('A senha do usuário precisa ser criptografada quando for salva no banco de dados', async () => {
    const usuarioMock = {
      nome: 'John Doe',
      email: 'email@email.com',
      senha: '123456',
    };

    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);
    await expect(usuarioSalvo.senha).not.toBe(usuarioMock.senha);

    await Usuario.excluir((await usuarioSalvo).content.id);
  });

  it('Não pode ser cadastrado um usuário com e-mail duplicado', async () => {
    const usuarioMock = {
      nome: 'Raphael',
      email: 'teste@gmail.com',
      senha: '123456',
    };

    const usuarioSave = authService.cadastrarUsuario(usuarioMock);

    await expect(usuarioSave).rejects.toThrowError('O email já esta cadastrado!');
  });

  it('Ao cadastrar um usuário deve ser retornada uma mensagem informando que o usuário foi cadastrado', async () => {
    const data = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.message).toEqual('usuario criado');

    await Usuario.excluir(resultado.content.id);
  });

  it('Ao cadastrar um usuário, validar retorno do usuário', async () => {
    const data = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);

    // expect(resultado.content).toMatchObject(data);
    expect(resultado.content).toEqual(
      expect.objectContaining(data),
    );

    await Usuario.excluir(resultado.content.id);
  });
});
