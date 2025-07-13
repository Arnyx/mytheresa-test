export class HttpClient {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;

    if (!this.baseUrl || !this.token) {
      throw new Error('env vars not properly set');
    }
  }

  private getHeaders(extra?: HeadersInit): HeadersInit {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      ...extra,
    };
  }

  async get<T, Q extends Record<string, unknown> = Record<string, unknown>>(
    endpoint: string,
    queryParams?: Q
  ): Promise<T> {
    return this.request<T>('GET', endpoint, { queryParams });
  }

  async post<B, R>(endpoint: string, body: B): Promise<R> {
    return this.request<R>('POST', endpoint, {
      body: JSON.stringify(body),
    });
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    options: RequestInit & { queryParams?: Record<string, unknown> } = {}
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (options.queryParams) {
      Object.entries(options.queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const res = await fetch(url.toString(), {
      ...options,
      method,
      headers: this.getHeaders(options.headers),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }
}
