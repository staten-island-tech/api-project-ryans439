import './Public/CSS/styles.css'
const URL = "https://developer.clashroyale.com/#/random";
    async function getData(URL){
        const output = await fetch(URL);
        console.log(output);
    }
