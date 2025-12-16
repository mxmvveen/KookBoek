import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export const getRecipies = async () => {
  try {
    const data = await sql<Recipe[]>`SELECT * FROM recipe`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipe data.');
  }
}