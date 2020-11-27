getPercentageText = (value, total) => {
  return (value / total * 100.0).toFixed(1) + " %";
}

class BudgetItems {
    constructor(seriesData) {
        this.seriesData = Array.from(seriesData);

        this.seriesData.forEach( v => {
            v[3] = parseFloat(v[3]);

        });

        this.originalSeriesData = Array.from(this.seriesData);
        this.maxDepth = Math.max(... this.originalSeriesData.filter(item => ! Number.isNaN(item[1])).map(item => item[1]));
        this.originalTotal = this.sum(this.originalSeriesData);
    }

    sum(items) {
        var result = items.filter(i => i[1] == 2).map(s => s[3]);
        result = result.reduce((a, b) => a + b, 0);
        return result;
    }

    currentLeft() {
      return this.sum(this.originalSeriesData) - this.sum(this.seriesData);
    }

    currentSum() {
      return this.sum(this.seriesData);
    }

    getItemOriginalAmount(itemName, budget) {
        return this.originalSeriesData.find(e => e[2] == itemName)[3];
    }

    getItemCurrentAmount(itemName, budget) {
        return this.seriesData.find(e => e[2] == itemName)[3];
    }

    updateParentSum() {
      const parentSum = {};
        this.seriesData.forEach(item => {
          const v = item[3];
          if (item[1] == 2) {
            const key = item[0];
            
            const oldValue = parentSum[key] || 0.00;
            parentSum[key] = oldValue + v;
          }
        });
        this.seriesData.forEach(item => {
          if (item[1]  == 1) {
            item[3] = parentSum[item[2]];
            console.log(item);
          }
        });
        console.log(parentSum);
    }

    updateItem(itemName, budget) {
        this.seriesData.forEach(item => {
          if (item) {
            if (itemName == item[2]) {
              item[3] = parseFloat(budget);
            }
          }
        });

        this.updateParentSum();
    }

    get leafs() {
        return this.seriesData.filter(item => item[1] == this.maxDepth);
    }

}

var uploadedDataURL = "https://gist.githubusercontent.com/howawong/d55e084cb56dfc8a6ca9b8d31be3b22e/raw/e879dc6a28ac8780025618807ea21068827eb5f6/kc.csv";
var budget = null;



function explode(str, maxLength) {
    var buff = "";
    var numOfLines = Math.floor(str.length/maxLength);
    for(var i = 0; i<numOfLines+1; i++) {
        buff += str.substr(i*maxLength, maxLength); if(i !== numOfLines) { buff += "\n"; }
    }
    return buff;
}

window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};





updateCurrentTotal = budget => {
  var originaltotal = $("#originaltotal");
  var budgetleft = $("#budgetleft");
  var currenttotal = budget.sum(budget.seriesData);
  var budgetleftValue = budget.originalTotal - currenttotal;
  originaltotal.html(Math.round(budget.originalTotal, 0));
  budgetleft.html(Math.round(budgetleftValue, 0));
  $("input[type='range']").each((i, ele) => {
    var originalItemAmount = budget.getItemOriginalAmount(ele.id);
    ele.max = budgetleftValue + originalItemAmount;
  });

  $("span[class='pct']").each((i, ele) => {
    const field = ele.getAttribute("field");
    var itemAmount = budget.getItemCurrentAmount(field);
    ele.innerText = getPercentageText(itemAmount,  currenttotal);
  });

  $("span[class='amt']").each((i, ele) => {
    const field = ele.getAttribute("field");
    var itemAmount = budget.getItemCurrentAmount(field);
    ele.innerText = itemAmount;
  });
  updateUIWithBudget(budgetleftValue);
}

seriesDataToRoot = seriesData => {
  var stratify2 = d3.stratify()
  .parentId(function(d) {  return d[0]; })
  .id(function(d) { return d[2]; })
  return stratify2(seriesData)
  .sum(function(d) {
    return d[3];
  })
  .sort(function(a, b) {
    return b[3] - a[3];
  });
}


const autoFontSize = () => {
  let width = document.getElementById('container').offsetWidth;
  return (width>=600) ? '24' : '14';
};

updateBudget = (root, seriesData) => {
  function renderItem(params, api) {
      var context = params.context;
      const vw = Math.max(api.getWidth(), 0);
      if (!context.layout) {
          d3.pack()
              .size([vw , vw])
              .padding(0)(root);

          context.layout = {};
          root.descendants().forEach(function (node) {
              context.layout[node.id] = {
                  x: node.x,
                  y: node.y,
                  r: node.r,
                  isLeaf: !node.children || !node.children.length,
                  isRoot: node.depth == 0,
                  depth: node.depth
              };
          });
      }

      var nodePath = api.value(2);
      var parentNodePath = api.value;
      var itemLayout = context.layout[nodePath];
      var nodeName = '';
      var textFont = api.font({
          fontSize: 20,
          fontFamily: 'Arial'
      });

      if (itemLayout.isLeaf && itemLayout.r > 1) {
          nodeName = nodePath.slice(nodePath.lastIndexOf('.') + 1).split(/(?=[A-Z][^A-Z])/g).join('\n');
          if (nodeName.length > 8) {
            nodeName = explode(nodeName, 6)
          }
          //nodeName = echarts.format.truncateText(nodeName, itemLayout.r, textFont, '.');
      }

      if (itemLayout.isRoot) {
          return null;
      }
     
      var fills = ["rgba(252, 226, 5, 0.8)", "rgba(255, 0.0, 0.0, 0.5)"];
      var fillEmphasis = ["rgba(252, 226, 5, 0.3)", "rgba(255, 0.0, 0.0, 0.3)"];
      const nodeNameShort = itemLayout.r < 50 ? nodeName.substring(0,2) : nodeName; 
      return {
          type: 'circle',
          shape: {
              cx: itemLayout.x,
              cy: itemLayout.y,
              r: itemLayout.r,
          },



          z2: api.value(1) * 2,
          style: api.style({
              fill: fills[itemLayout.depth - 1],
              text: nodeNameShort,
              textFont: textFont,
              textPosition: 'inside',
              fontSize: autoFontSize(),
              stroke: 'rgba(255,0,0,0.0)',
              alignTo: 'labelLine',
          }),
          styleEmphasis: api.style({
              text: nodeName,
              fill: fillEmphasis[itemLayout.depth - 1],
              textPosition: 'inside',
              textFont: textFont,
              fontSize: autoFontSize() * 1.2,
              lineWidth: 3
          })
      };
  }
  var option = {
        xAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false},
            splitLine: {show: false}
        },
        yAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false},
            splitLine: {show: false}
        },
        tooltip : {
            showDelay : 0,
            formatter : function (params) {
                  return ""
                    + params.value[2] + '<br/>' 
                    + params.value[3] + " HKD";
            
            }
        },
        series: {
            type: 'custom',
            renderItem: renderItem,
            encode: {
                tooltip: 0,
                itemName: 2
            },
            data: seriesData,
        }
    };
    var main = document.getElementById("container");
    myChart = echarts.init(main);
    myChart.setOption(option);
    window.onresize = function() {
      myChart.resize();
    };
}


d3.csv(uploadedDataURL).then(rawData => {
    var stratify = d3.stratify()
    .parentId(function(d) {  return d.item; })
    .id(function(d) { return d.subitem; });
    //if (error) throw error;

    var root = stratify(rawData)
        .sum(function(d) {
            return d.a;
        })
        .sort(function(a, b) {
            return b.a - a.a;
        });
    var maxDepth = 0;
    var seriesData = root.descendants().map(function (node) {
      maxDepth = Math.max(maxDepth, node.depth);
      return [
        node.data.item,
        node.depth,
        node.id,
        node.data.a,
        node.data.item
      ];
    });

    budget = new BudgetItems(seriesData);
    budget.updateParentSum();
    updateBudget(root, seriesData);

    
    return budget;
}).then(budget => {
    $('#tabcontainer a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
    var originaltotal = $("#originaltotal");
    var budgetleft = $("#budgetleft");
    var currenttotal = budget.sum(budget.seriesData);
    originaltotal.html(Math.round(budget.originalTotal, 0));
    budgetleft.html(Math.round(budget.originalTotal - currenttotal, 0));
    //var container = $("#slidecontainer");
    //container.empty();
    var tabs = {"區議會大會一般開支": "general", "大會其他開支": "special", "委員會預算": "committee", "九龍城區議會核下委員會": "committee2", "社區參與活動": "longterm"};
    var disabled = ["聘請九龍城區議會合約員工"];
    budget.leafs.forEach( leaf => {
      var value = leaf[3];
      var containerId = tabs[leaf[0]];
      var title = leaf[2];

      if (value > 0.0 && containerId != undefined) {
        var container = $("#" + containerId + "_range");
        var pctSpan = $("<span/>", {
           id:  "pct_" + title,
           field: title,
           class: "pct",
           html:  getPercentageText(value, currenttotal)
        });
        var amtSpan = $("<span/>", {
           id:  "amt_" + title,
           field: title,
           class: "amt",
           html:  value
        });
        var range = $( "<input/>", {
          "type": "range",
          "min": 0,
          "max": value,
          "id": title,
          "value": value,
          "class": "input-range",
          "disabled": disabled.find(e => e == title),
          on: {
            change: (evt) => {
                budget.updateItem(evt.target.id, evt.target.value);
                updateCurrentTotal(budget);
                var root = seriesDataToRoot(budget.seriesData);
                updateBudget(root, budget.seriesData);
            }
          }
        });
        var p = $("<p/>", {
          html: title
        });
        p.append(pctSpan);
        p.append(amtSpan);
        p.append("元");
        var div = $("<div/>", {
        });
        div.append(p);
        const descDivID = "#desc_" + title.replace("(", "").replace(")", "");
        
        div.append(range);
        $(descDivID).contents().appendTo(div);
        container.append(div);
        //container.append(div2);
      }
    });
    
});