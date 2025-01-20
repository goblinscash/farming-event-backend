import { stake, unStake, createIncentive, endIncentive } from "./farmEvents/index.js";
// import express from "express";


// const app = express();
// const PORT = 4000;

console.log("Started event listener...");
// createIncentive(56);
stake(56);
unStake(56);
// endIncentive(56);

// createIncentive(8453);
stake(8453);
unStake(8453);
// endIncentive(8453);
console.log("Event listener cycle completed.");


// app.listen(PORT, () => {
//         console.log(`Server is running on http://localhost:${PORT}`);
// });
