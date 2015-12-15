/*
 * Copyright 2014 Takuya Asano
 * Copyright 2010-2014 Atilika Inc. and contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var TokenInfoDictionary = require("./TokenInfoDictionary.js");
var CharacterDefinition = require("./CharacterDefinition.js");
var ByteBuffer = require("../util/ByteBuffer.js");


/**
 * UnknownDictionary
 * @constructor
 */
function UnknownDictionary() {
    // TokenInfoDictionary.apply(this);  // execute super class constructor
    this.dictionary = new ByteBuffer(10 * 1024 * 1024);
    this.target_map = {};  // class_id (of CharacterClass) -> token_info_id (of unknown class)
    this.pos_buffer = new ByteBuffer(10 * 1024 * 1024);
    this.character_definition = null;
}

// Inherit from TokenInfoDictionary as a super class
UnknownDictionary.prototype = Object.create(TokenInfoDictionary.prototype);
// UnknownDictionary.prototype.constructor = UnknownDictionary;

UnknownDictionary.prototype.characterDefinition = function (character_definition) {
    this.character_definition = character_definition;
    return this;
};

UnknownDictionary.prototype.lookup = function (ch) {
    return this.character_definition.lookup(ch);
};

UnknownDictionary.prototype.lookupCompatibleCategory = function (ch) {
    return this.character_definition.lookupCompatibleCategory(ch);
};

UnknownDictionary.prototype.loadUnknownDictionaries = function (unk_buffer, unk_pos_buffer, unk_map_buffer, cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer) {
    this.loadDictionary(unk_buffer);
    this.loadPosVector(unk_pos_buffer);
    this.loadTargetMap(unk_map_buffer);
    this.character_definition = CharacterDefinition.load(cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer);
};


module.exports = UnknownDictionary;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaWN0L1Vua25vd25EaWN0aW9uYXJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNCBUYWt1eWEgQXNhbm9cbiAqIENvcHlyaWdodCAyMDEwLTIwMTQgQXRpbGlrYSBJbmMuIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBUb2tlbkluZm9EaWN0aW9uYXJ5ID0gcmVxdWlyZShcIi4vVG9rZW5JbmZvRGljdGlvbmFyeS5qc1wiKTtcbnZhciBDaGFyYWN0ZXJEZWZpbml0aW9uID0gcmVxdWlyZShcIi4vQ2hhcmFjdGVyRGVmaW5pdGlvbi5qc1wiKTtcbnZhciBCeXRlQnVmZmVyID0gcmVxdWlyZShcIi4uL3V0aWwvQnl0ZUJ1ZmZlci5qc1wiKTtcblxuXG4vKipcbiAqIFVua25vd25EaWN0aW9uYXJ5XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVW5rbm93bkRpY3Rpb25hcnkoKSB7XG4gICAgLy8gVG9rZW5JbmZvRGljdGlvbmFyeS5hcHBseSh0aGlzKTsgIC8vIGV4ZWN1dGUgc3VwZXIgY2xhc3MgY29uc3RydWN0b3JcbiAgICB0aGlzLmRpY3Rpb25hcnkgPSBuZXcgQnl0ZUJ1ZmZlcigxMCAqIDEwMjQgKiAxMDI0KTtcbiAgICB0aGlzLnRhcmdldF9tYXAgPSB7fTsgIC8vIGNsYXNzX2lkIChvZiBDaGFyYWN0ZXJDbGFzcykgLT4gdG9rZW5faW5mb19pZCAob2YgdW5rbm93biBjbGFzcylcbiAgICB0aGlzLnBvc19idWZmZXIgPSBuZXcgQnl0ZUJ1ZmZlcigxMCAqIDEwMjQgKiAxMDI0KTtcbiAgICB0aGlzLmNoYXJhY3Rlcl9kZWZpbml0aW9uID0gbnVsbDtcbn1cblxuLy8gSW5oZXJpdCBmcm9tIFRva2VuSW5mb0RpY3Rpb25hcnkgYXMgYSBzdXBlciBjbGFzc1xuVW5rbm93bkRpY3Rpb25hcnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUb2tlbkluZm9EaWN0aW9uYXJ5LnByb3RvdHlwZSk7XG4vLyBVbmtub3duRGljdGlvbmFyeS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVbmtub3duRGljdGlvbmFyeTtcblxuVW5rbm93bkRpY3Rpb25hcnkucHJvdG90eXBlLmNoYXJhY3RlckRlZmluaXRpb24gPSBmdW5jdGlvbiAoY2hhcmFjdGVyX2RlZmluaXRpb24pIHtcbiAgICB0aGlzLmNoYXJhY3Rlcl9kZWZpbml0aW9uID0gY2hhcmFjdGVyX2RlZmluaXRpb247XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5Vbmtub3duRGljdGlvbmFyeS5wcm90b3R5cGUubG9va3VwID0gZnVuY3Rpb24gKGNoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyX2RlZmluaXRpb24ubG9va3VwKGNoKTtcbn07XG5cblVua25vd25EaWN0aW9uYXJ5LnByb3RvdHlwZS5sb29rdXBDb21wYXRpYmxlQ2F0ZWdvcnkgPSBmdW5jdGlvbiAoY2gpIHtcbiAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXJfZGVmaW5pdGlvbi5sb29rdXBDb21wYXRpYmxlQ2F0ZWdvcnkoY2gpO1xufTtcblxuVW5rbm93bkRpY3Rpb25hcnkucHJvdG90eXBlLmxvYWRVbmtub3duRGljdGlvbmFyaWVzID0gZnVuY3Rpb24gKHVua19idWZmZXIsIHVua19wb3NfYnVmZmVyLCB1bmtfbWFwX2J1ZmZlciwgY2F0X21hcF9idWZmZXIsIGNvbXBhdF9jYXRfbWFwX2J1ZmZlciwgaW52b2tlX2RlZl9idWZmZXIpIHtcbiAgICB0aGlzLmxvYWREaWN0aW9uYXJ5KHVua19idWZmZXIpO1xuICAgIHRoaXMubG9hZFBvc1ZlY3Rvcih1bmtfcG9zX2J1ZmZlcik7XG4gICAgdGhpcy5sb2FkVGFyZ2V0TWFwKHVua19tYXBfYnVmZmVyKTtcbiAgICB0aGlzLmNoYXJhY3Rlcl9kZWZpbml0aW9uID0gQ2hhcmFjdGVyRGVmaW5pdGlvbi5sb2FkKGNhdF9tYXBfYnVmZmVyLCBjb21wYXRfY2F0X21hcF9idWZmZXIsIGludm9rZV9kZWZfYnVmZmVyKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBVbmtub3duRGljdGlvbmFyeTtcbiJdLCJmaWxlIjoiZGljdC9Vbmtub3duRGljdGlvbmFyeS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
