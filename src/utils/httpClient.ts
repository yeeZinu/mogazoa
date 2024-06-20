export default class HttpClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async sendRequest<T>(path: string, method: string, body?: BodyInit, options: RequestInit = {}): Promise<T> {
    const newPath = path.at(0) === "/" ? path.slice(1) : path;
    try {
      const requestOptions: RequestInit = {
        method,
        headers: { "Content-Type": "application/json", ...options.headers },
        ...options,
        body,
      };
      const response = await fetch(`${this.baseUrl}/${newPath}`, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.log(`fetch data error, ${error}`);
      throw error;
    }
  }

  async get<T>(path: string, options: RequestInit = {}): Promise<T> {
    return this.sendRequest<T>(path, "GET", undefined, options);
  }

  async post<T>(path: string, options: RequestInit = {}, body?: BodyInit): Promise<T> {
    return this.sendRequest<T>(path, "POST", body, options);
  }

  async put<T>(path: string, options: RequestInit = {}, body?: BodyInit): Promise<T> {
    return this.sendRequest<T>(path, "PUT", body, options);
  }

  async delete<T>(path: string, options: RequestInit = {}): Promise<T> {
    return this.sendRequest<T>(path, "DELETE", undefined, options);
  }
}
