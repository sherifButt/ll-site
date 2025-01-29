"use client"

import React, { useState } from 'react'
import { AppScreen } from '@/components/AppScreen'
import {
  LaravelLogo,
  TupleLogo,
  TransistorLogo,
  StaticKitLogo,
  StatamicLogo,
  MirageLogo,
  ReversableLogo,
} from './StockLogos'

const stockData = [
  {
    name: 'Laravel Inc.',
    symbol: 'LRV',
    price: 234.56,
    change: 2.34,
    Logo: LaravelLogo,
  },
  {
    name: 'Tuple Corp',
    symbol: 'TPL',
    price: 145.78,
    change: -1.23,
    Logo: TupleLogo,
  },
  {
    name: 'Transistor',
    symbol: 'TNS',
    price: 567.89,
    change: 5.67,
    Logo: TransistorLogo,
  },
  {
    name: 'StaticKit',
    symbol: 'STK',
    price: 89.34,
    change: -0.45,
    Logo: StaticKitLogo,
  },
  {
    name: 'Statamic',
    symbol: 'STM',
    price: 123.45,
    change: 1.78,
    Logo: StatamicLogo,
  },
  {
    name: 'Mirage Tech',
    symbol: 'MRG',
    price: 345.67,
    change: -2.89,
    Logo: MirageLogo,
  },
  {
    name: 'Reversable',
    symbol: 'RVS',
    price: 78.9,
    change: 0.67,
    Logo: ReversableLogo,
  },
]

const StockCard = ({ stock }) => {
  const { Logo, name, symbol, price, change } = stock

  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800">
          <Logo className="h-10 w-10" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">${symbol}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-gray-900">
          ${price.toFixed(2)}
        </div>
        <div
          className={`text-sm ${
            change >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {change >= 0 ? '+' : ''}
          {change.toFixed(2)}%
        </div>
      </div>
    </div>
  )
}

export default function StockList() {
  return (
    <AppScreen>
      <AppScreen.Body>
        <div className="bg-white rounded-t-2xl">
          <div className="border-b border-gray-200 p-4">
            <div className="text-lg font-semibold text-gray-900">
              Market Watch
            </div>
            <div className="text-sm text-gray-500">Live stock prices</div>
          </div>
          <div className="divide-y divide-gray-200">
            {stockData.map((stock, index) => (
              <StockCard key={index} stock={stock} />
            ))}
          </div>
          <div className="p-4">
            <button className="w-full rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-600">
              View All Stocks
            </button>
          </div>
        </div>
      </AppScreen.Body>
    </AppScreen>
  )
}
