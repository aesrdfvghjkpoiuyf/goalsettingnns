"use client"

import GoalPieChart from "./goal-pie-chart"

interface CalculatorResult {
  status: number
  years: number
  dream_amount: number
  inflation_rate: number
  expected_return: number
  savings_amount: number
  target_dream_amount: number
  target_savings_amount: number
  target_amount: number
  monthly_savings: number
  invested_amount: number
  total_earnings: number
}

interface ResultsPanelProps {
  result: CalculatorResult
  loading: boolean
}

export default function ResultsPanel({ result, loading }: ResultsPanelProps) {
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-IN").format(Math.round(value))
  }

  return (
    <div className="space-y-6">
      <GoalPieChart invested_amount={result.invested_amount} total_earnings={result.total_earnings} />

      {/* Summary Section */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Summary</h3>
        <div className="space-y-3">
          {/* Your targeted Dream Amount */}
          <div className="pb-3 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Your targeted Dream Amount</p>
            <p className="text-xs text-gray-500 mb-1">(Inflation adjusted)</p>
            <p className="text-lg font-bold text-gray-900">Rs. {formatNumber(result.target_dream_amount)}</p>
          </div>

          {/* Growth of Savings */}
          <div className="pb-3 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Growth of your Savings Amount</p>
            <p className="text-xs text-gray-500 mb-1">({result.expected_return}% per annum)</p>
            <p className="text-lg font-bold text-gray-900">Rs. {formatNumber(result.target_savings_amount)}</p>
          </div>

          {/* Final Targeted Amount */}
          <div className="pb-3 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Final Targeted Amount</p>
            <p className="text-xs text-gray-500 mb-1">(Minus growth of your savings amount)</p>
            <p className="text-lg font-bold text-gray-900">Rs. {formatNumber(result.target_amount)}</p>
          </div>

          {/* Number of Years */}
          <div className="pb-3 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Number of years to achieve your goal</p>
            <p className="text-lg font-bold text-gray-900">{result.years} Years</p>
          </div>

          {/* Monthly Savings Required */}
          <div className="pb-3 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Monthly Savings required</p>
            <p className="text-lg font-bold text-gray-900">Rs. {formatNumber(result.monthly_savings)}</p>
          </div>

          {/* Total Amount Invested */}
          <div className="pb-3 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Total Amount Invested in {result.years} years</p>
            <p className="text-lg font-bold text-gray-900">Rs. {formatNumber(result.invested_amount)}</p>
          </div>

          {/* Total Growth Amount */}
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Growth Amount</p>
            <p className="text-lg font-bold text-gray-900">Rs. {formatNumber(result.total_earnings)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
