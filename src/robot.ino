#include <SoftwareSerial.h>
#include <Servo.h>
#define BT_RX 6
#define BT_TX 7
#define RX 2
#define TX 3
String AP = "Anonymous";       // AP NAME
String PASS = "ngkhuong121203"; // AP PASSWORD
String API = "YKAR7V7UDEUDPBMM";   // Write API KEY
String HOST = "api.thingspeak.com";
String PORT = "80";
int countTrueCommand;
int countTimeCommand; 
boolean found = false; 
int valSensor = 1;
SoftwareSerial esp8266(RX,TX); 
SoftwareSerial BTSerial(BT_RX, BT_TX);
Servo myservo;
String voice;
int rnum, nnum;

void setup() {
  rnum = nnum = 0;
  Serial.begin(9600);
  BTSerial.begin(9600);
  esp8266.begin(115200);
  myservo.attach(9);
  myservo.write(0);
  sendCommand("AT",5,"OK");
  sendCommand("AT+CWMODE=1",5,"OK");
  sendCommand("AT+CWJAP=\""+AP+"\",\""+ PASS +"\"",20,"OK");
}

void executeSend(String command){
  Serial.println(command);
  sendCommand("AT+CIPMUX=1",5,"OK");
  sendCommand("AT+CIPSTART=0,\"TCP\",\""+ HOST +"\","+PORT,15,"OK");
  sendCommand("AT+CIPSEND=0,"+String(command.length()+4),4,">");
  esp8266.println(command);
  delay(1500);
  countTrueCommand++;
  sendCommand("AT+CIPCLOSE=0",5,"OK");  
}

void recycle() {
  myservo.write(180);
  rnum++;
  String getData = "GET /update?api_key="+API+"&field1="+rnum+"&field2="+nnum+"&field3=1";
  executeSend(getData);
}

void nonrecycle() {
  myservo.write(0);
  nnum++;
  String getData = "GET /update?api_key="+API+"&field1="+rnum+"&field2="+nnum+"&field3=1";
  executeSend(getData);
}

void closebin(){
  String getData = "GET /update?api_key="+API+"&field1="+rnum+"&field2="+nnum+"&field3=0";
  executeSend(getData);
}

void loop() {
  while (BTSerial.available()) {
      delay(10);
      char c = BTSerial.read();
      if (c == '*'){
        continue;
      }
      if (c == '#')
      {
        break;
      }
      voice += c;
    }
    if (voice.length() > 0) {
      if (voice == "recyclable")
      {
        recycle() ;
      }
      else if (voice == "non-recyclable")
      {
        nonrecycle() ;
      }
      else if (voice == "close")
      {
        closebin();
      }
      Serial.println(voice);
      voice = "";
    }

  // Keep reading from Arduino Serial Monitor and send to HC-06
  if (Serial.available())
  {
    BTSerial.write(Serial.read());
  }
}

void sendCommand(String command, int maxTime, char readReplay[]) {
  Serial.print(countTrueCommand);
  Serial.print(". at command => ");
  Serial.print(command);
  Serial.print(" ");
  while(countTimeCommand < maxTime)
  {
    esp8266.println(command);//at+cipsend
    if(esp8266.find(readReplay))//ok
    {
      found = true;
      break;
    }
  
    countTimeCommand++;
  }
  
  if(found == true)
  {
    Serial.println("OYI");
    countTrueCommand++;
    countTimeCommand = 0;
  }
  
  if(found == false)
  {
    Serial.println("Fail");
    countTrueCommand = 0;
    countTimeCommand = 0;
  }
  
  found = false;
 }
