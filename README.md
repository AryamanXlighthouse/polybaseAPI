# Polybase Data Retrieval Utility

This utility is designed to retrieve specific fields from different collections within Polybase for a specified provider. The main functionality resides in the function `getDataFromCollections` which will iterate over the provided collections and fetch data for the specified fields. Errors specific to Polybase are also gracefully handled.

## Installation

Before you use the utility, ensure you have the necessary dependencies:

- `@polybase/client`: The Polybase client library to interact with Polybase.
- `@dataprograms/repdao-polybase`: An additional database library for Polybase.

Install them using npm or yarn:

```bash
npm install @polybase/client @dataprograms/repdao-polybase
```

or

```bash
yarn add @polybase/client @dataprograms/repdao-polybase
```

## Usage

**1. Setup Collection Fields:**

Before you start, determine the required fields you want to retrieve for each collection. The `requiredFieldsByCollection` constant given in the code is a sample structure.

```javascript
const requiredFieldsByCollection = {
    'collectionName1': ['field1', 'field2', ...],
    'collectionName2': ['fieldA', 'fieldB', ...],
    ...
};
```
**2. Execute the Function:**

Call the function `getDataFromCollections` with the required fields by collection and the provider you want to filter by:


```javascript
getDataFromCollections(requiredFieldsByCollection, "providerId");
```
* Replace "providerId" with the appropriate provider's identifier.

**3. Output:**

The utility will log the retrieved data for each collection to the console. For each collection, it will display the data for the specified fields or indicate if there's no record for the given provider.

Polybase specific errors are caught and logged, providing feedback on what went wrong.

## Error Handling
The utility is designed to handle Polybase specific errors gracefully. If there's an error related to Polybase, it will be logged with details on which collection it occurred on and the nature of the error.
