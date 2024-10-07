"use server";
import jsonata from "jsonata";
import { Client } from "@hubspot/api-client";
const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_ACCESS_TOKEN });

export default async function getCustomersFromHubspot() {
    const jsonata_query : string = "$.{'id': $.id, 'name': $.properties.firstname & ' ' & $.properties.lastname,'email': $.properties.email,'emailVerified': $.properties.emailVerified,'createdAt': $.createdAt,'updateAt': $.updatedAt}"
    try {
        const allContacts = await hubspotClient.crm.contacts.getAll();
        const expression = jsonata(jsonata_query);
        const customers = await expression.evaluate(allContacts);
        // return JSON.parse(JSON.stringify(allContacts));
        return customers;
    } catch (err : any) {
        console.error("Error fetching contacts from Hubspot", err);
        throw new Error(err);
    }
}