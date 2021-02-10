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
            ['ɱ', 'ɳ', 'ɲ', 'ŋ', 'ɴ', 'ʈ', 'ɖ', 'ɟ', 'ɡ', 'ɢ', 'ʡ', 'ʔ', 'ɸ', 'β', 'θ', 'ð', 'ʃ', 'ʒ', 'ʂ', 'ʐ', 'ɕ', 'ʑ',
                'ç', 'ʝ', 'ɣ', 'χ', 'ʁ', 'ħ', 'ʕ', 'ʜ', 'ʢ', 'ɦ', 'ɧ', 'ʋ', 'ɹ', 'ɻ', 'ɥ', 'ɰ', 'ʍ', 'ʙ', 'ⱱ', 'ɾ', 'ɽ', 'ʀ',
                'ɺ', 'ɫ', 'ɬ', 'ɮ', 'ɭ', 'ʎ', 'ʟ', 'ɓ', 'ɗ', 'ᶑ', 'ʄ', 'ɠ', 'ʛ', 'ʘ', 'ǀ', 'ǃ', 'ǂ', 'ǁ'],
        ],
        [
            M.util.get_string('vowels', COMPONENTNAME),
            ['ɪ', 'ʏ', 'ɨ', 'ʉ', 'ɯ', 'ʊ', 'ø', 'ɘ', 'ɵ', 'ɤ', 'ə', 'ɚ', 'ɛ', 'œ', 'ɜ', 'ɝ', 'ɞ', 'ʌ', 'ɔ', 'æ', 'ɶ', 'ɐ',
                'ɑ', 'ɒ', 'ɛ̃', 'œ̃', 'ɔ̃', 'ɑ̃'],
        ],
        [
            M.util.get_string('spacing_diacritics', COMPONENTNAME),
            ['ˈ', 'ˌ', 'ː', 'ˑ', 'ʼ', 'ˀ', 'ˤ', 'ᵝ', 'ᵊ', 'ᶢ', 'ˠ', 'ʰ', 'ʱ', 'ʲ', 'ˡ', 'ⁿ', 'ᵑ', 'ʷ', 'ᶣ', '˞', '‿', '˕', '˔'],
        ],
        [
            // Source: https://en.wikipedia.org/wiki/Phonetic_symbols_in_Unicode#Diacritics
            M.util.get_string('combining_diacritics', COMPONENTNAME),
            ['&#x0325', '&#x032C', '&#x0339', '&#x031C', '&#x031F', '&#x0320', '&#x0308', '&#x033D', '&#x0329', '&#x032F',
                '&#x0324', '&#x0330', '&#x033C', '&#x0334', '&#x031D', '&#x031E', '&#x0318', '&#x0319', '&#x032A', '&#x033A',
                '&#x033B', '&#x0303', '&#x031A]'],
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
        this.addButton({
            icon: 'icon',
            iconComponent: 'atto_ipakeyboard',
            callback: this._displayDialogue
        });
    },

    _createToolbox: function() {
        var template = Y.Handlebars.compile(
            '<div class="{{CSS.CHARMAP}}" data-show="0">' +
                '{{#each CHARMAP}}' +
                    '<span class="font-weight-bold mr-1">{{this.[0]}}</span>' +
                    '{{#each this.[1]}}' +
                    '<button class="btn btn-secondary btn m-1 {{../../CSS.BUTTON}}" ' +
                        'data-character="{{this}}" ' +
                        'onClick="return false;" ' +
                    '>{{{this}}}</button>' +
                    '{{/each}}' +
                '{{/each}}' +
            '</div>'
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
            this._toolbox.hide();
            this._toolbox.setData('show', 0);
        } else {
            this._toolbox.show();
            this._toolbox.setData('show', 1);
        }
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
    }
});
