import sparkline from "@fnando/sparkline";

function findClosest(target, tagName) {
    if (target.tagName === tagName) {
      return target;
    }
  
    while ((target = target.parentNode)) {
      if (target.tagName === tagName) {
        break;
      }
    }
  
    return target;
  }

var sparkline_options = {
    onmousemove(event, datapoint) {
      var svg = findClosest(event.target, "svg");
      var tooltip = svg.nextElementSibling;
      var date = (new Date(datapoint.date)).toUTCString().replace(/^.*?, (.*?) \d{2}:\d{2}:\d{2}.*?$/, "$1");
  
  
      tooltip.hidden = false;
      tooltip.textContent = `${date}: $${datapoint.value.toFixed(2)} USD`;
      tooltip.style.top = `${event.offsetY}px`;
      tooltip.style.left = `${event.offsetX + 20}px`;
    },
  
    onmouseout() {
      var svg = findClosest(event.target, "svg");
      var tooltip = svg.nextElementSibling;
  
      tooltip.hidden = true;
    }
  };
  

export const viz = looker.plugins.visualizations.add({
    options: {
          stroke: {
          section: "Sparkline",
          type: "array",
          label: "Stroke color",
          display: "color",
          default: ["#353b49"]
        },
        strokeWidth: {
            label: "Stroke width",
            section: "Sparkline",
            type: "number",
            default: "3"  
        },
        fill: {
            section: "Sparkline",
            type: "array",
            label: "Fill color",
            display: "color"
        },
        top_label: {
          section: "Header",
          type: "string",
          label: "Label (for top)",
          placeholder: "My Great Chart"
        }
    },
	create: function(element, config){
		element.innerHTML = `<svg class="sparkline" width="${element.offsetWidth}" height="${element.offsetHeight - 37}" stroke-width="3"></svg>`;
    },
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
        
        let values = queryResponse.fields.measure_like.map((field) => {
            let key =    field.label
            let value =  field.name
            return {[key]: value}
        })
        let options = this.options;
        options["sparklineData"] =
        {
            section: "Sparkline",
            type: "string",
            label: "Measure for Sparkline",
            display: "select",
            values: values
        }
        options["headerData"] =
        {
            section: "Header",
            type: "string",
            label: "Measure for Header",
            display: "select",
            values: values,
        }
        if (config.sparklineData == null) {
            this.trigger('registerOptions', options) // register options with parent page to update visConfig
        }
        
    
        // Grab the first cell of the data
        var firstRow = data[0];
        var firstCell = firstRow[config.headerData];
        var header = LookerCharts.Utils.htmlForCell(firstCell);
        
        var dataArray = [];
        for(var row of data) {
            	var cell = row[config.sparklineData];
                dataArray.push(parseFloat(LookerCharts.Utils.textForCell(cell).replace(/\D/g,'')));
         }

        //  Montserrat:
        //  https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2);}'+
         
        var styleEl = document.createElement('style');
        styleEl.setAttribute('type',"text/css")
        styleEl.innerHTML = '@font-face '+
          '{font-family: Open Sans;'+
            'src: url( https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2 );}'+
          'div {font-family: Open Sans;};'


         document.head.appendChild(styleEl);
         element.innerHTML = `
         
         <div class="headerdiv" style="height: 36px; font-style: normal; font-weight: 300; font-size: 16px;">
         ${config.top_label}
         <div style="font-size: 24px; font-weight: bolder;">${header}</div></div>
         <svg class="sparkline" width="${element.offsetWidth}" height="${element.offsetHeight - 16}" stroke-width="${config.strokeWidth}"
          stroke="${config.stroke}"  fill="${config.fill}"></svg>`;
    
       
         sparkline(document.querySelector(".sparkline"), dataArray, sparkline_options);
		doneRendering()
	}
});