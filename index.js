import { stake, unStake, createIncentive, endIncentive } from "./farmEvents/index.js";

// setInterval(() => {
//     try {
        console.log("Starting interval operations...");
        createIncentive()
        stake();
        unStake();
        endIncentive()
        console.log("Interval operations completed.");
//     } catch (error) {
//         console.error("Error during interval operations:", error);
//     }
// }, 35000)