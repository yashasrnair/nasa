import axios from 'axios';

export interface WeatherData {
  temperature?: {
    probability: number;
    average: number;
    min: number;
    max: number;
    unit: string;
  };
  precipitation?: {
    probability: number;
    average: number;
    unit: string;
  };
  wind?: {
    probability: number;
    average: number;
    unit: string;
  };
  humidity?: {
    probability: number;
    average: number;
    unit: string;
  };
}

class NasaApiService {
  private baseUrl = 'https://power.larc.nasa.gov/api/temporal/climatology/point';

  async getWeatherProbability(
    latitude: number,
    longitude: number,
    parameters: string[],
    startDate: Date,
    endDate: Date
  ): Promise<WeatherData> {
    try {
      // Format dates for NASA API (YYYYMMDD)
      const formatDate = (date: Date) => {
        return date.toISOString().slice(0, 10).replace(/-/g, '');
      };

      // Map our parameters to NASA parameters
      const parameterMap: { [key: string]: string } = {
        temperature: 'T2M',
        precipitation: 'PRECTOT',
        wind: 'WS2M',
        humidity: 'RH2M'
      };

      const nasaParameters = parameters.map(p => parameterMap[p]).join(',');

      const response = await axios.get(this.baseUrl, {
        params: {
          parameters: nasaParameters,
          start: formatDate(startDate),
          end: formatDate(endDate),
          latitude,
          longitude,
          community: 'RE',
          format: 'JSON'
        },
        timeout: 10000
      });

      return this.processNasaData(response.data, parameters);
    } catch (error) {
      console.error('NASA API Error:', error);
      // Return mock data for development
      return this.getMockData(parameters);
    }
  }

  private processNasaData(data: any, parameters: string[]): WeatherData {
    const result: WeatherData = {};

    parameters.forEach(param => {
      const paramKey = this.getNasaParamKey(param);
      if (data.properties && data.properties.parameter && data.properties.parameter[paramKey]) {
        const paramData = data.properties.parameter[paramKey];
        const values = Object.values(paramData).filter(v => typeof v === 'number') as number[];
        
        if (values.length > 0) {
          const average = values.reduce((a, b) => a + b, 0) / values.length;
          const min = Math.min(...values);
          const max = Math.max(...values);
          
          // Calculate probability based on historical variance
          const probability = this.calculateProbability(values, average);

          result[param as keyof WeatherData] = {
            probability: Math.round(probability),
            average: this.formatValue(average, param),
            min: this.formatValue(min, param),
            max: this.formatValue(max, param),
            unit: this.getUnit(param)
          };
        }
      }
    });

    return result;
  }

  private getNasaParamKey(param: string): string {
    const map: { [key: string]: string } = {
      temperature: 'T2M',
      precipitation: 'PRECTOT',
      wind: 'WS2M',
      humidity: 'RH2M'
    };
    return map[param] || param;
  }

  private calculateProbability(values: number[], average: number): number {
    // Simple probability calculation based on standard deviation
    const variance = values.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    
    // Higher probability for more consistent data (lower std dev)
    return Math.max(30, Math.min(95, 100 - (stdDev / average * 100)));
  }

  private formatValue(value: number, param: string): number {
    // Convert units if needed
    switch (param) {
      case 'temperature':
        return Math.round((value - 273.15) * 10) / 10; // Kelvin to Celsius
      case 'precipitation':
        return Math.round(value * 1000); // Convert to mm
      default:
        return Math.round(value * 100) / 100;
    }
  }

  private getUnit(param: string): string {
    switch (param) {
      case 'temperature': return '°C';
      case 'precipitation': return 'mm';
      case 'wind': return 'm/s';
      case 'humidity': return '%';
      default: return '';
    }
  }

  private getMockData(parameters: string[]): WeatherData {
    const mockData: WeatherData = {};
    
    parameters.forEach(param => {
      const probability = Math.floor(Math.random() * 40) + 30; // 30-70%
      
      switch (param) {
        case 'temperature':
          mockData.temperature = {
            probability,
            average: 25,
            min: 18,
            max: 32,
            unit: '°C'
          };
          break;
        case 'precipitation':
          mockData.precipitation = {
            probability,
            average: 15,
            unit: 'mm'
          };
          break;
        case 'wind':
          mockData.wind = {
            probability,
            average: 12,
            unit: 'km/h'
          };
          break;
        case 'humidity':
          mockData.humidity = {
            probability,
            average: 65,
            unit: '%'
          };
          break;
      }
    });

    return mockData;
  }
}

export const nasaApiService = new NasaApiService();