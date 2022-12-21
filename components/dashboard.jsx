import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { Bar, Line } from 'react-chartjs-2';
// import * as faker from '@faker-js/faker';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

import './bootstrap.css';

const col = {
    width: '25%',
    float: 'left',
    boxSizing: 'border-box',
    padding: '5px',
}

const item = {
    background: '#333',
    heigth: '200px',
    width: '100%',
    color: '#fff'
}

const Dashboard = () => {
    return
    <div className={'container-fluid'}>
        <div style={{
            display: 'block',
            textAlign: 'right'
        }}>
            <input type={"date"} />
            <input type={"date"} />
            <select name="" id="">
                <option value="0" selected>Todos os Eventos</option>
                <option value="0" selected>7 dias</option>
                <option value="0" selected>15 dias</option>
                <option value="0" selected>1 mês</option>
                <option value="0" selected>Mês anterior</option>
                <option value="0" selected>1 ano</option>
            </select>
        </div>
        <div>
            <div style={col}>
                <div style={item}>1</div>
            </div>
            <div style={col}>
                <div style={item}>2</div>
            </div>
            <div style={col}>
                <div style={item}>3</div>
            </div>
            <div style={col}>
                <div style={item}>4</div>
            </div>
            <div style={col}>
                <div style={item}>1</div>
            </div>
            <div style={col}>
                <div style={item}>2</div>
            </div>
            <div style={col}>
                <div style={item}>3</div>
            </div>
            <div style={col}>
                <div style={item}>4</div>
            </div>
        </div>
    </div>

}



        export default Dashboard;