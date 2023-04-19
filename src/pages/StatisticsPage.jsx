import React, { Component } from 'react'
import { bitcoinService } from '../services/bitcoin.service'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
// import faker from 'faker'    

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)


export class StatisticsPage extends Component {

    state = {
        marketPrice: null,
        confirmedTransactions: null,
        tradeVolume: null,
        blockSize: null,
        networkStatus: navigator.onLine
    }

    async componentDidMount() {
        this.setMarketPrice()
        this.setConfirmedTransactions()
        this.setTradeVolume()
        this.setBlockSize()
    }

    setMarketPrice = async () => {
        // console.log('setMarketPrice')
        try {
            const marketPrices = await bitcoinService.getMarketPrice()
            console.log('marketPrices', marketPrices.values)
            const marketPrice = marketPrices.values
            this.setState({ marketPrice })
        } catch (err) {
            console.error('error from getting market price:', err)
            return null
        }
    }

    setConfirmedTransactions = async () => {
        // console.log('setConfirmedTransactions')
        try {
            let confirmedTransactionsData = await bitcoinService.getConfirmedTransactions()
            console.log('confirmedTransactionsData', confirmedTransactionsData.values)
            const confirmedTransactions = confirmedTransactionsData.values
            this.setState({ confirmedTransactions })
        } catch (err) {
            console.error('error from getting confirmed transactions:', err)
            return null
        }
    }

    setTradeVolume = async () => {
        // console.log('setTradeVolume')
        try {
            const tradeVolumeData = await bitcoinService.getTradeVolume()
            console.log('tradeVolumeData', tradeVolumeData.values)
            const tradeVolume = tradeVolumeData.values
            this.setState({ tradeVolume })
        } catch (err) {
            console.error('error from getting trade volume:', err)
            return null
        }
    }

    setBlockSize = async () => {
        // console.log('setBlockSize')
        try {
            const blockSizeData = await bitcoinService.getBlockSize()
            console.log('blockSizeData', blockSizeData.values)
            const blockSize = blockSizeData.values
            this.setState({ blockSize })
        } catch (err) {
            console.error('error from getting block size:', err)
            return null
        }
    }

    render() {
        const { marketPrice, confirmedTransactions, tradeVolume, blockSize, networkStatus } = this.state
        if (!marketPrice || !confirmedTransactions || !tradeVolume || !blockSize)
            return <div>Loading...</div>

        const data1 = {
            labels: marketPrice.map(value => value.x),
            datasets: [{
                label: 'Market price',
                data: marketPrice.map((value) => value.y),
                borderColor: 'rgb(255, 99, 0)',
                backgroundColor: 'rgba(255, 99, 0, 0.5)',
                fill: true,
            }]
        }
        const data2 = {
            labels: confirmedTransactions.map(value => value.x),
            datasets: [{
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                label: 'Confirmed transactions per day',
                data: confirmedTransactions.map((value) => value.y),
            }]
        }
        const data3 = {
            labels: tradeVolume.map(value => value.x),
            datasets: [{
                label: 'Trade volume',
                data: tradeVolume.map((value) => value.y),
                fill: true,
                borderColor: 'rgb(25, 0, 132)',
                backgroundColor: 'rgba(25, 0, 132, 0.5)',
            }]
        }
        const data4 = {
            labels: blockSize.map(value => value.x),
            datasets: [{
                borderColor: 'rgb(5, 99, 13)',
                backgroundColor: 'rgba(5, 99, 13, 0.5)',
                label: 'Block size',
                data: blockSize.map((value) => value.y),
            }]
        }
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    // text: 'Chart.js Line Chart',
                },
            },
        }

        return (
            <section className='statitics'>
                <div>Network status: {networkStatus ? 'Online' : 'Offline'}</div>
                <Line options={options} data={data1} /> <br />
                <Line options={options} data={data2} /> <br />
                <Line options={options} data={data3} /> <br />
                <Line options={options} data={data4} />
            </section>
        )
    }
}
