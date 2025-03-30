import { HYGRAPH_MASTER_URL } from "./Links";
import { GraphQLClient } from "graphql-request";

const hygraphCMS = new GraphQLClient(HYGRAPH_MASTER_URL);

export async function getBlogData(query, variables = {}) {
    const data = await hygraphCMS.request(query, variables);
    return data;
}
