import sparkline from "@fnando/sparkline";

export const viz = looker.plugins.visualizations.add({
    options: {
        width: {
          label: "Width (px)",
          section: "Sparkline",
          type: "number",
          default: "300"
        },
        height: {
            label: "Height",
            section: "Sparkline",
            type: "number",
            default: "100"  
        },
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
	create: function(element, config){
		element.innerHTML = "<svg class=\"sparkline\" width=\"100\" height=\"30\" stroke-width=\"3\"></svg>";
	},
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
        
        // const available_height = element.offsetHeight;

        // if (available_height != config.height) {
        //     this.trigger("updateConfig", [{height: available_height}])
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

        element.innerHTML = `<div style="line-height: 0.4;font-family: Verdana, Geneva, sans-serif;"><h3 class="sparklineTitle">${config.top_label}</h3>`+
            `<h1 styles={z-index: 10}>${header}</h1></div>`+
            `<svg class="sparkline" width="${config.width}" height="${config.height}" stroke-width="${config.strokeWidth}"`+
            ` stroke="${config.stroke}"  fill="${config.fill}"></svg>`;
        
        var dataArray = [];
        for(var row of data) {
            	var cell = row[config.sparklineData];
                dataArray.push(LookerCharts.Utils.textForCell(cell)*1);
         }
        sparkline(document.querySelector(".sparkline"), dataArray);
		doneRendering()
	}
});