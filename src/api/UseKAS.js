import axios from "axios";
import {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  COUNT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  CHAIN_ID,
} from "../constants";

const option = {
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64"),
    "x-chain-id": CHAIN_ID,
    "content-type": "application/json",
  },
};

// const option = {
//   headers: [
//     {
//       name: "Authorization",
//       value:
//         "Basic " +
//         Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64"),
//     },
//     { name: "x-chain-id", value: CHAIN_ID },
//   ],
// };
export const uploadMetaData = async (imageUrl) => {
  const _description = "This is a KlayLion NFT";
  const _name = "KlayLionNFT";

  const metadata = {
    metadata: {
      name: _name,
      description: _description,
      image: imageUrl,
    },
  };

  try {
    const response = await axios.post(
      "https://metadata-api.klaytnapi.com/v1/metadata",
      metadata,
      option
    );
    console.log(`${JSON.stringify(response.data)}`);
    return response.data.uri;
  } catch (e) {
    console.log(e);
    return false;
  }
};
