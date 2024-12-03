import { ParsedQs } from "qs";

export function parseGenresParam(genresParam: string | string[] | ParsedQs | ParsedQs[] | undefined): string[] {
  if (Array.isArray(genresParam)) {
    return genresParam.map((genre) => String(genre));
  } 
  else if (typeof genresParam === "string") {
    return genresParam.split(",").map((genre) => genre.trim());
  }
  return [];
}
