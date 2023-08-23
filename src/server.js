import { PolybaseError } from "@polybase/client";
import { DB } from "@dataprograms/repdao-polybase";

const requiredFieldsByCollection = {
    'filfox': ['id', 'miner', 'epoch', 'blocksMined'],
    'filrep': ['id', 'miner', 'price', 'reachability'],
    'kentik': [
        'id', 'date', 'multiaddr', 'provider', 'testId', '__v', 
        'agentCity', 'agentCountry', 'agentLatitude', 'agentLongitude', 
        'agentRegion', 'latencyMs'
    ],
    'filscan': [
        'id', 'balance', 'epoch', 'fault_sector_count', 'active_sector_count', 
        'live_sector_count', 'recover_sector_count', 'terminated_sector_count', 
        'multi_address', 'actor'
    ],
    'slingshot_retrievalbot': ['http_retrieval_success'],
    'protocol_labs_retrieval_bot': ['http_retrieval_success'],
    'filecoin_foundation_retrieval_bot': ['http_retrieval_success']
};

async function getDataFromCollections(fieldsByCollection, provider) {
    for (const collectionName in fieldsByCollection) {
        let response;
        try {
            response = await DB.collection(collectionName).where('provider', '==', provider).limit(1).get();
        } catch (e) {
            if (e instanceof PolybaseError) {
                console.error(`Polybase error: ${e.code} ${e.message} when retrieving ${collectionName} record for ${provider}`);
                continue;
            }
            throw e;
        }

        if (response.data.length === 0) {
            console.log(`No ${collectionName} record for ${provider}`);
            continue;
        }

        const doc = response.data[0].data;
        const fields = fieldsByCollection[collectionName];
        const extractedData = fields.reduce((acc, field) => {
            acc[field] = doc[field];
            return acc;
        }, {});

        console.log(`Data from collection ${collectionName} for provider ${provider}:`);
        fields.forEach(field => {
            console.log(`${field}: ${extractedData[field]}`);
        });
        console.log("============================================\n")
    }
}

// Execute the function:
getDataFromCollections(requiredFieldsByCollection, "f02620");
