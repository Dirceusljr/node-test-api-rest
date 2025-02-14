import {
  afterEach, beforeEach, describe, expect,
  it,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app';

let servidor;

beforeEach(() => {
  const porta = 3000;
  servidor = app.listen(porta);
});

afterEach(() => {
  servidor.close();
});

describe('Testando a rota login (POST)', () => {
  it('O login deve possuir um e-mail e senha para se autenticar', async () => {
    const loginMock = {
      email: 'dirceu@teste.com',
    };

    await request(servidor)
      .post('/login')
      .send(loginMock)
      .expect(500)
      .expect('"A senha de usuario é obrigatório."');
  });

  it('O login deve validar se o usuário está cadastrado', async () => {
    const loginMock = {
      email: 'dirceu.teste@teste.com.br',
      senha: '123456',
    };

    await request(servidor)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(500)
      .expect('"Usuario não cadastrado."');
  });

  it('O login deve validar e-mail e senha incorreto', async () => {
    const loginMock = {
      email: 'dirceu@teste.com.br',
      senha: '12345678',
    };

    await request(servidor)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(500)
      .expect('"Usuario ou senha invalido."');
  });

  it('O login deve validar se esta sendo retornado um accessToken', async () => {
    const loginMock = {
      email: 'dirceu@teste.com.br',
      senha: '123456',
    };

    const resposta = await request(servidor)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(201);

    expect(resposta.body.message).toEqual('Usuario conectado');
    expect(resposta.body).toHaveProperty('accessToken');
  });
});
