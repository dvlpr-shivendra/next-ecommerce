
export function backendUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_BACKEND_HOST}/${path}`;
}
