// https://teachablemachine.withgoogle.com/models/BsA3wMBQb/

prediction1 = "";
prediction1 = "";

Webcam.set({
    width: 350,
    height: 300,
    img_format: "jpeg",
    jpeg_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = "<img id='captured_img' src= '" + data_uri + "'/>";
    });
};

console.log("ml5 version: " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/BsA3wMBQb/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speakData1 = "The first prediction is " + prediction1;
    speakData2 = "The second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
 if(error)
 {
     console.error(error);
 }
 else
 {
     console.log(results);
     prediction1 = results[0].label;
     prediction2 = results[1].label;

     document.getElementById("result_emotion_name").innerHTML = prediction1;
     document.getElementById("result_emotion_name2").innerHTML = prediction2;
     speak();
 }

 if(prediction1 == "Happy")
 {
     document.getElementById("update_emoji").innerHTML = "&#128512;";
 }
 if(prediction1 == "Sad")
 {
     document.getElementById("update_emoji").innerHTML = "&#128532;";
 }
 if(prediction1 == "Angry")
 {
     document.getElementById("update_emoji").innerHTML = "&#128545;";
 }

 if(prediction2 == "Happy")
 {
     document.getElementById("update_emoji2").innerHTML = "&#128512;";
 }
 if(prediction2 == "Sad")
 {
     document.getElementById("update_emoji2").innerHTML = "&#128532;";
 }
 if(prediction2 == "Angry")
 {
     document.getElementById("update_emoji2").innerHTML = "&#128545;";
 }
}