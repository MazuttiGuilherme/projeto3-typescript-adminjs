import { useState, useEffect } from 'react';
import moment from 'moment';
import useSWR from 'swr'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    ArcElement,
    PointElement,
    Filler,
  } from 'chart.js';
  import { Bar, Pie, Radar } from 'react-chartjs-2';

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    Filler,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

const col = {
    width: '50%',
    float: 'left',
    boxSizing: 'border-box',
    padding: '5px'
}
const item = {
    width: '100%',
}
const input = {
    padding: '5px',
    fontSize: '1.2em'
}


export const optionsClientQuantity = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Clientes por dia',
      },
    },
};


const fetcher = (...args) => fetch(...args).then(res => res.json())

const Dashboard = () => {
    const [stateFilter, setStateFilter] = useState({
        period: 7,
        date_start: null,
        date_end: null
    });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectDate, setSelectDate] = useState("all");
    const { data: dataClientQuantity } = useSWR('http://localhost:3000/dashboard/client/quantity', fetcher)
    const { data: ordersByEvent } = useSWR('http://localhost:3000/dashboard/orders/by-event', fetcher)
    const { data: dataLocal } = useSWR('http://localhost:3000/dashboard/local/best-sellers', fetcher)

    useEffect(() => {
        if(selectDate !== 'custom'){
            setStartDate("");
            setEndDate("");
        }
    }, [selectDate])

    return <div className={'container-fluid'}>
                <div style={{
                    display: 'block',
                    textAlign: 'right',
                    padding: '15px',
                    boxSizing: 'border-box'
                }}>
                    <input
                        disabled={selectDate!=="custom"}
                        value={startDate}
                        type="date" 
                        style={input}
                        max={endDate !== "" ? endDate : moment().format('YYYY-MM-DD')}
                        onChange={(event) => setStartDate(event.target.value)}/>
                    <input
                        disabled={selectDate!=="custom"}
                        value={endDate}
                        type="date" 
                        style={input}
                        min={startDate !== "" ? startDate : null}
                        max={moment().format('YYYY-MM-DD')}
                        onChange={(event) => setEndDate(event.target.value)}/>
                    <select
                        style={input}
                        onChange={(event) => setSelectDate(event.target.value)}
                        >
                        <option value="all">Todos os Eventos</option>
                        <option value="7" selected>7 dias</option>
                        <option value="15">15 dias</option>
                        <option value="30">1 mês</option>
                        <option value="180">6 meses</option>
                        <option value="365">1 ano</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div>
                    <div style={col}>
                        <div style={item}>
                        { ordersByEvent ?
                             <Pie 
                                width={300}
                                height={300}
                                data={ordersByEvent}
                                options={{
                                    maintainAspectRatio: false
                                }} />
                            : "Não há dados para esse dashboard." }
                        </div>
                    </div>
                    <div style={col}>
                        <div style={item}>
                        { dataLocal ?
                             <Radar 
                                width={400}
                                height={400}
                                data={dataLocal}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                            : "Não há dados para esse dashboard." }
                        </div>
                    </div>
                    <div style={{
                        ...col,
                        width: '100%'
                    }}>
                        <div style={item}>
                            { dataClientQuantity ?
                            <Bar 
                                options={optionsClientQuantity} data={dataUsersQuantity} /> 
                            : "Não há dados para esse dashboard." }
                        </div>
                    </div>
                </div>
            </div>
}

export default Dashboard;