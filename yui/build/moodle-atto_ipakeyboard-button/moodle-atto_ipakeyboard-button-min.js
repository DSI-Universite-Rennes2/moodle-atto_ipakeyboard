YUI.add("moodle-atto_ipakeyboard-button",function(e,t){var n="atto_ipakeyboard",r={BUTTON:"atto_ipakeyboard_character",CHARMAP:"atto_ipakeyboard_selector"},i=[[M.util.get_string("consonants",n),["\u0299","\u0253","\u00e7","\u0255","\u00f0","\u0256","\u0257","\u1d91","\u0261","\u0262","\u0260","\u029b","\u0263","\u0127","\u029c","\u0266","\u0267","\u029d","\u025f","\u0284","\u029f","\u026b","\u026c","\u026d","\u026e","\u028e","\u0271","\u0274","\u0272","\u0273","\u014b","\u0278","\u0280","\u0279","\u027a","\u027b","\u027d","\u027e","\u0281","\u0282","\u0283","\u0288","\u0265","\u0270","\u028b","\u2c71","\u028d","\u0290","\u0291","\u0292","\u0294","\u0295","\u02a1","\u02a2","\u01c0","\u01c1","\u01c2","\u01c3","\u0298","\u03b2","\u03b8","\u03c7"]],[M.util.get_string("vowels",n),["\u00e6","\u0250","\u0251","\u0252","\u0259","\u025b","\u0258","\u025a","\u025c","\u025d","\u025e","\u0264","\u026a","\u0268","\u00f8","\u0153","\u0276","\u0254","\u0275","\u0289","\u026f","\u028a","\u028c","\u028f","\u025b\u0303","\u0153\u0303","\u0254\u0303","\u0251\u0303"]],[M.util.get_string("spacing_diacritics",n),["\u203f","\u02c8","\u02cc","\u02d4","\u02d5","\u02de","\u02d0","\u02d1","\u1d4a","\u1da2","\u02e0","\u02b0","\u02b1","\u02b2","\u02e1","\u207f","\u1d51","\u1da3","\u02b7","\u02c0","\u02bc","\u02e4","\u1d5d"]],[M.util.get_string("combining_diacritics",n),["&#x0303","&#x0308","&#x0318","&#x0319","&#x031A","&#x031C","&#x031D","&#x031E","&#x031F","&#x0320","&#x0324","&#x0325","&#x0329","&#x032A","&#x032C","&#x032F","&#x0330","&#x0334","&#x0339","&#x033A","&#x033B","&#x033C","&#x033D"]],[M.util.get_string("tone",n),["&#741;","&#742;","&#743;","&#744;","&#745;","&#42770;","&#42771;","&#42772;","&#42773;","&#42774;"]]];e.namespace("M.atto_ipakeyboard").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_currentSelection:null,_toolbox:null,initializer:function(){this._setEventListeners(),this.addButton({icon:"icon",iconComponent:"atto_ipakeyboard",callback:this._displayDialogue})},_createToolbox:function(){var t=e.Handlebars.compile('<div class="{{CSS.CHARMAP}}" data-show="0">{{#each CHARMAP}}<span class="font-weight-bold mr-1">{{this.[0]}}</span>{{#each this.[1]}}<button class="btn btn-secondary btn m-1 {{../../CSS.BUTTON}}" data-character="{{this}}" onClick="return false;" >{{{this}}}</button>{{/each}}{{/each}}</div>'),s=e.Node.create(t({component:n,CSS:r,CHARMAP:i}));s.delegate("click",this._insertChar,"."+r.BUTTON,this);var o=this.get("host").textarea;return o.get("parentNode").insert(s,o).one("."+r.CHARMAP)},_displayDialogue:function(){this._toolbox===null&&(this._toolbox=this._createToolbox()),this._toolbox.getData("show")==1?this._hideToolbox():this._showToolbox()},_hideToolbox:function(){if(this._toolbox===null)return;this._toolbox.hide(),this._toolbox.setData("show",0)},_insertChar:function(e){var t=e.target.getData("character");t.length===1?document.execCommand("insertText",!1,t):this.get("host").insertContentAtFocusPoint(t),this.markUpdated()},_setEventListeners:function(){var e=this,t=new MutationObserver(function(t){t.forEach(function(t){if(t.type!=="attributes")return;if(t.attributeName!=="hidden")return;if(t.target.hidden===!1)return;e._hideToolbox()})}),n=this.get("host").editor;t.observe(n._node,{attributes:!0})},_showToolbox:function(){if(this._toolbox===null)return;this._toolbox.show(),this._toolbox.setData("show",1)}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});
