import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { loginUser, user } from './mocks/User.mocks';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;


describe('User test', () => {

  it('Should create user', async () => {
    sinon.stub(SequelizeUser, 'create').resolves(user as any);
    sinon.stub(Validations, 'validateCreateUser').returns();

    const { id, ...sendData } = user;

    const { status, body } = await chai.request(app).post('/user')
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(user);
  });

  it('Should return user by id', async () => {
    sinon.stub(SequelizeUser, 'findByPk').resolves(user as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
      email: loginUser.email,
      password: loginUser.password,
    });

    const response = await chai
      .request(app)
      .get('/user')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(user);
  });

  it('Should update user', async () => {
    sinon.stub(SequelizeUser, 'update').resolves([1] as any);
    sinon.stub(SequelizeUser, 'findByPk').resolves(user as any);
    sinon.stub(Validations, 'validateCreateUser').returns();

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
      email: loginUser.email,
      password: loginUser.password,
    });

    const { id, ...sendData } = user;

    const { status, body } = await chai
      .request(app)
      .put('/user')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(sendData);

    expect(status).to.equal(200);
    expect(body.message).to.equal('User update');
  });

  it('Should delete user', async () => {
    sinon.stub(SequelizeUser, 'destroy').resolves();
    sinon.stub(SequelizeUser, 'findByPk').resolves(user as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: loginUser.email,
        password: loginUser.password,
      });

    const { status, body } = await chai
      .request(app)
      .delete('/user')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body.message).to.equal('User deleted');
  });

  afterEach(sinon.restore);
});