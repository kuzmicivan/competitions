import useSWR, { Cache } from 'swr';
import { fetcher } from '../lib/fetcher';

export function useNotes() {
    const { data, error, isLoading } = useSWR('/api/notes', fetcher);
    
    return {
        notes: data,
        isLoading,
        isError: error
    };
}
