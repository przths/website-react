import { HYGRAPH_MASTER_URL } from "./Endpoints";
import { GraphQLClient } from "graphql-request";

const hygraphCMS = new GraphQLClient(HYGRAPH_MASTER_URL);

export async function getBlogData(query, variables = {}) {
    const data = await hygraphCMS.request(query, variables);
    return data;
}

export async function postRequest(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: requestBody,
    }),
  });
}
