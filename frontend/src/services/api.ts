const API_BASE_URL = (import.meta.env['VITE_API_URL'] as string | undefined) ?? 'http://localhost:8080';
export const WS_BASE_URL = API_BASE_URL.replace('http', 'ws');

const getToken = (): string | null => {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as {
      error?: string;
      details?: string;
    };
    throw new ApiError(
      errorData.error ?? `HTTP error! status: ${String(response.status)}`,
      response.status,
      errorData.details,
    );
  }
  return response.json() as Promise<T>;
};

export const api = {
  // Generic request method
  request: async <T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
        ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      },
      ...options,
    };

    const response = await fetch(url, config);
    return handleResponse<T>(response);
  },

  // GET request
  get: async <T>(endpoint: string): Promise<T> => {
    return await api.request<T>(endpoint, { method: 'GET' });
  },

  // POST request
  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    return await api.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PUT request
  put: async <T>(endpoint: string, data: unknown): Promise<T> => {
    return await api.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

   // PATCH request
  patch: async <T>(endpoint: string, data: unknown): Promise<T> => {
    return await api.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // DELETE request
  delete: async <T>(endpoint: string): Promise<T> => {
    return await api.request<T>(endpoint, { method: 'DELETE' });
  },
};

export { ApiError }; 