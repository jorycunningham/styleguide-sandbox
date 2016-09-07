# Styleguide Sandbox - Beta

##About
This tool generates a styleguide from formatted comments in CSS from your UI system, using the [DSS](https://github.com/DSSWG/DSS) parsing library and [Metalsmith](http://www.metalsmith.io/) static-site generator.

I have included a couple of component examples (buttons and grid) to get you started.

This project is a demo tool for styleguide-driven development created by [Jory Cunningham](http://jorycunningham.com/).

## Getting Started

* Run `npm install` from the project root to make sure that all required modules are installed.
* Run `gulp` to build the documentation and launch the site locally. It should now be available at [http://localhost:3000/](http://localhost:3000/). If port 3000 is busy another port will be selected dynamically.

## How to use the styleguide.

The styleguide will create entries based on the comment syntax and some naming conventions.

### CSS Comments Tags
The following tags are available for use

* **@name** (required) - name of the pattern that is being documented. Unless overridden with other tags (see below), this will be used for locating the example HTML and displaying the pattern title in the documentation

* **@description** (required) - A short description of the purpose of the pattern unit. This will also print in the html styleguide.

* **@group** (required) This field groups pattern based on complexity. Currently this only affects the display order in the Styleguide. This vlaue is printed out when the generator looks for code examples. It can be used for sorting components [atomically](http://bradfrost.com/blog/post/atomic-web-design), for example.

* **@displayName** (optional) - The ‘@name’ field above will need to match the file name for the code units (e.g.' src/components/{name}/{name}.less’). In some cases we might want to add a nicer name or we may want to change what we call the thing without changing the API. This field allows us to display a different pattern name without breaking the naming pattern.

#### Example Comment


```
/**
* @name inputs
*
* @displayName Input Fields (I'm optional)
*
* @description Basic text inputs with labels
*
* @group modules
*/
```

### HTML Examples

The styleguide will look for an HTML file code example located in: `src/components/{@group value here}/{@name value here}.html`

This file can be a mix of code examples and supporting information.

Code examples should be wrapped in an element with a `data-code`attribute. Code wrapped in this attribute will both print out as live code and also be repeated directly below the live example as formatted HTML documentation.

For example, this HTML would print three buttons, then print the formatted HTML documentation for them directly below the buttons.

```
<div data-code>
  <button class="Button--primary">Push Me</button>
  <button class="Button--secondary">Push Me</button>
</div>
```

Additional information to describe the pattern can be included as well.

```
<p>Primary buttons should be the default button style</p>
<div data-code>
  <button class="Button--primary">Push Me</button>
</div>
<p>Secondary buttons are for actions like "cancel"</p>
<div data-code>
  <button class="Button--secondary">Push Me</button>
</div>
```

### Complex HTML examples
In the case where a pattern requires the entire screen, or the styleguide layout would interfere with the pattern, separate pages can be created. Example uses include the documentation for the Grid, Navigation, Footers, etc.

In this case a static page should be created in `src/_styleguide/src/demos/`. It should use the blank template by referencing it in the page's front-matter like this:

```
---
title: The Grid
layout: empty-layout.dust
---

<!-- content here -->
```

These pages can use the `data-code` attribute like regular HTML documentation. These separate pages should then be linked to in an HTML file stored with the component

### Styling HTML Examples
In the case that a demo needs custom CSS that would not be part of your actual library, create a new SASS partial in `src/_styleguide/resources/sass/demos` and reference that partial in the `src/_styleguide/resources/sass/styleguide.scss`m the SASS file that builds styleguide.css

## CLI Commands

```
$ gulp
```
This fires the default gulp task which will parse the CSS then build the site.


## Distribution Folder

* **/dist** - This is where the static styleguide site created by the gulp task will be generated. This is the folder that is being served locally and on the hosted version of this styleguide.

## Source Folder Structure

### Styleguide Files
In addition to the src folders which belong to the library being documented, there is a `/src/_styleguide` folder which contains the following folders:

* **/_layouts** - This is where all of the dustJS templates that MetalSmith uses to render its content are stored

* **/data** - This is where the generated JSON file from the parsed CSS comments is stored

* **/resources** - All of the styleguide specific resources such as JS, SASS, Images, and generated CSS is stored

* **/src** - The HTML files which generate stand-alone pages with the static site generator are stored here. See [Metalsmith's documentation](http://www.metalsmith.io/) for more info.

## Component File
All SASS files and html examples should live in `src/components`. Additional hierarchy can be added and referenced by the @group tag in the CSS.