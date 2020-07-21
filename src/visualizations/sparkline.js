import sparkline from "@fnando/sparkline";

export const viz = looker.plugins.visualizations.add({
    options: {
        width: {
          label: "Width",
          section: "Layout",
          type: "number",
          default: "300"
        },
        // height: {
        //     label: "Height",
        //     section: "Layout",
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
          section: "Layout",
          type: "string",
          label: "Label (for top)",
          placeholder: "My Great Chart"
        }
    },
	create: function(element, config){
		element.innerHTML = "<svg class=\"sparkline\" width=\"100\" height=\"30\" stroke-width=\"3\"></svg>";
	},
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
        
        const height1 = element.offsetHeight;


        // if (height1 != config.height) {
        //     this.trigger("updateConfig", [{height: height1}])
        // }

        
        // Create an option for each measure in your query
        let values = queryResponse.fields.measures.map((field) => {
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

        
        // let options = this.options
        // Create an option for each measure in your query
        // queryResponse.fields.measure_like.forEach(function(field) {
        //   let id = "color_" + field.name
        //   options[id] =
        //   {
        // label: "Based on " +field.label_short,
        // default: "no",
        // section: "Style",
        // type: "string",
        // display: "color"
        //   }
        // })
        // this.trigger('registerOptions', options) // register options with parent page to update visConfig

        element.innerHTML = `<h1 class="sparklineTitle"><center>${config.top_label}${JSON.stringify(options)}</center></h1>`+
        `<center><svg class="sparkline" width="${config.width}" height="${height1}" stroke-width="${config.strokeWidth}"`+
        ` stroke="${config.stroke}"  fill="${config.fill}"></svg></center>`;
        
        // values: [
        //     {"Center": "c"},
        //     {"Left": "l"},
        //     {"Right": "r"}
        // ]
       
        var dataArray = [];
        for(var row of data) {
            	var cell = row[config.sparklineData];
                dataArray.push(LookerCharts.Utils.textForCell(cell)*1);
         }
        sparkline(document.querySelector(".sparkline"), dataArray);
		doneRendering()
	}
});