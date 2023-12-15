import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export function useNote(noteId: string) {
  let { data, error, isLoading } = useSWR(`/api/notes/${noteId}`, fetcher);

  if (data?.photo) {
    const bufferArray = new Uint8Array(data.photo.data);
    const photo = String.fromCharCode.apply(null, bufferArray);
    data = { ...data, photo };
  }

  return {
    note: data,
    isLoading,
    isError: error,
  };
}
