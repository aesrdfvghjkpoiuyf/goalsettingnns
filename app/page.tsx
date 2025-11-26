"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import CalculatorForm from "@/components/calculator-form"
import ResultsPanel from "@/components/results-panel"

interface CalculatorResult {
  status: number
  status_msg: string
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

export default function Home() {
  const [dreamAmount, setDreamAmount] = useState(10000000)
  const [years, setYears] = useState(30)
  const [inflationRate, setInflationRate] = useState(8)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [savingsAmount, setSavingsAmount] = useState(0)
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  const calculateGoal = useCallback(async () => {
    setError(null)
    setLoading(true)
    try {
      const params = new URLSearchParams({
        years: years.toString(),
        dream_amount: Math.round(dreamAmount).toString(),
        inflation_rate: inflationRate.toString(),
        expected_return: expectedReturn.toString(),
        savings_amount: Math.round(savingsAmount).toString(),
      })

      const response = await fetch(`/api/calculate?${params}`)
      const data = await response.json()

      console.log("[v0] API Response:", data)

      if (data.status === 200) {
        setResult(data)
        setError(null)
      } else {
        setError("Failed to calculate goal. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Error calculating goal:", error)
      setError("Error fetching calculation. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [dreamAmount, years, inflationRate, expectedReturn, savingsAmount])

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      calculateGoal()
    }, 500) // 500ms debounce delay

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [calculateGoal])

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CalculatorForm
            dreamAmount={dreamAmount}
            setDreamAmount={setDreamAmount}
            years={years}
            setYears={setYears}
            inflationRate={inflationRate}
            setInflationRate={setInflationRate}
            expectedReturn={expectedReturn}
            setExpectedReturn={setExpectedReturn}
            savingsAmount={savingsAmount}
            setSavingsAmount={setSavingsAmount}
          />
          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>}
          {result && !error && <ResultsPanel result={result} loading={loading} />}
          {loading && !result && (
            <div className="flex items-center justify-center h-96 bg-white rounded-lg border border-slate-200">
              <p className="text-slate-600">Calculating...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
