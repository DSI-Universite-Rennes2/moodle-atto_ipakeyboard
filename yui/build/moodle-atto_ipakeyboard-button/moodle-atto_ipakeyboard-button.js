YUI.add('moodle-atto_ipakeyboard-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package   atto_ipakeyboard
 * @copyright 2020 Université Rennes 2 <dsi-contact@univ-rennes2.fr>
 * @license   https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Atto text editor character map plugin
 *
 * @module moodle-atto_ipakeyboard-button
 */

var COMPONENTNAME = 'atto_ipakeyboard',
    CSS = {
        BUTTON: 'atto_ipakeyboard_character',
        CHARMAP: 'atto_ipakeyboard_selector'
    },
    /*
     * Map of IPA, kindly borrowed from MediaWiki.
     *
     * Each entries contains in order:
     * - {String} HTML code
     * - {String} HTML numerical code
     * - {Boolean} Whether or not to include it in the list
     * - {String} The language string key
     *
     * @property CHARMAP
     * @type {Array}
     */
    CHARMAP = [
        [
            M.util.get_string('consonants', COMPONENTNAME),
            ['ʙ', 'ɓ', 'ç', 'ɕ', 'ð', 'ɖ', 'ɗ', 'ᶑ', 'ɡ', 'ɢ', 'ɠ', 'ʛ', 'ɣ', 'ħ', 'ʜ', 'ɦ', 'ɧ', 'ʝ', 'ɟ', 'ʄ', 'ʟ', 'ɫ',
                'ɬ', 'ɭ', 'ɮ', 'ʎ', 'ɱ', 'ɴ', 'ɲ', 'ɳ', 'ŋ', 'ɸ', 'ʀ', 'ɹ', 'ɺ', 'ɻ', 'ɽ', 'ɾ', 'ʁ', 'ʂ', 'ʃ', 'ʈ', 'ɥ', 'ɰ',
                'ʋ', 'ⱱ', 'ʍ', 'ʐ', 'ʑ', 'ʒ', 'ʔ', 'ʕ', 'ʡ', 'ʢ', 'ǀ', 'ǁ', 'ǂ', 'ǃ', 'ʘ', 'β', 'θ', 'χ'],
        ],
        [
            M.util.get_string('vowels', COMPONENTNAME),
            ['æ', 'ɐ', 'ɑ', 'ɒ', 'ə', 'ɛ', 'ɘ', 'ɚ', 'ɜ', 'ɝ', 'ɞ', 'ɤ', 'ɪ', 'ɨ', 'ø', 'œ', 'ɶ', 'ɔ', 'ɵ', 'ʉ', 'ɯ', 'ʊ',
                'ʌ', 'ʏ', 'ɛ̃', 'œ̃', 'ɔ̃', 'ɑ̃'],
        ],
        [
            M.util.get_string('spacing_diacritics', COMPONENTNAME),
            ['‿', 'ˈ', 'ˌ', '˔', '˕', '˞', 'ː', 'ˑ', 'ᵊ', 'ᶢ', 'ˠ', 'ʰ', 'ʱ', 'ʲ', 'ˡ', 'ⁿ', 'ᵑ', 'ᶣ', 'ʷ', 'ˀ', 'ʼ', 'ˤ', 'ᵝ'],
        ],
        [
            // Source: https://en.wikipedia.org/wiki/Phonetic_symbols_in_Unicode#Diacritics
            M.util.get_string('combining_diacritics', COMPONENTNAME),
            ['&#x0303', '&#x0308', '&#x0318', '&#x0319', '&#x031A', '&#x031C', '&#x031D', '&#x031E', '&#x031F', '&#x0320',
                '&#x0324', '&#x0325', '&#x0329', '&#x032A', '&#x032C', '&#x032F', '&#x0330', '&#x0334', '&#x0339', '&#x033A',
                '&#x033B', '&#x033C', '&#x033D'],
        ],
        [
            // Source: https://en.wikipedia.org/wiki/Tone_letter#IPA_tone_letters_in_Unicode
            M.util.get_string('tone', COMPONENTNAME),
            ['&#741;', '&#742;', '&#743;', '&#744;', '&#745;', '&#42770;', '&#42771;', '&#42772;', '&#42773;', '&#42774;'],
        ]
    ];

/**
 * Atto text editor charmap plugin.
 *
 * @namespace M.atto_ipakeyboard
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

Y.namespace('M.atto_ipakeyboard').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,
    _toolbox: null,

    initializer: function() {
        this._setEventListeners();

        this.addButton({
            icon: 'icon',
            iconComponent: 'atto_ipakeyboard',
            callback: this._displayDialogue
        });
    },

    _createToolbox: function() {
        var template = Y.Handlebars.compile(
            '<dl class="{{CSS.CHARMAP}} px-1" data-show="0">' +
                '{{#each CHARMAP}}' +
                '<dt class="mt-2 mr-1">{{this.[0]}}</dt>' +
                '<dd class="m-0">' +
                    '<ul class="list-inline m-0">' +
                        '{{#each this.[1]}}' +
                        '<li class="list-inline-item m-0">' +
                            '<button class="btn btn-secondary btn m-1 {{../../CSS.BUTTON}}" ' +
                            'data-character="{{this}}" ' +
                            'onClick="return false;" ' +
                            '>{{{this}}}</button>' +
                        '</li>' +
                        '{{/each}}' +
                    '</ul>' +
                '</dd>' +
                '{{/each}}' +
            '</dl>'
        );

        var content = Y.Node.create(template({
            component: COMPONENTNAME,
            CSS: CSS,
            CHARMAP: CHARMAP
        }));

        content.delegate('click', this._insertChar, '.' + CSS.BUTTON, this);

        var textarea = this.get('host').textarea;

        return textarea.get('parentNode').insert(content, textarea).one('.' + CSS.CHARMAP);
    },

    /**
     * Display the Character Map selector.
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function() {
        // Store the current selection.
        if (this._toolbox === null) {
            this._toolbox = this._createToolbox();
        }

        if (this._toolbox.getData('show') == 1) {
            this._hideToolbox();
        } else {
            this._showToolbox();
        }
    },

    /**
     * Hide toolbox dialogue.
     *
     * @method _hideToolbox
     * @private
     */
    _hideToolbox: function() {
        if (this._toolbox === null) {
            return;
        }

        this._toolbox.hide();
        this._toolbox.setData('show', 0);
    },

    /**
     * Insert the picked character into the editor.
     *
     * @method _insertChar
     * @param {EventFacade} e
     * @private
     */
    _insertChar: function(e) {
        var character = e.target.getData('character');

        if (character.length === 1) {
            document.execCommand('insertText', false, character);
        } else {
            // Gère l'insertion des caractères combinés.
            this.get('host').insertContentAtFocusPoint(character);
        }

        // And mark the text area as updated.
        this.markUpdated();
    },

    /**
     * Set event Listeners to hide Toolbox when Atto editor is hidden.
     *
     * @method  _setEventListeners
     * @private
     */
    _setEventListeners: function() {
        var toolbox = this;

        var observer = new MutationObserver(function(mutationsList) {
            mutationsList.forEach(function(mutation) {
                if (mutation.type !== 'attributes') {
                    return;
                }

                if (mutation.attributeName !== 'hidden') {
                    return;
                }

                if (mutation.target.hidden === false) {
                    return;
                }

                toolbox._hideToolbox();
            });
        });

        var editor = this.get('host').editor;
        observer.observe(editor._node, {attributes: true});
    },

    /**
     * Show toolbox dialogue.
     *
     * @method _showToolbox
     * @private
     */
    _showToolbox: function() {
        if (this._toolbox === null) {
            return;
        }

        this._toolbox.show();
        this._toolbox.setData('show', 1);
    },
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
