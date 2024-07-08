import { describe, expect, it } from '@jest/globals';
import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

const verificaConexao = () => new Promise((resolve, reject) => {
  transporter.verify((error, success) => {
    if (error) {
      reject(error);
    } else {
      resolve(success);
    }
  });
});

describe('Testando o disparo de email', () => {
  it('O sistema deve validar se a conexão com o sistema de disparo de email', async () => {
    const estaConectado = true;

    const validarConexao = await verificaConexao();

    expect(validarConexao).toStrictEqual(estaConectado);
  });

  it('O sistema deve enviar um email', async () => {
    const mailMock = {
      from: '"Fred Foo" <foo@example.com>',
      to: 'teste@teste.com',
      subject: 'Aluguel de Livro',
      text: 'Olá, Raphael, você alugou o livro Harry Potter e o Cálice de Fogo por 5 dias.',
    };

    const emailEnviado = await transporter.sendMail(mailMock);

    expect(emailEnviado.accepted[0]).toBe(mailMock.to);
  });
});
