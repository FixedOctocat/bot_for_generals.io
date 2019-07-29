//attackable
//selectable

// attackable large
//red general selected selectable large
//fog large
//fog obstacle large
//mountain large
//red neutral selected selectable large
//red neutral attackable selectable large
//red neutral selectable large
// city large
// city attackable large
//red city selected selectable large

//large
//city large
//"color" general
//neutral
//mountain large

function sleep(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}
}

class Point {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class Bot {
  constructor() {
    this.prev_step = "";
    this.map = [];
    this.map_object_units = []
    this.unit_number = 0;
    this.general = new Point();
    this.last_move = new Point();
    this.W = 87;
    this.A = 65;
    this.S = 83;
    this.D = 68;
  }

  print() {
    alert(this.prev_step);
  }

  simulateKey(keyCode, type) {
    var evtName = (typeof(type) === "string") ? "key" + type : "keydown";

	  var event = document.createEvent("HTMLEvents");
	  event.initEvent(evtName, true, false);
 	  event.keyCode = keyCode;
	  document.dispatchEvent(event);
  }

  get_map() {
    var tableObj = document.getElementById("map");
    var allTRs = tableObj.getElementsByTagName("tr");

    for(var trCounter = 0; trCounter < allTRs.length; trCounter++)
    {
      var tmpArr = [];
      var tmpArr_obj = [];
      var allTDsInTR = allTRs[trCounter].getElementsByTagName("td");
      var object_type = allTRs[trCounter].getElementsByTagName("td");

      for(var tdCounter = 0; tdCounter < allTDsInTR.length; tdCounter++)
      {
        tmpArr.push([allTDsInTR[tdCounter].className]);
        tmpArr_obj.push([allTDsInTR[tdCounter].InnerText]);

        if(allTDsInTR[tdCounter].className == "red general selected selectable large")
        {
          this.general.x = trCounter;
          this.general.y = tdCounter;
        }
      }

      this.map_object_units.push(tmpArr_obj);
      this.map.push(tmpArr);
    }

    return this.map, this.general;
  }

  start() {
    this.map_init();
    var next_move = 0;

    for(var i = 0; i < 100; i++) {
      alert(next_move);
      sleep(2000);
      next_move = this.simulate_move();

      

      this.get_map();
    }
  }

  map_init() {
    var tableObj = document.getElementById("map");
    var allTRs = tableObj.getElementsByTagName("tr");

    for(var trCounter = 0; trCounter < allTRs.length; trCounter++)
    {
      var tmpArr = [];
      var tmpArr_obj = [];
      var allTDsInTR = allTRs[trCounter].getElementsByTagName("td");
      var object_type = allTRs[trCounter].getElementsByTagName("td");

      for(var tdCounter = 0; tdCounter < allTDsInTR.length; tdCounter++)
      {
        tmpArr.push([allTDsInTR[tdCounter].className]);
        tmpArr_obj.push([allTDsInTR[tdCounter].InnerText]);

        if(allTDsInTR[tdCounter].className == "red general selected selectable large")
        {
          this.general.x = trCounter;
          this.general.y = tdCounter;

          this.last_move.x = this.general.x;
          this.last_move.y = this.general.y;
        }
      }

      this.map_object_units.push(tmpArr_obj);
      this.map.push(tmpArr);
    }

    return this.map, this.general;
  }

  simulate_move() {
    var sum = 0;
    var sum_w = 0;
    var sum_a = 0;
    var sum_s = 0;
    var sum_d = 0;

    if(this.check_move("W")) {
      if(this.last_move.y - 2 < 0){
        if(this.last_move.x - 1){
          var box_1_w = [this.map[this.last_move.x - 1][this.last_move.y - 2], this.map_object_units[this.last_move.x - 1][this.last_move.y - 2]];
          var box_2_w = [this.map[this.last_move.x][this.last_move.y - 2], this.map_object_units[this.last_move.x][this.last_move.y - 2]];
          var box_3_w = [this.map[this.last_move.x - 1][this.last_move.y - 2], this.map_object_units[this.last_move.x - 1][this.last_move.y - 2]];
          var box_w = [this.map[this.last_move.x][this.last_move.y - 1], this.map_object_units[this.last_move.x][this.last_move.y - 1]];

          sum_w = this.summary_efficient(box_1_w, box_2_w, box_3_w, box_w);
          //alert(sum_w);
        }
      }
    }

    if(this.check_move("A")) {
      if(this.last_move.x - 2 < 0){
        if(this.last_move.y - 1 < 0){
            var box_1_a = [this.map[this.last_move.x - 2][this.last_move.y - 1], this.map_object_units[this.last_move.x - 2][this.last_move.y - 1]];
            var box_2_a = [this.map[this.last_move.x - 2][this.last_move.y], this.map_object_units[this.last_move.x - 2][this.last_move.y]];
            var box_3_a = [this.map[this.last_move.x - 2][this.last_move.y + 1], this.map_object_units[this.last_move.x - 2][this.last_move.y + 1]];
            var box_a = [this.map[this.last_move.x - 1][this.last_move.y], this.map_object_units[this.last_move.x - 1][this.last_move.y]];

            sum_a = this.summary_efficient(box_1_a, box_2_a, box_3_a, box_a);
            //alert(sum_a);
          }
        }
    }

    if(this.check_move("S")) {
      if(this.last_move.y + 2){
        var box_1_s = [this.map[this.last_move.x - 1][this.last_move.y + 2], this.map_object_units[this.last_move.x - 1][this.last_move.y + 2]];
        var box_2_s = [this.map[this.last_move.x][this.last_move.y + 2], this.map_object_units[this.last_move.x][this.last_move.y + 2]];
        var box_3_s = [this.map[this.last_move.x + 1][this.last_move.y + 2], this.map_object_units[this.last_move.x + 1][this.last_move.y + 2]];
        var box_s = [this.map[this.last_move.x][this.last_move.y + 1], this.map_object_units[this.last_move.x][this.last_move.y + 1]];

        sum_s = this.summary_efficient(box_1_s, box_2_s, box_3_s, box_s);
        //alert(sum_s);
      }
    }

    if(this.check_move("D")) {
      var box_1_d = [this.map[this.last_move.x + 2][this.last_move.y - 1], this.map_object_units[this.last_move.x + 1][this.last_move.y - 1]];
      var box_2_d = [this.map[this.last_move.x + 2][this.last_move.y], this.map_object_units[this.last_move.x + 1][this.last_move.y]];
      var box_3_d = [this.map[this.last_move.x + 2][this.last_move.y + 1], this.map_object_units[this.last_move.x + 1][this.last_move.y + 1]];
      var box_d = [this.map[this.last_move.x + 1][this.last_move.y], this.map_object_units[this.last_move.x + 1][this.last_move.y]];

      sum_d = this.summary_efficient(box_1_d, box_2_d, box_3_d, box_d);
      //alert(sum_d);
    }
    /*alert("W");
    alert(sum_w);
    alert("A");
    alert(sum_a);
    alert("S");
    alert(sum_s);
    alert("D");
    alert(sum_d);
*/
    var max = Math.max(sum_w, sum_a, sum_s, sum_d);

    if(sum_w == max){
      return this.W;
    }else if(sum_a == max){
      return this.A;
    }else if(sum_s == max){
      return this.S;
    }else{
      return this.D;
    }

    return 0;
  }

  check_move(move) {
    if(move == "A") {
      if(this.last_move.y - 1 < 0) {

        return false;
      }else{
        if(this.last_move.y - 2 < 0) {
          return false;
        }


        if(this.map[this.last_move.x][this.last_move.y - 1] == "mountain large"){
        return false;
      }else if(this.map[this.last_move.x][this.last_move.y - 1] == "city large"){
        if(this.map_object_units[this.last_move.x][this.last_move.y - 1] >= this.unit_number) {
          return false;
        }
      }else{
      return true;
    }
    }
  }

    if(move == "W") {
      if(this.last_move.x - 1 < 0) {
        return false;
      }else{
        if(this.last_move.x - 2 < 0) {
          return false;
        }

        if(this.map[this.last_move.x - 1][this.last_move.y] == "mountain large"){
        return false;
      }else if(this.map[this.last_move.x - 1][this.last_move.y] == "city large"){
        if(this.map_object_units[this.last_move.x - 1][this.last_move.y] >= this.unit_number) {
          return false;
        }
      }else{
      return true;
    }
    }
  }

    if(move == "D") {
      if(this.last_move.y + 1 > this.map.length) {
        return false;
      }else{
        if(this.last_move.y + 2 > this.map.length) {
          return false;
        }

        if(this.map[this.last_move.x][this.last_move.y + 1] == "mountain large"){
        return false;
      }else if(this.map[this.last_move.x][this.last_move.y + 1] == "city large"){
        if(this.map_object_units[this.last_move.x][this.last_move.y + 1] >= this.unit_number) {
          return false;

      }
      }else{
      return true;
    }
    }
  }

    if(move == "S") {
      if(this.last_move.x + 1 > this.map.length) {
        return false;
      }else{
        if(this.last_move.x + 2 > this.map.length) {
          return false;
        }

        if(this.map[this.last_move.x + 1][this.last_move.y] == "mountain large"){
        return false;
      }else if(this.map[this.last_move.x + 1][this.last_move.y] == "city large"){
        if(this.map_object_units[this.last_move.x + 1][this.last_move.y] >= this.unit_number) {
          return false;
        }
      }else{
      return true;
    }
    }
  }

    return false;
  }

  summary_efficient(box1, box2, box3, main_box) {
    var sum = 0;

    if(main_box[0] == " attackable large") {
      sum += 5;
    }else if(main_box[0] == "red neutral attackable selectable large") {
      sum += 3;
    }else if(main_box[0] == " city attackable large") {
      sum += 8;
    }else if(main_box[0] == "red city attackable selectable large") {
      sum += 4;
    }

    if(box1[0] == "fog large") {
      sum += 2;
    }else if(box1[0] == "fog obstacle large") {
      sum += 4;
    }else if(box1[0] == "red neutral selectable large") {
      sum += 6;
    }else if(box1[0] == " city large") {
      sum += 9;
    }else if(box1[0] == "red city selectable large") {
      sum += 5;
    }

    if(box2[0] == "fog large") {
      sum += 2;
    }else if(box2[0] == "fog obstacle large") {
      sum += 4;
    }else if(box2[0] == "red neutral selectable large") {
      sum += 6;
    }else if(box2[0] == " city large") {
      sum += 9;
    }else if(box2[0] == "red city selectable large") {
      sum += 5;
    }

    if(box3[0] == "fog large") {
      sum += 2;
    }else if(box3[0] == "fog obstacle large") {
      sum += 4;
    }else if(box3[0] == "red neutral selectable large") {
      sum += 6;
    }else if(box3[0] == " city large") {
      sum += 9;
    }else if(box3[0] == "red city selectable large") {
      sum += 5;
    }
    //alert(sum);
    return sum;
  }
}

let bot = new Bot();
