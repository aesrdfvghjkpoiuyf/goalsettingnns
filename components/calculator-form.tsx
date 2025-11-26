"use client"

import type React from "react"

interface CalculatorFormProps {
  dreamAmount: number
  setDreamAmount: (value: number) => void
  years: number
  setYears: (value: number) => void
  inflationRate: number
  setInflationRate: (value: number) => void
  expectedReturn: number
  setExpectedReturn: (value: number) => void
  savingsAmount: number
  setSavingsAmount: (value: number) => void
}

export default function CalculatorForm({
  dreamAmount,
  setDreamAmount,
  years,
  setYears,
  inflationRate,
  setInflationRate,
  expectedReturn,
  setExpectedReturn,
  savingsAmount,
  setSavingsAmount,
}: CalculatorFormProps) {
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-IN").format(Math.round(value))
  }

  const handleDreamAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 0
    setDreamAmount(Math.max(0, Math.min(100000000, value)))
  }

  const handleSavingsAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 0
    setSavingsAmount(Math.max(0, Math.min(10000000, value)))
  }

  return (
    <div className="space-y-4">
      {/* Dream Amount */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What is the amount that you would like to spend on buying an item you dream - a big car or a foreign holiday
          or a house (Rs)
        </label>
        <div className="mb-3">
          <input
            type="text"
            value={formatNumber(dreamAmount)}
            onChange={handleDreamAmountChange}
            className="w-full px-3 py-2 text-lg font-semibold text-center text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <input
          type="range"
          min="100000"
          max="100000000"
          step="100000"
          value={dreamAmount}
          onChange={(e) => setDreamAmount(Number.parseFloat(e.target.value))}
          className="w-full slider-primary"
          style={{
            background: `linear-gradient(to right, #293895 0%, #293895 ${(dreamAmount / 100000000) * 100}%, #e5e7eb ${(dreamAmount / 100000000) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>1 Crore</span>
          <span>25 Crore</span>
          <span>50 Crore</span>
          <span>75 Crore</span>
          <span>100 Crore</span>
        </div>
      </div>

      {/* Years */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          After how many years away would you need this amount?
        </label>
        <div className="mb-3">
          <input
            type="text"
            value={years}
            readOnly
            className="w-full px-3 py-2 text-lg font-semibold text-center text-black bg-white border border-gray-300 rounded-md"
          />
        </div>
        <input
          type="range"
          min="1"
          max="100"
          step="1"
          value={years}
          onChange={(e) => setYears(Number.parseInt(e.target.value))}
          className="w-full slider-primary"
          style={{
            background: `linear-gradient(to right, #293895 0%, #293895 ${(years / 100) * 100}%, #e5e7eb ${(years / 100) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>1</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      {/* Inflation Rate */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          The expected rate of inflation over the years (% per annum)
        </label>
        <div className="mb-3">
          <input
            type="text"
            value={inflationRate}
            readOnly
            className="w-full px-3 py-2 text-lg font-semibold text-center text-black bg-white border border-gray-300 rounded-md"
          />
        </div>
        <input
          type="range"
          min="5"
          max="15"
          step="0.1"
          value={inflationRate}
          onChange={(e) => setInflationRate(Number.parseFloat(e.target.value))}
          className="w-full slider-primary"
          style={{
            background: `linear-gradient(to right, #293895 0%, #293895 ${((inflationRate - 5) / 10) * 100}%, #e5e7eb ${((inflationRate - 5) / 10) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>5</span>
          <span>7.5</span>
          <span>10</span>
          <span>12.5</span>
          <span>15</span>
        </div>
      </div>

      {/* Expected Return */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What rate of return would you expect from your investment (% per annum)
        </label>
        <div className="mb-3">
          <input
            type="text"
            value={expectedReturn}
            readOnly
            className="w-full px-3 py-2 text-lg font-semibold text-center text-black bg-white border border-gray-300 rounded-md"
          />
        </div>
        <input
          type="range"
          min="5"
          max="20"
          step="0.1"
          value={expectedReturn}
          onChange={(e) => setExpectedReturn(Number.parseFloat(e.target.value))}
          className="w-full slider-primary"
          style={{
            background: `linear-gradient(to right, #293895 0%, #293895 ${((expectedReturn - 5) / 15) * 100}%, #e5e7eb ${((expectedReturn - 5) / 15) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>5</span>
          <span>7.5</span>
          <span>10</span>
          <span>12.5</span>
          <span>15</span>
          <span>17.5</span>
          <span>20</span>
        </div>
      </div>

      {/* Current Savings */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-3">How much savings you have now? (Rs)</label>
        <div className="mb-3">
          <input
            type="text"
            value={formatNumber(savingsAmount)}
            onChange={handleSavingsAmountChange}
            className="w-full px-3 py-2 text-lg font-semibold text-center text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <input
          type="range"
          min="0"
          max="10000000"
          step="25000"
          value={savingsAmount}
          onChange={(e) => setSavingsAmount(Number.parseFloat(e.target.value))}
          className="w-full slider-primary"
          style={{
            background: `linear-gradient(to right, #293895 0%, #293895 ${(savingsAmount / 10000000) * 100}%, #e5e7eb ${(savingsAmount / 10000000) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>0</span>
          <span>25 Lakhs</span>
          <span>50 Lakhs</span>
          <span>75 Lakhs</span>
          <span>1 Crore</span>
        </div>
      </div>
    </div>
  )
}
