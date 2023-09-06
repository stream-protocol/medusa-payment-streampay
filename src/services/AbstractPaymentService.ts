import axios from 'axios';

class AbstractPaymentService {
  // ... Existing code ...

  /**
   * Fetch cryptocurrency and stablecoin price data.
   * @param ids - An array of cryptocurrency and stablecoin IDs.
   * @returns A promise that resolves to the price data.
   */
  async fetchCryptoPriceData(ids: string[]): Promise<any> {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

    try {
      const response = await axios.get(apiUrl, {
        params: {
          ids: ids.join(','),
          vs_currencies: 'usd',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching cryptocurrency price data:', error);
      return {};
    }
  }
}
