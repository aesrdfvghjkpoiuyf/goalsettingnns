export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const formData = new URLSearchParams({
    key: "f1a1d4ea-2999-46e2-94a8-c77be61ee709",
    years: searchParams.get("years") || "30",
    dream_amount: searchParams.get("dream_amount") || "10000000",
    inflation_rate: searchParams.get("inflation_rate") || "8",
    expected_return: searchParams.get("expected_return") || "12",
    savings_amount: searchParams.get("savings_amount") || "0",
  })

  const apiUrl = "https://mfapi.advisorkhoj.com/calc/getGoalSettingCalcResult"

  try {
    console.log("[v0] Fetching with POST:", apiUrl, formData.toString())

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.advisorkhoj.com/tools-and-calculators/goal-setting-calculator",
        Origin: "https://www.advisorkhoj.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })

    console.log("[v0] Response status:", response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] API Error:", response.status, errorData)
      return Response.json(
        {
          status: response.status,
          error: response.statusText,
          message: errorData,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("[v0] API Success:", data)
    return Response.json(data)
  } catch (error) {
    console.error("[v0] Fetch Error:", error instanceof Error ? error.message : error)
    return Response.json(
      {
        status: 500,
        error: "Failed to calculate",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
