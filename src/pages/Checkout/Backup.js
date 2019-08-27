/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Upper from './Upper';
import { handleCpf, handleDate, handleTelefone } from '../../hooks/inputHooks';

export default function Checkout({ history }) {
  const [loading, setLoading] = useState(false);
  const [nascimento, setNascimento] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [repeatSenha, setRepeatSenha] = useState('');
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [cupom, setCupom] = useState('');

  let amount = 100; // 57000;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.pagar.me/checkout/1.1.0/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  async function handleBlur() {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setState(data.uf);
      setCity(data.localidade);
      setNeighborhood(data.bairro);
      return setStreet(data.logradouro);
    } catch (err) {
      return toast.error('CEP não encontrado, insira um CEP Válido', {
        containerId: 'checkout',
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let discount = 1;
    let cupomName = 'null';
    if (cupom) {
      try {
        const { data: cupomResponse } = await api.get(`api/cupom/${cupom}`);
        discount = (100 - cupomResponse.discount) / 100;
        cupomName = cupomResponse.name;
        amount *= discount;
      } catch (err) {
        toast.error(
          `${err.response.data.error}, apague o cupom para continuar a compra`,
          {
            containerId: 'checkout',
          }
        );
      }
    }
    const cpfString = [...cpf.split('-')[0].split('.'), cpf.split('-')[1]].join(
      ''
    );
    const telefoneString = `${telefone.slice(1, 3)}${telefone.slice(
      4,
      9
    )}${telefone.slice(10, 14)}`;
    if (isNaN(telefoneString))
      return toast.error('Telefone Inválido', { containerId: 'checkout' });
    if (cpfString.length !== 11) return toast.error('CPF Inválido');
    if (!nome || !cpf || !telefone || !nascimento || !email || !senha)
      return toast.error('Preencha todos os campos', {
        containerId: 'checkout',
      });
    if (senha !== repeatSenha)
      return toast.error('Senhas devem ser iguais', {
        containerId: 'checkout',
      });
    if (!neighborhood)
      return toast.error('Insira um CEP válido', { containerId: 'checkout' });

    setLoading(true);

    async function checkData() {
      try {
        await api.post('api/user', { email, cpf: cpfString });
        const checkout = new window.PagarMeCheckout.Checkout({
          encryption_key:
            process.env.REACT_ENCRYPT_KEY_PAGARME ||
            'ek_test_uRsAQpNQjSiFAlBjcgElcJ468bG6tT',
          success: async data => {
            await api.post('api/checkout', {
              email,
              senha,
              token: data.token,
              nome,
              telefone: telefoneString,
              cpf: cpfString,
              nascimento,
              cep: cep.replace('-', ''),
              state,
              city,
              neighborhood,
              street,
              number,
              amount,
              cupom: cupomName,
              payment_value: amount,
            });
            history.push('/');
            setLoading(false);
          },
          error: err => {
            if (err)
              return toast.error('Tivemos um erro, tente novamente', {
                containerId: 'checkout',
              });
            return null;
          },
          close: () => setLoading(false),
        });

        checkout.open({
          amount,
          buttonText: 'Pagar',
          buttonClass: 'botao-pagamento',
          customerData: 'false',
          createToken: 'true',
          paymentMethods: 'credit_card',
          maxInstallments: 12,
          postbackUrl:
            `${process.env.REACT_APP_API_URL}api/notification` ||
            'https://api.ondazul.online/api/notification',
          customer: {
            external_id: Math.random(),
            name: nome,
            type: 'individual',
            country: 'br',
            email,
            documents: [
              {
                type: 'cpf',
                number: cpfString,
              },
            ],
            phone_numbers: [`+55${telefoneString}`],
            birthday: `${nascimento.split('/')[2]}-${
              nascimento.split('/')[1]
            }-${nascimento.split('/')[0]}`,
          },
          billing: {
            name: nome,
            address: {
              country: 'br',
              state,
              city,
              neighborhood,
              street,
              street_number: number,
              zipcode: cep.replace('-', ''),
            },
          },

          items: [
            {
              id: '1',
              title: 'Ondazul',
              unit_price: amount,
              quantity: 1,
              tangible: false,
            },
          ],
        });
      } catch (err) {
        toast.error(err.response.data.error, { containerId: 'checkout' });
        setLoading(false);
      }
    }
    await checkData();
    return null;
  }
  return (
    <>
      <ToastContainer
        enableMultiContainer
        containerId="checkout"
        autoClose={2000}
      />
      <Upper />
      <div className="wrapper wrapper-full-page">
        <div
          className="page-header login-page header-filter"
          filter-color="black"
          style={{
            backgroundImage: "url('assets/img/realeasy.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-9 ml-auto mr-auto">
                <div className="card card-login">
                  <div className="card-header card-header-info text-center">
                    <h4 className="card-title">ONDAZUL</h4>
                  </div>
                  <br />

                  <form onSubmit={handleSubmit}>
                    <div className="card-body">
                      <p className="card-description text-center">
                        <strong>INFORME SEUS DADOS</strong>
                      </p>
                      <div className="card-footer justify-content-center" />

                      <div className="row">
                        <div className="col-md-6">
                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">person</i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                className="form-control"
                                placeholder="Nome..."
                              />
                            </div>
                          </span>

                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">credit_card</i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={cpf}
                                onChange={e => handleCpf(e, setCpf)}
                                className="form-control"
                                placeholder="CPF..."
                              />
                            </div>
                          </span>

                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">
                                    settings_cell
                                  </i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={telefone}
                                onChange={e => handleTelefone(e, setTelefone)}
                                className="form-control"
                                placeholder="Celular..."
                              />
                            </div>
                          </span>

                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">
                                    calendar_today
                                  </i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={nascimento}
                                onChange={e => handleDate(e, setNascimento)}
                                className="form-control"
                                placeholder="Data de Nascimento..."
                              />
                            </div>
                          </span>
                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">email</i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="Email..."
                              />
                            </div>
                          </span>

                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">lock_outline</i>
                                </span>
                              </div>
                              <br />

                              <input
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                name="senha"
                                type="password"
                                className="form-control"
                                placeholder="Senha..."
                              />
                            </div>
                          </span>

                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">lock_outline</i>
                                </span>
                              </div>
                              <br />

                              <input
                                value={repeatSenha}
                                onChange={e => setRepeatSenha(e.target.value)}
                                name="senha"
                                type="password"
                                className="form-control"
                                placeholder="Confirme sua senha..."
                              />
                            </div>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">
                                    location_city
                                  </i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={cep}
                                onChange={e => setCep(e.target.value)}
                                onBlur={handleBlur}
                                className="form-control"
                                placeholder="CEP (apenas números)"
                              />
                            </div>
                          </span>

                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">
                                    location_city
                                  </i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={state}
                                disabled
                                className="form-control"
                                placeholder="Estado"
                              />
                            </div>
                          </span>

                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">
                                    location_city
                                  </i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={city}
                                disabled
                                className="form-control"
                                placeholder="Cidade"
                              />
                            </div>
                          </span>

                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">
                                    location_city
                                  </i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={street}
                                disabled
                                className="form-control"
                                placeholder="Rua"
                              />
                            </div>
                          </span>
                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">
                                    location_city
                                  </i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={neighborhood}
                                disabled
                                className="form-control"
                                placeholder="Bairro"
                              />
                            </div>
                          </span>
                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">
                                    location_city
                                  </i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                                className="form-control"
                                placeholder="Número"
                              />
                            </div>
                          </span>
                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">
                                    shopping_basket
                                  </i>
                                </span>
                              </div>
                              <br />
                              <input
                                value={cupom}
                                onChange={e =>
                                  setCupom(e.target.value.toUpperCase())
                                }
                                className="form-control"
                                placeholder="Cupom"
                                maxLength={6}
                              />
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>

                    <br />

                    <div className="card-footer justify-content-center">
                      <button type="submit" className="btn btn-info btn-lg">
                        {loading ? (
                          <i className="fa fa-spinner fa-pulse" />
                        ) : (
                          <strong>SURFAR!</strong>
                        )}
                      </button>
                    </div>
                  </form>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Checkout.propTypes = {
  history: PropTypes.shape(),
};

Checkout.defaultProps = {
  history: {},
};
