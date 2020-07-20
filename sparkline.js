looker.plugins.visualizations.add({
  create: function(element, config) {
  // Insert a <style> tag with some styles we'll use later.
  var css = element.innerHTML = `
    <style>
      .embed-folder-vis {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
      }
      a:link {
        text-decoration: none
      }
      a:hover {
        border: 1px solid #020202;
        }
    </style>
  `;

  // Create a container element to let us center the text.
  var container = element.appendChild(document.createElement("div"));
  container.className = "embed-folder-vis";

  // Create an element to contain the text.
  this._textElement = container.appendChild(document.createElement("div"));

  },
 updateAsync: function(data, element, config, queryResponse, details, done) {

    // Grab the first cell of the data.
    var firstRow = data[0];
    var firstCell = firstRow[queryResponse.fields.dimensions[0].name];

    var returnString = `<div class='embed-folder-vis'>`
    data.forEach((x) =>  {
        returnString = returnString + `<div style='margin:16px; line-height: 38px; font-family:"Open Sans", "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;'> ${x['spaces.name_button'].html} </div>`
    })
    
    returnString = returnString + `</div>`

    // Insert the data into the page.
    this._textElement.innerHTML = returnString;

    // Always call done to indicate a visualization has finished rendering.
    done()
  }
})