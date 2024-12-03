/**
 * Build filters for querying games from the database.
 * @param query - Request query parameters
 * @returns Filter object for Prisma
 */
export const buildFilters = (query: any) => {
  const { name, genre } = query;
  const filters: any = {};

  if (name) {
    filters.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  if (genre) {
    const genreArray = genre.split(",").map((g: string) => g.trim());
    filters.genres = {
      some: {
        description: {
          in: genreArray,
        },
      },
    };
  }

  return filters;
};
