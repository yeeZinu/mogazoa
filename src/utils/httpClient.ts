export default class HttpClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async sendRequest<T>(path: string, method: string, body?: BodyInit, options: RequestInit = {}): Promise<T> {
    const requestOptions: RequestInit = {
      ...(method !== "GET" && { method }),
      ...options,
      ...(body !== undefined && { body }),
    };

    try {
      const response = await fetch(`${this.baseUrl}${path}`, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.log(`fetch data error, ${error}`);
      console.log("path:", path);
      console.log("requestOptions", requestOptions);
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

  async patch<T>(path: string, options: RequestInit = {}, body?: BodyInit): Promise<T> {
    return this.sendRequest<T>(path, "PATCH", body, options);
  }

  async delete<T>(path: string, options: RequestInit = {}): Promise<T> {
    return this.sendRequest<T>(path, "DELETE", undefined, options);
  }
}
