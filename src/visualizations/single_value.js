const formatCurrency = (value) => {
  value = Math.round(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatNumber = (value, precision) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(value);
};

const formatLargeNumber = (value, isCurrency) => {
  const absValue = Math.abs(value);
  let newValue = '';
  if (absValue >= 1e9) {
    newValue = (value / 1e9).toFixed(1) + 'B';
  } else if (absValue >= 1e6) {
    newValue = (value / 1e6).toFixed(1) + 'M';
  } else if (absValue >= 1e3) {
    newValue = (value / 1e3).toFixed(1) + 'K';
  } else {
    newValue = value.toString();
  }
  if (isCurrency) {
    newValue = '$' + newValue;
  }
  return newValue;
};

const sharedStyles = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');
#vis {
  margin: 0 !important;
}
.headerdiv {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
}
.large-number {
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.small-number {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.comparison-box {
  font-family: 'Inter', sans-serif;
  background: white;
  border-radius: 3px;
  padding: 5px 10px;
  display: inline-block;
  border: 1px solid white;
  align-self: flex-start;
}
.flex-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.flex-item {
  margin: 10px 0;
}
</style>
`;

export const viz = looker.plugins.visualizations.add({
  options: {
    top_label: {
      section: "Header",
      type: "string",
      label: "Label (for top)",
      placeholder: "My Great Chart"
    },
    precision: {
      section: "Header",
      type: "number",
      label: "Percent Change Precision",
      default: 2
    },
    isCurrency: {
      section: "Header",
      type: "boolean",
      label: "Is Currency?",
      default: false
    },
    units: {
      section: "Header",
      type: "string",
      label: "Units",
      default: ""
    },
    useSecondRowForComparison: {
      section: "Header",
      type: "boolean",
      label: "Use Second Row for Comparison",
      default: false
    },
    positiveBackgroundColor: {
      section: "Header",
      type: "string",
      label: "Positive Background Color",
      default: "#d4edda" // light green
    },
    negativeBackgroundColor: {
      section: "Header",
      type: "string",
      label: "Negative Background Color",
      default: "#f8d7da" // light red
    },
    positiveComparisonColor: {
      section: "Header",
      type: "string",
      label: "Positive Comparison Color",
      default: "#4d9b60" // default positive color
    },
    negativeComparisonColor: {
      section: "Header",
      type: "string",
      label: "Negative Comparison Color",
      default: "#d9534f" // default negative color
    },
    largeNumberFontSize: {
      section: "Font Sizes",
      type: "number",
      label: "Large Number Font Size",
      default: 36
    },
    smallNumberFontSize: {
      section: "Font Sizes",
      type: "number",
      label: "Small Number Font Size",
      default: 16
    },
    comparisonFontSize: {
      section: "Font Sizes",
      type: "number",
      label: "Comparison Font Size",
      default: 18
    },
    smallLargeNumberFontSize: {
      section: "Font Sizes",
      type: "number",
      label: "Small Large Number Font Size",
      default: 16
    },
    smallSmallNumberFontSize: {
      section: "Font Sizes",
      type: "number",
      label: "Small Small Number Font Size",
      default: 12
    },
    smallComparisonFontSize: {
      section: "Font Sizes",
      type: "number",
      label: "Small Comparison Font Size",
      default: 12
    },
  },
  create: function (element, config) {
    element.innerHTML = sharedStyles;
    element.style.margin = '0';
    element.style.padding = '0';
  },
  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
    this.data = data;
    this.queryResponse = queryResponse;
    this.details = details;
    this.doneRendering = doneRendering;
    // Listen to resize events
    window.addEventListener('resize', () => {
      this.updateAsync(this.data, element, config, this.queryResponse, this.details, this.doneRendering);
    });

    let values = queryResponse.fields.measure_like.map((field) => {
      let key = field.label
      let value = field.name
      return { [key]: value }
    })
    let firstDimension = queryResponse.fields.dimensions[0].name;
    let options = this.options;
    
    options["headerData"] =
    {
      section: "Header",
      type: "string",
      label: "Measure for Header",
      display: "select",
      values: values,
    }
    options["comparisonData"] =
    {
      section: "Header",
      type: "string",
      label: "Measure for Comparison",
      display: "select",
      values: values,
    }


    // if (config.sparklineData == null) {
      this.trigger('registerOptions', options) // register options with parent page to update visConfig
    // }


    // Grab the header cell
    var headerRow = config.last ? data[data.length - 1] : data[0];
    var headerCell = headerRow[config.headerData];
    
    var headerValue = Number(headerCell?.value) || 0;
    var header = rounder(headerValue, 0) || '';
    if(isNaN(header)){
      header = headerCell.value;
    } else {
      header = formatNumber(Math.round(Number(header)),0);
    }
    if (config.isCurrency) {
      header = formatCurrency(headerValue);
    }

    var largeHeader = formatLargeNumber(headerValue, config.isCurrency);

    // Grab the comparison cell
    var comparisonRow = config.useSecondRowForComparison ? data[1] : (config.last ? data[data.length - 1] : data[0]);
    var comparisonCell = comparisonRow[config.comparisonData];
    console.log(comparisonCell)
    var comparisonValue = comparisonCell?.value || '';
    if (typeof comparisonValue === 'string' && comparisonValue.endsWith('%')) {
      comparisonValue = comparisonValue.slice(0, -1);
    }
    var comparison = rounder(100*Number(comparisonValue) || 0, config.precision || 0);
    const arrow = comparison >0 ? '↑':'↓';
    var comparisonColor = 'black';
    var backgroundColor = 'white';
    var comparisonClass = '';
    if(isNaN(comparison)){
        comparison = comparisonCell.value;
    } else {
      backgroundColor = comparison >= 0 ? config.positiveBackgroundColor : config.negativeBackgroundColor;
      comparisonColor = comparison >= 0 ? config.positiveComparisonColor : config.negativeComparisonColor;
      comparison = comparison > 0 ? formatNumber(comparison, config.precision || 0) : '-' + formatNumber(comparison, config.precision || 0);
    }

    // Function to adjust font size
    function adjustFontSize(element, maxFontSize) {
      let fontSize = maxFontSize;
      element.style.fontSize = fontSize + 'px';
      while (element.scrollWidth > element.clientWidth && fontSize > 0) {
        fontSize -= 1;
        element.style.fontSize = fontSize + 'px';
      }
    }
 


// Constants
const topLabelHeight = 38; // px, observed height of the top label

// Function to estimate header height based on font size
function estimateHeaderHeight(headerFontSize) {
  // These observed values are based on the Montserrat font
  const observedHeaderFontSize = 48; // px
  const observedHeaderHeight = 65.71; // px
  return (headerFontSize / observedHeaderFontSize) * observedHeaderHeight;
}

    element.innerHTML = `
      <div class="flex-container" style="background-color: ${backgroundColor}; border-radius: 10px; padding: 20px; ">
        <div class="headerdiv flex-item" style=" font-style: normal; font-weight: 300; font-size: 16px;">${config.top_label}</div>
        <div class="middle_flexbox_div flex-item">
          <div class="large-number" style="font-size: 36px;">${largeHeader} ${config.units || ''}</div>
          <div class="small-number">${header} ${config.units || ''}</div>
        </div>
        <div class="comparison-box flex-item" style="font-size: ${config.comparisonFontSize}px; font-weight: bolder; color:${comparisonColor}; background: white; display: inline-block; border-radius: 3px; padding: 5px 10px; align-self: flex-start;">${arrow} ${comparison}%</div>
      </div>
    `;

    // Ensure the Inter font is loaded
    var styleEl = document.createElement('style');
    styleEl.setAttribute('type', "text/css");
    styleEl.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');
      .headerdiv, .large-number, .small-number, .comparison-box {
        font-family: 'Inter', sans-serif;
      }
        ${sharedStyles}
    `;
    document.head.appendChild(styleEl);

    // Adjust the font size of the large number
    const largeNumberElement = element.querySelector('.large-number');
    const smallNumberElement = element.querySelector('.small-number');
    const comparisonBoxElement = element.querySelector('.comparison-box');
    
    // Shrink font sizes if element width is less than 200px
    if (element.offsetWidth < 200) {
      adjustFontSize(largeNumberElement, config.smallLargeNumberFontSize);
      adjustFontSize(smallNumberElement, config.smallSmallNumberFontSize);
      adjustFontSize(comparisonBoxElement, config.smallComparisonFontSize);
    } else {
      adjustFontSize(largeNumberElement, config.largeNumberFontSize);
      adjustFontSize(smallNumberElement, config.smallNumberFontSize);
      adjustFontSize(comparisonBoxElement, config.comparisonFontSize);
    }

    doneRendering()
  }
});

const rounder = (float, digits) => {
  let rounded = Math.round(float * 10 ** digits) / 10 ** digits;
  return rounded;
};

