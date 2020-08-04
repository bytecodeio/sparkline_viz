import sparkline from "@fnando/sparkline";

export const viz = looker.plugins.visualizations.add({
    options: {
        // width: {
        //   label: "Width (px)",
        //   section: "Sparkline",
        //   type: "number",
        //   default: "300"
        // },
        // height: {
        //     label: "Height",
        //     section: "Sparkline",
        //     type: "number",
        //     default: "100"  
        // },
        // headerOffset: {
        //     label: "Header Offset",
        //     section: "Layout",
        //     type: "number",
        //     default: "100"  
        // },
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
    // setHeightAndWidth: function(element, config){
    //      // Sorry, this '46' is just a magic number for accounting for the height of the text in the div.
    //      const available_height = element.offsetHeight - 46;
    //      if (available_height != config.height) {
    //          this.trigger("updateConfig", [{height: available_height}])
    //      }
         
    //      const available_width = element.offsetWidth;
    //      if (available_width != config.height) {
    //          this.trigger("updateConfig", [{width: available_width}])
    //      }
    // },
	create: function(element, config){
		element.innerHTML = `<svg class="sparkline" width="${element.offsetWidth}" height="${element.offsetHeight - 37}" stroke-width="3"></svg>`;
    },
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
        
        // const available_height = element.offsetHeight - 46;
        // if (available_height != config.height) {
        //     this.trigger("updateConfig", [{height: available_height}])
        // }
        
        // const available_width = element.offsetWidth;
        // if (available_width != config.height) {
        //     this.trigger("updateConfig", [{width: available_width}])
        // }

        // Create an option for choosing the measures for sparkline and single values
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
        
        // var header = LookerCharts.Utils.textForCell(data[0][config.headerData])
        // var header = JSON.stringify(data[0][config.sparklineData].value)
        // if (config.sparklineData.fields.dimensions.length == 0) {
        //     this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
        //     return;
        //   }
      
        // Grab the first cell of the data
        var firstRow = data[0];
        var firstCell = firstRow[config.headerData];
        var header = LookerCharts.Utils.htmlForCell(firstCell);

        
        var dataArray = [];
        for(var row of data) {
            	var cell = row[config.sparklineData];
                dataArray.push(parseFloat(LookerCharts.Utils.textForCell(cell).replace(/\D/g,'')));
         }
       
         element.innerHTML = `<div class="headerdiv" style="font-family: Montserrat;height: 36px; font-style: normal; font-weight: normal; font-size: 16px;">${config.top_label}`+
         `<div style="font-size: 24px; font-weight: bolder;">${header}</div></div>`+
         `<svg class="sparkline" width="${element.offsetWidth}" height="${element.offsetHeight - 16}" stroke-width="${config.strokeWidth}"`+
         ` stroke="${config.stroke}"  fill="${config.fill}"></svg>`;
    
       
         sparkline(document.querySelector(".sparkline"), dataArray);
		doneRendering()
	}
});