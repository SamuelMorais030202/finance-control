import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeFinances from '../database/models/SequelizeFinances';
import { loginUser } from './mocks/User.mocks';
import { finances, newFinance, financesUser } from './mocks/Finances.mocks';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Finances test', () => {
  it('Should create finance', async () => {
    sinon.stub(SequelizeFinances, 'create').resolves(newFinance as any);
    sinon.stub(Validations, 'validateFinances').returns();

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
      email: loginUser.email,
      password: loginUser.password,
    });

    const { id, ...sendData } = newFinance;

    const { status, body } = await chai
      .request(app)
      .post('/finances')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(newFinance);
  });

  it('Should return finances by user id 1', async () => {
    sinon.stub(SequelizeFinances, 'findAll').resolves(financesUser as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: loginUser.email,
        password: loginUser.password,
      });

    const { status, body } = await chai
      .request(app)
      .get('/finances')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(financesUser);
  });

  it('Must return finance by type "gain" from user id 1', async () => {
    sinon.stub(SequelizeFinances, 'findAll').resolves([financesUser[0]] as any);

    const responseLogin = await chai
    .request(app)
    .post('/login').send({
      email: loginUser.email,
      password: loginUser.password,
    });

    const { status, body } = await chai
      .request(app)
      .get('/finances/gain')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body.finances).to.deep.equal([financesUser[0]]);
  });

  it('Must return finance by type "spent" from user id 1', async () => {
    sinon.stub(SequelizeFinances, 'findAll').resolves([financesUser[1]] as any);

    const responseLogin = await chai
    .request(app)
    .post('/login').send({
      email: loginUser.email,
      password: loginUser.password,
    });

    const { status, body } = await chai
      .request(app)
      .get('/finances/spent')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body.finances).to.deep.equal([financesUser[1]]);
  });

  it('Should update finances', async () => {
    sinon.stub(SequelizeFinances, 'update').resolves([1] as any);
    sinon.stub(SequelizeFinances, 'findByPk').resolves(finances[0] as any);
    sinon.stub(Validations, 'validateFinances').returns();

    const responseLogin = await chai
    .request(app)
    .post('/login').send({
      email: loginUser.email,
      password: loginUser.password,
    });

    const { id, ...sendData } = finances[0];

    const { status, body } = await chai
      .request(app)
      .put('/finances/1')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(sendData);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(finances[0]);
  });

  it('Should delete finance by id 1', async () => {
    sinon.stub(SequelizeFinances, 'destroy').resolves();
    sinon.stub(SequelizeFinances, 'findByPk').resolves(finances[0] as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: loginUser.email,
        password: loginUser.password,
      });

    const { status, body } = await chai
      .request(app)
      .delete('/finances/1')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body.message).to.equal('Finance deleted');
  });

  afterEach(sinon.restore);
});