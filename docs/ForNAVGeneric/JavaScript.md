# JavaScript

## Why JavaScript
If you want to use conditional formatting, loop through data, or other things you can use JavaScript inside your ForNAV layouts to do these things.

There are many places inside ForNAV where you can use JavaScript. The one used most often is the Text Box. The simplest use of JavaScript may be concatenating several strings. Let's have a look at one of the Text Boxes in a standard ForNAV report.

![Text Box JavaScript](../_media/JavaScriptInTextBox.png)

In this Text Box the source expression is not just a single field. Two fields have been linked together with a simple line of JavaScript. This line simply strings two variables together with a connecting text.

```javascript
CurrReport.Caption + ': ' + Header.No
```

> You can use plain text inside your JavaScript, but you need to place that text between single '' or double "" quotes.

## Learn JavaScript

If you are new to JavaScript we can recommend these resources

Online Learning
* [Codecademy](https://www.codecademy.com/)
* [W3Schools JavaScript](https://www.w3schools.com/js/default.asp)

Videos
* [Learn JavaScript in one video](https://www.youtube.com/watch?v=fju9ii8YsGs)

## Triggers

There are many places inside ForNAV where you can write JavaScript. The Text Box is one of them. These are the others.

|Control                     |Trigger
|----------------------------|-----------------
|Text Box                    |Source Expression
|All Controls                |Show Output
|All Controls                |On Print
|Report                      |OnPreReport
|DataItem                    |OnPreDataItem
|DataItem                    |OnAfterGetRecord
|Section                     |Show Output

> Where a section is inherited from a master template that sections JavaScript is also inherited. JavaScript outside of sections, OnPreReport, DataItems, etc., are never inherited. The only exception to this is the OnPreReport Master Report property. This will inherit the OnPreReport script from a master template.

## Database functions in JavaScript

You can use all of the standard JavaScript functions in ForNAV. However, standard JavaScript has no functions for reading data from the Business Central database. ForNAV has embedded some of the DataBase functions inside the ForNAV JavaScript editor. 

|JavaScript                              |AL                             |C/AL                           |
|----------------------------------------|-------------------------------|-------------------------------|
|Get();)                                 |Get();                         |GET();                         |
|CalcFields(‘Picture’);                  |CalcFields(Picture);           |CALCFIELDS(Picture);           |
|SetAutoCalcFields(‘Balance’);           |SetAutoCalcFields(Balance);    |SETAUTOCALCFIELDS(Balance);    |
|Init();                                 |Init();                        |INIT;                          |
|Next();                                 |Next();                        |NEXT;                          |
|First();                                |FindFirst();                   |FINDFIRST;                     |
|SetFilter(‘Name’, ‘Mark’);              |SetFilter(Name, ‘Mark’);       |SETFILTER(Name, ‘Mark’);       |
|SetRange(‘Name’, ‘Mark’);               |SetRange(Name, ‘Mark’);        |SETRANGE(Name, ‘Mark’);        |
|GetCaption()                            |                               |                               |
|GetOptionValue(string ExternalFieldName)|                               |                               |
|GetFilter(string ExternalFieldName)     |                               |                               |
|GetFilters()                            |                               |                               |
|<br>
|Case Sensitive                          |Not case sensitive             |Not case sensitive             |
|Parentheses mandatory                   |Parentheses somewhat mandatory |Parentheses not mandatory      |
|Fieldnames in single quotes	           |Fieldnames not in quotes   	   |Fieldnames not in quotes   	   |
|Brackets {}                             |Begin...End;                   |BEGIN...END;                   |

Usage Examples
```javascript
Line.GetOptionValue('Type');
ForNAVSetup.CalcFields('Logo');
Header.GetFilter('No');
Line.SetFilter('DocumentNo', Header.No);
```

> Whilst you can read data from the Business Central database it is not possible to write data to the Business Central database from inside a ForNAV Layout. If you need to do this, for instance to set the number printed, you need to edit the report AL file.

## JavaScript Order of execution

All triggers inside a ForNAV report trigger in a certain order.

![JavaScript Order of execution](../_media/ForNAV%20Order%20of%20execution.png)

## Demo Scripts

### Get comment lines

For maximum effect this should be placed in the OnPreReport trigger so it can be inherited by any reports that use it as a master template

```javascript
function GetComments(headerNo) {
  var comments;
  
  SalesCommentLine.SetFilter('DocumentType', SalesCommentLine.FieldOptions.DocumentType.PostedInvoice);
  SalesCommentLine.SetFilter('No', headerNo);
  if (SalesCommentLine.First()) {
    comments = SalesCommentLine.Comment;
  }
  
  while (SalesCommentLine.Next()) {
    comments += ' ' + SalesCommentLine.Comment;
  }
  return comments;
}
```
> The .Next() function cannot be used in Business Central cloud 

### Get comment lines as an array

Add this to the Header OnAfterGetRecord
```javascript
var comments = [];

function GetComments(headerNo, lineNo) {
  var _comments = [];
  var _comment;
  
  SalesCommentLine.SetFilter('DocumentType', SalesCommentLine.FieldOptions.DocumentType.PostedInvoice);
  SalesCommentLine.SetFilter('No', headerNo);
  SalesCommentLine.SetFilter('LineNo', lineNo);

  if (SalesCommentLine.First()) {
    _comment = {date:SalesCommentLine.Date, lineNo:Line.LineNo, comment:SalesCommentLine.Comment};
    _comments.push(_comment);
  }
  
  while (SalesCommentLine.Next()) {
    _comment = {date:SalesCommentLine.Date, lineNo:Line.LineNo, comment:SalesCommentLine.Comment};
    _comments.push(_comment);
  }
  return _comments;
}

function ParseComments(_comments) {
  var _parsedComment, i;
  _parsedComment = '';

  for (i = 0; i < _comments.length; i++) {
    _parsedComment += _comments[i].lineNo + ' ' + _comments[i].date + ' ' + _comments[i].comment + '\n ';
  }
  return _parsedComment;
}
```
> The .Next() function cannot be used in Business Central cloud 

Add this to the Line.OnAfterGetRecord
```javascript
comments.push.apply(comments, GetComments(Line.DocumentNo, Line.LineNo));
```

Add a new DataItem, set the source table as Integer and set MaxIteration on 1. Add a Body section with a Text control and add this as the source expression

```javascript
ParseComments(comments);
```

### Filter on empty or non empty values

```javascript
// Filter empty value (double quote, single quote, single quote, double quote)
SalesCommentLine.SetFilter('Code', "''");

// Filter Non empty value (double quote, <>, single quote, single quote, double quote)
SalesCommentLine.SetFilter('Code', "<>''");
```


### Get the bank account based on the currency

Add the Bank Account table to the records and get the record based on the currency.
```javascript
switch(Header.CurrencyCode) {
  case 'EUR':
    BankAccount.Get('EURBANKNO');
    break;
  case 'USD':
    BankAccount.Get('USDBANKNO');
    break;
  default:
    BankAccount.Get('DEFAULTBANKNO');
}
```

Add the Bank Account table to the records and find the first bank account for that currency.
```javascript
BankAccount.SetRange('CurrencyCode', Header.CurrencyCode);
BankAccount.First();
```

### Convert decimals to different Format

Converts any number to the US Format in 2 decimals
```javascript
Number.prototype.usFormat = function(){
  return this.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
```
Converts to US format without adding decimal places
```javascript
Number.prototype.usFormat = function(){
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
```

Call this function from any number:
```javascript
Header.Amount.usFormat();
```

Converts any number to the any format in any number of decimals
```javascript
/**
 * Number.prototype.format(n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

12345678.9.format(2, 3, '.', ',');  // "12.345.678,90"
123456.789.format(4, 4, ' ', ':');  // "12 3456:7890"
12345678.9.format(0, 3, '-');       // "12-345-679"
```
Via https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

Call this function from any number:
```javascript
Header.Amount.format(2, 3, '.', ',');
```

### Get the number of decimal places

```javascript
Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}
```
### Build your addresses manually
Sometimes you may need to build up you address fields manually. If this is the case this JavaScript function in the OnPreReport trigger will do the trick.

```javascript
function AddNewlineIfValue(string) {
  if(string) {
    return string + '\n'
  } else {
    return ""
  }
} 

function formataddress (name,name2,address,address2, postcode,city, country) {
  return AddNewlineIfValue(name)+AddNewlineIfValue(name2)+AddNewlineIfValue(address)+AddNewlineIfValue(address2)+AddNewlineIfValue(postcode+" "+city)+AddNewlineIfValue(country)
}
```

Finally add this line of script in the text box source expression.
```javascript
formataddress(Header.Bill_toName,Header.Bill_toName2,Header.Bill_toAddress,Header.Bill_toAddress2, Header.Bill_toPostCode,Header.Bill_toCity, Header.FieldLookups.Bill_toCountry_RegionName)

```
> For ForNAV version 5.6 and over this function has been superseded by the CurrReport.JoinStrings function.

### FieldExtensions



FieldExtensions will display the field caption and the field value when the value is not empty. The FieldExtension has these JavaScript functions:

* Rec.FieldExtensions.Field.Format(\<delimiter\>) – replaces the “: ” delimiter.
* Rec.FieldExtensions.Field.Format(\<delimiter\>,\<format\>) – replaces the “: ” delimiter and formats the value using a .net format string.
* Rec.FieldExtensions.Field.Format(\<delimiter\>,\<format\>,\<languageId\>) – replaces the “: ” delimiter and formats the value using a .net format string and a language ID (lcid).
* Rec.FieldExtensions.Field.HasValue – returns true if the value is not blank.

```javascript
var joinFormat = ' - '
var dotnetFormat = 'D';
var language = 1043;

Header.FieldExtensions.DocumentDate
// Results in "Document Date: 05/13/21"
Header.FieldExtensions.DocumentDate.Format(joinFormat)
// Results in "Document Date - 05/13/21"
Header.FieldExtensions.DocumentDate.Format(joinFormat, dotnetFormat)
// Results in "Document Date - Thursday, May 13, 2021"
Header.FieldExtensions.DocumentDate.Format(joinFormat, dotnetFormat, language)
// Results in "Document Date - woensdag 13 mei 2021"

if (CompanyInformation.FieldExtensions.E_Mail.HasValue()) {
  //Do something
}
```

### Join strings
To help with formatting of large strings, you can use a new function in a Text Box Source expression: CurrReport.JoinString(<delimiter>, <string>,…). This function automatically compresses the output to remove blank values.

Add company information on a single line delimited with a | character.
```javascript
CurrReport.JoinStrings(' | ',
  CompanyInformation.FieldExtensions.PhoneNo, 
  CompanyInformation.FieldExtensions.E_Mail, 
  CompanyInformation.FieldExtensions.HomePage, 
  CompanyInformation.FieldExtensions.VATRegistrationNo,
  CompanyInformation.FieldExtensions.IBAN, 
  CompanyInformation.FieldExtensions.SWIFTCode
)
```

Add company information on several lines delimited with a JavaScript new line character.
```javascript
var joinFormat = ' - ';
CurrReport.JoinStrings('\n',
  CompanyInformation.FieldExtensions.PhoneNo.Format(joinFormat), 
  CompanyInformation.FieldExtensions.E_Mail.Format(joinFormat), 
  CompanyInformation.FieldExtensions.HomePage.Format(joinFormat), 
  CompanyInformation.FieldExtensions.VATRegistrationNo.Format(joinFormat),
  CompanyInformation.FieldExtensions.IBAN.Format(joinFormat), 
  CompanyInformation.FieldExtensions.SWIFTCode.Format(joinFormat)
)
```

JoinStrings does not just work with the FieldExtensions, it works with any type of string.

To manually build an address field.
```javascript
CurrReport.JoinStrings('\n',
  Header.Bill_toName,
  Header.Bill_toName2,
  Header.Bill_toAddress,
  Header.Bill_toAddress2,
  Header.Bill_toPostCode + ', ' + Header.Bill_toCity,
  Header.FieldLookups.Bill_toCountry_RegionName
)
```

### Append and Prepend PDF Files

```javascript
ForNAVFileStorage.Get('TERMS', 'APPEND');
ForNAVFileStorage.CalcFields('Data');
CurrReport.GetDataItem('Header').Pdf.Append(ForNAVFileStorage.Data);

ForNAVFileStorage.Get('TERMS', 'PREPEND');
ForNAVFileStorage.CalcFields('Data');
CurrReport.GetDataItem('Header').Pdf.Prepend(ForNAVFileStorage.Data);
```

> From ForNAV Report Pack version 5.4.0.0 you can add image, pdf, and other files to the ForNAV File Storage table. The ForNAV File Storage table has two key fields, Code and Type. Therefore when you do a Get() on that table you need to specify both these fields.

### Add text and image watermarks

The watermark controls for a ForNAV report are all available in JavaScript. To add a text watermark add these lines.
```javascript
CurrReport.Watermark.Text.Font.Name = 'Comic Sans MS';
CurrReport.Watermark.Text.Font.Size = 50;
CurrReport.Watermark.Text.ForeColor = 'red';
CurrReport.Watermark.Text.Text = 'Watermark';
```

For an image watermark you can use the image or a pdf in a blob field as a watermark
```javascript
ForNAVFileStorage.Get('WATERMARK', 'IMAGE');
ForNAVFileStorage.CalcFields('Data');
CurrReport.Watermark.Image.Image = ForNAVFileStorage.Data;
```
> When you specify watermark controls they will be remembered. Therefore, when you don't want to display watermark text or images for a subsequent page you need to hide them using the CurrReport.Watermark.Text.Visible and CurrReport.Watermark.Image.Visible controls.

To print a different watermark on follow up pages. You will need to load your watermark images in the ForNAV File Storage table

![Multiple Watermarks](../_media/MultiplePageWatermark.png)

Then add the ForNAV File Storage table to the records property.

![Multiple Watermarks](../_media/RecordsWatermark.png)

For document style (header line) reports:
On the header OnAfterGetRecord you will need to load and set the watermark for the first page

```javascript
Watermark.Get('PAGE1', 'WATERMARK');
Watermark.CalcFields('Data');
CurrReport.Watermark.Image.Image = Watermark.Data;
var watermark2Loaded = false;
```

On the line OnAfterGetRecord you will need to load and set the watermark for the follow up pages

```javascript
if (CurrReport.PageNo != 1 && !watermark2Loaded) {
  Watermark.Get('PAGE2', 'WATERMARK');
  Watermark.CalcFields('Data');
  CurrReport.Watermark.Image.Image = Watermark.Data;
  watermark2Loaded = true;
}
```

All of the watermark controls are:
```javascript
CurrReport.Watermark.Image.Visible Boolean
CurrReport.Watermark.Image.BackColor String
CurrReport.Watermark.Image.ForeColor String
CurrReport.Watermark.Image.Image Image

CurrReport.Watermark.Text.Font.Regular Boolean
CurrReport.Watermark.Text.Font.Bold Boolean
CurrReport.Watermark.Text.Font.Italic Boolean
CurrReport.Watermark.Text.Font.Strikeout Boolean
CurrReport.Watermark.Text.Font.Underline Boolean
CurrReport.Watermark.Text.Font.Name String
CurrReport.Watermark.Text.Font.Size Integer

CurrReport.Watermark.Text.Text String
CurrReport.Watermark.Text.BackColor String
CurrReport.Watermark.Text.ForeColor String
CurrReport.Watermark.Text.DeviceFont String
CurrReport.Watermark.Text.FormatString String
CurrReport.Watermark.Text.Hyperlink String
CurrReport.Watermark.Text.Visible Boolean
```

### Control formatting
You can control the formatting of a text box by using the JavaScript formatting. You can use .NET format strings.

```javascript
CurrReport.DotNetFormat(Header.Amount, "C"); // Sets the format of the Header.Amount to Currency
CurrReport.DotNetFormat(Header.DocumentDate, 'yyyy-MM-dd'); // Sets the format of the DocumentDate text box to this string
```

> The formatting is controlled by .NET format strings. You can build up your format strings by using the Format property editor of a text box. .NET formatting is explained in depth [here](https://docs.microsoft.com/en-us/dotnet/standard/base-types/formatting-types).

You can also specify the language code you want to use to format the text box. ForNAV uses the standard language codes specified by Microsoft. You can find them [here](https://docs.microsoft.com/en-us/openspecs/office_standards/ms-oe376/6c085406-a698-4e12-9d4d-c3b0ee3dbc4a).

```javascript
CurrReport.DotNetFormat(Header.DueDate, "D", 1033); // Formats the date to en-US format
CurrReport.DotNetFormat(Header.DueDate, "D", 1043); // Formats the date to nl-NL format
```

## Further Learning

* [Knowledge Base Dynamic control of fonts](https://www.fornav.com/knowledge-base/dynamic-control-of-color-and-font-in-text-boxes/ )
* [Online JavaScript Editor](https://js.do/)

<div style="position: relative; padding-bottom: 57.05229793977813%; height: 0;">
    <iframe
        src="https://www.youtube.com/embed/T-GY6ObU82c?start=127&end=941"
        frameborder="0"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>

