// frontend/src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// O hook agora espera apenas o caminho do endpoint (ex: /sales/)
const useFetch = <T>(urlPath: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Constrói a URL completa usando a variável de ambiente + o caminho
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${urlPath}`;

    const fetchData = async () => {
      try {
        setLoading(true);
        // Usa a nova URL construída para o fetch
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlPath]); // O hook agora depende do caminho do endpoint

  return { data, loading, error };
};

export default useFetch;