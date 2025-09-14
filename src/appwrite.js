import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

//Trending movies pending
//imp error message for trending movies
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);

const updateSearchCount = async (searchTerm, movie) => {
  //1.Use Appwrite SDK to check if the search term exists in the database
  try {
    const result = await database.TablesDB.listRows(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);
    //2.If it does, update the count
    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await Databases.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
        count: doc.count + 1,
      });
      //3.If it doesn't, create a new document with the search term and count
    } else {
      await database.TablesDB.createRow(DATABASE_ID, TABLE_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
  }

  console.log(PROJECT_ID, DATABASE_ID, TABLE_ID);
};

export default updateSearchCount;
