<?php
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

/**
 * Atto text editor integration version file.
 *
 * @package   atto_ipakeyboard
 * @copyright 2020 Université Rennes 2 <dsi-contact@univ-rennes2.fr>
 * @license   https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

// The full frankenstyle component name in the form of plugintype_pluginname.
$plugin->component = 'atto_ipakeyboard';

// Specifies the minimum version number of Moodle core that this plugin requires.
$plugin->requires = 2019052000; // Requires this Moodle version.

// The version number of the plugin.
$plugin->version = 2020122900;

// Human readable version name that should help to identify each release of the plugin.
$plugin->release = '1.0.0';

// Declares the maturity level of this plugin version, that is how stable it is.
$plugin->maturity = MATURITY_ALPHA;
