import axios from "axios";
import { DefaultAzureCredential } from "@azure/identity";

const MICROSERVICE_B_URL = "http://microservice-b.yourdomain.com/protected";
const AUDIENCE = "api://microservice-b"; // Same as registered in Entra ID

async function callMicroserviceB() {
    try {
        // Get token using Managed Identity
        const credential = new DefaultAzureCredential();
        const accessToken = await credential.getToken(AUDIENCE);

        if (!accessToken) {
            throw new Error("Failed to obtain an access token");
        }

        // Call Microservice B with token
        const response = await axios.get(MICROSERVICE_B_URL, {
            headers: { Authorization: `Bearer ${accessToken.token}` },
        });

        console.log("Response from Microservice B:", response.data);
    } catch (error) {
        console.error("Error calling Microservice B:", error);
    }
}

// Run the function
callMicroserviceB();
