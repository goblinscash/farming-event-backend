import { stake, unStake, createIncentive, endIncentive } from "./farmEvents/index.js";
import express from "express";


const app = express();
const PORT = 4000;

console.log("Started event listener...");
createIncentive();
stake();
unStake();
endIncentive();
console.log("Event listener cycle completed.");


app.listen(PORT, () => {      
        console.log(`Server is running on http://localhost:${PORT}`);
});
