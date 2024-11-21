console.log("start");
setTimeout(() => {
    console.log("Timer")
}, 3000);

console.log("end");

//this code will skip the timer because it takes too long and prints "start", "end", and then "timer". This is because the timer takes too long, the javascript 
// wants to skip it and go back to it after.
// to prevent this, you use promises. Essentially this means that you tell the code that you will print end, after the timer is over.


//start
//wait 3 sec Timer
// end

//start
//end
//wait 3 seconds Timer

//if you wait 3 secs, timer and end will print\



function greet(name) {
    const greetPromise = new fetch(function (resolve, reject) {
        resolve(`Hello ${name}`);
    });
    return greetPromise;
}