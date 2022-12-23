import * as express from "express";
import moment from 'moment';

import ReportLocalController from '../controllers/ReportLocalController';
import ReportEventController from '../controllers/ReportEventController';
import ReportClientController from '../controllers/ReportClientController';


const dashboard = express.Router();

dashboard.get('/client/quantity', async (req, res) => {

  const reportClientCtrl = new ReportClientController();
  const result = await reportClientCtrl.get(req.query);

  const data = result.map((r: any) => r.sum);
  let labels: any = result.map((r: any) => moment(r._id).format('DD/MM/YYYY'));

  res.statusCode = 200;
  res.json({
      labels,
      datasets: [
        {
          label: 'Clientes ',
          data,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
  });
});

dashboard.get('/event/quantity', async (req, res) => {

    const reportEventCtrl = new ReportEventController();
    const result = await reportEventCtrl.get(req.query);

    const data = result.map((r: any) => r.sum);
    let labels: any = result.map((r: any) => moment(r._id).format('DD/MM/YYYY'));

    res.statusCode = 200;
    res.json({
        labels,
        datasets: [
          {
            label: 'Eventos',
            data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ]
    });
});

dashboard.get('/orders/by-event', async (req: any, res) => {
  const reportEventCtrl = new ReportEventController();
  const result = await reportEventCtrl.get(req.query);

  const data = result.map((r: any) => r.sum);
  const labels = result.map((r: any) => r._id);

    res.statusCode = 200;
    res.json({
        labels,
        datasets: [
            {
            label: '# of Votes',
            data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            },
        ],
    });
});

dashboard.get('/client/event', async (req: any, res) => {
  const reportClientCtrl = new ReportClientController();
  const result = await reportClientCtrl.get(req.query);

  const data = result.map((r: any) => r.sum);
  const labels = result.map((r: any) => r._id);

  
    res.statusCode = 200;
    res.json({
        labels,
        datasets: [
          {
            label: 'Melhores Clientes',
            data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      })
});

dashboard.get('/local/best-sellers', async (req: any, res) => {
  const reportLocalCtrl = new ReportLocalController();
  const result = await reportLocalCtrl.get(req.query);

  const data = result.map((r: any) => r.sum);
  const labels = result.map((r: any) => r._id);

  
    res.statusCode = 200;
    res.json({
        labels,
        datasets: [
          {
            label: 'Salões mais vendidos',
            data: ['Rio de Janeiro I', 'Rio de Janeiro II', 'Rio de Janeiro III', 'Arpoador', 'Botafogo', 'Flamengo' ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      })
})

export { dashboard };