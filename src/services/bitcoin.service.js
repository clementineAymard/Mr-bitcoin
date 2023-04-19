import axios from 'axios';
import { storageService } from './storage.service'

const RATE_KEY = 'rate'
const MARKET_PRICE_KEY = 'marketPriceDB'
const CONF_TRANS_KEY = 'transactionsDB'
const TRADE_VOL_KEY = 'tradeVolumeDB'
const BLOCK_SIZE_KEY = 'blockSizeDB'

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions,
    getTradeVolume,
    getBlockSize
}

async function getRate() {
    const rateFromStorage = storageService.load(RATE_KEY)
    if (rateFromStorage) return rateFromStorage
  
    const rate = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
    return rate.data
}

async function getMarketPrice() {
    const marketPriceFromStorage = storageService.load(MARKET_PRICE_KEY)
    if (marketPriceFromStorage) return marketPriceFromStorage

    const marketPrice = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
    storageService.store(MARKET_PRICE_KEY, marketPrice.data)
    return marketPrice.data
}

async function getConfirmedTransactions() {
    const conftransactionsFromStorage = storageService.load(CONF_TRANS_KEY)
    if (conftransactionsFromStorage) return conftransactionsFromStorage

    const transactions = await axios.get('https://api.blockchain.info/charts/n-transactions?timespan=5months&format=json&cors=true')
    storageService.store(CONF_TRANS_KEY, transactions.data)
    return transactions.data
}

async function getTradeVolume() {
    const tradeVolFromStorage = storageService.load(TRADE_VOL_KEY)
    if (tradeVolFromStorage) return tradeVolFromStorage

    const tradeVolume = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
    storageService.store(TRADE_VOL_KEY, tradeVolume.data)
    return tradeVolume.data
}

async function getBlockSize() {
    const blockSizeFromStorage = storageService.load(BLOCK_SIZE_KEY)
    if (blockSizeFromStorage) return blockSizeFromStorage

    const blockSize = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
    storageService.store(BLOCK_SIZE_KEY, blockSize.data)
    return blockSize.data
}

