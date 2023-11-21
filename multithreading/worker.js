onmessage = (number) => {
    console.log("Message received from main script");
    const receivedNumber = number.data;
  

    const workerResult = `Result: ${receivedNumber * 2}`; 
    console.log("Posting message back to main script");
    postMessage(workerResult);
  };