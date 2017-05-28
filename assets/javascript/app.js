 var config = {
    apiKey: "AIzaSyBLUszK9jH8zLRhW3tDadkv0s0orhdul3U",
    authDomain: "trainscheduler-e3ed6.firebaseapp.com",
    databaseURL: "https://trainscheduler-e3ed6.firebaseio.com",
    projectId: "trainscheduler-e3ed6",
    storageBucket: "trainscheduler-e3ed6.appspot.com",
    messagingSenderId: "1063253151070"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#clear-btn").on("click", function(event){

	event.preventDefault(); 

	database.ref().set({
		
	});
});

  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	var trainName = $("#train-name-input").val().trim();
  	var trainDestination = $("#destination-input").val().trim();
  	var trainStart = parseInt(moment($("#start-time-input").val().trim(), "HH:mm").format("X"));
  	var trainFrequency = parseInt($("#frequency-input").val().trim());

  	var newArr = [];
  		var currentTime = parseInt(moment().format("X"));

  		console.log(currentTime);

  	for (var i = 0; i < 600; i++) {
  		var nextTime = trainStart + (trainFrequency * 60);
  		trainStart = nextTime;
  		if (nextTime > currentTime){
  			newArr.push(nextTime);
  		}		
  	}

  	console.log(newArr);

  	var nextTrain = newArr[0];

  	console.log(nextTrain);



  	var newTrain = {
  		name: trainName,
  		destination: trainDestination,
  		startTime: trainStart,
  		frequency: trainFrequency,
  		nextTrain: nextTrain
  	};

  	database.ref().push(newTrain);

  	$("#train-name-input").val("");
  	$("#destination-input").val("");
  	$("#start-time-input").val("");
  	$("#frequency-input").val("");
  	newArr = [];


  });


  database.ref().on("child_added", function(childSnapshot, prevChildKey){



  	var trainName = childSnapshot.val().name;
  	var trainDestination = childSnapshot.val().destination;
  	var trainStart = childSnapshot.val().startTime;
  	var trainFrequency = childSnapshot.val().frequency;
  	var nextTrain = childSnapshot.val().nextTrain;


 
  	var minutesRemain = moment.unix(nextTrain, "X").diff(moment(), "minutes");
  	console.log(minutesRemain);

  	$("#currentTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + moment(nextTrain, "X").format("hh:mm a") + "</td><td>" + minutesRemain + "</td></tr>");
  
  	
  })  		
