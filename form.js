const options = {
  "非九龍城區居民": ["非九龍城區居民"],
  "啟德": ["啟德北", "啟德東", "啟德中及南", "", "", ""], 
  "九龍城": ["宋皇臺", "馬坑涌", "馬頭角", "龍城", "太子", "九龍塘", "龍城"], 
  "紅磡": ["黃埔東", "鶴園海逸", "黃埔西", "紅磡灣", "紅磡", "何文田", "嘉道理"], 
  "土瓜灣": ["土瓜灣北", "土瓜灣南", "家維", "愛民", "愛俊", "海心", "樂民", "常樂"], 
};

const allSubdistricts = ["非九龍城區居民",
"啟德北", "啟德東", "啟德中及南", "宋皇臺", "馬坑涌", "馬頭角", "龍城", "太子", "九龍塘"
, "龍城","黃埔東", "鶴園海逸", "黃埔西", "紅磡灣", "紅磡", "何文田", "嘉道理"
, "土瓜灣北", "土瓜灣南", "家維", "愛民", "愛俊", "海心", "樂民", "常樂"];




const insertRecord = () => {
  //const district = $("#district").val();
  const subdistrict = $("#subdistrict").val();
  const suggestion = $("#suggestion").val();
  const ageGroup = parseInt($("#ageGroup").val());
  console.log(firebase);
  const db = firebase.firestore();
  const record = {
    subdistrict: subdistrict,
    suggestion: suggestion,
    ageGroup: ageGroup
  };

  budget.seriesData.forEach(l => {
      record[l[2]] = l[3];
  });
  console.log(record);
  db.collection("results").add(record)
  .then(function(docRef) {
      $('#afterSubmit').modal('show');
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      $('#error').modal('show');
      console.error("Error adding document: ", error);
  });
};



const updateOption = (selectId) => {
  return (evt) => {
    var $el = $(selectId);
    const value = evt.target.value;
    const newOptions = options[value];
    $el.empty(); // remove old options
    $.each(newOptions, (k, v) => {
      $el.append($("<option></option>")
         .attr("value", v).text(v));
    });
  }
};

const updateUIWithBudget = (left) => {
  const usedUp = left  <= 0.0;
  console.log("used", usedUp, budget.currentLeft());
  $("#submit").prop("onclick", null).off("click");
  if (usedUp) {
    $("#submit").click(() => {
      $('#exampleModal').modal('show');
      console.log("clicked");
    })
  } else {
    $("#submit").click(() => {
      $('#notUsedUp').modal('show');
      console.log("clicked");
    })

  }
};


$( document ).ready(() => {
  const evt = new Event('change');
  //$("#district").on("change", updateOption("#subdistrict"));
  //$("#district").get(0).dispatchEvent(evt);
  $("#submit").click(() => {
    $("#notChanged").modal('show');
  });

  $("#confirmSubmit").click(() => {
    insertRecord();
    $('#exampleModal').modal('hide');
  })
});



