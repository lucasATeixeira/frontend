import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import Modal from './ModalSecoesAvulsas';

export default function SecoesAvulsas() {
  const [modal, setModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);

  const {
    nome,
    email,
    cpf,
    telefone,
    state,
    city,
    neighborhood,
    street,
    cep,
  } = useSelector(reduxState => reduxState.user.user);

  const amount = 3800;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.pagar.me/checkout/1.1.0/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  function book() {
    const checkout = new window.PagarMeCheckout.Checkout({
      encryption_key:
        process.env.REACT_APP_ENCRYPT_KEY_PAGARME ||
        'ek_test_uRsAQpNQjSiFAlBjcgElcJ468bG6tT',
      success: async data => {
        try {
          const { availableAssistents, value } = selectedHour;

          const randomIndex = Math.floor(
            Math.random() * availableAssistents.length
          );

          await api.post(
            `api/appointment/${availableAssistents[randomIndex]}`,
            {
              token: data.token,
              payment_method: data.payment_method,
              amount,
              date: value,
            }
          );
          setLoading(false);
        } catch (err) {
          toast.error(err.response.data.error, { containerId: 'alerts' });

          setSelectedHour(null);

          const { data: hours } = await api.get(
            `api/appointment/${moment(date)
              .utc()
              .format()}`
          );

          const availableHoursFetched = hours.filter(hour => hour.available);

          setDate(date);

          setAvailableHours(availableHoursFetched);

          setLoading(false);
        }
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

    setLoading(true);

    checkout.open({
      amount,
      buttonText: 'Pagar',
      buttonClass: 'botao-pagamento',
      customerData: 'false',
      createToken: 'true',
      paymentMethods: 'credit_card',
      headerText: `Seção avulsa ${moment(date)
        .utc()
        .format('dddd, DD')} de ${moment(date)
        .utc()
        .format('MMMM')}
      `,
      postbackUrl: `${process.env.REACT_APP_API_URL}api/appointment-notification`,
      customer: {
        external_id: Math.random(),
        name: nome,
        type: 'individual',
        country: 'br',
        email,
        documents: [
          {
            type: 'cpf',
            number: cpf,
          },
        ],
        phone_numbers: [`+55${telefone}`],
      },
      billing: {
        name: nome,
        address: {
          country: 'br',
          state,
          city,
          neighborhood,
          street,
          street_number: 's/n',
          zipcode: cep.replace('-', ''),
        },
      },

      items: [
        {
          id: '2',
          title: 'Seção Avulsa',
          unit_price: amount,
          quantity: 1,
          tangible: false,
        },
      ],
    });
  }

  return (
    <>
      {modal && (
        <Modal
          date={date}
          setDate={setDate}
          availableHours={availableHours}
          setAvailableHours={setAvailableHours}
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          loading={loading}
          book={book}
          setModal={setModal}
        />
      )}
      <button
        style={{ marginLeft: '14px' }}
        type="button"
        className="btn btn-info"
        onClick={() => setModal(true)}
      >
        <strong>Seções Avulsas</strong>
      </button>
    </>
  );
}
