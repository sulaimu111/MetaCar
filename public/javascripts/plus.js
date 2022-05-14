let data = "2"; 

if(data == "1"){
    document.getElementById("story").innerHTML = "go to the park";
}
else if(data == "2"){
    document.getElementById("story").innerHTML = "go to the restaurant";
}
else if(data == "3"){
    document.getElementById("story").innerHTML = "go to the school";
}

const commands = {
    'hello': () => {
        console.log("hello");
        document.getElementById("place").src="";
    },
    'go to the park': () => {
        console.log("aaaa");
        document.getElementById("place").src="/images/park.jpg";
    },
    'go to the restaurant': () => {
        console.log("bbbb");
        document.getElementById("place").src="/images/restaurant.jpg";
    },
    'go to the school': () => {
        console.log("cccc");
        document.getElementById("place").src="/images/school.png";
    }
  };
annyang.addCommands(commands);
    
function talk(){
    
    annyang.start();
    document.getElementById("mic_img").style.backgroundColor="red";
    annyang.addCallback('result', function(phrases) {
        // console.log(annyang.isListening())
        // console.log(phrases[0]);
        // console.log(now)
        document.getElementById("audio").innerHTML = phrases[0]

        // setTimeout(()=>{})
        annyang.abort();
        document.getElementById("mic_img").style.backgroundColor="white";

    });
}

fetch('https://randomuser.me/api/')
    .then((response) => {
        console.log(response); 
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
    })



